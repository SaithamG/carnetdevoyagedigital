const { test, expect } = require('@playwright/test');

test.describe('Carnet de Voyage — fumée globale', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // ── Chargement initial ──────────────────────────────────────────────────────

  test('titre principal visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'CARNET DE VOYAGE DIGITAL' })).toBeVisible();
  });

  test('compte à rebours Japon 2026 visible', async ({ page }) => {
    await expect(page.getByText('JAPON 2026')).toBeVisible();
    // Les chiffres J / H / M / S sont affichés
    await expect(page.locator('text=J').first()).toBeVisible();
  });

  test("badge 'Vol Garanti' visible", async ({ page }) => {
    await expect(page.getByText('Vol Garanti')).toBeVisible();
  });

  // ── Navigation groupe / sous-onglets ────────────────────────────────────────

  test("onglet par défaut : Finance & Budget chargé au démarrage", async ({ page }) => {
    await expect(page.getByText('Finance & Budget')).toBeVisible();
    // Le composant Finance affiche la marge de sécurité
    await expect(page.getByText(/Marge de Sécurité/i)).toBeVisible();
  });

  test("groupe 'Explorer' ouvre les sous-onglets Carte / Itinéraire / Transports", async ({ page }) => {
    await page.getByRole('button', { name: 'Explorer' }).click();
    await expect(page.getByRole('button', { name: /Itinéraire/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Carte/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Trajets/i })).toBeVisible();
  });

  test("groupe 'Outils' ouvre Coach IA dans les sous-onglets", async ({ page }) => {
    await page.getByRole('button', { name: 'Outils' }).click();
    await expect(page.getByRole('button', { name: 'Coach IA' })).toBeVisible();
  });

  test("bouton 'Urgences' directement accessible", async ({ page }) => {
    await page.getByRole('button', { name: /Urgences/i }).click();
    // Le composant Urgences doit s'afficher
    await expect(page.locator('main')).toContainText(/urgence|secours|ambassade/i);
  });

  test("onglet 'Mode Voyage' navigue vers le composant ModeVoyage", async ({ page }) => {
    await page.getByRole('button', { name: 'Mode Voyage' }).click();
    await expect(page.locator('main')).toBeVisible();
  });

  // ── Finance ─────────────────────────────────────────────────────────────────

  test('Finance : les deux poches sont affichées', async ({ page }) => {
    await expect(page.getByText(/Poche 1/i)).toBeVisible();
    await expect(page.getByText(/Poche 2/i)).toBeVisible();
  });

  // ── Coach IA ────────────────────────────────────────────────────────────────

  test('Coach IA : interface de chat chargée', async ({ page }) => {
    await page.getByRole('button', { name: 'Outils' }).click();
    await page.getByRole('button', { name: 'Coach IA' }).click();

    await expect(page.locator('h3').filter({ hasText: 'Coach IA' })).toBeVisible();
    await expect(page.getByPlaceholder(/Pose ta question/i)).toBeVisible();
  });

  test('Coach IA : les 5 boutons de prompts rapides sont visibles', async ({ page }) => {
    await page.getByRole('button', { name: 'Outils' }).click();
    await page.getByRole('button', { name: 'Coach IA' }).click();

    await expect(page.getByText('Adresses protéines')).toBeVisible();
    await expect(page.getByText('Phrases de survie')).toBeVisible();
    await expect(page.getByText('Salle de sport')).toBeVisible();
    await expect(page.getByText('Plan pluie')).toBeVisible();
    await expect(page.getByText('Bons plans budget')).toBeVisible();
  });

  test('Coach IA : message user ajouté + erreur clé API affichée (pas de clé en CI)', async ({ page }) => {
    await page.getByRole('button', { name: 'Outils' }).click();
    await page.getByRole('button', { name: 'Coach IA' }).click();

    const input = page.getByPlaceholder(/Pose ta question/i);
    await input.fill('Test de régression automatique');
    await input.press('Enter');

    // Le message utilisateur doit apparaître dans le fil
    await expect(page.getByText('Test de régression automatique')).toBeVisible();

    // Sans clé API, un message d'erreur explicite doit s'afficher
    await expect(page.getByText(/clé API absente|indisponible/i)).toBeVisible({ timeout: 5000 });
  });

  // ── Convertisseur ───────────────────────────────────────────────────────────

  test('Convertisseur : champ de saisie visible', async ({ page }) => {
    await page.getByRole('button', { name: 'Outils' }).click();
    await page.getByRole('button', { name: 'Convertisseur', exact: true }).click();
    // Le composant Converter doit afficher au moins un input numérique
    await expect(page.locator('main input[type="number"]').first()).toBeVisible();
  });

  // ── Lexique ─────────────────────────────────────────────────────────────────

  test('Lexique : mots japonais affichés', async ({ page }) => {
    await page.getByRole('button', { name: 'Outils' }).click();
    await page.getByRole('button', { name: /Lexique/i }).click();
    // Le lexique contient du japonais (hiragana ou katakana)
    await expect(page.locator('main')).toContainText(/arigatou|すみません|konnichiwa/i);
  });

  // ── Checklist ───────────────────────────────────────────────────────────────

  test('Checklist : des items cochables sont affichés', async ({ page }) => {
    await page.getByRole('button', { name: 'Avant de partir' }).click();
    await page.getByRole('button', { name: /Logistique/i }).click();
    // Le titre et des items cliquables (div cursor-pointer) doivent être présents
    await expect(page.getByText('Checklist Matérielle')).toBeVisible();
    await expect(page.locator('main [class*="cursor-pointer"]').first()).toBeVisible();
  });
});

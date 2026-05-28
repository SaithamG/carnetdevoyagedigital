import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Utensils, ShoppingBag, Train, Sparkles } from 'lucide-react';
import { EXCHANGE_RATE } from '../data/constants';

const CATEGORIES = [
  { id: 'nourriture', label: 'Nourriture', icon: <Utensils size={18} />, color: 'rose', budgetEur: 770 },
  { id: 'shopping', label: 'Shopping', icon: <ShoppingBag size={18} />, color: 'blue', budgetEur: 330 },
  { id: 'transport', label: 'Transport local', icon: <Train size={18} />, color: 'indigo', budgetEur: 50 },
  { id: 'divers', label: 'Divers', icon: <Sparkles size={18} />, color: 'amber', budgetEur: 146 },
];

const TOTAL_BUDGET_EUR = CATEGORIES.reduce((acc, cat) => acc + cat.budgetEur, 0);
const TOTAL_BUDGET_YEN = TOTAL_BUDGET_EUR * EXCHANGE_RATE;

const SuiviDepenses = () => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('japan_expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [expCategory, setExpCategory] = useState('nourriture');
  const [expAmount, setExpAmount] = useState('');
  const [expDesc, setExpDesc] = useState('');

  useEffect(() => {
    localStorage.setItem('japan_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const totalSpentYen = expenses.reduce((acc, curr) => acc + curr.amountYen, 0);
  const totalSpentEur = (totalSpentYen / EXCHANGE_RATE).toFixed(2);
  const globalProgress = Math.min((totalSpentYen / TOTAL_BUDGET_YEN) * 100, 100);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expAmount || isNaN(expAmount) || parseFloat(expAmount) <= 0) return;
    setExpenses([
      {
        id: Date.now(),
        category: expCategory,
        amountYen: parseFloat(expAmount),
        desc: expDesc || 'Dépense',
        date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      },
      ...expenses,
    ]);
    setExpAmount('');
    setExpDesc('');
  };

  const deleteExpense = (id) => setExpenses(expenses.filter((exp) => exp.id !== id));
  const clearAll = () => { if (window.confirm('Tout supprimer ?')) setExpenses([]); };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">TOTAL DÉPENSÉ</h3>
            <p className="text-4xl font-black text-white">{totalSpentYen.toLocaleString('fr-FR')} ¥</p>
            <p className="text-xs text-slate-500 mt-1">≈ {totalSpentEur} €</p>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{globalProgress.toFixed(1)}% utilisé</span>
              <span>
                {(TOTAL_BUDGET_YEN - totalSpentYen).toLocaleString('fr-FR')}¥ restants (≈{' '}
                {((TOTAL_BUDGET_YEN - totalSpentYen) / EXCHANGE_RATE).toFixed(0)}€)
              </span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${globalProgress}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
          <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4">BUDGET CASH TOTAL</h3>
          <p className="text-3xl font-black text-slate-300">{TOTAL_BUDGET_YEN.toLocaleString('fr-FR')} ¥</p>
          <p className="text-xs text-slate-500 mt-1">≈ {TOTAL_BUDGET_EUR} €</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {CATEGORIES.map((cat) => {
              const spentCatYen = expenses
                .filter((e) => e.category === cat.id)
                .reduce((a, b) => a + b.amountYen, 0);
              return (
                <div key={cat.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-500 text-[10px] uppercase font-bold flex items-center justify-center gap-1">
                    {cat.icon} {cat.label}
                  </span>
                  <p className="text-xs font-black text-white mt-1">
                    {(cat.budgetEur * EXCHANGE_RATE - spentCatYen).toLocaleString('fr-FR')} ¥ restant
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
        <h3 className="font-black italic text-white text-lg mb-4 flex items-center gap-2">
          <Plus size={18} className="text-blue-500" /> AJOUTER UNE DÉPENSE RÉELLE (SUR PLACE)
        </h3>
        <form onSubmit={handleAddExpense} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setExpCategory(cat.id)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  expCategory === cat.id
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {cat.icon}
                <span className="text-[10px] font-bold uppercase">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[500, 1000, 2000, 5000].map((yen) => (
              <button
                key={yen}
                type="button"
                onClick={() => setExpAmount(yen.toString())}
                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 py-2 rounded-xl text-xs font-bold text-slate-300 transition-colors"
              >
                {yen.toLocaleString('fr-FR')} ¥
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="number"
              value={expAmount}
              onChange={(e) => setExpAmount(e.target.value)}
              placeholder="Montant en Yens (¥)"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              value={expDesc}
              onChange={(e) => setExpDesc(e.target.value)}
              placeholder="Description (ex: Gashapon, Ramen...)"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold text-xs text-white uppercase tracking-wider"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>

      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black italic text-white text-lg">DÉPENSES ENREGISTRÉES ({expenses.length})</h3>
          {expenses.length > 0 && (
            <button onClick={clearAll} className="text-xs text-red-400 font-bold hover:underline flex items-center gap-1">
              <Trash2 size={12} /> Tout effacer
            </button>
          )}
        </div>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {expenses.map((exp) => {
            const cat = CATEGORIES.find((c) => c.id === exp.category);
            return (
              <div key={exp.id} className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-blue-400">
                    {cat?.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-100">{exp.desc}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{exp.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-white">{exp.amountYen.toLocaleString('fr-FR')} ¥</span>
                  <span className="text-[10px] text-slate-500">≈ {(exp.amountYen / EXCHANGE_RATE).toFixed(2)}€</span>
                  <button onClick={() => deleteExpense(exp.id)} className="text-slate-500 hover:text-red-400 p-1">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
          {expenses.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-6">Aucune dépense sur place pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuiviDepenses;

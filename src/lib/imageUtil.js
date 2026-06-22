/* Réduit un fichier image (logo, photo de remplacement) en data URL JPEG/PNG
   compacte, pour rester raisonnable en stockage. */
export const fileToScaledDataUrl = (file, maxDim = 1000, quality = 0.82) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Image illisible'));
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        // PNG si transparence probable (logo), sinon JPEG (photo).
        const isPng = /png|svg/i.test(file.type);
        resolve(canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

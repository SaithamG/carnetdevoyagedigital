import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Replie les longs textes du carnet.
//
// Pourquoi un seuil et pas un repli systématique : mettre « voir le détail »
// sous une phrase de deux lignes n'allège rien, ça ajoute un clic pour rien.
// En dessous du seuil on affiche le texte tel quel.
const SEUIL = 170;

const Depliable = ({ texte, className = '', libelle = 'Voir le détail', boutonClassName = '' }) => {
  const [ouvert, setOuvert] = useState(false);

  if (!texte || texte.length <= SEUIL) {
    return <p className={className}>{texte}</p>;
  }

  // On coupe sur le dernier espace pour ne pas trancher un mot en deux.
  const extrait = texte.slice(0, SEUIL).replace(/\s+\S*$/, '');

  return (
    <div>
      <p className={className}>{ouvert ? texte : `${extrait}…`}</p>
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        className={`mt-1.5 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors ${boutonClassName}`}
      >
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${ouvert ? 'rotate-180' : ''}`}
        />
        {ouvert ? 'Replier' : libelle}
      </button>
    </div>
  );
};

export default Depliable;

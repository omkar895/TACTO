
import React from 'react';
import { Player } from '../types';
import XIcon from './icons/XIcon';
import OIcon from './icons/OIcon';

interface TileProps {
  value: Player | null;
  onClick: () => void;
  isWinner: boolean;
}

const Tile: React.FC<TileProps> = ({ value, onClick, isWinner }) => {
  const Symbol = value === 'X' ? XIcon : OIcon;

  return (
    <button
      onClick={onClick}
      disabled={!!value}
      className={`
        w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 
        flex items-center justify-center 
        rounded-lg sm:rounded-xl 
        bg-slate-800/80
        shadow-lg 
        transform transition-transform duration-200 ease-in-out
        active:scale-90
        ${isWinner ? 'tile-winner bg-slate-700' : 'hover:bg-slate-700/80'}
        ${value ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {value && (
        <div className="transform transition-all duration-300 scale-0 animate-scale-in">
          <Symbol className={`w-12 h-12 sm:w-16 sm:h-16 ${value === 'X' ? 'text-cyan-400' : 'text-amber-400'}`} />
        </div>
      )}
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </button>
  );
};

export default Tile;


import React from 'react';
import { GameStatus, Player, WinnerInfo } from '../types';
import XIcon from './icons/XIcon';
import OIcon from './icons/OIcon';

interface StatusDisplayProps {
  status: GameStatus;
  winner: WinnerInfo;
  currentPlayer: Player;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, winner, currentPlayer }) => {
  const getStatusMessage = () => {
    switch (status) {
      case GameStatus.WON:
        return (
          <div className="flex items-center space-x-2">
            {winner?.player === 'X' 
              ? <XIcon className="w-6 h-6 text-cyan-400" /> 
              : <OIcon className="w-6 h-6 text-amber-400" />}
            <span>Wins!</span>
          </div>
        );
      case GameStatus.DRAW:
        return <span>It's a Draw!</span>;
      case GameStatus.PLAYING:
      default:
        return (
          <div className="flex items-center space-x-2">
            {currentPlayer === 'X' 
              ? <XIcon className="w-6 h-6 text-cyan-400" /> 
              : <OIcon className="w-6 h-6 text-amber-400" />}
            <span>'s Turn</span>
          </div>
        );
    }
  };

  return (
    <div className="mb-4 h-12 flex items-center justify-center min-w-[200px] text-xl font-semibold text-gray-300 bg-gray-900/30 rounded-lg px-6 shadow-md transition-all duration-300">
      <div key={status + (winner?.player || '') + currentPlayer} className="animate-fade-in">
        {getStatusMessage()}
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StatusDisplay;

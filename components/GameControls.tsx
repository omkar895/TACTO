
import React from 'react';
import { GameMode, Difficulty } from '../types';

interface GameControlsProps {
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onReset: () => void;
  difficulty: Difficulty;
  onDifficultyChange: (level: Difficulty) => void;
}

const GameControls: React.FC<GameControlsProps> = ({ gameMode, onModeChange, onReset, difficulty, onDifficultyChange }) => {
  return (
    <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-xs">
      {/* Mode Selection Toggle */}
      <div className="flex w-full bg-slate-800/60 rounded-full p-1 shadow-inner">
        <button
          onClick={() => onModeChange(GameMode.PVP)}
          className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            gameMode === GameMode.PVP ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          Player vs Player
        </button>
        <button
          onClick={() => onModeChange(GameMode.PVC)}
          className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            gameMode === GameMode.PVC ? 'bg-cyan-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          Player vs AI
        </button>
      </div>

      {/* Difficulty Selection (only for PVC mode) */}
      {gameMode === GameMode.PVC && (
        <div className="flex w-full bg-slate-800/60 rounded-full p-1 shadow-inner animate-fade-in-down">
          <button
            onClick={() => onDifficultyChange(Difficulty.EASY)}
            className={`w-1/3 py-2 text-xs font-semibold rounded-full transition-colors duration-300 ${
                difficulty === Difficulty.EASY ? 'bg-teal-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => onDifficultyChange(Difficulty.MEDIUM)}
            className={`w-1/3 py-2 text-xs font-semibold rounded-full transition-colors duration-300 ${
                difficulty === Difficulty.MEDIUM ? 'bg-teal-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => onDifficultyChange(Difficulty.HARD)}
            className={`w-1/3 py-2 text-xs font-semibold rounded-full transition-colors duration-300 ${
                difficulty === Difficulty.HARD ? 'bg-teal-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Hard
          </button>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full mt-2 py-3 text-lg font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg shadow-lg hover:from-teal-600 hover:to-cyan-700 transform transition-all duration-200 hover:scale-105 active:scale-100"
      >
        New Game
      </button>

      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GameControls;

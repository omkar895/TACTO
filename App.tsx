
import React from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import StatusDisplay from './components/StatusDisplay';
import { useGameLogic } from './hooks/useGameLogic';

const App: React.FC = () => {
  const {
    board,
    gameStatus,
    currentPlayer,
    winner,
    gameMode,
    difficulty,
    handleTileClick,
    resetGame,
    changeGameMode,
    changeDifficulty,
  } = useGameLogic();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 text-xs text-gray-500">
        made by omkar
      </div>
      
      <header className="text-center mb-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
          TACTO
        </h1>
      </header>
      
      <main className="flex flex-col items-center w-full">
        <StatusDisplay 
          status={gameStatus} 
          winner={winner} 
          currentPlayer={currentPlayer} 
        />
        
        <GameBoard 
          board={board} 
          onTileClick={handleTileClick} 
          winnerInfo={winner} 
        />
        
        <GameControls 
          gameMode={gameMode} 
          onModeChange={changeGameMode} 
          onReset={resetGame}
          difficulty={difficulty}
          onDifficultyChange={changeDifficulty}
        />
      </main>

      <footer className="absolute bottom-4 text-xs text-gray-500">
        Designed & Built for the Modern Web
      </footer>
    </div>
  );
};

export default App;

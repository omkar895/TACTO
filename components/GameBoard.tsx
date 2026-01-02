
import React from 'react';
import { BoardState, WinnerInfo } from '../types';
import Tile from './Tile';

interface GameBoardProps {
  board: BoardState;
  onTileClick: (index: number) => void;
  winnerInfo: WinnerInfo;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onTileClick, winnerInfo }) => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4 bg-gray-900/20 rounded-2xl shadow-2xl backdrop-blur-sm">
      {board.map((value, index) => {
        const isWinnerTile = winnerInfo?.line.includes(index) ?? false;
        return (
          <Tile
            key={index}
            value={value}
            onClick={() => onTileClick(index)}
            isWinner={isWinnerTile}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;

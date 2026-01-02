
import { useState, useCallback, useEffect, useMemo } from 'react';
import { BoardState, Player, GameMode, GameStatus, WinnerInfo, Difficulty } from '../types';
import { useSound } from './useSound';
import { clickSound, winSound, drawSound } from '../sounds';

const INITIAL_BOARD: BoardState = Array(9).fill(null);
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],             // diagonals
];

// Helper function to calculate winner, moved outside the hook for reuse in AI logic
const calculateWinner = (currentBoard: BoardState): WinnerInfo => {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
      return { player: currentBoard[a] as Player, line };
    }
  }
  return null;
};

// Minimax algorithm for unbeatable AI
const minimax = (board: BoardState, depth: number, isMax: boolean): number => {
    const winner = calculateWinner(board);
    if (winner) {
        return winner.player === 'O' ? 10 - depth : depth - 10;
    }
    if (board.every(tile => tile !== null)) {
        return 0;
    }

    if (isMax) { // Maximizing player (AI 'O')
        let best = -1000;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                const newBoard = [...board];
                newBoard[i] = 'O';
                best = Math.max(best, minimax(newBoard, depth + 1, !isMax));
            }
        }
        return best;
    } else { // Minimizing player (Human 'X')
        let best = 1000;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                const newBoard = [...board];
                newBoard[i] = 'X';
                best = Math.min(best, minimax(newBoard, depth + 1, !isMax));
            }
        }
        return best;
    }
};

const findBestMove = (board: BoardState): number => {
    let bestVal = -1000;
    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            const newBoard = [...board];
            newBoard[i] = 'O';
            const moveVal = minimax(newBoard, 0, false);
            if (moveVal > bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    return bestMove;
};

export const useGameLogic = () => {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<WinnerInfo>(null);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.PVP);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const { playClick, playWin, playDraw } = useSound(clickSound, winSound, drawSound);

  const gameStatus = useMemo<GameStatus>(() => {
    if (winner) return GameStatus.WON;
    if (board.every(tile => tile !== null)) return GameStatus.DRAW;
    return GameStatus.PLAYING;
  }, [winner, board]);

  useEffect(() => {
    if (gameStatus === GameStatus.WON) {
        playWin();
    } else if (gameStatus === GameStatus.DRAW) {
        playDraw();
    }
  }, [gameStatus, playWin, playDraw]);

  const resetGame = useCallback(() => {
    setBoard(INITIAL_BOARD);
    setCurrentPlayer('X');
    setWinner(null);
  }, []);

  const changeGameMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    resetGame();
  }, [resetGame]);

  const changeDifficulty = useCallback((level: Difficulty) => {
    setDifficulty(level);
    resetGame();
  }, [resetGame]);

  const handleTileClick = useCallback((index: number) => {
    if (board[index] || winner || gameStatus !== GameStatus.PLAYING) {
      return;
    }
    
    playClick();

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'));
    }
  }, [board, currentPlayer, winner, gameStatus, playClick]);
  
  const computerMove = useCallback(() => {
    const availableIndices = board
      .map((value, index) => (value === null ? index : null))
      .filter(val => val !== null) as number[];

    if (availableIndices.length === 0) return;

    let moveIndex: number;

    switch (difficulty) {
        case Difficulty.EASY:
            moveIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            break;
        case Difficulty.MEDIUM: {
            let bestMove = -1;
            // 1. Check if AI can win
            for (const i of availableIndices) {
                const tempBoard = [...board];
                tempBoard[i] = 'O';
                if (calculateWinner(tempBoard)?.player === 'O') {
                    bestMove = i;
                    break;
                }
            }
            // 2. If no winning move, check if player can win and block
            if (bestMove === -1) {
                for (const i of availableIndices) {
                    const tempBoard = [...board];
                    tempBoard[i] = 'X';
                    if (calculateWinner(tempBoard)?.player === 'X') {
                        bestMove = i;
                        break;
                    }
                }
            }
            // 3. If still no move, take center if available
            if (bestMove === -1 && availableIndices.includes(4)) {
                bestMove = 4;
            }
            // 4. Fallback to random
            if (bestMove === -1) {
                bestMove = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            }
            moveIndex = bestMove;
            break;
        }
        case Difficulty.HARD:
            moveIndex = findBestMove(board);
            break;
        default:
            moveIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    }
    
    setTimeout(() => handleTileClick(moveIndex), 500); // AI "thinks" for a moment
  }, [board, handleTileClick, difficulty]);

  useEffect(() => {
    if (gameMode === GameMode.PVC && currentPlayer === 'O' && gameStatus === GameStatus.PLAYING) {
      computerMove();
    }
  }, [currentPlayer, gameMode, gameStatus, board, computerMove]);

  return {
    board,
    currentPlayer,
    winner,
    gameStatus,
    gameMode,
    difficulty,
    handleTileClick,
    resetGame,
    changeGameMode,
    changeDifficulty,
  };
};

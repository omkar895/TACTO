
// Represents the players in the game
export type Player = 'X' | 'O';

// Represents the state of the 3x3 game board
export type BoardState = (Player | null)[];

// Defines the available game modes
export enum GameMode {
  PVP = 'pvp', // Player vs Player
  PVC = 'pvc', // Player vs Computer
}

// Defines the current status of the game
export enum GameStatus {
  PLAYING = 'playing',
  WON = 'won',
  DRAW = 'draw',
}

// Represents the winner information, including the winning player and line
export type WinnerInfo = {
  player: Player;
  line: number[];
} | null;

// Defines AI difficulty levels
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

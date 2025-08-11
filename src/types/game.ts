/**
 * Game-related type definitions for the Chameleon game
 */

/** Game data structure loaded from JSON */
export interface GameData {
  topic: string;
  secrets: string[];
}

/** Player card assignment mapping */
export interface PlayerCards {
  [playerName: string]: number;
}

/** Game configuration constants */
export interface GameConfig {
  MIN_PLAYERS: number;
  MAX_PLAYERS: number;
  NUMBER_OF_CHAMELEONS: number;
}

/** Game state phases */
export enum GamePhase {
  WELCOME = 'welcome',
  PLAYER_SELECTION = 'player-selection',
  PLAYER_NAMES = 'player-names',
  GAME_RULES = 'game-rules',
  TURN_ORDER = 'turn-order',
  GAMEPLAY = 'gameplay'
}

/** Player role types */
export type PlayerRole = 'chameleon' | 'detective';

/** Game state interface */
export interface GameState {
  // Basic game flow
  currentPhase: GamePhase;
  
  // Player management
  playerCount: number | null;
  playerNames: string[];
  namesEntered: boolean;
  
  // Round management
  roundStarted: boolean;
  gameInProgress: boolean;
  startingPlayerIndex: number | null;
  turnOrder: string[];
  
  // Game data
  gameData: GameData | null;
  currentTopic: string;
  secretWord: string;
  
  // Chameleon management
  chameleonIndices: number[];
  chameleonNames: string[];
  
  // UI state
  rolesRevealed: boolean;
  playersWithCards: PlayerCards;
  allCardsRevealed: boolean;
  color: string;
}

/**
 * Game configuration constants
 */

/** Minimum number of players required to play */
export const MIN_PLAYERS = 2;

/** Maximum number of players allowed */
export const MAX_PLAYERS = 5;

/** Number of chameleons in the game */
export const NUMBER_OF_CHAMELEONS = 1;

/** Available color themes for the game */
export const COLORS = [
  '#667eea', '#764ba2', '#f093fb', '#f5576c',
  '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
  '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
] as const;

/** Color theme options with display names */
export const COLOR_OPTIONS = [
  { value: '#667eea', label: 'Purple Blue' },
  { value: '#764ba2', label: 'Deep Purple' },
  { value: '#f093fb', label: 'Pink Purple' },
  { value: '#f5576c', label: 'Coral Red' },
  { value: '#4facfe', label: 'Sky Blue' },
  { value: '#00f2fe', label: 'Cyan Blue' },
  { value: '#43e97b', label: 'Mint Green' },
  { value: '#38f9d7', label: 'Turquoise' },
  { value: '#ffecd2', label: 'Peach' },
  { value: '#fcb69f', label: 'Orange Pink' },
  { value: '#a8edea', label: 'Light Mint' },
  { value: '#fed6e3', label: 'Light Pink' }
] as const;

/** Game data file path */
export const GAME_DATA_PATH = '/animals.json';
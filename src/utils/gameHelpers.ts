/**
 * Utility functions for game logic
 */

/**
 * Check if a player is a chameleon
 */
export const isChameleon = (playerName: string, chameleonNames: string[]): boolean => {
  return chameleonNames.includes(playerName);
};

/**
 * Check if a player index corresponds to a chameleon
 */
export const isChameleonByIndex = (playerIndex: number, chameleonIndices: number[]): boolean => {
  return chameleonIndices.includes(playerIndex);
};

/**
 * Generate a random index from an array
 */
export const getRandomIndex = (arrayLength: number): number => {
  return Math.floor(Math.random() * arrayLength);
};

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Create turn order starting from a specific player index
 */
export const createTurnOrder = (playerNames: string[], startingIndex: number): string[] => {
  return [
    ...playerNames.slice(startingIndex),
    ...playerNames.slice(0, startingIndex)
  ];
};

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

export const are_player_names_unique = (playerNames: string[]): boolean => {
  /*
  Returns true if all player names are unique, false otherwise.
  */
  const number_of_players = playerNames.length;
  const number_of_unique_names = new Set(playerNames.map(name => name.toLowerCase())).size;

  return number_of_players === number_of_unique_names;
};

export const similar_player_names = (playerNames: string[]): number[] => {
  /*
  Returns an array of indices of player names that are similar.
  */
  const similar_indices = new Set<number>();
  const lower_case_player_names = playerNames.map(name => name.toLowerCase().trim());

  for (let i = 0; i < lower_case_player_names.length; i++) {
    // Skip empty names
    if (lower_case_player_names[i] === '') continue;
    
    for (let j = i + 1; j < lower_case_player_names.length; j++) {
      if (lower_case_player_names[i] === lower_case_player_names[j]) {
        // Add both indices when we find a match
        similar_indices.add(i);
        similar_indices.add(j);
      }
    }
  }
  return Array.from(similar_indices);
}
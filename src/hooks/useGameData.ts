import { useState, useEffect } from 'react';
import { GameData, ThemeInfo } from '../types/game';
import { DEFAULT_THEME } from '../constants/game';

/**
 * Custom hook for loading and managing game data
 * @param theme - The theme to load data for
 * @returns Object containing game data and loading state
 */
export const useGameData = (theme: ThemeInfo = DEFAULT_THEME) => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load game data from JSON file
   */
  const loadGameData = async (): Promise<GameData | null> => {
    try {
      setIsLoading(true);
      const response = await fetch(theme.filePath);
      if (!response.ok) {
        throw new Error('Failed to load game data');
      }
      const data: GameData = await response.json();
      setGameData(data);
      setError(null);
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error loading game data:', errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Load game data on mount and when theme changes
  useEffect(() => {
    loadGameData();
  }, [theme.filePath]);

  return {
    gameData,
    isLoading,
    error,
    reloadGameData: loadGameData
  };
};

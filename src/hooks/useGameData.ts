import { useState, useEffect } from 'react';
import { GameData } from '../types/game';
import { GAME_DATA_PATH } from '../constants/game';

/**
 * Custom hook for loading and managing game data
 * @returns Object containing game data and loading state
 */
export const useGameData = () => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load game data from JSON file
   */
  const loadGameData = async (): Promise<GameData | null> => {
    try {
      setIsLoading(true);
      const response = await fetch(GAME_DATA_PATH);
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

  // Load game data on mount
  useEffect(() => {
    loadGameData();
  }, []);

  return {
    gameData,
    isLoading,
    error,
    reloadGameData: loadGameData
  };
};

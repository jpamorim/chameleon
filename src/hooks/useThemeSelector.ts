import { useState } from 'react';
import { ThemeInfo } from '../types/game';
import { DEFAULT_THEME } from '../constants/game';

/**
 * Custom hook for managing game theme selection
 */
export const useThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeInfo>(DEFAULT_THEME);

  /**
   * Change the selected theme
   */
  const changeTheme = (theme: ThemeInfo) => {
    setSelectedTheme(theme);
  };

  /**
   * Reset to default theme
   */
  const resetTheme = () => {
    setSelectedTheme(DEFAULT_THEME);
  };

  return {
    selectedTheme,
    changeTheme,
    resetTheme
  };
};

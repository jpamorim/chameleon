import { useState } from 'react';
import { COLORS } from '../constants/game';

/**
 * Custom hook for managing theme colors
 */
export const useTheme = () => {
  const [color, setColor] = useState('#667eea');

  /**
   * Handle color change and update background gradient
   */
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    const nextColorIndex = (COLORS.indexOf(newColor as any) + 1) % COLORS.length;
    const nextColor = COLORS[nextColorIndex];
    document.body.style.background = `linear-gradient(135deg, ${newColor} 0%, ${nextColor} 100%)`;
  };

  return {
    color,
    handleColorChange
  };
};

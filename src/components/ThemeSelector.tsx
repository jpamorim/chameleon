import React from 'react';
import { AVAILABLE_THEMES } from '../constants/game';
import { ThemeInfo } from '../types/game';

interface ThemeSelectorProps {
  selectedTheme: ThemeInfo;
  onThemeChange: (theme: ThemeInfo) => void;
  className?: string;
}

/**
 * Component for selecting game themes
 */
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  onThemeChange,
  className = ''
}) => {
  return (
    <div className={`theme-selector ${className}`}>
      <h3>🎨 Choose Your Theme</h3>
      <p className="theme-description">
        Select a theme that matches your group's interests
      </p>
      
      <div className="theme-options">
        {AVAILABLE_THEMES.map((theme) => (
          <div
            key={theme.id}
            className={`theme-option ${selectedTheme.id === theme.id ? 'selected' : ''}`}
            onClick={() => onThemeChange(theme)}
          >
            <div className="theme-icon">{theme.icon}</div>
            <div className="theme-info">
              <h4 className="theme-name">{theme.name}</h4>
              <p className="theme-desc">{theme.description}</p>
            </div>
            <div className="theme-selector-indicator">
              {selectedTheme.id === theme.id ? '✓' : '○'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

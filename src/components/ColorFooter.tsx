import React from 'react';
import { COLOR_OPTIONS } from '../constants/game';

interface ColorFooterProps {
  id: string;
  color: string;
  onColorChange: (color: string) => void;
}

/**
 * Footer component with color theme selector
 */
export const ColorFooter: React.FC<ColorFooterProps> = ({ id, color, onColorChange }) => (
  <footer className="color-footer">
    <div className="color-palette">
      <label htmlFor={id} className="color-label">Theme</label>
      <div className="color-dropdown-container">
        <div 
          className="color-preview" 
          style={{ backgroundColor: color }}
        ></div>
        <select 
          id={id}
          className="color-dropdown"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
        >
          {COLOR_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  </footer>
);

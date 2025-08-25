import React from 'react';
import { ColorFooter } from './ColorFooter';

interface PlayerNamesInputProps {
  playerNames: string[];
  onUpdatePlayerName: (index: number, name: string) => void;
  onBack: () => void;
  onContinue: () => void;
  color: string;
  onColorChange: (color: string) => void;
}

/**
 * Component for entering player names
 */
export const PlayerNamesInput: React.FC<PlayerNamesInputProps> = ({
  playerNames,
  onUpdatePlayerName,
  onBack,
  onContinue,
  color,
  onColorChange
}) => {
  const allNamesValid = playerNames.every(name => name.trim().length > 0);

  return (
    <div className="app">
      <div className="container">
        <div className="chameleon-icon">
          🦎
        </div>
        <h1>The Chameleon</h1>
        <p>Enter player names</p>
        
        <div className="player-names-section">
          <h3>Who's playing?</h3>
          <p className="names-instruction">Enter a name for each player</p>
          
          <div className="name-inputs">
            {playerNames.map((name, index) => (
              <div key={index} className="name-input-group">
                <label htmlFor={`player-${index}`} className="name-label">
                  Player {index + 1}
                </label>
                <input
                  id={`player-${index}`}
                  type="text"
                  className="name-input"
                  value={name}
                  onChange={(e) => onUpdatePlayerName(index, e.target.value)}
                  placeholder={`Player ${index + 1}`}
                  maxLength={20}
                />
              </div>
            ))}
          </div>

          <div className="names-actions">
            <button 
              className="back-btn"
              onClick={onBack}
            >
              Back
            </button>
            <button 
              className="continue-btn"
              onClick={onContinue}
              disabled={!allNamesValid}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <ColorFooter id="color-names" color={color} onColorChange={onColorChange} />
    </div>
  );
};

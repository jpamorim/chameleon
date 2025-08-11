import React from 'react';
import { ColorFooter } from './ColorFooter';

interface WelcomeScreenProps {
  onStartGame: () => void;
  color: string;
  onColorChange: (color: string) => void;
}

/**
 * Welcome screen component with game introduction
 */
export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartGame,
  color,
  onColorChange
}) => {
  return (
    <div className="app">
      <div className="container">
        <div className="chameleon-icon">
          🦎
        </div>
        <h1>The Chameleon</h1>
        <p>A game of bluffing, deduction, and clever clues</p>
        
        <div className="start-game-section">
          <button className="start-game-btn" onClick={onStartGame}>
            Start Game
          </button>
        </div>
    
        <div className="game-info">
          <div className="feature">
            <div className="feature-icon">🕵️</div>
            <h4>Blend In</h4>
            <p>Give clues that fit the topic without being too obvious</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h4>Deduce</h4>
            <p>Figure out who doesn't know the secret word</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🦎</div>
            <h4>Adapt</h4>
            <p>Change your strategy like a chameleon changes colors</p>
          </div>
        </div>
      </div>
      <ColorFooter id="color-select-welcome" color={color} onColorChange={onColorChange} />
    </div>
  );
};

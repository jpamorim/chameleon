import React from 'react';
import { NUMBER_OF_CHAMELEONS } from '../constants/game';
import { ColorFooter } from './ColorFooter';
import { isChameleon } from '../utils/gameHelpers';

interface TurnOrderScreenProps {
  turnOrder: string[];
  chameleonNames: string[];
  currentTopic: string;
  secretWord: string;
  onBack: () => void;
  onStartGame: () => void;
  color: string;
  onColorChange: (color: string) => void;
}

/**
 * Screen showing turn order and card reveals
 */
export const TurnOrderScreen: React.FC<TurnOrderScreenProps> = ({
  turnOrder,
  chameleonNames,
  currentTopic,
  secretWord,
  onBack,
  onStartGame,
  color,
  onColorChange
}) => (
  <div className="app">
    <div className="container">
      <div className="chameleon-icon">🦎</div>
      <h1>Round Setup</h1>
      <p>Turn order has been determined</p>
      
      <div className="turn-order-section">
        <div className="turn-order">
          <h3>🤫 Private Role Check</h3>
          <p className="turn-instruction">Pass the device around so each player can check their role secretly.</p>
          <div className="turn-list">
            {turnOrder.map((name, index) => (
              <div key={index} className="turn-item-with-card">
                <div className="player-info">
                  <span className="turn-number">{index + 1}</span>
                  <span className="turn-player-name">{name}</span>
                  {index === 0 && <span className="first-badge">First</span>}
                </div>
                <div className="card-reveal-section">
                  <details className="card-details">
                    <summary className="card-summary">
                      👁️ {name}, check your role
                    </summary>
                    <div className="revealed-card">
                      {isChameleon(name, chameleonNames) ? (
                        <div className="chameleon-reveal">
                          <h4 className="chameleon-title">🦎 You are the CHAMELEON!</h4>
                          <p className="chameleon-instruction">
                            You don't know the secret word. Listen to others' clues and try to blend in!
                          </p>
                          <div className="topic-info">
                            <span className="topic-label">Topic:</span>
                            <span className="topic-name">{currentTopic}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="secret-reveal">
                          <h4 className="secret-title">🤫 Your Secret Word:</h4>
                          <div className="secret-word">{secretWord}</div>
                          <p className="secret-instruction">
                            Give a clue that shows you know the word, but don't make it too obvious!
                          </p>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="round-actions">
          <button className="back-to-rules-btn" onClick={onBack}>
            Back to Rules
          </button>
          <button className="start-gameplay-btn" onClick={onStartGame}>
            Everyone Ready - Start Game!
          </button>
        </div>
      </div>
    </div>
    <ColorFooter id="color-turn-order" color={color} onColorChange={onColorChange} />
  </div>
);



interface GameplayScreenProps {
  currentTopic: string;
  secretWord: string;
  turnOrder: string[];
  onNewRound: () => void;
  color: string;
  onColorChange: (color: string) => void;
}

/**
 * Main gameplay screen
 */
export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  currentTopic,
  secretWord,
  turnOrder,
  onNewRound,
  color,
  onColorChange
}) => (
  <div className="app">
    <div className="container">
      <div className="chameleon-icon">🦎</div>
      <h1>Round in Progress</h1>
      <p>Give your clues and find the Chameleon!</p>
      
      <div className="game-screen">
        <div className="topic-display">
          <h2 className="topic-title">Topic</h2>
          <div className="topic-card">{currentTopic}</div>
        </div>

        <div className="game-status">
          <div className="chameleon-info">
            <h3>🦎 {NUMBER_OF_CHAMELEONS === 1 ? 'The Chameleon is' : 'The Chameleons are'} among you!</h3>
            <p>{NUMBER_OF_CHAMELEONS === 1 ? 'One player knows' : `${NUMBER_OF_CHAMELEONS} players know`} the topic but not the secret word.</p>
            <p>Detectives: Give clues about <strong>{secretWord}</strong> without being too obvious!</p>
          </div>
        </div>

        <div className="turn-indicator">
          <h4>Current Turn Order</h4>
          <div className="current-turn-list">
            {turnOrder.map((name, index) => (
              <div key={index} className="current-turn-item">
                <span className="turn-num">{index + 1}</span>
                <span className="turn-name">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="game-actions">
          <button className="new-round-btn" onClick={onNewRound}>
            New Round
          </button>
        </div>
      </div>
    </div>
    <ColorFooter id="color-game" color={color} onColorChange={onColorChange} />
  </div>
);

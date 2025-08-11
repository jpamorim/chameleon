import React from 'react';
import { NUMBER_OF_CHAMELEONS } from '../constants/game';
import { ColorFooter } from './ColorFooter';

interface GameRulesProps {
  playerCount: number;
  playerNames: string[];
  onStartRound: () => void;
  color: string;
  onColorChange: (color: string) => void;
}

/**
 * Component displaying game rules and player list
 */
export const GameRules: React.FC<GameRulesProps> = ({
  playerCount,
  playerNames,
  onStartRound,
  color,
  onColorChange
}) => {
  return (
    <div className="app">
      <div className="container">
        <div className="chameleon-icon">
          🦎
        </div>
        <h1>How to Play</h1>
        <p>Learn the rules before you start</p>
        
        <div className="game-explanation">
          <div className="players-ready">
            <h3>Players Ready ({playerCount})</h3>
            <div className="player-list">
              {playerNames.map((name, index) => (
                <span key={index} className="player-chip">
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="rules-section">
            <div className="rule-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>The Secret Word</h4>
                <p>
                  A topic and secret word will be chosen. Everyone except{' '}
                  {NUMBER_OF_CHAMELEONS === 1 ? 'the Chameleon' : 'the Chameleons'} will see it.
                </p>
              </div>
            </div>

            <div className="rule-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>
                  {NUMBER_OF_CHAMELEONS === 1 
                    ? 'One Player is the Chameleon' 
                    : `${NUMBER_OF_CHAMELEONS} Players are Chameleons`
                  }
                </h4>
                <p>
                  {NUMBER_OF_CHAMELEONS === 1 ? 'The Chameleon knows' : 'The Chameleons know'}{' '}
                  the topic but NOT the secret word. They must blend in!
                </p>
              </div>
            </div>

            <div className="rule-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Give Clues</h4>
                <p>
                  Each player gives ONE clue. If you know the word, be subtle. If you're{' '}
                  {NUMBER_OF_CHAMELEONS === 1 ? 'the Chameleon' : 'a Chameleon'}, try to fit in!
                </p>
              </div>
            </div>

            <div className="rule-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Vote & Reveal</h4>
                <p>
                  Discuss and vote for who you think{' '}
                  {NUMBER_OF_CHAMELEONS === 1 ? 'is the Chameleon' : 'are the Chameleons'}.{' '}
                  If caught, they can still win by guessing the word!
                </p>
              </div>
            </div>
          </div>

          <div className="ready-section">
            <button 
              className="start-round-btn"
              onClick={onStartRound}
            >
              Ready to Play!
            </button>
          </div>
        </div>
      </div>
      <ColorFooter id="color-explanation" color={color} onColorChange={onColorChange} />
    </div>
  );
};

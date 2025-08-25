import React, { useState } from 'react';
import { NUMBER_OF_CHAMELEONS } from '../constants/game';
import { ColorFooter } from './ColorFooter';
import { isChameleon } from '../utils/gameHelpers';
import { RoleCheckModal } from './RoleCheckModal';
import { ScoringSystem, PlayerScore, ScoringRulesModal } from './ScoringSystem';
import { GameRound } from './GameRound';

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
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [showScoringRules, setShowScoringRules] = useState(false);
  const [showRankings, setShowRankings] = useState(false);
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);

  const handleRoleCheck = (playerName: string) => {
    setSelectedPlayer(playerName);
  };

  const closeRoleCheck = () => {
    setSelectedPlayer(null);
  };

  const isChameleonPlayer = (playerName: string) => isChameleon(playerName, chameleonNames);

  // Initialize default scores for all players
  const initializeScores = () => {
    const scores: PlayerScore[] = turnOrder.map(name => ({
      name,
      points: 0,
      roundsPlayed: 0,
      chameleonsCaught: 0,
      wordsGuessed: 0,
      successfulBlends: 0
    }));
    setPlayerScores(scores);
  };

  // Initialize scores when component mounts
  React.useEffect(() => {
    initializeScores();
  }, [turnOrder]);

  if (showRankings) {
    return (
      <div className="app">
        <div className="container">
          <div className="chameleon-icon">🏆</div>
          <h1>Current Rankings</h1>
          
          <ScoringSystem 
            playerScores={playerScores}
            onShowRules={() => setShowScoringRules(true)}
          />
          
          <div className="ranking-actions">
            <button className="back-to-game-btn" onClick={() => setShowRankings(false)}>
              Back to Game
            </button>
          </div>
        </div>
        
        <ScoringRulesModal
          isOpen={showScoringRules}
          onClose={() => setShowScoringRules(false)}
        />
        
        <ColorFooter id="color-rankings" color={color} onColorChange={onColorChange} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <div className="chameleon-icon">🦎</div>
        <h1>Round Setup</h1>
        <p>Turn order has been determined</p>
        
        <div className="game-header-actions">
          <button 
            className="rankings-btn"
            onClick={() => setShowRankings(true)}
          >
            🏆 View Rankings
          </button>
        </div>
        
        <div className="turn-order-section">
          <div className="turn-order">
            <h3>🤫 Private Role Check</h3>
            <p className="turn-instruction">Click on each player's name to check their role secretly.</p>
            <div className="turn-list">
              {turnOrder.map((name, index) => (
                <div key={index} className="turn-item">
                  <div className="player-info">
                    <span className="turn-number">{index + 1}</span>
                    <span className="turn-player-name">{name}</span>
                    {index === 0 && <span className="first-badge">First</span>}
                  </div>
                  <button 
                    className="check-role-btn"
                    onClick={() => handleRoleCheck(name)}
                  >
                    👁️ Check Role
                  </button>
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

        {/* Role Check Modal */}
        <RoleCheckModal
          isOpen={!!selectedPlayer}
          onClose={closeRoleCheck}
          playerName={selectedPlayer || ''}
          isChameleonPlayer={isChameleonPlayer(selectedPlayer || '')}
          currentTopic={currentTopic}
          secretWord={secretWord}
        />

        {/* Scoring Rules Modal */}
        <ScoringRulesModal
          isOpen={showScoringRules}
          onClose={() => setShowScoringRules(false)}
        />
      </div>
      <ColorFooter id="color-turn-order" color={color} onColorChange={onColorChange} />
    </div>
  );
};



interface GameplayScreenProps {
  currentTopic: string;
  secretWord: string;
  turnOrder: string[];
  chameleonNames: string[];
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
  chameleonNames,
  onNewRound,
  color,
  onColorChange
}) => {
  const [showScores, setShowScores] = useState(false);
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);
  const [showScoringRules, setShowScoringRules] = useState(false);
  const [showRankings, setShowRankings] = useState(false);

  const handleRoundEnd = (scores: PlayerScore[]) => {
    setPlayerScores(scores);
    setShowScores(true);
  };

  const handleNewRound = () => {
    setShowScores(false);
    onNewRound();
  };

  if (showScores) {
    return (
      <div className="app">
        <div className="container">
          <div className="chameleon-icon">🏆</div>
          <h1>Round Results</h1>
          
          <ScoringSystem 
            playerScores={playerScores}
            onShowRules={() => setShowScoringRules(true)}
          />
          
          <div className="game-actions">
            <button className="new-round-btn" onClick={handleNewRound}>
              New Round
            </button>
            <button 
              className="rankings-btn"
              onClick={() => setShowRankings(true)}
            >
              🏆 View Rankings
            </button>
          </div>
        </div>
        
        <ScoringRulesModal
          isOpen={showScoringRules}
          onClose={() => setShowScoringRules(false)}
        />
        
        <ColorFooter id="color-scores" color={color} onColorChange={onColorChange} />
      </div>
    );
  }

  if (showRankings) {
    return (
      <div className="app">
        <div className="container">
          <div className="chameleon-icon">🏆</div>
          <h1>Current Rankings</h1>
          
          <ScoringSystem 
            playerScores={playerScores}
            onShowRules={() => setShowScoringRules(true)}
          />
          
          <div className="ranking-actions">
            <button className="back-to-game-btn" onClick={() => setShowRankings(false)}>
              Back to Game
            </button>
          </div>
        </div>
        
        <ScoringRulesModal
          isOpen={showScoringRules}
          onClose={() => setShowScoringRules(false)}
        />
        
        <ColorFooter id="color-rankings" color={color} onColorChange={onColorChange} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <div className="chameleon-icon">🦎</div>
        <h1>Round in Progress</h1>
        <p>Give your clues and find the Chameleon!</p>
        
        <div className="game-screen">
          <div className="game-header-actions">
            <button 
              className="rankings-btn"
              onClick={() => setShowRankings(true)}
            >
              🏆 View Rankings
            </button>
          </div>

          <div className="topic-display">
            <h2 className="topic-title">Topic</h2>
            <div className="topic-card">{currentTopic}</div>
          </div>

          <div className="game-status">
            <div className="chameleon-info">
              <h3>🦎 {NUMBER_OF_CHAMELEONS === 1 ? 'The Chameleon is' : 'The Chameleons are'} among you!</h3>
              <p>{NUMBER_OF_CHAMELEONS === 1 ? 'One player knows' : `${NUMBER_OF_CHAMELEONS} players know`} the topic but not the secret word.</p>
              <p>Find the Chameleon by observing their behavior and clues!</p>
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

          <GameRound
            currentTopic={currentTopic}
            secretWord={secretWord}
            turnOrder={turnOrder}
            chameleonNames={chameleonNames}
            onRoundEnd={handleRoundEnd}
            onNewRound={handleNewRound}
            color={color}
            onColorChange={onColorChange}
          />
        </div>
      </div>
      <ColorFooter id="color-game" color={color} onColorChange={onColorChange} />
    </div>
  );
};

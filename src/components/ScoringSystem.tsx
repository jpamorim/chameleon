import React from 'react';

export interface PlayerScore {
  name: string;
  points: number;
  roundsPlayed: number;
  chameleonsCaught: number;
  wordsGuessed: number;
  successfulBlends: number;
}

interface ScoringSystemProps {
  playerScores: PlayerScore[];
  onShowRules: () => void;
}

/**
 * Component for displaying player scores and rankings
 */
export const ScoringSystem: React.FC<ScoringSystemProps> = ({
  playerScores,
  onShowRules
}) => {
  const sortedScores = [...playerScores].sort((a, b) => b.points - a.points);

  return (
    <div className="scoring-system">
      <div className="scoring-header">
        <h2>🏆 Player Rankings</h2>
        <button className="rules-btn" onClick={onShowRules}>
          📖 Scoring Rules
        </button>
      </div>
      
      <div className="rankings-list">
        {sortedScores.map((player, index) => (
          <div key={player.name} className={`ranking-item rank-${index + 1}`}>
            <div className="rank-position">
              {index === 0 && '🥇'}
              {index === 1 && '🥈'}
              {index === 2 && '🥉'}
              {index > 2 && `#${index + 1}`}
            </div>
            <div className="player-info">
              <span className="player-name">{player.name}</span>
              <span className="player-points">{player.points} pts</span>
            </div>
            <div className="player-stats">
              <span className="stat">🎯 {player.chameleonsCaught}</span>
              <span className="stat">💡 {player.wordsGuessed}</span>
              <span className="stat">🦎 {player.successfulBlends}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Modal component for displaying scoring rules
 */
export const ScoringRulesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content scoring-rules-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📖 Scoring Rules</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-body">
          <div className="scoring-rules">
            <h3>🏆 Ranking System Explained</h3>
            <p className="ranking-explanation">
              Players are ranked by total points. Points accumulate across multiple rounds, 
              so consistent performance leads to higher rankings!
            </p>
            
            <h3>🎯 How Points Are Earned</h3>
            <ul>
              <li><strong>+10 points</strong> - Everyone gains points when the Chameleon is caught</li>
              <li><strong>+15 points</strong> - Chameleon gets bonus points for successfully blending in</li>
              <li><strong>+15 points</strong> - Chameleon gets bonus points for correctly guessing the secret word</li>
              <li><strong>0 points</strong> - Nobody gains points if the Chameleon escapes</li>
            </ul>
            
            <h3>🏆 How the Game Works</h3>
            <ul>
              <li><strong>Team Discussion:</strong> All players discuss and observe behavior to identify the Chameleon</li>
              <li><strong>Team Accusation:</strong> The team must agree on ONE person to accuse</li>
              <li><strong>Consequences:</strong> Wrong accusations eliminate the accused player from the round</li>
              <li><strong>Chameleon Goal:</strong> Blend in and eliminate enough players to win</li>
            </ul>
            
            <h3>🎮 Game Flow</h3>
            <ul>
              <li>1. Check your role privately</li>
              <li>2. Team discusses and observes behavior</li>
              <li>3. Team agrees on ONE person to accuse</li>
              <li>4. If wrong: accused player is eliminated, round continues</li>
              <li>5. If right: Chameleon can try to guess the word</li>
              <li>6. Game ends when Chameleon is caught or too many players eliminated</li>
            </ul>

            <h3>⚠️ Important Rules</h3>
            <ul>
              <li><strong>Team Decision:</strong> All players must agree on the accusation</li>
              <li><strong>Elimination:</strong> Wrong accusations remove players from the round</li>
              <li><strong>Chameleon Wins:</strong> If too many players are eliminated</li>
              <li><strong>Strategy:</strong> Balance between being aggressive and being careful</li>
            </ul>

            <h3>💡 Pro Tips</h3>
            <ul>
              <li><strong>Consistency:</strong> Play multiple rounds to build up your score</li>
              <li><strong>Teamwork:</strong> Work together to identify the Chameleon</li>
              <li><strong>Observation:</strong> Pay attention to behavioral clues</li>
              <li><strong>Risk Management:</strong> Be careful with accusations to avoid eliminating teammates</li>
            </ul>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-close-btn-secondary" onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

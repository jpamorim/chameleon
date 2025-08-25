import React, { useState } from 'react';
import { PlayerScore } from './ScoringSystem';

interface GameRoundProps {
  currentTopic: string;
  secretWord: string;
  turnOrder: string[];
  chameleonNames: string[];
  onRoundEnd: (scores: PlayerScore[]) => void;
  onNewRound: () => void;
  color: string;
  onColorChange: (color: string) => void;
}

/**
 * Component for managing the actual gameplay round
 */
export const GameRound: React.FC<GameRoundProps> = ({
  currentTopic,
  secretWord,
  turnOrder,
  chameleonNames,
  onRoundEnd,
  onNewRound,
  color,
  onColorChange
}) => {
  const [currentPhase, setCurrentPhase] = useState<'discussion' | 'team-accusation' | 'chameleon-guess' | 'round-end'>('discussion');
  const [eliminatedPlayers, setEliminatedPlayers] = useState<string[]>([]);
  const [teamAccusation, setTeamAccusation] = useState<string>('');
  const [chameleonGuess, setChameleonGuess] = useState<string>('');
  const [roundResults, setRoundResults] = useState<{
    chameleonCaught: boolean;
    chameleonPlayer: string;
    accusedPlayer: string;
    wordGuessed: boolean;
    chameleonGuess: string;
    eliminatedPlayers: string[];
  } | null>(null);

  const activePlayers = turnOrder.filter(player => !eliminatedPlayers.includes(player));

  const handleTeamAccusation = (accusedPlayer: string) => {
    setTeamAccusation(accusedPlayer);
    
    const chameleonPlayer = chameleonNames[0]; // Assuming one chameleon for now
    const chameleonCaught = accusedPlayer === chameleonPlayer;
    
    if (chameleonCaught) {
      // Chameleon caught - they can try to guess the word
      setRoundResults({
        chameleonCaught: true,
        chameleonPlayer,
        accusedPlayer,
        wordGuessed: false,
        chameleonGuess: '',
        eliminatedPlayers
      });
      setCurrentPhase('chameleon-guess');
    } else {
      // Wrong accusation - eliminate the accused player and continue
      const newEliminatedPlayers = [...eliminatedPlayers, accusedPlayer];
      setEliminatedPlayers(newEliminatedPlayers);
      
      // Check if enough players remain to continue
      if (newEliminatedPlayers.length >= turnOrder.length - 2) {
        // Game over - chameleon wins
        setRoundResults({
          chameleonCaught: false,
          chameleonPlayer,
          accusedPlayer,
          wordGuessed: false,
          chameleonGuess: '',
          eliminatedPlayers: newEliminatedPlayers
        });
        setCurrentPhase('round-end');
      } else {
        // Continue with remaining players
        setCurrentPhase('discussion');
      }
    }
  };

  const handleChameleonGuess = (guess: string) => {
    const wordGuessed = guess.toLowerCase().trim() === secretWord.toLowerCase().trim();
    setRoundResults(prev => prev ? { ...prev, wordGuessed, chameleonGuess: guess } : null);
    setCurrentPhase('round-end');
  };

  const calculateScores = (): PlayerScore[] => {
    if (!roundResults) return [];
    
    const scores: PlayerScore[] = turnOrder.map(name => ({
      name,
      points: 0,
      roundsPlayed: 1,
      chameleonsCaught: 0,
      wordsGuessed: 0,
      successfulBlends: 0
    }));

    // Simplified scoring system
    if (roundResults.chameleonCaught) {
      // Everyone gains points for catching the chameleon
      scores.forEach(score => {
        score.points += 10;
        score.chameleonsCaught = 1;
      });
      
      // Chameleon gets bonus points if they guess the word correctly
      const chameleonScore = scores.find(s => s.name === roundResults.chameleonPlayer);
      if (chameleonScore && roundResults.wordGuessed) {
        chameleonScore.points += 15; // Bonus for guessing word
        chameleonScore.wordsGuessed = 1;
      }
    } else {
      // Nobody gains points if chameleon escapes
      // But chameleon gets points for successful blend
      const chameleonScore = scores.find(s => s.name === roundResults.chameleonPlayer);
      if (chameleonScore) {
        chameleonScore.points += 15; // Bonus for successful blend
        chameleonScore.successfulBlends = 1;
      }
    }

    return scores;
  };

  const handleRoundEnd = () => {
    const finalScores = calculateScores();
    onRoundEnd(finalScores);
  };

  const renderDiscussionPhase = () => (
    <div className="discussion-phase">
      <h3>🗣️ Team Discussion</h3>
      <p>Topic: <strong>{currentTopic}</strong></p>
      <p>Discuss and observe behavior to identify the Chameleon!</p>
      
      <div className="active-players">
        <h4>Active Players ({activePlayers.length}/{turnOrder.length})</h4>
        <div className="players-list">
          {activePlayers.map((player, index) => (
            <div key={player} className="active-player">
              <span className="player-number">{index + 1}</span>
              <span className="player-name">{player}</span>
            </div>
          ))}
        </div>
      </div>

      {eliminatedPlayers.length > 0 && (
        <div className="eliminated-players">
          <h4>Eliminated Players</h4>
          <div className="eliminated-list">
            {eliminatedPlayers.map((player, index) => (
              <div key={player} className="eliminated-player">
                <span className="eliminated-icon">❌</span>
                <span className="player-name">{player}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="discussion-actions">
        <button 
          className="ready-to-accuse-btn"
          onClick={() => setCurrentPhase('team-accusation')}
          disabled={activePlayers.length < 2}
        >
          Ready to Accuse
        </button>
      </div>
    </div>
  );

  const renderTeamAccusationPhase = () => (
    <div className="team-accusation-phase">
      <h3>🔍 Team Accusation</h3>
      <p>As a team, you must agree on ONE person to accuse as the Chameleon.</p>
      <p>Choose carefully - wrong accusations eliminate players from the round!</p>
      
      <div className="accusation-options">
        <h4>Select the player to accuse:</h4>
        <div className="accusation-buttons">
          {activePlayers.map((player) => (
            <button
              key={player}
              className={`accusation-btn ${teamAccusation === player ? 'selected' : ''}`}
              onClick={() => setTeamAccusation(player)}
            >
              {player}
            </button>
          ))}
        </div>
      </div>

      {teamAccusation && (
        <div className="confirmation">
          <p>Team is accusing: <strong>{teamAccusation}</strong></p>
          <button 
            className="confirm-accusation-btn"
            onClick={() => handleTeamAccusation(teamAccusation)}
          >
            Confirm Accusation
          </button>
        </div>
      )}
    </div>
  );

  const renderChameleonGuessPhase = () => (
    <div className="chameleon-guess-phase">
      <h3>🦎 Chameleon's Turn!</h3>
      <p>The Chameleon was caught! Now try to guess the secret word.</p>
      <p>Topic: <strong>{currentTopic}</strong></p>
      
      <div className="guess-input-group">
        <label htmlFor="chameleon-guess" className="guess-label">
          What's the secret word?
        </label>
        <input
          id="chameleon-guess"
          type="text"
          className="guess-input"
          placeholder="Enter your guess..."
          maxLength={30}
          onChange={(e) => setChameleonGuess(e.target.value)}
        />
        <button 
          className="submit-guess-btn"
          onClick={() => handleChameleonGuess(chameleonGuess)}
          disabled={!chameleonGuess.trim()}
        >
          Submit Guess
        </button>
      </div>
    </div>
  );

  const renderRoundEnd = () => (
    <div className="round-end">
      <h3>🎉 Round Complete!</h3>
      
      {roundResults && (
        <div className="round-results">
          {roundResults.chameleonCaught ? (
            <div className="result chameleon-caught">
              <h4>🦎 Chameleon Caught!</h4>
              <p>The Chameleon ({roundResults.chameleonPlayer}) was caught by the team!</p>
              {roundResults.wordGuessed && (
                <p>🎯 But they correctly guessed the word: <strong>{roundResults.chameleonGuess}</strong></p>
              )}
              <p><strong>Everyone gains 10 points!</strong></p>
            </div>
          ) : (
            <div className="result chameleon-escaped">
              <h4>🦎 Chameleon Escaped!</h4>
              <p>The Chameleon successfully eliminated all players and won the round!</p>
              <p><strong>Nobody gains points this round.</strong></p>
            </div>
          )}
          
          {roundResults.eliminatedPlayers.length > 0 && (
            <div className="elimination-summary">
              <h4>Players Eliminated This Round:</h4>
              <div className="eliminated-summary-list">
                {roundResults.eliminatedPlayers.map((player, index) => (
                  <div key={player} className="eliminated-summary-item">
                    <span className="eliminated-icon">❌</span>
                    <span className="player-name">{player}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="round-actions">
        <button className="view-scores-btn" onClick={handleRoundEnd}>
          View Scores
        </button>
        <button className="new-round-btn" onClick={onNewRound}>
          New Round
        </button>
      </div>
    </div>
  );

  return (
    <div className="game-round">
      {currentPhase === 'discussion' && renderDiscussionPhase()}
      {currentPhase === 'team-accusation' && renderTeamAccusationPhase()}
      {currentPhase === 'chameleon-guess' && renderChameleonGuessPhase()}
      {currentPhase === 'round-end' && renderRoundEnd()}
    </div>
  );
};

import React from 'react';
import { isChameleon } from '../utils/gameHelpers';

interface RoleCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  isChameleonPlayer: boolean;
  currentTopic: string;
  secretWord: string;
}

/**
 * Modal component for players to check their roles privately
 */
export const RoleCheckModal: React.FC<RoleCheckModalProps> = ({
  isOpen,
  onClose,
  playerName,
  isChameleonPlayer,
  currentTopic,
  secretWord
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🤫 {playerName}'s Role</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-body">
          {isChameleonPlayer ? (
            <div className="chameleon-reveal">
              <h3 className="chameleon-title">🦎 You are the CHAMELEON!</h3>
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
              <h3 className="secret-title">🤫 Your Secret Word:</h3>
              <div className="secret-word">{secretWord}</div>
              <p className="secret-instruction">
                Give a clue that shows you know the word, but don't make it too obvious!
              </p>
            </div>
          )}
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

import React from 'react';
import { MIN_PLAYERS, MAX_PLAYERS } from '../constants/game';
import { ColorFooter } from './ColorFooter';

interface PlayerSelectionProps {
  onSelectPlayerCount: (count: number) => void;
  color: string;
  onColorChange: (color: string) => void;
}

/**
 * Component for selecting the number of players
 */
export const PlayerSelection: React.FC<PlayerSelectionProps> = ({
  onSelectPlayerCount,
  color,
  onColorChange
}) => {
  const playerCounts = Array.from(
    { length: MAX_PLAYERS - MIN_PLAYERS + 1 }, 
    (_, i) => MIN_PLAYERS + i
  );

  return (
    <div className="app">
      <div className="container">
        <div className="chameleon-icon">
          🦎
        </div>
        <h1>The Chameleon</h1>
        <p>Choose the number of players</p>
        
        <div className="player-selection">
          <h3>How many players?</h3>
          <p className="player-limit">
            {MIN_PLAYERS} to {MAX_PLAYERS} players required
          </p>
          <div className="player-buttons">
            {playerCounts.map((count) => (
              <button
                key={count}
                className="player-count-btn"
                onClick={() => onSelectPlayerCount(count)}
              >
                {count} Players
              </button>
            ))}
          </div>
        </div>
      </div>
      <ColorFooter id="color-select" color={color} onColorChange={onColorChange} />
    </div>
  );
};

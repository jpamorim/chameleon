import './App.css';

// Types
import { GamePhase } from './types/game';

// Hooks
import { useGameData } from './hooks/useGameData';
import { useGameLogic } from './hooks/useGameLogic';
import { useTheme } from './hooks/useTheme';

// Components
import { WelcomeScreen } from './components/WelcomeScreen';
import { PlayerSelection } from './components/PlayerSelection';
import { PlayerNamesInput } from './components/PlayerNamesInput';
import { GameRules } from './components/GameRules';
import { TurnOrderScreen, GameplayScreen } from './components/GameScreens';

/**
 * Main App component for the Chameleon game
 * 
 * This component orchestrates the entire game flow through different phases:
 * 1. Welcome screen
 * 2. Player selection
 * 3. Player name input
 * 4. Game rules explanation
 * 5. Turn order and card reveal
 * 6. Role revelation
 * 7. Actual gameplay
 */
function App() {
  // Custom hooks for different aspects of the game
  const { gameData, isLoading, error } = useGameData();
  const gameLogic = useGameLogic();
  const { color, handleColorChange } = useTheme();

  // Destructure game logic for easier access
  const {
    currentPhase,
    playerCount,
    playerNames,
    turnOrder,
    currentTopic,
    secretWord,
    chameleonNames,
    // Phase transitions
    startGame,
    goBackToPlayerSelection,
    goBackToGameRules,
    // Actions
    selectPlayerCount,
    updatePlayerName,
    proceedToGame,
    startRound,
    startGameplayFromTurnOrder,
    resetForNewRound
  } = gameLogic;

  /**
   * Start a new round with current game data
   */
  const handleStartRound = () => {
    if (gameData) {
      startRound(gameData);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="app">
        <div className="container">
          <div className="chameleon-icon">🦎</div>
          <h1>Loading...</h1>
          <p>Preparing the game data</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="app">
        <div className="container">
          <div className="chameleon-icon">🦎</div>
          <h1>Error</h1>
          <p>Failed to load game data: {error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Game flow routing based on current phase
  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case GamePhase.WELCOME:
        return (
          <WelcomeScreen
            onStartGame={startGame}
            color={color}
            onColorChange={handleColorChange}
          />
        );

      case GamePhase.PLAYER_SELECTION:
        return (
          <PlayerSelection
            onSelectPlayerCount={selectPlayerCount}
            color={color}
            onColorChange={handleColorChange}
          />
        );

      case GamePhase.PLAYER_NAMES:
        return (
          <PlayerNamesInput
            playerNames={playerNames}
            onUpdatePlayerName={updatePlayerName}
            onBack={goBackToPlayerSelection}
            onContinue={proceedToGame}
            color={color}
            onColorChange={handleColorChange}
          />
        );

      case GamePhase.GAME_RULES:
        return (
          <GameRules
            playerCount={playerCount!}
            playerNames={playerNames}
            onStartRound={handleStartRound}
            color={color}
            onColorChange={handleColorChange}
          />
        );

      case GamePhase.TURN_ORDER:
        return (
          <TurnOrderScreen
            turnOrder={turnOrder}
            chameleonNames={chameleonNames}
            currentTopic={currentTopic}
            secretWord={secretWord}
            onBack={goBackToGameRules}
            onStartGame={startGameplayFromTurnOrder}
            color={color}
            onColorChange={handleColorChange}
          />
        );



      case GamePhase.GAMEPLAY:
        return (
          <GameplayScreen
            currentTopic={currentTopic}
            secretWord={secretWord}
            turnOrder={turnOrder}
            onNewRound={resetForNewRound}
            color={color}
            onColorChange={handleColorChange}
          />
        );

      default:
        return (
          <div className="app">
            <div className="container">
              <div className="chameleon-icon">🦎</div>
              <h1>Something went wrong</h1>
              <p>The game is in an unexpected state.</p>
              <button onClick={resetForNewRound}>
                Reset Game
              </button>
            </div>
          </div>
        );
    }
  };

  return renderCurrentPhase();
}

export default App;
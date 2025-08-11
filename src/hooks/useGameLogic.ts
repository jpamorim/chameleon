import { useState } from 'react';
import { GameData, PlayerCards, GamePhase } from '../types/game';
import { NUMBER_OF_CHAMELEONS } from '../constants/game';

/**
 * Custom hook for managing core game logic
 */
export const useGameLogic = () => {
  // Game phase management
  const [currentPhase, setCurrentPhase] = useState<GamePhase>(GamePhase.WELCOME);
  
  // Player management
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [namesEntered, setNamesEntered] = useState(false);
  
  // Round management
  const [roundStarted, setRoundStarted] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [startingPlayerIndex, setStartingPlayerIndex] = useState<number | null>(null);
  const [turnOrder, setTurnOrder] = useState<string[]>([]);
  
  // Game content
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [secretWord, setSecretWord] = useState<string>('');
  
  // Chameleon management
  const [chameleonIndices, setChameleonIndices] = useState<number[]>([]);
  const [chameleonNames, setChameleonNames] = useState<string[]>([]);
  
  // UI state
  const [rolesRevealed, setRolesRevealed] = useState(false);
  const [playersWithCards, setPlayersWithCards] = useState<PlayerCards>({});
  const [allCardsRevealed, setAllCardsRevealed] = useState(false);

  /**
   * Phase transition methods
   */
  const startGame = () => {
    setCurrentPhase(GamePhase.PLAYER_SELECTION);
  };

  const goBackToWelcome = () => {
    setCurrentPhase(GamePhase.WELCOME);
    resetGame();
  };

  const goBackToPlayerSelection = () => {
    setCurrentPhase(GamePhase.PLAYER_SELECTION);
    setPlayerCount(null);
    setPlayerNames([]);
    setNamesEntered(false);
  };

  const goBackToGameRules = () => {
    setCurrentPhase(GamePhase.GAME_RULES);
    setRoundStarted(false);
    setRolesRevealed(false);
    setGameInProgress(false);
  };

  /**
   * Select the number of players and initialize player names
   */
  const selectPlayerCount = (count: number) => {
    setPlayerCount(count);
    const defaultNames = Array.from({ length: count }, (_, i) => `Player ${i + 1}`);
    setPlayerNames(defaultNames);
    setCurrentPhase(GamePhase.PLAYER_NAMES);
  };

  /**
   * Update a specific player's name
   */
  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  /**
   * Validate player names and proceed to game rules
   */
  const proceedToGame = () => {
    const validNames = playerNames.every(name => name.trim().length > 0);
    if (validNames) {
      setNamesEntered(true);
      setCurrentPhase(GamePhase.GAME_RULES);
    }
  };

  /**
   * Start a new round with random assignments
   */
  const startRound = (gameData: GameData) => {
    if (!gameData) {
      console.error('Game data not loaded yet');
      return;
    }

    // Randomly select starting player
    const randomStartIndex = Math.floor(Math.random() * playerNames.length);
    setStartingPlayerIndex(randomStartIndex);
    
    // Create turn order starting from the random player
    const orderedPlayers = [
      ...playerNames.slice(randomStartIndex),
      ...playerNames.slice(0, randomStartIndex)
    ];
    setTurnOrder(orderedPlayers);
    
    // Randomly select Chameleons
    const numChameleons = Math.min(NUMBER_OF_CHAMELEONS, playerNames.length - 1);
    const shuffledIndices = Array.from({ length: playerNames.length }, (_, i) => i)
      .sort(() => Math.random() - 0.5);
    const selectedChameleonIndices = shuffledIndices.slice(0, numChameleons);
    const selectedChameleonNames = selectedChameleonIndices.map(index => playerNames[index]);
    
    setChameleonIndices(selectedChameleonIndices);
    setChameleonNames(selectedChameleonNames);

    // Set topic and select random secret word
    setCurrentTopic(gameData.topic);
    const randomSecretIndex = Math.floor(Math.random() * gameData.secrets.length);
    setSecretWord(gameData.secrets[randomSecretIndex]);
    
    // Assign cards to players
    const cards = Array.from({ length: playerNames.length }, (_, i) => i + 1);
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    const cardAssignments: PlayerCards = {};
    playerNames.forEach((name, index) => {
      cardAssignments[name] = shuffledCards[index];
    });
    setPlayersWithCards(cardAssignments);
    
    setRoundStarted(true);
    setCurrentPhase(GamePhase.TURN_ORDER);
    
    // Debug logging
    console.log('Starting player:', playerNames[randomStartIndex]);
    console.log('Turn order:', orderedPlayers);
    console.log('Chameleons:', selectedChameleonNames);
    console.log('Topic:', gameData.topic);
    console.log('Secret word:', gameData.secrets[randomSecretIndex]);
    console.log('Card assignments:', cardAssignments);
  };

  /**
   * Start gameplay directly from turn order
   */
  const startGameplayFromTurnOrder = () => {
    setGameInProgress(true);
    setCurrentPhase(GamePhase.GAMEPLAY);
  };

  /**
   * Start the actual gameplay phase
   */
  const startGameplay = () => {
    setGameInProgress(true);
    setCurrentPhase(GamePhase.GAMEPLAY);
  };

  /**
   * Reset game state for a new round
   */
  const resetForNewRound = () => {
    setGameInProgress(false);
    setRoundStarted(false);
    setRolesRevealed(false);
    setPlayersWithCards({});
    setAllCardsRevealed(false);
    setChameleonIndices([]);
    setChameleonNames([]);
    setCurrentPhase(GamePhase.GAME_RULES);
  };

  /**
   * Reset entire game state
   */
  const resetGame = () => {
    setPlayerCount(null);
    setPlayerNames([]);
    setNamesEntered(false);
    setGameInProgress(false);
    setRoundStarted(false);
    setRolesRevealed(false);
    setPlayersWithCards({});
    setAllCardsRevealed(false);
    setChameleonIndices([]);
    setChameleonNames([]);
    setCurrentTopic('');
    setSecretWord('');
    setStartingPlayerIndex(null);
    setTurnOrder([]);
    setCurrentPhase(GamePhase.WELCOME);
  };

  return {
    // State
    currentPhase,
    playerCount,
    playerNames,
    namesEntered,
    roundStarted,
    gameInProgress,
    startingPlayerIndex,
    turnOrder,
    currentTopic,
    secretWord,
    chameleonIndices,
    chameleonNames,
    rolesRevealed,
    playersWithCards,
    allCardsRevealed,
    
    // Phase transitions
    startGame,
    goBackToWelcome,
    goBackToPlayerSelection,
    goBackToGameRules,
    
    // Actions
    selectPlayerCount,
    updatePlayerName,
    proceedToGame,
    startRound,
    startGameplayFromTurnOrder,
    startGameplay,
    resetForNewRound,
    resetGame,
    
    // Setters for direct state updates
    setAllCardsRevealed
  };
};

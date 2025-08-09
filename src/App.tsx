import { useState, useEffect } from 'react'
import './App.css'

interface GameData {
  topic: string
  secrets: string[]
}

function App() {
  const [color, setColor] = useState('#667eea')
  const [gameStarted, setGameStarted] = useState(false)
  const [playerCount, setPlayerCount] = useState<number | null>(null)
  const [playerNames, setPlayerNames] = useState<string[]>([])
  const [namesEntered, setNamesEntered] = useState(false)
  const [startingPlayerIndex, setStartingPlayerIndex] = useState<number | null>(null)
  const [turnOrder, setTurnOrder] = useState<string[]>([])
  const [roundStarted, setRoundStarted] = useState(false)
  const [gameData, setGameData] = useState<GameData | null>(null)
  const [currentTopic, setCurrentTopic] = useState<string>('')
  const [secretWord, setSecretWord] = useState<string>('')
  const [gameInProgress, setGameInProgress] = useState(false)
  const [chameleonIndex, setChameleonIndex] = useState<number | null>(null)
  const [chameleonName, setChameleonName] = useState<string>('')
  const [rolesRevealed, setRolesRevealed] = useState(false)
  const [playersWithCards, setPlayersWithCards] = useState<{[key: string]: number}>({})
  const [allCardsRevealed, setAllCardsRevealed] = useState(false)
  
  const colors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
    '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
  ]

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    document.body.style.background = `linear-gradient(135deg, ${newColor} 0%, ${colors[(colors.indexOf(newColor) + 1) % colors.length]} 100%)`
  }

  // Load game data from JSON file
  const loadGameData = async (): Promise<GameData | null> => {
    try {
      const response = await fetch('/animals.json')
      if (!response.ok) {
        throw new Error('Failed to load game data')
      }
      const data: GameData = await response.json()
      return data
    } catch (error) {
      console.error('Error loading game data:', error)
      return null
    }
  }

  // Load game data on component mount
  useEffect(() => {
    const loadData = async () => {
      const data = await loadGameData()
      if (data) {
        setGameData(data)
      }
    }
    loadData()
  }, [])

  const startGame = () => {
    setGameStarted(true)
  }

  const selectPlayerCount = (count: number) => {
    setPlayerCount(count)
    // Initialize player names array with default names
    const defaultNames = Array.from({ length: count }, (_, i) => `Player ${i + 1}`)
    setPlayerNames(defaultNames)
  }

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames]
    newNames[index] = name
    setPlayerNames(newNames)
  }

  const proceedToGame = () => {
    // Validate that all names are filled and not just whitespace
    const validNames = playerNames.every(name => name.trim().length > 0)
    if (validNames) {
      setNamesEntered(true)
    }
  }

  const startRound = () => {
    if (!gameData) {
      console.error('Game data not loaded yet')
      return
    }

    // Randomly select starting player
    const randomStartIndex = Math.floor(Math.random() * playerNames.length)
    setStartingPlayerIndex(randomStartIndex)
    
    // Create turn order starting from the random player
    const orderedPlayers = [
      ...playerNames.slice(randomStartIndex),
      ...playerNames.slice(0, randomStartIndex)
    ]
    setTurnOrder(orderedPlayers)
    
    // Randomly select Chameleon
    const randomChameleonIndex = Math.floor(Math.random() * playerNames.length)
    setChameleonIndex(randomChameleonIndex)
    setChameleonName(playerNames[randomChameleonIndex])

    // Set topic and select random secret word
    setCurrentTopic(gameData.topic)
    const randomSecretIndex = Math.floor(Math.random() * gameData.secrets.length)
    setSecretWord(gameData.secrets[randomSecretIndex])
    
    // Assign cards to players
    const cards = Array.from({ length: playerNames.length }, (_, i) => i + 1)
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5)
    const cardAssignments: {[key: string]: number} = {}
    playerNames.forEach((name, index) => {
      cardAssignments[name] = shuffledCards[index]
    })
    setPlayersWithCards(cardAssignments)
    
    setRoundStarted(true)
    
    console.log('Starting player:', playerNames[randomStartIndex])
    console.log('Turn order:', orderedPlayers)
    console.log('Chameleon:', playerNames[randomChameleonIndex])
    console.log('Topic:', gameData.topic)
    console.log('Secret word:', gameData.secrets[randomSecretIndex])
    console.log('Card assignments:', cardAssignments)
  }

  const continueToGame = () => {
    // Check if all players have revealed their cards
    if (allCardsRevealed) {
      setRolesRevealed(true)
    }
  }

  const revealPlayerCard = (playerName: string) => {
    // Card is already assigned, just mark as revealed and check if all are revealed
    const revealedCount = Object.keys(playersWithCards).length
    if (revealedCount === playerNames.length) {
      setAllCardsRevealed(true)
    }
  }

  const startGameplay = () => {
    setGameInProgress(true)
  }

  // Color footer component
  const ColorFooter = ({ id }: { id: string }) => (
    <footer className="color-footer">
      <div className="color-palette">
        <label htmlFor={id} className="color-label">Theme</label>
        <div className="color-dropdown-container">
          <div 
            className="color-preview" 
            style={{ backgroundColor: color }}
          ></div>
          <select 
            id={id}
            className="color-dropdown"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
          >
            <option value="#667eea">Purple Blue</option>
            <option value="#764ba2">Deep Purple</option>
            <option value="#f093fb">Pink Purple</option>
            <option value="#f5576c">Coral Red</option>
            <option value="#4facfe">Sky Blue</option>
            <option value="#00f2fe">Cyan Blue</option>
            <option value="#43e97b">Mint Green</option>
            <option value="#38f9d7">Turquoise</option>
            <option value="#ffecd2">Peach</option>
            <option value="#fcb69f">Orange Pink</option>
            <option value="#a8edea">Light Mint</option>
            <option value="#fed6e3">Light Pink</option>
          </select>
        </div>
      </div>
    </footer>
  )

  // Render player selection screen
  if (gameStarted && playerCount === null) {
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
            <p className="player-limit">3 to 5 players required</p>
            <div className="player-buttons">
              {[3, 4, 5].map((count) => (
                <button
                  key={count}
                  className="player-count-btn"
                  onClick={() => selectPlayerCount(count)}
                >
                  {count} Players
                </button>
              ))}
            </div>
          </div>

        </div>
        <ColorFooter id="color-select" />
      </div>
    )
  }

  // Render player names input screen
  if (gameStarted && playerCount !== null && !namesEntered) {
    return (
      <div className="app">
        <div className="container">
          <div className="chameleon-icon">
            🦎
          </div>
          <h1>The Chameleon</h1>
          <p>Enter player names</p>
          
          <div className="player-names-section">
            <h3>Who's playing?</h3>
            <p className="names-instruction">Enter a name for each player</p>
            
            <div className="name-inputs">
              {playerNames.map((name, index) => (
                <div key={index} className="name-input-group">
                  <label htmlFor={`player-${index}`} className="name-label">
                    Player {index + 1}
                  </label>
                  <input
                    id={`player-${index}`}
                    type="text"
                    className="name-input"
                    value={name}
                    onChange={(e) => updatePlayerName(index, e.target.value)}
                    placeholder={`Enter name for Player ${index + 1}`}
                    maxLength={20}
                  />
                </div>
              ))}
            </div>

            <div className="names-actions">
              <button 
                className="back-btn"
                onClick={() => setPlayerCount(null)}
              >
                Back
              </button>
              <button 
                className="continue-btn"
                onClick={proceedToGame}
                disabled={!playerNames.every(name => name.trim().length > 0)}
              >
                Continue
              </button>
            </div>
          </div>

        </div>
        <ColorFooter id="color-names" />
      </div>
    )
  }

  // Render turn order screen
  if (gameStarted && playerCount !== null && namesEntered && roundStarted) {
    return (
      <div className="app">
        <div className="container">
          <div className="chameleon-icon">
            🦎
          </div>
          <h1>Round Setup</h1>
          <p>Turn order has been determined</p>
          
          <div className="turn-order-section">
            <div className="starting-player">
              <h3>🎲 Starting Player</h3>
              <div className="starting-player-card">
                <span className="player-name">{playerNames[startingPlayerIndex!]}</span>
                <span className="start-badge">Goes First!</span>
              </div>
            </div>

            <div className="turn-order">
              <h3>📋 Turn Order & Cards</h3>
              <p className="turn-instruction">Each player clicks to reveal their card:</p>
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
                          🎴 {name}, reveal your card
                        </summary>
                        <div className="revealed-card">
                          {/* <div className="card-display">
                            <div className="card-number-large">{playersWithCards[name]}</div>
                          </div> */}
                          {name === chameleonName ? (
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
              <button 
                className="back-to-rules-btn"
                onClick={() => setRoundStarted(false)}
              >
                Back to Rules
              </button>
              <button 
                className="continue-to-game-btn"
                onClick={continueToGame}
              >
                Continue to Game
              </button>
            </div>
          </div>

        </div>
        <ColorFooter id="color-turn-order" />
      </div>
    )
  }



  // Render role revelation screen
  if (gameStarted && playerCount !== null && namesEntered && roundStarted && rolesRevealed && !gameInProgress) {
    return (
      <div className="app">
        <div className="container">
          <div className="chameleon-icon">
            🦎
          </div>
          <h1>Check Your Role</h1>
          <p>Each player should check their role privately</p>
          
          <div className="role-check-section">
            <div className="role-instruction">
              <h3>🤫 Private Role Check</h3>
              <p>Pass the device around so each player can check their role secretly.</p>
              <p className="warning-text">⚠️ Keep your role secret from other players!</p>
            </div>

            <div className="player-role-checks">
              {playerNames.map((name, index) => (
                <div key={index} className="player-role-card">
                  <h4>{name}'s Role</h4>
                  <div className="role-reveal-area">
                    <details className="role-details">
                      <summary className="role-summary">
                        👁️ Click to see your role, {name}
                      </summary>
                      <div className="role-content">
                        {index === chameleonIndex ? (
                          <div className="chameleon-role">
                            <div className="role-badge chameleon-badge">🦎 CHAMELEON</div>
                            <div className="role-info">
                              <p><strong>Your Topic:</strong> {currentTopic}</p>
                              <p><strong>Your Mission:</strong> You don't know the secret word! Listen to other players' clues and try to blend in.</p>
                              <p className="role-tip">💡 Give clues that could fit the topic without being too specific!</p>
                            </div>
                          </div>
                        ) : (
                          <div className="regular-role">
                            <div className="role-badge regular-badge">🕵️ DETECTIVE</div>
                            <div className="role-info">
                              <p><strong>Topic:</strong> {currentTopic}</p>
                              <p><strong>Secret Word:</strong> <span className="secret-highlight">{secretWord}</span></p>
                              <p><strong>Your Mission:</strong> Give clues about the secret word and find the Chameleon!</p>
                              <p className="role-tip">💡 Be subtle enough that the Chameleon can't guess, but clear enough for other players!</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>

            <div className="role-actions">
              <button 
                className="back-to-turn-order-btn"
                onClick={() => setRolesRevealed(false)}
              >
                Back to Turn Order
              </button>
              <button 
                className="start-gameplay-btn"
                onClick={startGameplay}
              >
                Everyone Ready - Start Game!
              </button>
            </div>
          </div>

        </div>
        <ColorFooter id="color-roles" />
      </div>
    )
  }

  // Render actual game screen
  if (gameStarted && playerCount !== null && namesEntered && roundStarted && gameInProgress) {
    return (
      <div className="app">
        <div className="container">
          <div className="chameleon-icon">
            🦎
          </div>
          <h1>Round in Progress</h1>
          <p>Give your clues and find the Chameleon!</p>
          
          <div className="game-screen">
            <div className="topic-display">
              <h2 className="topic-title">Topic</h2>
              <div className="topic-card">
                {currentTopic}
              </div>
            </div>

            <div className="game-status">
              <div className="chameleon-info">
                <h3>🦎 The Chameleon is among you!</h3>
                <p>One player knows the topic but not the secret word.</p>
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
              <button 
                className="new-round-btn"
                onClick={() => {
                  setGameInProgress(false)
                  setRoundStarted(false)
                  setRolesRevealed(false)
                  setPlayersWithCards({})
                  setAllCardsRevealed(false)
                  setChameleonIndex(null)
                  setChameleonName('')
                }}
              >
                New Round
              </button>
            </div>
          </div>

        </div>
        <ColorFooter id="color-game" />
      </div>
    )
  }

  // Render game explanation screen
  if (gameStarted && playerCount !== null && namesEntered && !roundStarted) {
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
                  <p>A topic and secret word will be chosen. Everyone except the Chameleon will see it.</p>
                </div>
              </div>

              <div className="rule-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>One Player is the Chameleon</h4>
                  <p>The Chameleon knows the topic but NOT the secret word. They must blend in!</p>
                </div>
              </div>

              <div className="rule-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Give Clues</h4>
                  <p>Each player gives ONE clue. If you know the word, be subtle. If you're the Chameleon, try to fit in!</p>
                </div>
              </div>

              <div className="rule-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Vote & Reveal</h4>
                  <p>Discuss and vote for who you think is the Chameleon. If caught, they can still win by guessing the word!</p>
                </div>
              </div>
            </div>

            <div className="ready-section">
              <button 
                className="start-round-btn"
                onClick={startRound}
              >
                Ready to Play!
              </button>
            </div>
          </div>

        </div>
        <ColorFooter id="color-explanation" />
      </div>
    )
  }

  // Render welcome screen
  return (
    <div className="app">
      <div className="container">
        <div className="chameleon-icon">
          🦎
        </div>
        <h1>The Chameleon</h1>
        <p>A game of bluffing, deduction, and clever clues</p>
        
        {!gameStarted && (
          <>
            <div className="start-game-section">
              <button className="start-game-btn" onClick={startGame}>
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
          </>
        )}

        

      </div>
      <ColorFooter id="color-select-welcome" />
    </div>
  )
}

export default App
# Chameleon Game - Code Structure Documentation

## Overview

The Chameleon game has been refactored from a single 640-line `App.tsx` file into a well-organized, modular structure. This refactoring improves maintainability, readability, and testability.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ColorFooter.tsx  # Theme color selector footer
│   ├── GameRules.tsx    # Game rules and instructions
│   ├── GameScreens.tsx  # Complex game screens (Turn Order, Role Reveal, Gameplay)
│   ├── PlayerNamesInput.tsx    # Player name input form
│   ├── PlayerSelection.tsx     # Player count selection
│   └── WelcomeScreen.tsx      # Welcome/landing screen
├── constants/           # Application constants
│   └── game.ts         # Game configuration constants
├── hooks/              # Custom React hooks
│   ├── useGameData.ts  # Game data loading and management
│   ├── useGameLogic.ts # Core game state and logic
│   └── useTheme.ts     # Theme color management
├── types/              # TypeScript type definitions
│   └── game.ts         # Game-related interfaces and types
├── utils/              # Utility functions
│   └── gameHelpers.ts  # Helper functions for game logic
├── App.tsx             # Main application component (now ~200 lines)
├── App.css             # Application styles
├── index.css           # Global styles
└── main.tsx            # Application entry point
```

## Key Components

### Main App Component (`App.tsx`)
- **Purpose**: Orchestrates the game flow and routing between different screens
- **Size**: Reduced from 640 lines to ~200 lines
- **Responsibilities**:
  - Game state management coordination
  - Screen routing based on game phase
  - Error handling and loading states

### Custom Hooks

#### `useGameData`
- **Purpose**: Manages loading game data from JSON files
- **Features**:
  - Async data loading
  - Error handling
  - Loading states
  - Reload functionality

#### `useGameLogic`
- **Purpose**: Contains all core game logic and state management
- **Features**:
  - Player management (count, names, validation)
  - Round management (setup, chameleon selection, turn order)
  - Game state transitions
  - Reset functionality

#### `useTheme`
- **Purpose**: Manages color theme selection and application
- **Features**:
  - Color state management
  - Dynamic background gradient updates

### Components

#### Screen Components
- **WelcomeScreen**: Game introduction and start button
- **PlayerSelection**: Choose number of players (2-5)
- **PlayerNamesInput**: Enter names for each player
- **GameRules**: Display game rules and player list
- **TurnOrderScreen**: Show turn order and card reveals
- **RoleRevealScreen**: Private role checking for each player
- **GameplayScreen**: Main game interface

#### Utility Components
- **ColorFooter**: Reusable theme selector footer

### Types and Interfaces

#### Core Types (`types/game.ts`)
```typescript
interface GameData {
  topic: string;
  secrets: string[];
}

interface GameState {
  // Complete game state definition
}

type GamePhase = 'welcome' | 'player-selection' | 'player-names' | ...
```

### Constants (`constants/game.ts`)
- Game configuration (MIN_PLAYERS, MAX_PLAYERS, NUMBER_OF_CHAMELEONS)
- Color themes and options
- File paths and other constants

### Utilities (`utils/gameHelpers.ts`)
- Helper functions for common game operations
- Array shuffling, random selection
- Player role checking utilities

## Game Flow

1. **Welcome Screen** → Start Game
2. **Player Selection** → Choose 2-5 players
3. **Player Names** → Enter names for each player
4. **Game Rules** → Learn how to play
5. **Turn Order** → Reveal roles and cards
6. **Role Reveal** → Private role checking
7. **Gameplay** → Main game interface

## Multi-Chameleon Support

The game now supports multiple chameleons through the `NUMBER_OF_CHAMELEONS` constant:
- When set to 1: Traditional single chameleon game
- When set to 2+: Multiple chameleons with appropriate UI updates
- Dynamic text updates based on chameleon count
- Ensures at least one detective remains

## Benefits of Refactoring

### Maintainability
- **Separation of Concerns**: Each file has a single, clear responsibility
- **Smaller Files**: Easier to navigate and understand
- **Modular Structure**: Changes to one feature don't affect others

### Reusability
- **Custom Hooks**: Game logic can be reused or tested independently
- **Component Library**: UI components can be reused across screens
- **Utility Functions**: Common operations are centralized

### Developer Experience
- **Type Safety**: Comprehensive TypeScript types prevent errors
- **Documentation**: Extensive comments and documentation
- **Consistent Patterns**: Standardized component and hook patterns

### Testing
- **Unit Testable**: Hooks and utilities can be tested independently
- **Component Testing**: UI components can be tested in isolation
- **Mocking**: External dependencies are easily mockable

## Configuration

### Game Settings
Modify `src/constants/game.ts` to change:
- Player count limits (MIN_PLAYERS, MAX_PLAYERS)
- Number of chameleons (NUMBER_OF_CHAMELEONS)
- Available color themes
- Game data file path

### Adding New Features
1. **New Screen**: Add component to `components/` and route in `App.tsx`
2. **New Game Logic**: Extend `useGameLogic` hook
3. **New Data**: Update types in `types/game.ts`
4. **New Constants**: Add to `constants/game.ts`

## Performance Considerations

- **Lazy Loading**: Components could be lazy-loaded for better initial performance
- **Memoization**: Complex calculations are avoided through proper state management
- **Minimal Re-renders**: Custom hooks prevent unnecessary re-renders

## Future Improvements

- **State Management**: Consider Redux/Zustand for complex state needs
- **Persistence**: Add local storage for game state persistence
- **Animations**: Add smooth transitions between screens
- **Mobile Optimization**: Enhanced mobile-specific UI components
- **Testing**: Add comprehensive test suite
- **Accessibility**: Improve ARIA labels and keyboard navigation

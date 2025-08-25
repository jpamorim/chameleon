# Chameleon Game - Team-Based Scoring System & New Features

## Overview
The Chameleon game has been enhanced with a team-based accusation system, elimination mechanics, and simplified scoring for more strategic gameplay.

## New Features

### 1. Improved Player Name Input
- **Placeholders** show "Player 1", "Player 2", etc. for guidance
- **Empty input fields** for immediate typing without clearing text
- Players can quickly enter names with visual guidance

### 2. Private Role Checking Modal
- **Replaced expandable details** with a clean modal interface
- Players can check their roles privately by clicking "Check Role" buttons
- Modal is easy to close and prevents other participants from seeing roles
- Clean, focused interface for role revelation
- **Fixed text visibility** with proper color contrast

### 3. Team-Based Accusation System

#### Core Rules
- **+10 points** - Everyone gains points when the Chameleon is caught
- **+15 points** - Chameleon gets bonus points for successfully blending in
- **+15 points** - Chameleon gets bonus points for correctly guessing the secret word
- **0 points** - Nobody gains points if the Chameleon escapes

#### How It Works
- **Team Discussion**: Players discuss and observe behavior together
- **Single Accusation**: Team must agree on ONE person to accuse
- **Elimination**: Wrong accusations remove the accused player from the round
- **Continuing Play**: Game continues with remaining players until Chameleon is caught or too many eliminated
- **Chameleon Victory**: If too many players are eliminated, Chameleon wins the round

### 4. Strategic Game Flow

#### Discussion Phase
- Players discuss and observe behavior to identify the Chameleon
- Shows active players and eliminated players
- Team must reach consensus before accusing

#### Team Accusation Phase
- Team selects ONE person to accuse
- Visual confirmation of the team's choice
- Wrong accusations have consequences

#### Elimination Mechanics
- Wrong accusations eliminate the accused player
- Eliminated players cannot participate further in the round
- Game continues until Chameleon is caught or victory conditions met

#### Chameleon Guess Phase (if caught)
- Chameleon gets a chance to guess the secret word
- Can earn bonus points for correct guesses
- Adds strategic depth to the game

#### Round End
- Displays round results, scores, and elimination summary
- Shows whether Chameleon was caught or escaped
- Option to view detailed scores or start new round

### 5. Player Rankings & Statistics
- **Real-time scoring** during gameplay
- **Player rankings** with medal positions (🥇🥈🥉)
- **Individual statistics** tracking:
  - Total points
  - Chameleons caught
  - Words guessed correctly
  - Successful blends
- **Team-based scoring rules** accessible via modal

### 6. Enhanced UI/UX
- **Modal-based interactions** for better privacy
- **Team discussion interface** with active/eliminated player tracking
- **Visual accusation system** with confirmation
- **Elimination tracking** throughout the round
- **Ranking button** always visible after game starts
- **Responsive design** with smooth animations
- **Color-coded elements** for different game phases

### 7. Always-Accessible Rankings
- **🏆 Ranking button** visible on all game screens after setup
- **Current standings** accessible anytime during gameplay
- **Detailed scoring rules** with ranking system explanation
- **Pro tips** for improving performance
- **Back to game** functionality from rankings view

## How to Play

1. **Setup**: Enter player names (placeholders guide you)
2. **Role Check**: Click "Check Role" buttons to see your role privately
3. **Team Discussion**: 
   - Discuss and observe behavior together
   - Work as a team to identify the Chameleon
4. **Team Accusation**: 
   - Agree on ONE person to accuse
   - Wrong accusations eliminate players
5. **Continue or End**: 
   - If wrong, continue with remaining players
   - If right, Chameleon tries to guess the word
6. **Scoring**: View results, rankings, and elimination summary

## Strategic Elements

- **Team Coordination**: Players must work together effectively
- **Risk Management**: Balance aggressive accusations with caution
- **Elimination Strategy**: Chameleon tries to eliminate enough players to win
- **Behavioral Analysis**: Team observes subtle clues and behavior patterns
- **Consensus Building**: Team must agree on accusations

## Technical Implementation

- **React hooks** for state management
- **Team-based game logic** with elimination tracking
- **TypeScript** for type safety
- **Modular components** for maintainability
- **CSS animations** for smooth interactions
- **Responsive design** for all screen sizes

## Benefits

- **Strategic depth** with elimination mechanics
- **Team collaboration** required for success
- **Risk-reward balance** in accusations
- **Clear feedback** on player performance
- **Replayability** with persistent scoring
- **Social interaction** through team decision-making
- **Focused gameplay** on deduction and teamwork

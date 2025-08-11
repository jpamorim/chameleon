# Chameleon Game Themes

## Overview

The Chameleon game now supports multiple themes to cater to different audiences and interests. Each theme contains a topic and a comprehensive list of related terms that players will use during the game.

## Available Themes

### 🦁 Animals (Classic)
- **Topic**: Animals
- **Description**: Classic theme with animals from around the world
- **Perfect for**: General audiences, families, casual players
- **Terms**: 200+ animal names including mammals, birds, reptiles, fish, and insects

### 📊 Data Science & Machine Learning
- **Topic**: Data Science & Machine Learning  
- **Description**: Perfect for data scientists, ML engineers, and tech teams
- **Perfect for**: Tech companies, data science teams, ML engineers, statisticians
- **Terms**: 150+ terms covering:
  - **Machine Learning**: Neural Networks, Deep Learning, Random Forest, SVM, XGBoost
  - **Data Science Tools**: TensorFlow, PyTorch, Pandas, Scikit-learn, Jupyter
  - **Statistical Methods**: Regression, Classification, Clustering, A/B Testing
  - **Cloud Platforms**: AWS SageMaker, Azure ML, Google Cloud AI
  - **MLOps**: Docker, Kubernetes, MLflow, Model Monitoring
  - **Data Engineering**: Spark, Hadoop, Kafka, Airflow
  - **Visualization**: Matplotlib, Seaborn, Plotly, Tableau

## How to Use Themes

### For Players
1. On the welcome screen, you'll see theme options
2. Click on your preferred theme (Animals or Data Science & ML)
3. The selected theme will be highlighted
4. Click "Start Game with [Theme Name]" to begin

### For Developers

#### Adding a New Theme
1. Create a new JSON file in the `public/` directory:
```json
{
  "topic": "Your Theme Name",
  "secrets": [
    "term1", "term2", "term3", ...
  ]
}
```

2. Update `src/constants/game.ts`:
```typescript
export const AVAILABLE_THEMES = [
  // ... existing themes
  {
    id: 'your-theme' as const,
    name: 'Your Theme Name',
    description: 'Description of your theme',
    icon: '🎯', // Choose an appropriate emoji
    filePath: '/your-theme.json'
  }
];
```

3. The theme will automatically appear in the theme selector!

#### Theme Structure
Each theme JSON file should contain:
- `topic`: The main category name (displayed to players)
- `secrets`: Array of terms related to the topic

#### Best Practices for Theme Terms
- **Quantity**: Include 100-200 terms for variety
- **Difficulty**: Mix easy and challenging terms
- **Relevance**: All terms should clearly relate to the topic
- **Uniqueness**: Avoid terms that could fit multiple themes
- **Length**: Keep terms concise (1-3 words typically)

## Technical Implementation

### Theme Selection System
- **ThemeSelector Component**: Interactive theme picker with visual feedback
- **useThemeSelector Hook**: Manages theme state and switching
- **Dynamic Loading**: Themes are loaded on-demand when selected
- **Type Safety**: Full TypeScript support for theme definitions

### File Structure
```
public/
├── animals.json          # Classic animals theme
└── data-science.json     # Data science theme

src/
├── components/
│   └── ThemeSelector.tsx # Theme selection UI
├── hooks/
│   ├── useThemeSelector.ts # Theme state management
│   └── useGameData.ts     # Dynamic theme loading
├── types/
│   └── game.ts           # Theme type definitions
└── constants/
    └── game.ts           # Theme configuration
```

## Theme Ideas for Future Development

- **🎬 Movies & TV Shows**: For entertainment enthusiasts
- **🏈 Sports**: For sports fans and athletes  
- **🍳 Cooking**: For food lovers and chefs
- **🎵 Music**: For musicians and music lovers
- **🏛️ History**: For history buffs and educators
- **🔬 Science**: For scientists and students
- **🎮 Video Games**: For gamers and developers
- **📚 Literature**: For book clubs and writers
- **🏢 Business**: For corporate teams and entrepreneurs
- **🌍 Geography**: For travelers and geography enthusiasts

## Contributing Themes

We welcome contributions of new themes! Please:

1. Ensure terms are appropriate and family-friendly
2. Include 100+ relevant terms
3. Test the theme with actual gameplay
4. Follow the JSON structure exactly
5. Add appropriate metadata in constants

The theme system is designed to be easily extensible, so adding new themes is straightforward and doesn't require code changes to the core game logic.

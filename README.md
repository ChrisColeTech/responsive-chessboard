# Responsive ChessBoard

[![GitHub CI](https://github.com/ChrisColeTech/responsive-chessboard/workflows/CI/badge.svg)](https://github.com/ChrisColeTech/responsive-chessboard/actions)
[![npm version](https://badge.fury.io/js/responsive-chessboard.svg)](https://badge.fury.io/js/responsive-chessboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/responsive-chessboard.svg)](https://nodejs.org/en/download/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![GitHub stars](https://img.shields.io/github/stars/ChrisColeTech/responsive-chessboard?style=social)](https://github.com/ChrisColeTech/responsive-chessboard/stargazers)

**A responsive and interactive React chessboard component with dynamic sizing, drag-and-drop moves, and modern TypeScript architecture.**

Built for modern React applications with clean separation of concerns, full TypeScript support, and responsive design that adapts to any container size.

## 🎯 Responsive-First Philosophy

**Responsive ChessBoard** embraces **true responsive design** with dynamic sizing props and container-aware scaling:

- **🔄 Dynamic Sizing**: Automatically adapts to container width with ResizeObserver
- **📱 Mobile-Friendly**: Optimized touch interactions and responsive scaling
- **⚡ Performance-First**: Memoized components and optimized re-renders
- **🎨 Customizable**: Complete theming control with CSS custom properties

This approach gives you **maximum flexibility** while maintaining **clean separation of concerns** and optimal performance.

## 🚀 Key Features

- **📏 Responsive Sizing**: Dynamic board sizing with width, height, and container-based scaling
- **🖱️ Interactive Gameplay**: Drag-and-drop moves, click-to-move, and piece selection
- **🎨 Full Customization**: Colors, cell sizes, piece styles, and board themes
- **♟️ Chess Logic**: Complete FEN notation support and game state management
- **🔄 Move Validation**: Built-in chess engine with legal move validation
- **📱 Touch Support**: Optimized for mobile devices and touch interactions
- **⚡ Performance**: Optimized rendering with React.memo and efficient state management
- **📦 TypeScript**: Full type safety with comprehensive interfaces

## 📦 Installation

```bash
npm install responsive-chessboard
```

## 🛠️ Development

```bash
# Clone and setup
git clone https://github.com/ChrisColeTech/responsive-chessboard.git
cd responsive-chessboard
npm install
npm run build

# Development commands
npm run dev          # Hot reload development
npm test            # Run test suite  
npm run lint        # Code quality checks
npm run type-check  # TypeScript validation

# Test example app
cd example
npm run dev         # Launch interactive example
```

## 🚀 Quick Start

### 1. Basic Usage

```tsx
import React from 'react';
import { ChessBoard } from 'responsive-chessboard';

function App() {
  const handleMove = (moveData) => {
    console.log('Move:', moveData);
  };

  const handleEndGame = (result) => {
    console.log('Game ended:', result);
  };

  return (
    <ChessBoard
      FEN="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      onChange={handleMove}
      onEndGame={handleEndGame}
      boardSize={400}
      playerColor="white"
    />
  );
}
```

### 2. Responsive Mode

```tsx
<ChessBoard
  FEN="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  onChange={handleMove}
  onEndGame={handleEndGame}
  responsive={true}
  minSize={200}
  maxSize={600}
  playerColor="white"
/>
```

### 3. Custom Styling

```tsx
<ChessBoard
  FEN="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  onChange={handleMove}
  onEndGame={handleEndGame}
  boardSize={500}
  config={{
    whiteCellColor: '#f0f0f0',
    blackCellColor: '#8b7355',
    selectedCellColor: '#yellow',
  }}
  reversed={false}
  playerColor="white"
/>
```

## 📋 Component Props

### Core Props
- `FEN` (string): Chess position in FEN notation
- `onChange` (function): Callback for move events
- `onEndGame` (function): Callback for game end events
- `playerColor` ('white' | 'black'): Player perspective

### Sizing Props
- `boardSize` (number): Fixed board size in pixels
- `width` (number): Board width (alternative to boardSize)
- `height` (number): Board height (alternative to boardSize)
- `responsive` (boolean): Enable container-based responsive sizing
- `minSize` (number): Minimum size for responsive mode
- `maxSize` (number): Maximum size for responsive mode

### Styling Props
- `config` (Partial<ChessBoardConfig>): Custom colors and styling
- `reversed` (boolean): Flip board perspective
- `change` (ChangeMove): Move animation data

## 🎨 TypeScript Support

```tsx
import { 
  ChessBoard, 
  ChessBoardConfig, 
  MoveData, 
  GameResult 
} from 'responsive-chessboard';

const config: Partial<ChessBoardConfig> = {
  cellSize: 64,
  whiteCellColor: '#f0f0f0',
  blackCellColor: '#8b7355',
};

const handleMove = (moveData: MoveData) => {
  // Full type safety for move data
};

const handleEndGame = (result: GameResult) => {
  // Type-safe game result handling
};
```

## 🔧 Customization

### Color Themes
```tsx
const darkTheme = {
  whiteCellColor: '#262522',
  blackCellColor: '#3c3936', 
  selectedCellColor: '#646f40',
  markedCellColor: '#646f40',
  circleMarkColor: '#15781b',
};

<ChessBoard config={darkTheme} {...props} />
```

### Responsive Behavior
```tsx
// Container-based responsive sizing
<div style={{ width: '100%', maxWidth: '600px' }}>
  <ChessBoard
    responsive={true}
    minSize={300}
    maxSize={600}
    {...props}
  />
</div>
```

## 📚 Documentation

📖 **[Full Documentation](docs/README.md)** - Comprehensive guide with detailed examples, advanced configuration, and production deployment.

See also:
- [API Reference](docs/API_REFERENCE.md)
- [Examples](example/src/App.tsx)
- [Project Structure](docs/PROJECT_STRUCTURE.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

⭐ **Star this repository** if you find it useful!  
🐛 **Report issues** or suggest features at [GitHub Issues](https://github.com/ChrisColeTech/responsive-chessboard/issues)

**Get started today** - `npm install responsive-chessboard` and build your responsive chess application!
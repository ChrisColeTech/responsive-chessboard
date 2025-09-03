# Vanilla Chessboard - React Chess Component

A responsive chess board component built with React, TypeScript, and vanilla CSS. This implementation follows clean architecture principles with separation of concerns and no external UI frameworks.

## Features

✅ **Responsive Design** - CSS Grid with aspect-ratio for perfect squares  
✅ **Chess Engine** - Powered by chess.js v1.4.0 for move validation  
✅ **Computer Opponent** - Stockfish.js integration (ready for implementation)  
✅ **Drag & Drop** - HTML5 drag API with click-to-move fallback  
✅ **Multiple Piece Sets** - Classic, Modern, Tournament, Executive, Conqueror  
✅ **Clean Architecture** - Foundation → Services → Hooks → Components  
✅ **TypeScript** - Full type safety with strict mode  
✅ **Vanilla CSS** - No external CSS frameworks, custom properties for theming  

## Architecture

This project follows the architecture guidelines from Document 02, implementing:

### 1. Foundation Layer
- **Types**: Chess domain types, component interfaces
- **Utils**: Chess utilities, coordinate conversion  
- **Constants**: Game constants, piece set definitions

### 2. Services Layer (Business Logic)
- **ChessGameService**: Core game logic using chess.js
- **StockfishService**: Computer opponent with Web Worker
- **FenService**: FEN parsing and validation

### 3. Hooks Layer (State Management)  
- **useChessGame**: Main game state management
- **useStockfish**: Computer opponent integration
- **useResponsiveBoard**: Responsive board sizing
- **useDragAndDrop**: Drag and drop interactions

### 4. Components Layer (Presentation)
- **Chessboard**: Main container component
- **Board**: 8x8 grid layout
- **Square**: Individual chess squares
- **Piece**: Chess piece rendering

## Installation

```bash
npm install
npm run dev
```

## Usage

```tsx
import { Chessboard } from './components';

<Chessboard
  pieceSet="classic"
  showCoordinates={true}
  allowDragAndDrop={true}
  orientation="white"
  onMove={handleMove}
  onGameEnd={handleGameEnd}
  maxWidth={600}
/>
```

## Project Structure

```
src/
├── types/               # TypeScript definitions
├── utils/               # Pure utility functions  
├── constants/           # Application constants
├── services/           # Business logic layer
├── hooks/              # React state management
├── components/         # UI presentation layer
├── styles/             # Vanilla CSS files
├── App.tsx
└── main.tsx
```

## Architecture Principles

- **Single Responsibility**: Each component/service has one job
- **Dependency Inversion**: Components depend on hooks, hooks depend on services  
- **No Inline Types**: All types defined in separate files
- **Pure Business Logic**: Services have no React dependencies
- **Clean Separation**: Presentation, state, and business logic are separate

## Performance Features

- React.memo optimization for components
- Stable keys to prevent piece reshuffling
- ResizeObserver for efficient responsive updates
- Debounced resize handling
- CSS custom properties for theming

## Browser Support

- Modern browsers with CSS Grid support
- WebAssembly support for Stockfish.js  
- ResizeObserver API (polyfill available)

## Development

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## License

MIT

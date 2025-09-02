/**
 * Redux Store Configuration
 * Store to support responsive-chessboard component Redux dependencies
 */

import { configureStore, createSlice } from '@reduxjs/toolkit';

// Chessboard slice matching what the component might expect
const chessboardSlice = createSlice({
  name: 'chessboard',
  initialState: {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    orientation: 'white',
    selectedSquare: null,
    highlights: {},
    draggedPiece: null,
    validMoves: [],
  },
  reducers: {
    setFen: (state, action) => {
      state.fen = action.payload;
    },
    setOrientation: (state, action) => {
      state.orientation = action.payload;
    },
    setSelectedSquare: (state, action) => {
      state.selectedSquare = action.payload;
    },
    setHighlights: (state, action) => {
      state.highlights = action.payload;
    },
    setDraggedPiece: (state, action) => {
      state.draggedPiece = action.payload;
    },
    setValidMoves: (state, action) => {
      state.validMoves = action.payload;
    },
  },
});

// Additional slices that might be expected
const gameSlice = createSlice({
  name: 'game',
  initialState: {
    status: 'playing',
    currentPlayer: 'white',
    moveHistory: [],
  },
  reducers: {
    updateGameState: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'light',
    animations: true,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setAnimations: (state, action) => {
      state.animations = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    chessboard: chessboardSlice.reducer,
    game: gameSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const { setFen, setOrientation, setSelectedSquare, setHighlights, setDraggedPiece, setValidMoves } = chessboardSlice.actions;
export const { updateGameState } = gameSlice.actions;
export const { setTheme, setAnimations } = uiSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
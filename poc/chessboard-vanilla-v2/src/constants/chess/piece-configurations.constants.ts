// Chess piece initial configurations for different test scenarios

export interface PieceConfig {
  id: string;
  color: 'white' | 'black';
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  boardPosition: string;
}

export const DRAG_TEST_PIECES: PieceConfig[] = [
  // Traditional layout: Black at top, White at bottom
  {
    id: 'black-king',
    color: 'black',
    type: 'king',
    boardPosition: 'a3'
  },
  {
    id: 'black-queen',
    color: 'black',
    type: 'queen',
    boardPosition: 'c3'
  },
  {
    id: 'white-pawn1',
    color: 'white',
    type: 'pawn',
    boardPosition: 'a1'
  },
  {
    id: 'white-pawn2',
    color: 'white',
    type: 'pawn',
    boardPosition: 'c1'
  }
];

export const MOBILE_TEST_PIECES: PieceConfig[] = [
  // Traditional layout: Black at top, White at bottom (6x6 board)
  {
    id: 'black-king',
    color: 'black',
    type: 'king',
    boardPosition: 'a6'
  },
  {
    id: 'black-queen',
    color: 'black',
    type: 'queen',
    boardPosition: 'b6'
  },
  {
    id: 'white-queen',
    color: 'white',
    type: 'queen',
    boardPosition: 'e1'
  },
  {
    id: 'white-king',
    color: 'white',
    type: 'king',
    boardPosition: 'f1'
  }
];

export const PIECE_CONFIGURATIONS = {
  'drag-test': DRAG_TEST_PIECES,
  'mobile-test': MOBILE_TEST_PIECES
} as const;
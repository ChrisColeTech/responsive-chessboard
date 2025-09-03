// HighlightEngine.ts - Chess pattern and threat detection service
import type React from 'react';
import type { ChessGameState, ChessPosition, ChessPiece } from '../types/chess.types';
import type { HighlightType, HighlightConfig } from '../types/enhancement.types';

export interface HighlightData {
  positions: ChessPosition[];
  type: HighlightType;
  intensity: 'low' | 'medium' | 'high';
  style?: React.CSSProperties;
  metadata?: {
    description?: string;
    pieceInvolved?: ChessPiece;
    targetSquares?: ChessPosition[];
    evaluation?: number;
  };
}

export type HighlightMap = Map<HighlightType, HighlightData[]>;

export class HighlightEngine {
  /**
   * Generate all highlights for the current game state
   */
  static generateHighlights(
    gameState: ChessGameState, 
    config: HighlightConfig
  ): HighlightMap {
    const highlights = new Map<HighlightType, HighlightData[]>();

    if (!gameState) {
      return highlights;
    }

    // Basic move highlighting
    if (config.showLastMove) {
      const lastMove = this.getLastMoveHighlight(gameState);
      if (lastMove.length > 0) {
        highlights.set('last-move', lastMove);
      }
    }

    // Check highlighting
    if (gameState.isCheck) {
      const checkHighlight = this.getCheckHighlight(gameState);
      if (checkHighlight.length > 0) {
        highlights.set('check', checkHighlight);
      }
    }

    // Threat detection
    if (config.showThreats) {
      const threats = this.detectThreats(gameState);
      if (threats.length > 0) {
        highlights.set('threat', threats);
      }
    }

    // Pattern detection
    if (config.showPatterns) {
      const patterns = this.detectPatterns(gameState);
      patterns.forEach((patternData, patternType) => {
        if (patternData.length > 0) {
          highlights.set(patternType, patternData);
        }
      });
    }

    return highlights;
  }

  /**
   * Get last move highlighting
   */
  private static getLastMoveHighlight(gameState: ChessGameState): HighlightData[] {
    const history = gameState.history;
    if (history.length === 0) {
      return [];
    }

    const lastMove = history[history.length - 1];
    
    return [{
      positions: [lastMove.from, lastMove.to],
      type: 'last-move',
      intensity: 'medium',
      metadata: {
        description: `Last move: ${lastMove.piece} from ${lastMove.from} to ${lastMove.to}`,
        pieceInvolved: lastMove.piece
      }
    }];
  }

  /**
   * Get check highlighting
   */
  private static getCheckHighlight(gameState: ChessGameState): HighlightData[] {
    if (!gameState.isCheck) {
      return [];
    }

    // Find the king position
    const kingPosition = this.findKingPosition(gameState, gameState.activeColor);
    if (!kingPosition) {
      return [];
    }

    return [{
      positions: [kingPosition],
      type: 'check',
      intensity: 'high',
      metadata: {
        description: `${gameState.activeColor} king in check`,
        pieceInvolved: { 
          id: `${gameState.activeColor}-king`, 
          type: 'king', 
          color: gameState.activeColor,
          position: { 
            file: kingPosition.charAt(0) as any, 
            rank: parseInt(kingPosition.charAt(1)) as any 
          }
        }
      }
    }];
  }

  /**
   * Detect piece threats
   */
  private static detectThreats(gameState: ChessGameState): HighlightData[] {
    const threats: HighlightData[] = [];
    const opponentColor = gameState.activeColor === 'white' ? 'black' : 'white';

    // Check each piece on the board
    for (let rank = 1; rank <= 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const position = `${String.fromCharCode('a'.charCodeAt(0) + file)}${rank}` as ChessPosition;
        const piece = this.getPieceAt(gameState, position);

        if (piece && piece.color === gameState.activeColor) {
          // Check if this piece is under attack
          if (this.isSquareAttackedBy(gameState, position, opponentColor)) {
            const attackers = this.getAttackingPieces(gameState, position, opponentColor);
            
            threats.push({
              positions: [position],
              type: 'threat',
              intensity: this.getThreatIntensity(piece),
              metadata: {
                description: `${piece.type} under attack`,
                pieceInvolved: piece,
                targetSquares: attackers.map(attacker => attacker.position)
              }
            });
          }
        }
      }
    }

    return threats;
  }

  /**
   * Detect chess patterns (pins, forks, skewers, etc.)
   */
  private static detectPatterns(gameState: ChessGameState): Map<HighlightType, HighlightData[]> {
    const patterns = new Map<HighlightType, HighlightData[]>();

    // Detect pins
    const pins = this.detectPins(gameState);
    if (pins.length > 0) {
      patterns.set('pattern', pins);
    }

    // Detect forks
    const forks = this.detectForks(gameState);
    if (forks.length > 0) {
      const existingPatterns = patterns.get('pattern') || [];
      patterns.set('pattern', [...existingPatterns, ...forks]);
    }

    // Detect discovered attacks
    const discoveredAttacks = this.detectDiscoveredAttacks(gameState);
    if (discoveredAttacks.length > 0) {
      const existingPatterns = patterns.get('pattern') || [];
      patterns.set('pattern', [...existingPatterns, ...discoveredAttacks]);
    }

    return patterns;
  }

  /**
   * Detect pinned pieces
   */
  private static detectPins(gameState: ChessGameState): HighlightData[] {
    const pins: HighlightData[] = [];
    const opponentColor = gameState.activeColor === 'white' ? 'black' : 'white';

    // Find sliding pieces (rooks, bishops, queens) of the opponent
    const slidingPieces = this.getSlidingPieces(gameState, opponentColor);

    for (const slidingPiece of slidingPieces) {
      const pinData = this.checkForPin(gameState, slidingPiece);
      if (pinData) {
        pins.push({
          positions: [pinData.pinnedPiece, pinData.king, slidingPiece.position],
          type: 'pattern',
          intensity: 'medium',
          metadata: {
            description: `Pin: ${pinData.pinnedPiece} pinned by ${slidingPiece.piece.type}`,
            pieceInvolved: pinData.pinnedPieceData
          }
        });
      }
    }

    return pins;
  }

  /**
   * Detect fork attacks
   */
  private static detectForks(gameState: ChessGameState): HighlightData[] {
    const forks: HighlightData[] = [];
    
    // Check pieces of the active player for fork opportunities
    for (let rank = 1; rank <= 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const position = `${String.fromCharCode('a'.charCodeAt(0) + file)}${rank}` as ChessPosition;
        const piece = this.getPieceAt(gameState, position);

        if (piece && piece.color === gameState.activeColor) {
          const forkTargets = this.getForkTargets(gameState, position, piece);
          
          if (forkTargets.length >= 2) {
            forks.push({
              positions: [position, ...forkTargets],
              type: 'pattern',
              intensity: 'high',
              metadata: {
                description: `Fork opportunity: ${piece.type} attacks ${forkTargets.length} pieces`,
                pieceInvolved: piece,
                targetSquares: forkTargets
              }
            });
          }
        }
      }
    }

    return forks;
  }

  /**
   * Detect discovered attacks
   */
  private static detectDiscoveredAttacks(_gameState: ChessGameState): HighlightData[] {
    const discoveredAttacks: HighlightData[] = [];
    
    // This is a complex pattern that requires analyzing piece movements
    // and their effect on revealing attacks from other pieces
    // Implementation would involve checking if moving a piece reveals an attack
    
    return discoveredAttacks; // Simplified for now
  }

  /**
   * Helper method to get piece at position
   */
  private static getPieceAt(gameState: ChessGameState, position: ChessPosition): ChessPiece | null {
    return gameState.board[position] || null;
  }

  /**
   * Helper method to find king position
   */
  private static findKingPosition(gameState: ChessGameState, color: 'white' | 'black'): ChessPosition | null {
    for (let rank = 1; rank <= 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const position = `${String.fromCharCode('a'.charCodeAt(0) + file)}${rank}` as ChessPosition;
        const piece = this.getPieceAt(gameState, position);
        
        if (piece && piece.type === 'king' && piece.color === color) {
          return position;
        }
      }
    }
    return null;
  }

  /**
   * Check if square is attacked by opponent
   */
  private static isSquareAttackedBy(
    _gameState: ChessGameState, 
    _position: ChessPosition, 
    _attackerColor: 'white' | 'black'
  ): boolean {
    // This would integrate with chess.js or similar engine
    // For now, simplified implementation
    return false; // Placeholder
  }

  /**
   * Get pieces attacking a position
   */
  private static getAttackingPieces(
    _gameState: ChessGameState,
    _position: ChessPosition,
    _attackerColor: 'white' | 'black'
  ): { position: ChessPosition; piece: ChessPiece }[] {
    // Placeholder implementation
    return [];
  }

  /**
   * Get threat intensity based on piece value
   */
  private static getThreatIntensity(piece: ChessPiece): 'low' | 'medium' | 'high' {
    const pieceValues = {
      pawn: 'low',
      knight: 'medium',
      bishop: 'medium',
      rook: 'high',
      queen: 'high',
      king: 'high'
    } as const;

    return pieceValues[piece.type] || 'medium';
  }

  /**
   * Get sliding pieces (for pin detection)
   */
  private static getSlidingPieces(
    gameState: ChessGameState, 
    color: 'white' | 'black'
  ): { position: ChessPosition; piece: ChessPiece }[] {
    const slidingPieces: { position: ChessPosition; piece: ChessPiece }[] = [];
    
    for (let rank = 1; rank <= 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const position = `${String.fromCharCode('a'.charCodeAt(0) + file)}${rank}` as ChessPosition;
        const piece = this.getPieceAt(gameState, position);
        
        if (piece && piece.color === color && 
            ['rook', 'bishop', 'queen'].includes(piece.type)) {
          slidingPieces.push({ position, piece });
        }
      }
    }
    
    return slidingPieces;
  }

  /**
   * Check for pin between sliding piece and king
   */
  private static checkForPin(
    _gameState: ChessGameState,
    _slidingPiece: { position: ChessPosition; piece: ChessPiece }
  ): { pinnedPiece: ChessPosition; pinnedPieceData: ChessPiece; king: ChessPosition } | null {
    // Simplified pin detection logic
    // In real implementation, would trace ray from sliding piece to enemy king
    return null; // Placeholder
  }

  /**
   * Get fork targets for a piece
   */
  private static getForkTargets(
    _gameState: ChessGameState,
    _position: ChessPosition,
    _piece: ChessPiece
  ): ChessPosition[] {
    // Simplified fork detection
    // Would calculate all squares this piece attacks and count enemy pieces
    return []; // Placeholder
  }

  /**
   * Calculate highlight priority for sorting
   */
  static getHighlightPriority(type: HighlightType): number {
    const priorities = {
      'check': 100,
      'threat': 80,
      'pattern': 60,
      'selected': 40,
      'valid-move': 30,
      'capture': 70,
      'last-move': 20
    };

    return priorities[type] || 10;
  }

  /**
   * Filter highlights based on focus mode
   */
  static filterHighlightsByFocus(
    highlights: HighlightMap,
    focusMode: string
  ): HighlightMap {
    const filtered = new Map<HighlightType, HighlightData[]>();

    switch (focusMode) {
      case 'tournament':
        // Only show essential highlights in tournament mode
        if (highlights.has('check')) {
          filtered.set('check', highlights.get('check')!);
        }
        if (highlights.has('selected')) {
          filtered.set('selected', highlights.get('selected')!);
        }
        break;

      case 'learning':
      case 'analysis':
        // Show all highlights in learning/analysis modes
        highlights.forEach((value, key) => {
          filtered.set(key, value);
        });
        break;

      case 'casual':
      default:
        // Show most highlights in casual mode
        highlights.forEach((value, key) => {
          if (key !== 'pattern' || highlights.get('pattern')!.length <= 3) {
            filtered.set(key, value);
          }
        });
        break;
    }

    return filtered;
  }
}
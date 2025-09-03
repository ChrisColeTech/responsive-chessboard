/**
 * UI Domain Types
 * Following Document 02 Architecture Guide - Domain organization
 */

export type ChessboardTheme = 'classic' | 'green' | 'blue' | 'purple' | 'wood';
export type PieceSet = 'classic' | 'modern' | 'tournament';

export interface ThemeConfig {
  readonly name: ChessboardTheme;
  readonly lightSquare: string;
  readonly darkSquare: string;
}

export interface ChessboardSettings {
  readonly theme: ChessboardTheme;
  readonly pieceSet: PieceSet;
  readonly showCoordinates: boolean;
  readonly allowDragAndDrop: boolean;
}
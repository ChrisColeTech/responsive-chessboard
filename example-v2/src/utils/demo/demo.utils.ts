// Demo configuration utilities
import type { ChessboardConfig, ControlPanelSettings } from '@/types';
import { STARTING_FEN } from '../chess/fen.utils';

export const getDefaultChessboardConfig = (): ChessboardConfig => {
  return {
    initialFen: STARTING_FEN,
    boardTheme: 'classic',
    pieceSet: 'classic',
    showCoordinates: true,
    animationsEnabled: true,
    animationDuration: 300,
    boardWidth: 600,
    boardOrientation: 'white',
  };
};

export const getDefaultControlPanelSettings = (): ControlPanelSettings => {
  return {
    pieceSet: 'classic',
    boardTheme: 'classic',
    showCoordinates: true,
    animationsEnabled: true,
    animationDuration: 300,
    boardWidth: 600,
    boardOrientation: 'white',
  };
};

export const validateBoardWidth = (width: number): number => {
  const min = 200;
  const max = 1200;
  return Math.max(min, Math.min(max, width));
};

export const validateAnimationDuration = (duration: number): number => {
  const min = 100;
  const max = 1000;
  return Math.max(min, Math.min(max, duration));
};

export const isValidPieceSet = (pieceSet: string): boolean => {
  const validSets = ['classic', 'modern', 'tournament', 'conqueror', 'executive'];
  return validSets.includes(pieceSet);
};

export const isValidBoardTheme = (theme: string): boolean => {
  const validThemes = ['classic', 'wood', 'marble', 'neon', 'minimalist'];
  return validThemes.includes(theme);
};

export const formatSettingValue = (key: string, value: any): string => {
  switch (key) {
    case 'boardWidth':
      return `${value}px`;
    case 'animationDuration':
      return `${value}ms`;
    case 'showCoordinates':
    case 'animationsEnabled':
      return value ? '✓' : '✗';
    case 'boardOrientation':
      return value === 'white' ? '♔ White' : '♚ Black';
    default:
      return String(value);
  }
};
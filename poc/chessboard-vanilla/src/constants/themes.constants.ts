// themes.constants.ts - Theme configuration constants
import type { ThemeConfig, ThemeType, BoardMaterialType } from '../types/enhancement.types';

export const THEME_CONFIGS: Record<ThemeType, ThemeConfig> = {
  classic: {
    name: 'Classic',
    cssFile: 'classic.css',
    variables: {
      '--chessboard-light-square': '#F0D9B5',
      '--chessboard-dark-square': '#B58863',
      '--chessboard-border': '#8B4513',
      '--board-shadow': '0 4px 16px rgba(0,0,0,0.1)',
      '--material-texture': 'none',
      '--material-shine': '0',
      '--material-depth': '0px'
    },
    materials: ['wood', 'fabric']
  },
  
  modern: {
    name: 'Modern',
    cssFile: 'modern.css',
    variables: {
      '--chessboard-light-square': '#FFFFFF',
      '--chessboard-dark-square': '#4A4A4A',
      '--chessboard-border': '#2C2C2C',
      '--board-shadow': '0 8px 24px rgba(0,0,0,0.15)',
      '--material-texture': 'linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.05) 50%, transparent 75%)',
      '--material-shine': '0.03',
      '--material-depth': '1px'
    },
    materials: ['glass', 'metal']
  },
  
  tournament: {
    name: 'Tournament',
    cssFile: 'tournament.css',
    variables: {
      '--chessboard-light-square': '#F7F7F7',
      '--chessboard-dark-square': '#5D5D5D',
      '--chessboard-border': '#333333',
      '--board-shadow': '0 2px 8px rgba(0,0,0,0.1)',
      '--material-texture': 'none',
      '--material-shine': '0',
      '--material-depth': '0px'
    },
    materials: ['wood', 'fabric']
  },
  
  executive: {
    name: 'Executive',
    cssFile: 'executive.css',
    variables: {
      '--chessboard-light-square': '#F5F5DC',
      '--chessboard-dark-square': '#8B4513',
      '--chessboard-border': '#654321',
      '--board-shadow': '0 6px 20px rgba(0,0,0,0.2)',
      '--material-texture': 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
      '--material-shine': '0.08',
      '--material-depth': '3px'
    },
    materials: ['wood', 'marble']
  },
  
  conqueror: {
    name: 'Conqueror',
    cssFile: 'conqueror.css',
    variables: {
      '--chessboard-light-square': '#D4AF37',
      '--chessboard-dark-square': '#8B0000',
      '--chessboard-border': '#4B0000',
      '--board-shadow': '0 8px 32px rgba(139,0,0,0.3)',
      '--material-texture': 'linear-gradient(45deg, rgba(255,215,0,0.1) 25%, transparent 50%, rgba(255,215,0,0.1) 75%)',
      '--material-shine': '0.15',
      '--material-depth': '4px'
    },
    materials: ['metal', 'marble']
  },
  
  elegant: {
    name: 'Elegant',
    cssFile: 'elegant.css',
    variables: {
      '--chessboard-light-square': '#F4F1E8',
      '--chessboard-dark-square': '#8B7355',
      '--chessboard-border': '#5A4A37',
      '--board-shadow': '0 8px 32px rgba(0,0,0,0.15)',
      '--material-texture': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)',
      '--material-shine': '0.05',
      '--material-depth': '2px'
    },
    materials: ['marble', 'wood']
  },
  
  minimal: {
    name: 'Minimal',
    cssFile: 'minimal.css',
    variables: {
      '--chessboard-light-square': '#FAFAFA',
      '--chessboard-dark-square': '#E0E0E0',
      '--chessboard-border': '#BDBDBD',
      '--board-shadow': '0 2px 8px rgba(0,0,0,0.1)',
      '--material-texture': 'none',
      '--material-shine': '0',
      '--material-depth': '0px'
    },
    materials: ['fabric']
  }
};

export const BOARD_MATERIAL_CONFIGS: Record<BoardMaterialType, Record<string, string>> = {
  wood: {
    '--material-texture': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    '--material-shine': '0.02',
    '--material-depth': '1px'
  },
  
  marble: {
    '--material-texture': 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%), radial-gradient(circle at 20% 80%, rgba(0,0,0,0.05) 0%, transparent 50%)',
    '--material-shine': '0.12',
    '--material-depth': '3px'
  },
  
  glass: {
    '--material-texture': 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
    '--material-shine': '0.25',
    '--material-depth': '2px'
  },
  
  metal: {
    '--material-texture': 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%, rgba(255,255,255,0.1) 100%)',
    '--material-shine': '0.3',
    '--material-depth': '1px'
  },
  
  fabric: {
    '--material-texture': 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)',
    '--material-shine': '0',
    '--material-depth': '0px'
  }
};

export const DEFAULT_THEME: ThemeType = 'classic';
export const DEFAULT_MATERIAL: BoardMaterialType = 'wood';

export const THEME_DISPLAY_NAMES: Record<ThemeType, string> = {
  classic: 'Classic',
  modern: 'Modern',
  tournament: 'Tournament',
  executive: 'Executive',
  conqueror: 'Conqueror',
  elegant: 'Elegant',
  minimal: 'Minimal'
};

export const MATERIAL_DISPLAY_NAMES: Record<BoardMaterialType, string> = {
  wood: 'Wood',
  marble: 'Marble',
  glass: 'Glass',
  metal: 'Metal',
  fabric: 'Fabric'
};
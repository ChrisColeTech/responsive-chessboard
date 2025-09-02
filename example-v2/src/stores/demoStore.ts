// Demo store - manages demo chessboard configuration and settings
import { create } from 'zustand';
import type { ChessboardConfig, ControlPanelSettings } from '@/types';
import { CHESSBOARD_THEMES, PIECE_SETS, DEFAULT_CONFIG } from '@/constants';

interface DemoState {
  // Current configuration
  config: ChessboardConfig;
  controlPanelSettings: ControlPanelSettings;
  
  // UI state
  activeTab: 'play' | 'configuration' | 'examples';
  showControlPanel: boolean;
  showCodeExample: boolean;
  exampleType: 'basic' | 'advanced' | 'responsive' | 'migration';
  
  // Actions
  updateConfig: (updates: Partial<ChessboardConfig>) => void;
  updateControlPanel: (updates: Partial<ControlPanelSettings>) => void;
  resetConfig: () => void;
  setActiveTab: (tab: 'play' | 'configuration' | 'examples') => void;
  toggleControlPanel: () => void;
  toggleCodeExample: () => void;
  setExampleType: (type: 'basic' | 'advanced' | 'responsive' | 'migration') => void;
  
  // Presets
  applyPreset: (preset: 'tournament' | 'casual' | 'analysis' | 'puzzle') => void;
  
  // Code generation helpers
  generateCodeExample: () => string;
  exportConfig: () => string;
}

const defaultControlPanelSettings: ControlPanelSettings = {
  boardTheme: DEFAULT_CONFIG.boardTheme,
  pieceSet: DEFAULT_CONFIG.pieceSet,
  boardOrientation: DEFAULT_CONFIG.boardOrientation,
  showCoordinates: DEFAULT_CONFIG.showCoordinates,
  animationsEnabled: true,
  animationDuration: 200,
  boardWidth: DEFAULT_CONFIG.boardWidth
};

export const useDemoStore = create<DemoState>((set, get) => ({
  // Initial state
  config: { ...DEFAULT_CONFIG },
  controlPanelSettings: { ...defaultControlPanelSettings },
  activeTab: 'play',
  showControlPanel: true,
  showCodeExample: false,
  exampleType: 'basic',

  // Configuration updates
  updateConfig: (updates) => {
    set((state) => ({
      config: { ...state.config, ...updates }
    }));
  },

  updateControlPanel: (updates) => {
    set((state) => {
      const newSettings = { ...state.controlPanelSettings, ...updates };
      
      // Sync relevant settings back to main config
      const configUpdates: any = {};
      if (updates.boardTheme) configUpdates.boardTheme = updates.boardTheme;
      if (updates.pieceSet) configUpdates.pieceSet = updates.pieceSet;
      if (updates.boardOrientation) configUpdates.boardOrientation = updates.boardOrientation;
      if (updates.showCoordinates !== undefined) configUpdates.showCoordinates = updates.showCoordinates;
      if (updates.boardWidth) configUpdates.boardWidth = updates.boardWidth;
      
      return {
        controlPanelSettings: newSettings,
        config: { ...state.config, ...configUpdates }
      };
    });
  },

  resetConfig: () => {
    set({
      config: { ...DEFAULT_CONFIG },
      controlPanelSettings: { ...defaultControlPanelSettings }
    });
  },

  // UI state management
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  toggleControlPanel: () => {
    set((state) => ({ showControlPanel: !state.showControlPanel }));
  },

  toggleCodeExample: () => {
    set((state) => ({ showCodeExample: !state.showCodeExample }));
  },

  setExampleType: (type) => {
    set({ exampleType: type });
  },

  // Presets
  applyPreset: (preset) => {
    let presetConfig: any = {};
    let presetControlPanel: any = {};

    switch (preset) {
      case 'tournament':
        presetConfig = {
          boardTheme: 'tournament',
          pieceSet: 'tournament', 
          showCoordinates: true,
          boardWidth: 600
        };
        presetControlPanel = {
          boardTheme: 'tournament',
          pieceSet: 'tournament',
          showCoordinates: true,
          boardWidth: 600,
          animationsEnabled: true,
          animationDuration: 150,
          boardOrientation: 'white'
        };
        break;

      case 'casual':
        presetConfig = {
          boardTheme: 'classic',
          pieceSet: 'classic',
          showCoordinates: false,
          boardWidth: 500
        };
        presetControlPanel = {
          boardTheme: 'classic',
          pieceSet: 'classic',
          showCoordinates: false,
          boardWidth: 500,
          animationsEnabled: true,
          animationDuration: 300,
          boardOrientation: 'white'
        };
        break;

      case 'analysis':
        presetConfig = {
          boardTheme: 'modern',
          pieceSet: 'modern',
          showCoordinates: true,
          boardWidth: 700
        };
        presetControlPanel = {
          boardTheme: 'modern',
          pieceSet: 'modern',
          showCoordinates: true,
          boardWidth: 700,
          animationsEnabled: false,
          animationDuration: 0,
          boardOrientation: 'white'
        };
        break;

      case 'puzzle':
        presetConfig = {
          boardTheme: 'puzzle',
          pieceSet: 'puzzle',
          showCoordinates: false,
          boardWidth: 400
        };
        presetControlPanel = {
          boardTheme: 'puzzle',
          pieceSet: 'puzzle',
          showCoordinates: false,
          boardWidth: 400,
          animationsEnabled: true,
          animationDuration: 200,
          boardOrientation: 'white'
        };
        break;

      default:
        return;
    }

    set((state) => ({
      config: { ...state.config, ...presetConfig },
      controlPanelSettings: { ...state.controlPanelSettings, ...presetControlPanel }
    }));
  },

  // Code generation
  generateCodeExample: () => {
    const { config, exampleType } = get();
    
    switch (exampleType) {
      case 'basic':
        return `import { Chessboard } from 'responsive-chessboard';

function MyChessboard() {
  return (
    <Chessboard
      initialFen="${config.initialFen}"
      boardTheme="${config.boardTheme}"
      pieceSet="${config.pieceSet}"
      showCoordinates={${config.showCoordinates}}
      width={${config.boardWidth}}
    />
  );
}`;

      case 'advanced':
        return `import { Chessboard } from 'responsive-chessboard';
import { useState } from 'react';

function AdvancedChessboard() {
  const [position, setPosition] = useState('${config.initialFen}');
  
  const handleMove = (move) => {
    // Handle move logic here
    console.log('Move made:', move);
  };
  
  return (
    <Chessboard
      initialFen={position}
      boardTheme="${config.boardTheme}"
      pieceSet="${config.pieceSet}"
      boardOrientation="${config.boardOrientation}"
      showCoordinates={${config.showCoordinates}}
      animationsEnabled={true}
      width={${config.boardWidth}}
      onMove={handleMove}
    />
  );
}`;

      case 'responsive':
        return `import { Chessboard } from 'responsive-chessboard';
import { useEffect, useState } from 'react';

function ResponsiveChessboard() {
  const [containerWidth, setContainerWidth] = useState(${config.boardWidth});
  
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('chess-container');
      if (container) {
        setContainerWidth(container.offsetWidth - 32);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div id="chess-container" className="w-full p-4">
      <Chessboard
        width={Math.min(containerWidth, 800)}
        boardTheme="${config.boardTheme}"
        pieceSet="${config.pieceSet}"
        showCoordinates={${config.showCoordinates}}
      />
    </div>
  );
}`;

      case 'migration':
        return `// Before (POC API)
<Chessboard
  FEN="${config.initialFen}"
  onChange={handleChange}
  playerColor="${config.boardOrientation}"
  boardSize={${config.boardWidth}}
/>

// After (New API)
<Chessboard
  initialFen="${config.initialFen}"
  onMove={handleMove}
  boardOrientation="${config.boardOrientation}"
  width={${config.boardWidth}}
/>`;

      default:
        return '';
    }
  },

  exportConfig: () => {
    const { config } = get();
    return JSON.stringify(config, null, 2);
  }
}));

export type { DemoState };
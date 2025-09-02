// SRP: Renders dedicated free play chess demo page following ASCII mockup layout
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Menu, RotateCcw, Play, Square } from 'lucide-react';
import { ChessboardDemo } from '@/components/demo/ChessboardDemo';
import { useFreePlayState } from '@/hooks/demo/useFreePlayState';
import { useChessboardSettings } from '@/hooks/demo/useChessboardSettings';
import { useResponsiveTesting } from '@/hooks/demo/useResponsiveTesting';
import { FreePlayPageProps } from '@/types/demo/demo.types';
import { cn } from '@/utils/ui/ui.utils';

export function FreePlayPage({ className = '' }: FreePlayPageProps): React.ReactElement {
  // Toolbar expansion state
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);

  // Chess game state management
  const {
    gameState,
    makeMove,
    resetGame,
    flipBoard,
    newGame,
    isLoading: gameLoading,
    error: gameError
  } = useFreePlayState();

  // Chessboard settings management
  const {
    settings,
    updateTheme,
    updatePieceSet,
    toggleCoordinates,
    toggleAnimations,
    flipBoardOrientation,
    resetToDefaults,
    isLoading: settingsLoading,
    error: settingsError
  } = useChessboardSettings();

  // Responsive testing container controls
  const {
    containerConfig,
    setContainerSize,
    containerDimensions
  } = useResponsiveTesting();

  // Combined loading state
  const isLoading = gameLoading || settingsLoading;
  const error = gameError || settingsError;

  // Debug logging
  console.log('FreePlayPage render:', {
    gameState,
    settings,
    containerConfig,
    isLoading,
    error,
    isToolbarExpanded,
    gameLoading,
    settingsLoading,
    makeMove: typeof makeMove,
    resetGame: typeof resetGame,
    newGame: typeof newGame,
    flipBoardOrientation: typeof flipBoardOrientation
  });

  return (
    <div className={cn('flex-1 flex flex-col', className)}>
      {/* Collapsible Control Toolbar - Following ASCII mockup */}
      <div className="border-b border-border bg-muted/50 px-4 py-2">
          {/* Always visible essential controls */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              {/* Hamburger menu toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  console.log('Hamburger menu clicked, current expanded:', isToolbarExpanded);
                  setIsToolbarExpanded(!isToolbarExpanded);
                }}
                className="p-2"
              >
                <Menu className="w-4 h-4" />
              </Button>
              
              {/* Essential game controls */}
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  console.log('New Game clicked');
                  newGame();
                }}
                disabled={isLoading}
                className="px-3 py-1"
              >
                <Play className="w-3 h-3 mr-1" />
                New
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  console.log('Reset clicked');
                  resetGame();
                }}
                disabled={isLoading}
                className="px-3 py-1"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  console.log('Flip clicked, current orientation:', settings.boardOrientation);
                  flipBoardOrientation();
                }}
                disabled={isLoading}
                className="px-3 py-1"
              >
                Flip
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Theme dropdown */}
              <select
                value={settings.theme}
                onChange={(e) => {
                  console.log('Theme changed to:', e.target.value);
                  updateTheme(e.target.value as any);
                }}
                className="px-2 py-1 text-xs border border-border rounded bg-background text-foreground"
              >
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
                <option value="blue">Blue</option>
                <option value="wood">Wood</option>
              </select>
              
              {/* Pieces dropdown */}
              <select
                value={settings.pieceSet}
                onChange={(e) => updatePieceSet(e.target.value as any)}
                className="px-2 py-1 text-xs border border-border rounded bg-background text-foreground"
              >
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
                <option value="tournament">Tournament</option>
                <option value="executive">Executive</option>
                <option value="conqueror">Conqueror</option>
              </select>
              
              {/* Size indicator */}
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Square className="w-3 h-3" />
                {containerConfig.size === 'small' ? 'S' : containerConfig.size === 'medium' ? 'M' : 'L'}
              </span>
            </div>
          </div>
          
          {/* Expanded control panel */}
          {isToolbarExpanded && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Container size controls */}
                <div>
                  <label className="text-xs font-medium text-foreground mb-2 block">
                    Container Size
                  </label>
                  <div className="flex gap-2">
                    {['small', 'medium', 'large'].map((size) => (
                      <label key={size} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="containerSize"
                          value={size}
                          checked={containerConfig.size === size}
                          onChange={(e) => setContainerSize(e.target.value as any)}
                          className="sr-only"
                        />
                        <div className={cn(
                          'px-2 py-1 text-xs rounded border',
                          containerConfig.size === size
                            ? 'bg-chess-royal text-white border-chess-royal'
                            : 'bg-secondary text-secondary-foreground border-border'
                        )}>
                          {size[0].toUpperCase()}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Board options */}
                <div>
                  <label className="text-xs font-medium text-foreground mb-2 block">
                    Board Options
                  </label>
                  <div className="flex gap-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showCoordinates}
                        onChange={toggleCoordinates}
                        className="sr-only"
                      />
                      <div className={cn(
                        'px-2 py-1 text-xs rounded border',
                        settings.showCoordinates
                          ? 'bg-chess-sage text-white border-chess-sage'
                          : 'bg-secondary text-secondary-foreground border-border'
                      )}>
                        Coords
                      </div>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.animationsEnabled}
                        onChange={toggleAnimations}
                        className="sr-only"
                      />
                      <div className={cn(
                        'px-2 py-1 text-xs rounded border',
                        settings.animationsEnabled
                          ? 'bg-chess-sage text-white border-chess-sage'
                          : 'bg-secondary text-secondary-foreground border-border'
                      )}>
                        Animate
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Game status */}
                <div>
                  <label className="text-xs font-medium text-foreground mb-2 block">
                    Status
                  </label>
                  <div className="text-xs text-muted-foreground">
                    <div>{gameState?.turn === 'white' ? 'White' : 'Black'} to move</div>
                    <div>Move {gameState?.moveCount || 1}</div>
                  </div>
                </div>
              </div>
              
              {/* FEN display */}
              <div className="mt-3 pt-3 border-t border-border">
                <label className="text-xs font-medium text-foreground mb-1 block">
                  Current Position (FEN)
                </label>
                <div className="text-xs font-mono text-muted-foreground bg-muted p-2 rounded border overflow-x-auto">
                  {gameState?.currentFen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}
                </div>
              </div>
            </div>
          )}
      </div>
      
      {/* Error Display */}
      {error && (
        <Card className="mx-4 mt-2 bg-destructive/10 border-destructive/20">
          <div className="p-3 text-destructive text-sm">
            {error.message}
          </div>
        </Card>
      )}
      
      {/* CHESSBOARD HERO SECTION - Dominates the layout */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <Card className="overflow-hidden">
            <div className="aspect-square">
              <ChessboardDemo
                gameState={gameState}
                settings={settings}
                containerConfig={containerConfig}
                onMove={async (move) => await makeMove(move)}
                onError={(error) => console.error('Chessboard error:', error)}
                className="w-full h-full"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
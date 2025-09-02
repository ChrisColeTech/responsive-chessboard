/**
 * VS Computer Page
 * Domain: Demo - VS Computer chess game page
 * Architecture: Features layer - orchestrates complete VS Computer experience
 * 
 * Layout: Chessboard-dominant design matching ASCII mockup specification
 * - Compact top controls bar
 * - Simple status lines above/below board  
 * - Large chessboard taking 80%+ of screen space
 * - Single info strip at bottom
 */

import React, { useState } from 'react';
import { Menu, Clock, Bot, User, Crown } from 'lucide-react';

import { Chessboard } from 'responsive-chessboard';
import { useVSComputerState } from '../../hooks/demo/useVSComputerState';
import { Square } from 'chess.js';

import type { ComputerDifficulty } from '../../types/chess/computer-opponent.types';

/**
 * VS Computer Chess Demo Page
 * 
 * Features:
 * - Chessboard-dominant layout (80%+ screen space)
 * - Minimal UI approach with compact controls
 * - Human vs Computer gameplay with Stockfish.js AI  
 * - Multiple difficulty levels (1-10)
 * - Simple status lines for players
 * - Single info strip for game details
 */
export function VSComputerPage(): React.ReactElement {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('cyber-neon');
  const [currentPieceSet, setCurrentPieceSet] = useState('classic');

  const {
    gameState,
    settings,
    isLoading,
    error,
    makeMove,
    newGame,
    resignGame,
    offerDraw,
    setDifficulty,
    setPlayerColor,
    selectSquare,
    getSquareHighlights,
    isPlayerTurn,
    canMakeMove,
    formatTime,
    getComputerStatus,
    getHumanStatus,
    getOpeningName,
    getRecentMoves
  } = useVSComputerState({
    onError: (error) => console.error('VS Computer error:', error),
    onGameEnd: (result) => console.log('Game ended:', result),
    onMove: (move) => console.log('Move made:', move)
  });

  const handleSquareClick = (square: string) => {
    // Ensure square is valid chess notation
    const validSquarePattern = /^[a-h][1-8]$/;
    if (validSquarePattern.test(square)) {
      selectSquare(square as Square);
    } else {
      console.log('Invalid square notation in handleSquareClick:', square);
    }
  };

  const handleMoveAttempt = async (move: { from: string; to: string; promotion?: string }) => {
    console.log('Move attempt:', move, 'canMakeMove:', canMakeMove);
    
    if (move && move.from && move.to) {
      console.log('Attempting move:', move.from, 'to', move.to);
      const success = await makeMove(move.from, move.to, move.promotion);
      console.log('Move result:', success);
      return success;
    }
    return false;
  };

  const handleSquareClickDebug = (position: any) => {
    console.log('Square clicked:', position, 'canMakeMove:', canMakeMove);
    
    // Convert position object to square string
    let square: string;
    if (typeof position === 'string') {
      square = position;
    } else if (position && position.file && position.rank) {
      square = `${position.file}${position.rank}`;
    } else {
      console.log('Invalid position format:', position);
      return;
    }
    
    console.log('Converted to square:', square);
    console.log('Current selected square:', gameState.selectedSquare);
    console.log('Valid moves:', gameState.validMoves);
    console.log('Game state:', {
      currentPlayer: gameState.currentPlayer,
      playerColor: settings.playerColor,
      isPlayerTurn: isPlayerTurn,
      gameStatus: gameState.gameStatus,
      fen: gameState.chess.fen(),
      turn: gameState.chess.turn()
    });
    
    // Ensure square is valid chess notation before calling selectSquare
    const validSquarePattern = /^[a-h][1-8]$/;
    if (validSquarePattern.test(square)) {
      selectSquare(square as Square);
    } else {
      console.log('Invalid square notation:', square);
    }
  };

  const getCustomSquareStyles = () => {
    const highlights = getSquareHighlights();
    const styles: any = {};
    
    Object.entries(highlights).forEach(([square, type]) => {
      switch (type) {
        case 'selected':
          styles[square] = { backgroundColor: 'rgba(255, 255, 0, 0.4)' };
          break;
        case 'valid':
          styles[square] = { backgroundColor: 'rgba(0, 255, 0, 0.3)' };
          break;
        case 'lastMove':
          styles[square] = { backgroundColor: 'rgba(255, 255, 0, 0.3)' };
          break;
      }
    });
    
    return styles;
  };



  return (
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Main Content - Chessboard Dominant Layout */}
        <div className="flex-1 flex flex-col p-4 max-w-6xl mx-auto">
        {/* Compact Top Controls Bar */}
        <div className="mb-4 bg-card/60 backdrop-blur-sm border border-border/40 rounded-lg px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => newGame()}
                className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 rounded transition-colors"
              >
                New
              </button>
              
              <button
                onClick={() => newGame(settings.playerColor)}
                className="px-3 py-1 text-sm bg-muted/60 text-muted-foreground hover:bg-muted rounded transition-colors"
              >
                Reset
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Play As:</span>
                <select
                  value={settings.playerColor}
                  onChange={(e) => setPlayerColor(e.target.value as 'white' | 'black')}
                  className="px-2 py-1 text-sm border border-border rounded bg-background text-foreground"
                >
                  <option value="white">White</option>
                  <option value="black">Black</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">AI Level:</span>
                <select
                  value={settings.difficulty}
                  onChange={(e) => setDifficulty(parseInt(e.target.value) as ComputerDifficulty)}
                  className="px-2 py-1 text-sm border border-border rounded bg-background text-foreground"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Theme:</span>
                <select
                  value={currentTheme}
                  onChange={(e) => setCurrentTheme(e.target.value)}
                  className="px-2 py-1 text-sm border border-border rounded bg-background text-foreground"
                >
                  <option value="cyber-neon">Cyber Neon</option>
                  <option value="dragon-gold">Dragon Gold</option>
                  <option value="shadow-knight">Shadow Knight</option>
                  <option value="mystic-purple">Mystic Purple</option>
                  <option value="ocean-depths">Ocean Depths</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Pieces:</span>
                <select
                  value={currentPieceSet}
                  onChange={(e) => setCurrentPieceSet(e.target.value)}
                  className="px-2 py-1 text-sm border border-border rounded bg-background text-foreground"
                >
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="tournament">Tournament</option>
                  <option value="executive">Executive</option>
                  <option value="conqueror">Conqueror</option>
                </select>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {getComputerStatus()}
            </div>
          </div>
        </div>

        {/* Advanced Settings Panel (Collapsed by Default) */}
        {showAdvancedSettings && (
          <div className="mb-4 bg-card/40 backdrop-blur-sm border border-border/30 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Game Actions */}
              <div>
                <label className="text-xs font-medium text-foreground mb-2 block">
                  Game Actions
                </label>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={resignGame}
                    disabled={gameState.gameStatus !== 'playing'}
                    className="px-3 py-1 text-xs bg-destructive/20 text-destructive hover:bg-destructive/30 rounded disabled:opacity-50 text-left"
                  >
                    Resign Game
                  </button>
                  <button
                    onClick={offerDraw}
                    disabled={gameState.gameStatus !== 'playing'}
                    className="px-3 py-1 text-xs bg-muted/60 text-muted-foreground hover:bg-muted rounded disabled:opacity-50 text-left"
                  >
                    Offer Draw
                  </button>
                </div>
              </div>
              
              {/* Board Options */}
              <div>
                <label className="text-xs font-medium text-foreground mb-2 block">
                  Board Display
                </label>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setPlayerColor(settings.playerColor === 'white' ? 'black' : 'white')}
                    className="px-3 py-1 text-xs bg-muted/60 text-muted-foreground hover:bg-muted rounded text-left"
                  >
                    Flip Board View
                  </button>
                </div>
              </div>
              
              {/* Game Status */}
              <div>
                <label className="text-xs font-medium text-foreground mb-2 block">
                  Current Status
                </label>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Status: {gameState.gameStatus}</div>
                  <div>Turn: {gameState.currentPlayer}</div>
                  <div>Move: {Math.ceil(gameState.moveHistory.length / 2)}</div>
                  {gameState.isCheck && <div className="text-destructive">Check!</div>}
                </div>
              </div>
              
            </div>
            
            {/* Move History */}
            <div className="mt-4 pt-4 border-t border-border">
              <label className="text-xs font-medium text-foreground mb-2 block">
                Recent Moves
              </label>
              <div className="text-xs font-mono text-muted-foreground bg-muted/30 p-2 rounded max-h-20 overflow-y-auto">
                {getRecentMoves()}
              </div>
            </div>
          </div>
        )}

        {/* Computer Status Line (Above Board) */}
        <div className="mb-3 text-center text-sm text-muted-foreground">
          <Bot className="w-4 h-4 inline mr-1" />
          <span>Stockfish Level {settings.difficulty}</span>
          <span className="mx-3">
            <Crown className="w-4 h-4 inline mr-1" />
            {settings.playerColor === 'white' ? 'Black' : 'White'}
          </span>
          <span className="mx-3">
            <Clock className="w-4 h-4 inline mr-1" />
            {formatTime(settings.playerColor === 'white' ? gameState.timer.blackTime : gameState.timer.whiteTime)}
          </span>
          <span>{getComputerStatus()}</span>
        </div>

        {/* Large Chessboard (Hero Element - 80%+ Screen Space) */}
        <div className="flex-1 flex items-center justify-center mb-3">
          <div className="w-full max-w-none" style={{ height: '80vh' }}>
            <div className="w-full h-full max-w-none max-h-none">
              <Chessboard
                initialFen={gameState.chess.fen()}
                boardOrientation={settings.playerColor === 'black' ? 'black' : 'white'}
                onMove={handleMoveAttempt}
                onSquareClick={handleSquareClickDebug}
                allowDragAndDrop={canMakeMove}
                showCoordinates={true}
                customSquareStyles={getCustomSquareStyles()}
                animationDuration={300}
                boardTheme={currentTheme}
                pieceSet={currentPieceSet}
                className="w-full h-full shadow-lg"
                width={600}
                responsive={false}
              />
            </div>
          </div>
        </div>

        {/* Human Status Line (Below Board) */}
        <div className="mb-4 text-center text-sm text-muted-foreground">
          <User className="w-4 h-4 inline mr-1" />
          <span>You (Human)</span>
          <span className="mx-3">
            <Crown className="w-4 h-4 inline mr-1" />
            {settings.playerColor === 'white' ? 'White' : 'Black'}
          </span>
          <span className="mx-3">
            <Clock className="w-4 h-4 inline mr-1" />
            {formatTime(settings.playerColor === 'white' ? gameState.timer.whiteTime : gameState.timer.blackTime)}
          </span>
          <span>{getHumanStatus()}</span>
        </div>

        {/* Single Info Strip (Bottom) */}
        <div className="text-center text-sm text-muted-foreground bg-muted/30 rounded-lg py-2 px-4">
          <span>Move {Math.ceil(gameState.moveHistory.length / 2)}</span>
          <span className="mx-2">•</span>
          <span>{getOpeningName()}</span>
          <span className="mx-2">•</span>
          <span className="font-mono">{getRecentMoves()}</span>
          {gameState.gameResult && (
            <>
              <span className="mx-2">•</span>
              <span className="text-foreground font-medium">{gameState.gameResult}</span>
            </>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 bg-destructive/20 border border-destructive/30 rounded-lg p-4">
            <h4 className="text-sm font-medium text-destructive mb-2">Error</h4>
            <p className="text-sm text-destructive/80">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
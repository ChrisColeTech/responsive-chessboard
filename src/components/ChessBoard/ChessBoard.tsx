import React, { FC, useEffect } from 'react'
import type { 
  FigureColor, 
  GameResult, 
  MoveData, 
  ChangeMove, 
  ChessBoardConfig,
  ResponsiveSizing 
} from '../../types'
import { FENtoGameState } from '../../engine'
import { useChessBoardInteractive } from '../../hooks'
import { 
  calculateBoardSize,
  constrainSize,
  generateCSSProperties,
  getChessBoardConfig 
} from '../../utils'
import styles from '../../styles/ChessBoard.module.css'

// Layout Components
import { ChessBoardCellsLayout } from '../layouts/ChessBoardCellsLayout'
import { ChessBoardFiguresLayout } from '../layouts/ChessBoardFiguresLayout'
import { ChessBoardInteractiveLayout } from '../layouts/ChessBoardInteractiveLayout'
import { ChessBoardControlLayout } from '../layouts/ChessBoardControlLayout'
import { ArrowLayout } from '../Arrow/ArrowLayout'
import { FigurePicker } from '../FigurePicker/FigurePicker'
import { correctGrabbingPosByScroll, correctGrabbingPosForArrow } from '../../utils'

interface ChessBoardProps extends ResponsiveSizing {
  FEN: string
  onChange: (moveData: MoveData) => void
  onEndGame: (result: GameResult) => void
  change?: ChangeMove
  reversed?: boolean
  config?: Partial<ChessBoardConfig>
  playerColor?: FigureColor
}

export const ChessBoard: FC<ChessBoardProps> = ({
  FEN, 
  onChange,
  onEndGame,
  change, 
  reversed,
  config,
  playerColor,
  boardSize,
  width,
  height,
  responsive = false,
  minSize,
  maxSize,
}) => {
  const {
    fromPos,
    newMove,
    boardConfig,
    markedCells,
    grabbingPos,
    currentColor,
    arrowsCoords,
    initialState,
    holdedFigure,
    grabbingCell,
    possibleMoves,
    startArrowCoord,
    showFigurePicker,
    markCell,
    setNewMove,
    handleClick,
    handleGrabEnd,
    handleGrabbing,
    endRenderArrow,
    setActualState,
    setPlayerColor,
    setCurrentColor,
    selectClickFrom,
    selectHoverFrom,
    setInitialState,
    startRenderArrow,
    reverseChessBoard,
    handleGrabbingCell,
    getHasCheckByCellPos,
    handleSelectFigurePicker,
  } = useChessBoardInteractive({ onChange, onEndGame, config })

  // Calculate responsive sizing
  const dynamicSize = calculateBoardSize({ boardSize, width, height })
  const constrainedSize = constrainSize(dynamicSize, minSize, maxSize)
  const finalCellSize = constrainedSize / 8

  // Enhanced config with dynamic sizing
  const enhancedConfig = getChessBoardConfig({
    ...config,
    cellSize: finalCellSize
  })

  useEffect(() => {
    setPlayerColor(playerColor)
  }, [playerColor, setPlayerColor])

  useEffect(() => {
    const { boardState, currentColor } = FENtoGameState(FEN)
    setInitialState(boardState)
    setActualState(boardState)
    setCurrentColor(currentColor)
  }, [FEN, setInitialState, setActualState, setCurrentColor])

  useEffect(() => {
    if (reversed) reverseChessBoard()
  }, [reversed, reverseChessBoard])

  useEffect(() => {
    setNewMove(change)
  }, [change, setNewMove])

  return (
    <div 
      className={styles.chessBoard}
      style={generateCSSProperties(constrainedSize)}
    >
      <ChessBoardCellsLayout boardConfig={enhancedConfig} />
      
      <ChessBoardFiguresLayout
        initialState={initialState}
        change={newMove}
        reversed={reversed}
        boardConfig={enhancedConfig}
      />
      
      <ChessBoardInteractiveLayout
        selectedPos={fromPos}
        possibleMoves={possibleMoves}
        holdedFigure={holdedFigure}
        grabbingPos={correctGrabbingPosByScroll(grabbingPos)}
        markedCells={markedCells}
        boardConfig={enhancedConfig}
        onHasCheck={getHasCheckByCellPos}
      />
      
      <ArrowLayout 
        arrowsCoords={arrowsCoords}
        startArrowCoord={startArrowCoord}
        grabbingPos={correctGrabbingPosForArrow(grabbingCell, enhancedConfig)}
        boardConfig={enhancedConfig}
      />
      
      <ChessBoardControlLayout
        boardConfig={enhancedConfig}
        onClick={handleClick}
        onGrabStart={selectHoverFrom}
        onGrabStartRight={startRenderArrow}
        onGrabEnd={handleGrabEnd}
        onGrabEndRight={endRenderArrow}
        onGrabbing={handleGrabbing}
        onRightClick={markCell}
        onGrabbingCell={handleGrabbingCell}
      />
      
      {showFigurePicker && (
        <div className={styles.chessBoardFigurePicker}>
          <FigurePicker
            boardConfig={enhancedConfig}
            color={currentColor}
            forPawnTransform
            onSelect={handleSelectFigurePicker}
          />
        </div>
      )}
    </div>
  )
}
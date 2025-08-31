import { FENtoGameState, FigureColor, GameResult, MoveData } from "../JSChessEngine";
import React, { FC, useEffect } from "react";
import styles from './ChessBoard.module.css';
import { ChessBoardCellsLayout } from "./ChessBoardCellsLayout";
import { ChessBoardFiguresLayout } from "./ChessBoardFiguresLayout";
import { ChessBoardControlLayout } from "./ChessBoardControlLayout";
import { useChessBoardInteractive } from "./useChessBoardInteractive";
import { ChessBoardInteractiveLayout } from "./ChessBoardInteractiveLayout";
import { ChangeMove, ChessBoardConfig } from "./models";
import { ArrowLayout } from "./ArrowLayout";
import { FigurePicker } from "./FigurePicker";
import { correctGrabbingPosByScroll, correctGrabbingPosForArrow } from "./utils";

type ChessBoardProps = {
    FEN: string;
    onChange: (moveData: MoveData) => void;
    onEndGame: (result: GameResult) => void;
    change?: ChangeMove;
    reversed?: boolean;
    config?: Partial<ChessBoardConfig>;
    playerColor?: FigureColor;
    // NEW: Responsive sizing props
    boardSize?: number;        // Single size (square board)
    width?: number;           // Explicit width
    height?: number;          // Explicit height
    responsive?: boolean;     // Enable responsive mode
    minSize?: number;        // Minimum size constraint
    maxSize?: number;        // Maximum size constraint
}

export const ChessBoard: FC<ChessBoardProps> = (props) => {
    const { 
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
    } = props;

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
    } = useChessBoardInteractive({ onChange, onEndGame, config });

    useEffect(() => {
        setPlayerColor(playerColor);
    }, [playerColor]);

    useEffect(() => {
        const { boardState, currentColor } = FENtoGameState(FEN);
        setInitialState(boardState);
        setActualState(boardState);
        setCurrentColor(currentColor);
    }, [FEN]);

    useEffect(() => {
        if (reversed) reverseChessBoard();
    }, [reversed]);

    useEffect(() => {
        setNewMove(change);
    }, [change]);

    // Calculate dynamic board size
    const calculateBoardSize = () => {
        if (boardSize) return boardSize;
        if (width) return width;
        if (height) return height;
        return 400; // Default size
    };

    const dynamicSize = calculateBoardSize();
    const cellSize = dynamicSize / 8;

    // Apply size constraints
    const constrainedSize = minSize && maxSize ? 
        Math.min(Math.max(dynamicSize, minSize), maxSize) :
        minSize ? Math.max(dynamicSize, minSize) :
        maxSize ? Math.min(dynamicSize, maxSize) :
        dynamicSize;

    const finalCellSize = constrainedSize / 8;

    // Enhanced config with dynamic sizing
    const enhancedConfig = {
        ...config,
        cellSize: finalCellSize
    };

    return (
        <div 
            className={styles.chessBoard}
            style={{
                '--board-size': `${constrainedSize}px`,
                '--cell-size': `${finalCellSize}px`,
                '--piece-size': `${finalCellSize * 0.8}px`,
            } as React.CSSProperties}
        >
            <ChessBoardCellsLayout boardConfig={{ ...boardConfig, ...enhancedConfig }} />
            <ChessBoardFiguresLayout
                initialState={initialState}
                change={newMove}
                reversed={reversed}
                boardConfig={{ ...boardConfig, ...enhancedConfig }}
            />
            <ChessBoardInteractiveLayout
                selectedPos={fromPos}
                possibleMoves={possibleMoves}
                holdedFigure={holdedFigure}
                grabbingPos={correctGrabbingPosByScroll(grabbingPos)}
                markedCells={markedCells}
                boardConfig={{ ...boardConfig, ...enhancedConfig }}
                onHasCheck={getHasCheckByCellPos}
            />
            <ArrowLayout 
                arrowsCoords={arrowsCoords}
                startArrowCoord={startArrowCoord}
                grabbingPos={correctGrabbingPosForArrow(grabbingCell, { ...boardConfig, ...enhancedConfig })}
                boardConfig={{ ...boardConfig, ...enhancedConfig }}
            />
            <ChessBoardControlLayout
                boardConfig={{ ...boardConfig, ...enhancedConfig }}
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
                        boardConfig={{ ...boardConfig, ...enhancedConfig }}
                        color={currentColor}
                        forPawnTransform
                        onSelect={handleSelectFigurePicker}
                    />
                </div>
            )}
        </div>
    )
}

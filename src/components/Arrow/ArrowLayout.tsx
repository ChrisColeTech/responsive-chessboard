import React, { FC } from "react";
import { CellPos } from "../../engine";
import { Arrow } from "./Arrow";
import { ArrowCoords, ChessBoardConfig } from "../../types";
import styles from '../../styles/ChessBoard.module.css';

type ArrowLayoutType = {
    startArrowCoord: CellPos;
    arrowsCoords: ArrowCoords[];
    grabbingPos: CellPos;
    boardConfig: ChessBoardConfig;
}

export const ArrowLayout: FC<ArrowLayoutType> = (props) => {
    const {
        startArrowCoord,
        arrowsCoords,
        grabbingPos,
        boardConfig
    } = props;

    return (
        <div className={styles.arrowsLayer}>
            {(startArrowCoord[0] > -1) && (grabbingPos[0] > -1) && (
                <Arrow start={startArrowCoord} end={grabbingPos} color={boardConfig.arrowColor} />
            )}
            {arrowsCoords.map((coords, i) => (
                <Arrow key={i} {...coords} color={boardConfig.arrowColor} />
            ))}
        </div>
    );
}
import React from "react";
import {GameStatusType} from "../constants/constants";

export interface CellType {
    row: number;
    col: number;
    isBomb: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborBombs: number;
}

export interface BoardContextType {
    board: CellType[][];
    setBoard: React.Dispatch<React.SetStateAction<CellType[][]>>;
    resetBoard: () => void;
    rows: number;
    cols: number;
    bombRate: number;
    gameStatus: GameStatusType;
    setGameStatus: React.Dispatch<React.SetStateAction<GameStatusType>>;
    startTime: number | null;
    setStartTime: React.Dispatch<React.SetStateAction<number | null>>;
    elapsedTime: number;
}

export interface BoardProviderProps {
    children: React.ReactNode;
    rows: number;
    cols: number;
    bombRate: number;
}

export interface SelectedCell {
    row: number;
    col: number;
}

export interface CellProps {
    cell: CellType;
    onClick: () => void;
    onRightClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isSelected: boolean;
}
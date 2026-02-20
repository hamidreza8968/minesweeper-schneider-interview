import { SelectedCell } from "./board";
import { GameStatusType } from "../constants/constants";
import React from "react";

export interface KeyboardNavigationProps {
    setSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell>>;
    rows: number;
    cols: number;
    handleClick: (row: number, col: number) => void;
    handleFlag: (e: { preventDefault: () => void }, row: number, col: number) => void;
    gameStatus: GameStatusType;
    setIsUsingKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}
import React from "react";
import { GameStatusType } from "../constants/constants";
import {SelectedCell} from "./board";

export interface KeyboardNavigationProps {
    setSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell>>;
    rows: number;
    cols: number;
    handleClick: (row: number, col: number) => void;
    handleFlag: (e: React.MouseEvent<HTMLButtonElement>, row: number, col: number) => void;
    gameStatus: GameStatusType;
    setIsUsingKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}
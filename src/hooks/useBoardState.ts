import {useCallback, useEffect, useState} from "react";
import {generateBoard, isSameConfig} from "../utils/generateBoard";
import {loadFromStorage, saveToStorage, removeFromStorage} from "../utils/storage";
import {BOARD_KEY, STATUS_KEY, TIME_KEY, START_TIME_KEY, GameStatus, GameStatusType} from "../constants/constants";
import {CellType, StoredBoard} from "../types/board";


export function useBoardState(
    rows: number,
    cols: number,
    bombRate: number,
    setGameStatus: React.Dispatch<React.SetStateAction<GameStatusType>>,
    setStartTime: React.Dispatch<React.SetStateAction<number | null>>,
    setElapsedTime: React.Dispatch<React.SetStateAction<number>>
) {

    const [board, setBoard] = useState<CellType[][]>(() => {
        const stored = loadFromStorage<StoredBoard>(BOARD_KEY, {
            rows,
            cols,
            bombRate,
            board: generateBoard(rows, cols, bombRate),
        });

        if (stored && isSameConfig(stored, {rows, cols, bombRate})) {
            return stored.board;
        }

        return generateBoard(rows, cols, bombRate);
    });

    const resetBoard = useCallback(() => {
        const newBoard = generateBoard(rows, cols, bombRate);
        setBoard(newBoard);

        setGameStatus(GameStatus.NOT_PLAYING);
        setElapsedTime(0);
        setStartTime(null);

        removeFromStorage(TIME_KEY);
        removeFromStorage(START_TIME_KEY);
        removeFromStorage(STATUS_KEY);
    }, [rows, cols, bombRate, setGameStatus, setStartTime, setElapsedTime]);

    useEffect(() => {
        saveToStorage(BOARD_KEY, {
            rows,
            cols,
            bombRate,
            board,
        });
    }, [board, rows, cols, bombRate]);

    return {board, setBoard, resetBoard};
}
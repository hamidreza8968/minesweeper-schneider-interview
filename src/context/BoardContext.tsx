import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import {generateBoard, isSameConfig} from "../utils/generateBoard";
import {BOARD_KEY, GameStatus, GameStatusType, START_TIME_KEY, STATUS_KEY, TIME_KEY} from "../constants/constants";
import { loadFromStorage, saveToStorage, removeFromStorage } from "../utils/storage";
import { useTimer } from "../hooks/useTimer";
import { CellType, BoardContextType, BoardProviderProps } from "../types/board";

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider: React.FC<BoardProviderProps> = ({ children, rows, cols, bombRate }) => {
    const [board, setBoard] = useState<CellType[][]>(() => {
        const stored = loadFromStorage<{ rows: number; cols: number; bombRate: number; board: CellType[][] }>(BOARD_KEY);
        if (stored && isSameConfig(stored, { rows, cols, bombRate })) return stored.board;
        return generateBoard(rows, cols, bombRate);
    });

    const [gameStatus, setGameStatus] = useState<GameStatusType>(() => loadFromStorage<GameStatusType>(STATUS_KEY, GameStatus.NOT_PLAYING) as GameStatusType);
    const [startTime, setStartTime] = useState<number | null>(() => loadFromStorage<number | null>(START_TIME_KEY, null));
    const [elapsedTime, setElapsedTime] = useState<number>(() => loadFromStorage<number>(TIME_KEY, 0) ?? 0);

    const resetBoard = useCallback(() => {
        const newBoard = generateBoard(rows, cols, bombRate);
        setBoard(newBoard);
        setGameStatus(GameStatus.NOT_PLAYING);
        setElapsedTime(0);
        setStartTime(null);

        removeFromStorage(TIME_KEY);
        removeFromStorage(START_TIME_KEY);
        removeFromStorage(STATUS_KEY);
    }, [rows, cols, bombRate]);

    useEffect(() => {
        const stored = loadFromStorage<{ rows: number; cols: number; bombRate: number; board: CellType[][] }>(BOARD_KEY);
        if (!stored) return;
        if (!isSameConfig(stored, { rows, cols, bombRate })) resetBoard();
    }, [rows, cols, bombRate, resetBoard]);

    useEffect(() => {
        saveToStorage(BOARD_KEY, { rows, cols, bombRate, board });
        saveToStorage(TIME_KEY, elapsedTime);
        saveToStorage(STATUS_KEY, gameStatus);
        if (startTime) saveToStorage(START_TIME_KEY, startTime);
    }, [board, elapsedTime, gameStatus, startTime, rows, cols, bombRate]);

    useTimer(gameStatus === GameStatus.PLAYING, startTime, setElapsedTime);

    const value = useMemo<BoardContextType>(
        () => ({
            board,
            setBoard,
            resetBoard,
            rows,
            cols,
            bombRate,
            gameStatus,
            setGameStatus,
            startTime,
            setStartTime,
            elapsedTime,
        }),
        [board, rows, cols, bombRate, gameStatus, startTime, elapsedTime, resetBoard]
    );

    return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};

export const useBoard = (): BoardContextType => {
    const context = useContext(BoardContext);
    if (!context) throw new Error("useBoard must be used within a BoardProvider");
    return context;
};
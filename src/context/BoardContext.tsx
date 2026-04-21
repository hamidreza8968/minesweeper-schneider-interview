import React, {createContext, useContext, useMemo} from "react";
import {useBoardState} from "../hooks/useBoardState";
import {useGameStatus} from "../hooks/useGameStatus";
import {useGameTimer} from "../hooks/useGameTimer";
import {BoardContextType, BoardProviderProps} from "../types/board";

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider: React.FC<BoardProviderProps> = ({
                                                                children,
                                                                rows,
                                                                cols,
                                                                bombRate,
                                                            }) => {

    const {gameStatus, setGameStatus} = useGameStatus();
    const isPlaying = gameStatus === "playing";

    const {startTime, setStartTime, elapsedTime, setElapsedTime} = useGameTimer(isPlaying);
    const {board, setBoard, resetBoard} = useBoardState(
        rows,
        cols,
        bombRate,
        setGameStatus,
        setStartTime,
        setElapsedTime
    );

    const value = useMemo<BoardContextType>(() => ({
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
    }), [
        board,
        rows,
        cols,
        bombRate,
        gameStatus,
        startTime,
        elapsedTime,
        resetBoard,
    ]);

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );
};

export const useBoard = () => {
    const ctx = useContext(BoardContext);
    if (!ctx) throw new Error("useBoard must be used within BoardProvider");
    return ctx;
};
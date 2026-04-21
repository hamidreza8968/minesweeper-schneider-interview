import {useEffect, useState} from "react";
import {loadFromStorage, saveToStorage} from "../utils/storage";
import {STATUS_KEY, GameStatus, GameStatusType} from "../constants/constants";

export function useGameStatus() {
    const [gameStatus, setGameStatus] = useState<GameStatusType>(() =>
        loadFromStorage<GameStatusType>(STATUS_KEY, GameStatus.NOT_PLAYING)
    );

    useEffect(() => {
        saveToStorage(STATUS_KEY, gameStatus);
    }, [gameStatus]);

    return {gameStatus, setGameStatus};
}
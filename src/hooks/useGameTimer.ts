import { useEffect, useState } from "react";
import { useTimer } from "./useTimer";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { START_TIME_KEY, TIME_KEY } from "../constants/constants";

export function useGameTimer(isPlaying: boolean) {
    const [startTime, setStartTime] = useState<number | null>(() =>
        loadFromStorage<number | null>(START_TIME_KEY, null)
    );

    const [elapsedTime, setElapsedTime] = useState<number>(() =>
        loadFromStorage<number>(TIME_KEY, 0) ?? 0
    );

    useTimer(isPlaying, startTime, setElapsedTime);

    useEffect(() => {
        if (startTime !== null) {
            saveToStorage(START_TIME_KEY, startTime);
        }
    }, [startTime]);

    useEffect(() => {
        saveToStorage(TIME_KEY, elapsedTime);
    }, [elapsedTime]);

    return { startTime, setStartTime, elapsedTime, setElapsedTime };
}
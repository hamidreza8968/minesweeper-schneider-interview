import { useEffect } from "react";

export const useTimer = (
    isPlaying: boolean,
    startTime: number | null,
    setElapsedTime: (time: number) => void
) => {
    useEffect(() => {
        if (!isPlaying || startTime === null) return;

        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying, startTime, setElapsedTime]);
};
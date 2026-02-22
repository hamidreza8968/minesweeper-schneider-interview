import React from "react";
import { useBoard } from "../../context/BoardContext";
import "./Timer.css";

const Timer = () => {

    const {elapsedTime} = useBoard();
    const limitedTime = Math.min(elapsedTime, 999);
    const displayTime = String(limitedTime).padStart(3, "0");

    return (
        <div className="timer" aria-label={`Elapsed time: ${limitedTime} seconds`} role="timer"
             aria-live="polite">
            {displayTime}
        </div>
    )
}

export default Timer;

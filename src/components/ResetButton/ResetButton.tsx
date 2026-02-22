import React from "react";
import { useBoard } from "../../context/BoardContext";
import { GameStatus } from "../../constants/constants";
import "./ResetButton.css";

const ResetButton = () => {
    const { gameStatus, resetBoard } = useBoard();

    let face;
    switch (gameStatus) {
        case GameStatus.NOT_PLAYING:
            face = "🙂";
            break;
        case GameStatus.PLAYING:
            face = "😮";
            break;
        case GameStatus.LOST:
            face = "😵";
            break;
        case GameStatus.WON:
            face = "😎";
            break;
        default:
            face = "🙂";
    }


    return (
        <button className="reset-button" onClick={resetBoard} aria-label="Reset game">
            {face}
        </button>
    );
};

export default ResetButton;
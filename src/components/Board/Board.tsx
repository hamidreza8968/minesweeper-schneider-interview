import React, { useState, useCallback } from "react";
import { useBoard } from "../../context/BoardContext";
import { GameStatus } from "../../constants/constants";
import { revealCell, toggleFlag } from "../../utils/gameLogic";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";
import Cell from "./Cell";
import Timer from "../Timer/Timer";
import ResetButton from "../ResetButton/ResetButton";
import "./Board.css";

const Board: React.FC<{ className?: string }> = ({ className }) => {
    const { board, setBoard, rows, cols, gameStatus, setGameStatus, setStartTime } = useBoard();

    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
    const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);

    const handleClickCell = useCallback(
        (row: number, col: number) => {
            if (gameStatus === GameStatus.LOST || gameStatus === GameStatus.WON) return;

            if (gameStatus === GameStatus.NOT_PLAYING) {
                setStartTime(Date.now());
                setGameStatus(GameStatus.PLAYING);
            }

            setBoard((prev) => {
                const { newBoard, status } = revealCell(prev, row, col, rows, cols);
                if (status) setGameStatus(status);
                return newBoard;
            });
        },
        [gameStatus, rows, cols, setBoard, setGameStatus, setStartTime]
    );

    const handleRightClickCell = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>, row: number, col: number) => {
            e.preventDefault();
            if (gameStatus === GameStatus.NOT_PLAYING) return;
            setBoard((prev) => toggleFlag(prev, row, col));
        },
        [gameStatus, setBoard]
    );

    const handleMouseDown = () => setIsUsingKeyboard(false);

    useKeyboardNavigation({
        setSelectedCell,
        rows,
        cols,
        handleClick: handleClickCell,
        handleFlag: handleRightClickCell,
        gameStatus,
        setIsUsingKeyboard,
    });

    return (
        <div className={`board ${className}`}>
            <div className="topBox">
                <ResetButton />
                <Timer />
            </div>
            <div
                className="grid"
                role="grid"
                aria-label="Minesweeper game board"
                tabIndex={0}
                onMouseDown={handleMouseDown}
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                }}
            >
                {board.map((rowArr) =>
                    rowArr.map((cell) => (
                        <Cell
                            key={`${cell.row}-${cell.col}`}
                            cell={cell}
                            onClick={() => handleClickCell(cell.row, cell.col)}
                            onRightClick={(e) => handleRightClickCell(e, cell.row, cell.col)}
                            isSelected={isUsingKeyboard && selectedCell.row === cell.row && selectedCell.col === cell.col}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Board;

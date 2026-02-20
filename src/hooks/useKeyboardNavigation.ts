import { useEffect } from "react";
import { GameStatus } from "../constants/constants";
import { KeyboardNavigationProps } from "../types/keyboardNavigation";

export const useKeyboardNavigation = ({
                                          setSelectedCell,
                                          rows,
                                          cols,
                                          handleClick,
                                          handleFlag,
                                          gameStatus,
                                          setIsUsingKeyboard,
                                      }: KeyboardNavigationProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameStatus !== GameStatus.PLAYING && gameStatus !== GameStatus.NOT_PLAYING) return;

            setIsUsingKeyboard(true);

            setSelectedCell((prev) => {
                let { row, col } = prev;

                switch (e.key) {
                    case "ArrowUp":
                        row = (row - 1 + rows) % rows;
                        break;
                    case "ArrowDown":
                        row = (row + 1) % rows;
                        break;
                    case "ArrowLeft":
                        col = (col - 1 + cols) % cols;
                        break;
                    case "ArrowRight":
                        col = (col + 1) % cols;
                        break;
                    case "Enter":
                        handleClick(row, col);
                        break;
                    case "f":
                    case "F":
                        handleFlag({ preventDefault: () => {} }, row, col);
                        break;
                    default:
                        return prev;
                }

                e.preventDefault();
                return { row, col };
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [rows, cols, handleClick, handleFlag, gameStatus, setSelectedCell, setIsUsingKeyboard]);
};
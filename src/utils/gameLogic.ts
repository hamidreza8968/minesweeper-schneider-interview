import { CellType } from "../types/board";
import { GameStatus } from "../constants/constants";

interface RevealResult {
    newBoard: CellType[][];
    status?: typeof GameStatus[keyof typeof GameStatus];
}

export function revealCell(
    board: CellType[][],
    row: number,
    col: number,
    rows: number,
    cols: number
): RevealResult {
    const newBoard = board.map((r) => r.map((c) => ({ ...c })));
    const cell = newBoard[row][col];

    if (cell.isRevealed || cell.isFlagged) return { newBoard };

    cell.isRevealed = true;

    if (cell.isBomb) {
        revealAllBombs(newBoard);
        return { newBoard, status: GameStatus.LOST };
    }

    if (cell.neighborBombs === 0) {
        floodFill(newBoard, row, col, rows, cols);
    }

    if (checkWin(newBoard)) {
        return { newBoard, status: GameStatus.WON };
    }

    return { newBoard };
}

export function toggleFlag(board: CellType[][], row: number, col: number) {
    const newBoard = board.map((r) => r.map((c) => ({ ...c })));
    const cell = newBoard[row][col];

    if (!cell.isRevealed) {
        cell.isFlagged = !cell.isFlagged;
    }

    return newBoard;
}

function floodFill(
    board: CellType[][],
    row: number,
    col: number,
    rows: number,
    cols: number
) {
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (
                r >= 0 &&
                r < rows &&
                c >= 0 &&
                c < cols &&
                !board[r][c].isRevealed &&
                !board[r][c].isBomb
            ) {
                board[r][c].isRevealed = true;

                if (board[r][c].neighborBombs === 0) {
                    floodFill(board, r, c, rows, cols);
                }
            }
        }
    }
}

function revealAllBombs(board: CellType[][]) {
    board.forEach((row) =>
        row.forEach((cell) => {
            if (cell.isBomb) cell.isRevealed = true;
        })
    );
}

function checkWin(board: CellType[][]) {
    return board.every((row) =>
        row.every((cell) => cell.isBomb || cell.isRevealed)
    );
}
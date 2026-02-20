import { CellType } from "../types/board";

export function createCell(row: number, col: number): CellType {
    return {
        row,
        col,
        isBomb: false,
        isRevealed: false,
        isFlagged: false,
        neighborBombs: 0,
    };
}


export function generateBoard(rowsNumber: number, colsNumber: number, bombRate: number): CellType[][] {
    const board: CellType[][] = [];


    for (let i = 0; i < rowsNumber; i++) {
        const rowArr: CellType[] = [];
        for (let j = 0; j < colsNumber; j++) {
            rowArr.push(createCell(i, j));
        }
        board.push(rowArr);
    }


    const bombsNum = Math.floor(bombRate * rowsNumber * colsNumber);
    const bombPositions = new Set<string>();


    while (bombPositions.size < bombsNum) {
        const i = Math.floor(Math.random() * rowsNumber);
        const j = Math.floor(Math.random() * colsNumber);
        bombPositions.add(`${i},${j}`);
    }


    bombPositions.forEach((pos) => {
        const [row, col] = pos.split(",").map(Number);
        board[row][col].isBomb = true;

        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i === row && j === col) continue;
                if (i >= 0 && i < rowsNumber && j >= 0 && j < colsNumber) {
                    board[i][j].neighborBombs += 1;
                }
            }
        }
    });

    return board;
}
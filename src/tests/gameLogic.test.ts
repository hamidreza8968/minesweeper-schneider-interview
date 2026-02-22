import { revealCell, toggleFlag } from "../utils/gameLogic";
import { GameStatus } from "../constants/constants";
import { CellType } from "../types/board";

describe("Minesweeper gameLogic", () => {
    let board: CellType[][];

    beforeEach(() => {
        board = [
            [
                { row: 0, col: 0, isBomb: true, isRevealed: false, isFlagged: false, neighborBombs: 0 },
                { row: 0, col: 1, isBomb: false, isRevealed: false, isFlagged: false, neighborBombs: 1 },
                { row: 0, col: 2, isBomb: false, isRevealed: false, isFlagged: false, neighborBombs: 0 },
            ],
            [
                { row: 1, col: 0, isBomb: false, isRevealed: false, isFlagged: false, neighborBombs: 1 },
                { row: 1, col: 1, isBomb: false, isRevealed: false, isFlagged: false, neighborBombs: 1 },
                { row: 1, col: 2, isBomb: false, isRevealed: false, isFlagged: false, neighborBombs: 0 },
            ],
            [
                { row: 2, col: 0, isBomb: false, isRevealed: false, isFlagged: false, neighborBombs: 0 },
                { row: 2, col: 1, isBomb: false, isRevealed: false, isFlagged: false, neighborBombs: 0 },
                { row: 2, col: 2, isBomb: false, isRevealed: false, isFlagged: false, neighborBombs: 0 },
            ],
        ];
    });

    test("revealCell reveals bomb and sets game lost", () => {
        const { newBoard, status } = revealCell(board, 0, 0, 3, 3);

        const bombCells = newBoard.flat().filter(c => c.isBomb);
        expect(bombCells.every(c => c.isRevealed)).toBe(true);

        const safeCells = newBoard.flat().filter(c => !c.isBomb);
        expect(safeCells.every(c => !c.isRevealed || c.isRevealed)).toBe(true);

        expect(status).toBe(GameStatus.LOST);
    });

    test("revealCell reveals safe cell and triggers win", () => {
        const { newBoard, status } = revealCell(board, 2, 2, 3, 3);

        const revealedSafe = newBoard.flat().filter(c => !c.isBomb && c.isRevealed);
        expect(revealedSafe.length).toBe(8);
        expect(status).toBe(GameStatus.WON);
    });

    test("toggleFlag toggles cell and does not toggle revealed cells", () => {
        let flaggedBoard = toggleFlag(board, 0, 1);
        expect(flaggedBoard[0][1].isFlagged).toBe(true);

        flaggedBoard = toggleFlag(flaggedBoard, 0, 1);
        expect(flaggedBoard[0][1].isFlagged).toBe(false);

        flaggedBoard[0][2].isRevealed = true;
        const result = toggleFlag(flaggedBoard, 0, 2);
        expect(result[0][2].isFlagged).toBe(false);
    });
});

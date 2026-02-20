import {generateBoard} from "../utils/generateBoard";

describe("Board generation", () => {
    test("generates correct bomb count and neighbor numbers", () => {
        const rows = 5, cols = 5, bombRate = 0.2;
        const board = generateBoard(rows, cols, bombRate);

        const bombs = board.flat().filter(c => c.isBomb);
        expect(bombs.length).toBe(Math.floor(rows * cols * bombRate));

        // Neighbor counts should match surrounding bombs
        board.forEach((rowArr, r) => {
            rowArr.forEach((cell, c) => {
                if (!cell.isBomb) {
                    const neighbors = [
                        [r - 1, c - 1], [r - 1, c], [r - 1, c + 1],
                        [r, c - 1], [r, c + 1],
                        [r + 1, c - 1], [r + 1, c], [r + 1, c + 1]
                    ];
                    const bombCount = neighbors.reduce((sum, [nr, nc]) => {
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isBomb) return sum + 1;
                        return sum;
                    }, 0);
                    expect(cell.neighborBombs).toBe(bombCount);
                }
            });
        });
    });
});

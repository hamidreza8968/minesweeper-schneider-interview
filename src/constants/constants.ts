export const GameStatus = {
    NOT_PLAYING: "notPlaying",
    PLAYING: "playing",
    LOST: "lost",
    WON: "won"
} as const;

export type GameStatusType = typeof GameStatus[keyof typeof GameStatus];

export const BOARD_KEY = "minesweeper-board";
export const TIME_KEY = "minesweeper-time";
export const STATUS_KEY = "minesweeper-status";
export const START_TIME_KEY = "minesweeper-start-time";
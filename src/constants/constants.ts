export const GameStatus = {
    NOT_PLAYING: "notPlaying",
    PLAYING: "playing",
    LOST: "lost",
    WON: "won"
} as const;

export type GameStatusType = typeof GameStatus[keyof typeof GameStatus];
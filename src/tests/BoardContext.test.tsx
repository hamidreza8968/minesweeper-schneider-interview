import { renderHook, act } from "@testing-library/react";
import { BoardProvider, useBoard } from "../context/BoardContext";
import { GameStatus } from "../constants/constants";

describe("BoardContext", () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <BoardProvider rows={5} cols={5} bombRate={0.2}>
            {children}
        </BoardProvider>
    );

    test("resetBoard resets game and timer", () => {
        const { result } = renderHook(() => useBoard(), { wrapper });

        act(() => result.current.setGameStatus(GameStatus.PLAYING));
        expect(result.current.gameStatus).toBe(GameStatus.PLAYING);

        act(() => result.current.resetBoard());
        expect(result.current.gameStatus).toBe(GameStatus.NOT_PLAYING);
        expect(result.current.elapsedTime).toBe(0);
        expect(result.current.startTime).toBeNull();
    });
});

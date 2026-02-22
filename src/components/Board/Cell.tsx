import React, {useEffect, useRef} from "react";
import "./Board.css";
import {CellProps} from "../../types/board";


const Cell = ({cell, onClick, onRightClick, isSelected}: CellProps) => {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isSelected && ref.current) {
            ref.current.focus();
        }
    }, [isSelected]);

    return (
        <button
            ref={ref}
            className={`cell
                ${cell.isRevealed ? 'revealed' : ''}
                ${cell.isRevealed && cell.neighborBombs > 0 ? `n${cell.neighborBombs}` : ''}
                ${cell.isRevealed && cell.isBomb ? 'bomb' : ''}
                ${cell.isFlagged ? 'flag' : ''}
                ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
            onContextMenu={onRightClick}
            aria-label={`Row ${cell.row + 1}, Column ${cell.col + 1}, ${cell.isRevealed ? "revealed" : "hidden"}, ${cell.isFlagged ? "flagged" : ""}${cell.isRevealed && cell.neighborBombs > 0 ? `, ${cell.neighborBombs} neighboring bombs` : ""}`}
        >
            {cell.isRevealed ? (cell.isBomb ? "💣" : cell.neighborBombs || "") : cell.isFlagged ? "🚩" : ""}
        </button>
    );
};

export default Cell;

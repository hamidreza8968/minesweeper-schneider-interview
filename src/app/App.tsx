import React from "react";
import {BoardProvider} from "../context/BoardContext";
import Board from "../components/Board/Board";

const App: React.FC = () => {
    return (
        <BoardProvider rows={5} cols={5} bombRate={0.2}>
            <Board className="app"/>
        </BoardProvider>
    );
};

export default App;
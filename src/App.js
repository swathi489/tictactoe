import { useState } from "react";
import Swal from "sweetalert2";
import Cell from "./components/Cell";

const App = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState(null);
  const [scores, setScores] = useState({ circle: 0, cross: 0 });

  const checkWinner = (newCells) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newCells[a] && newCells[a] === newCells[b] && newCells[a] === newCells[c]) {
        return newCells[a];
      }
    }
    return null;
  };

  const handleClick = (id) => {
    if (cells[id] !== "" || winningMessage) return;

    const newCells = [...cells];
    newCells[id] = go;
    setCells(newCells);

    const winner = checkWinner(newCells);
    if (winner) {
      const message = `Player ${winner} wins!`;
      Swal.fire({
        icon: 'success',
        title: 'Congratulations!',
        text: message,
      });
      setWinningMessage(message);
      setScores({ ...scores, [winner]: scores[winner] + 1 });
    } else {
      setGo(go === "circle" ? "cross" : "circle");
    }
  };

  const resetGame = () => {
    setCells(Array(9).fill(""));
    setGo("circle");
    setWinningMessage(null);
  };

  const message = winningMessage || `It is now ${go}'s turn.`;

  return (
    <div className="app">
      <header>
        <h1>Tic <span className="span">Tac</span> Toe</h1>
      </header>
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            cell={cell}
            handleClick={handleClick}
          />
        ))}
      </div>
      <p>{message}</p>
      <div className="scorecard">
        <p>Circle: {scores.circle}</p>
        <p>Cross: {scores.cross}</p>
      </div>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
};

export default App;

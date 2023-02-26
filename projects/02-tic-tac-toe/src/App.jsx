import { useState } from "react";
import { Title } from "./commons/Title";
import { Square } from "./components/square/Square";
import { ShowTurn } from "./components/showTurn/ShowTurn";
import TURNS from "./utils/constants.js";
import checkWinner from "./utils/checkWinner";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return; // no actualizamos esta posición, si ya tiene algo
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; // cambiar el turno
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard); // revisar si hay ganador
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <main className="board">
      <Title headline="Tic tac toe" />
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <ShowTurn turn={turn} />
    </main>
  );
}

export default App;

import { useState } from "react";
import { Title } from "./commons/Title";
import { Square } from "./components/square/Square";
import { ShowTurn } from "./components/showTurn/ShowTurn";
import { ModalWinner } from "./components/modalWinner/ModalWinner";
import TURNS from "./utils/constants.js";
import checkWinner from "./utils/checkWinner";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); // null no hay ganador, false es un empate

  const updateBoard = (index) => {
    // no actualizamos esta posición, si ya tiene algo
    if (board[index] || winner) return;
    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <main className="board">
      <Title headline="Tic-Tac-Toe" />
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
      {winner != null && (
        <ModalWinner
          winner={winner}
          setBoard={setBoard}
          setTurn={setTurn}
          setWinner={setWinner}
        />
      )}
    </main>
  );
}

export default App;

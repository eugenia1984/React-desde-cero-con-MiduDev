import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Title } from "./commons/Title";
import { Square } from "./components/square/Square";
import { ShowTurn } from "./components/showTurn/ShowTurn";
import { ModalWinner } from "./components/modalWinner/ModalWinner";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { TURNS } from "./constants";
import { saveGameToStorage, resetGameToStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

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
    // guardar la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameToStorage();
  };

  return (
    <main className="board">
      <Title headline="Tic-Tac-Toe" />
      <button onClick={resetGame} className="button-main">
        Reset game
      </button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <ShowTurn turn={turn} />
      <ModalWinner
        winner={winner}
        setBoard={setBoard}
        setTurn={setTurn}
        setWinner={setWinner}
        btnText="New game"
      />
    </main>
  );
}

export default App;

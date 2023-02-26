import React from "react";
import { Square } from "../square/Square";
import TURNS from "../../utils/constants";
import "./modalWinner.css";

export const ModalWinner = ({ winner, setBoard, setTurn, setWinner }) => {
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  return (
    <section className="winner">
      <div className="text">
        <h2>{winner == false ? "A tie" : "Win"}</h2>
        <header className="win">{winner && <Square>{winner}</Square>}</header>
        <footer>
          <button onClick={resetGame}>New game</button>
        </footer>
      </div>
    </section>
  );
};

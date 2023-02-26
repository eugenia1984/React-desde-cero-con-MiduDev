import React from "react";
import { TURNS } from "../../constants";
import "./winnerFooter.css";

const WinnerFooter = ({ btnText, setBoard, setTurn, setWinner }) => {
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  return (
    <footer>
      <button onClick={resetGame} className="reset-btn">
        {btnText}
      </button>
    </footer>
  );
};

export default WinnerFooter;

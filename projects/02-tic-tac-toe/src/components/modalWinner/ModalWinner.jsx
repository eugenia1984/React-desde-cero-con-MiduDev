import React from "react";
import { Winner } from "./Winner";
import { WinnerTitle } from "./winnerTitle";
import WinnerFooter from "./WinnerFooter";
import "./modalWinner.css";

export const ModalWinner = ({
  winner,
  setBoard,
  setTurn,
  setWinner,
  btnText,
}) => {
  if (winner === null) return null;

  return (
    <section className="winner">
      <div className="text">
        <WinnerTitle winner={winner} />
        <Winner winner={winner} />
        <WinnerFooter
          btnText={btnText}
          setBoard={setBoard}
          setTurn={setTurn}
          setWinner={setWinner}
        />
      </div>
    </section>
  );
};

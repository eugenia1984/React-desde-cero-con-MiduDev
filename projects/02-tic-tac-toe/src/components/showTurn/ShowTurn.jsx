import React from "react";
import { Square } from "../square/Square";
import { TURNS } from "../../constants";
import "./showTurn.css";

export const ShowTurn = ({ turn }) => {
  return (
    <section className="turn">
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
  );
};

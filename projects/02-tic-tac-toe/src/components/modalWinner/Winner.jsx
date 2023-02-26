import React from "react";
import { Square } from "../square/Square";

export const Winner = ({ winner }) => {
  return <header className="win">{winner && <Square>{winner}</Square>}</header>;
};

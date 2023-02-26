import React from "react";

export const WinnerTitle = ({ winner }) => {
  const winnerText = winner === false ? "A tie" : "Win";
  
  return <h2>{winnerText}</h2>;
};

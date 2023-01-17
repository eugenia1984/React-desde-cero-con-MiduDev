import React, { useState } from "react";

export function CounterButton() {
  const [state, setState] = useState(0);

  const handleClick = () => {
    setState(state + 1);
  }

  return (
    <button onClick={handleClick}>count: {state}</button>
  );
}
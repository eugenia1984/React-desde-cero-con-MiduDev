import React from "react";
import { useCatImage } from "./hooks/useCatImage.js";
import { useCatFact } from "./hooks/useCatFact.js";
import "./App.css";

export function App() {
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });

  const handleClick = async () => {
    refreshFact();
  };

  return (
    <main>
      <h1>Cat's app</h1>
      <button onClick={handleClick} className="btnNewFact">
        Get new fact
      </button>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${imageUrl}`}
          alt={`Image extracted using the first three words for ${fact}`}
          className="imgCat"
        />
      )}
    </main>
  );
}

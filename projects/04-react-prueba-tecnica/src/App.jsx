import React, { useState, useEffect } from "react";
import { getRandomFact } from "./services/facts.js";
import "./App.css";

// const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_PREFIX_IMAGE_URL = `https://cataas.com`;

export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  // Efecto para la cita al cargar la página
  useEffect(() => {
    getRandomFact().then(newFact => setFact(newFact)); // getRandomFact().then(setFact);
  }, []);

  // Efecto para recuperar la imagen cada vez que tenemos uan cita nueva
  useEffect(() => {
    if (!fact) return;

    const threeFirstWord = fact.split(" ", 3).join(" ");
    fetch(
      `https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact]);

  const handleClick = async () => {
    const newFact = await getRandomFact();
    setFact(newFact);
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
          src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
          alt={`Image extracted using the first three words for ${fact}`}
          className="imgCat"
        />
      )}
    </main>
  );
}

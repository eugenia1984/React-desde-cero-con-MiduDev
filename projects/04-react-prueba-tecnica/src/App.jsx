import React, { useState, useEffect } from 'react'

export function App () {
  const [fact, setFact] = useState('lorem ipsum cat fact whatever')
  const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
  // const CAT_ENPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red`
  // No se recomienda usar React Query, SWR, Axios, pollo
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)

        const firstWord = fact.split(' ')[0]
      })
  }, [])
  return (
    <main>
      <h1>Cat's app</h1>
      {fact && <p>{fact}</p>}
    </main>
  )
}

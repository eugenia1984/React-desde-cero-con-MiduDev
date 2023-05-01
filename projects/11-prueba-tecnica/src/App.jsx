import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
         setUsers(res.results) 
      })
      .catch(err => {
        console.warn(`Error: ${err}`)
      })
  }, [])

  console.log("USERS", users)

  return (
    <>
      <h1>Technical Test</h1>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import ListOfUsers from './components/ListOfUsers'
import './App.css'

function App() {

  return (
    <div>
      <h1>CRUD con REDUX</h1>
      <ListOfUsers />
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import './App.css'
import UsersList from './components/UsersList'
import { SortBy, type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const togglecolors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.warn(`Error: ${ err }`)
      })
  }, [])

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
      // return a.location.country > b.location.country ? 1: -1
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  return (
    <div className="App">
      <h1>Technical Test</h1>
      <header>
        <button onClick={ togglecolors }>Color rows</button>
        <button onClick={ toggleSortByCountry }>{ sortByCountry ? 'Not sorted' : 'Sort by country' }</button>
      </header>
      <main>
        <UsersList showColors={ showColors } users={ sortedUsers } />
      </main>
    </div>
  )
}

export default App

import React, { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'
import UsersList from './components/UsersList'
import { SortBy, type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const togglecolors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.warn(`Error: ${ err }`)
      })
  }, [])

  const filteredUsers = useMemo(() => {
    console.log('Calculate filterUsers')
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  // const sortedUsers = sortByCountry
  //   ? filteredUsers.toSorted((a, b) => {
  //     // return a.location.country > b.location.country ? 1: -1
  //     return a.location.country.localeCompare(b.location.country)
  //   })
  //   : filteredUsers
  const sortedUsers = useMemo(() => {
    console.log('Calculate sortedUsers')
    return sortByCountry
      ? filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
      : filteredUsers

  }, [filteredUsers, sortByCountry])

  return (
    <div className="App">
      <h1>Technical Test</h1>
      <header>
        <button onClick={ togglecolors }>Color rows</button>
        <button onClick={ toggleSortByCountry }>
          { sortByCountry ? 'Not sorted' : 'Sort by country' }
        </button>
        <button onClick={ handleReset }>Reset deleted</button>
        <input
          placeholder='Filter by country'
          onChange={ (e) => {
            setFilterCountry(e.target.value)
          } }
        />
      </header>
      <main>
        <UsersList
          showColors={ showColors }
          users={ sortedUsers }
          deleteUser={ handleDelete }
        />
      </main>
    </div>
  )
}

export default App

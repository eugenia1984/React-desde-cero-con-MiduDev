import React, { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'
import UsersList from './components/UsersList'
import { SortBy, type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const togglecolors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
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

  const sortedUsers = useMemo(() => {
    console.log('Calculate sortedUsers')

    if (sorting === SortBy.NONE) return filteredUsers

    let sortedFn = (a: User, b: User) => a.location.country.localeCompare(b.location.country)

    if (sorting === SortBy.NAME) {
      sortedFn = (a, b) => a.name.first.localeCompare(b.name.first)
    }

    if (sorting === SortBy.LAST) {
      sortedFn = (a, b) => a.name.last.localeCompare(b.name.last)
    }

    return filteredUsers.toSorted(sortedFn)

  }, [filteredUsers, sorting])

  return (
    <div className="App">
      <h1>Technical Test</h1>
      <header>
        <button onClick={ togglecolors }>Color rows</button>
        <button onClick={ toggleSortByCountry }>
          { sorting === SortBy.COUNTRY ? 'Not sorted' : 'Sort by country' }
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
          changeSorting={ handleChangeSort }
          showColors={ showColors }
          users={ sortedUsers }
          deleteUser={ handleDelete }
        />
      </main>
    </div>
  )
}

export default App

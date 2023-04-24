import { configureStore, type Middleware } from '@reduxjs/toolkit'
import usersReducers from './users/slice'
import { toast } from 'sonner'

const persistanceLocalStorageMiddleware: Middleware = store => next => action => {
  next(action)
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
  const { type, payload } = action

  next(action)

  if (type === 'users/deleteUserById') {
    fetch(`https://jsonplaceholder.typicode.com/users/${ payload }`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) toast.success(`User ${ payload } deleted`)
      })
      .catch(() => {
        toast.error(`Error deleting user ${ payload }`)
      })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducers
  },
  middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


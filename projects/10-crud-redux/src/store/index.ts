import { configureStore, type Middleware } from '@reduxjs/toolkit'
import  usersReducers, { rollbackUser } from './users/slice'
import { toast } from 'sonner'

const persistanceLocalStorageMiddleware: Middleware = store => next => action => {
  next(action)
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
  const { type, payload } = action
  const previousState = store.getState()
  
  next(action)

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(user => user.id === payload)
    fetch(`https://jsonplaceholder.typicode.com/users/${ payload }`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) toast.success(`User ${ payload } deleted`)
        throw new Error('Error deleting user')
      })
      .catch((err) => {
        toast.error(`Error deleting user ${userIdToRemove}`)
        if(userToRemove) store.dispatch(rollbackUser(userToRemove))
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


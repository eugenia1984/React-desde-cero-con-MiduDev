import { configureStore, type Middleware } from '@reduxjs/toolkit'
import usersReducers from './users/slice'

const persistanceLocalStorageMiddleware = store => next => action => {
  next(action)
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()))
}

const syncWithDatadabe: Middleware = store => next => action => {
  console.log("Devuelve: ", {action, store: store.getState()})
  next(action)
}

export const store = configureStore({
  reducer: {
    users: usersReducers
  },
  middleware: [persistanceLocalStorageMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


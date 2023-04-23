import { configureStore } from '@reduxjs/toolkit'
import usersReducers from './users/slice'

export const store = configureStore({
  reducer: {
    users: usersReducers
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


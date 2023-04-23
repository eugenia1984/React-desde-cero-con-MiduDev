import { createSlice } from '@reduxjs/toolkit'

export interface User {
  name: string,
  email: string,
  github: string
}

export interface UserWidthId extends User {
  id: string
}

const initialState: UserWidthId[] = [
  {
    id: "1",
    name: "Yazman Rodriguez",
    email: "yazmanito@gmail.com",
    github: "yazmanito"
  },
  {
    id: "2",
    name: "John Doe",
    email: "leo@gmail.com",
    github: "leo"
  },
  {
    id: "3",
    name: "Hakon Dalbert",
    email: "hakon-dalbert@gmail.com",
    github: "hakon"
  },
  {
    id: "4",
    name: "Sol Costes",
    email: "sol-costes@gmail.com",
    github: "solcito"
  }
]

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default usersSlice.reducer
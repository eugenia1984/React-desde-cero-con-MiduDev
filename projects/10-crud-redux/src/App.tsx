import './App.css'
import ListOfUsers from './components/ListOfUsers'
import { CreateNewUser } from './components/CreateNewUser'
import { Toaster } from 'sonner'

function App() {

  return (
    <div>
      <h1>CRUD con REDUX</h1>
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors />
    </div>
  )
}

export default App

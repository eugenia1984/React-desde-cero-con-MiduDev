import { useState } from 'react'
import { Todos } from './components/Todos'

const mockTodos = [
  {
    id: '1',
    title: 'Learn React',
    completed: false
  },
  {
    id: '2',
    title: 'Learn React + TypeScript',
    completed: false
  },
  {
    id: '3',
    title: 'Drink coffee',
    completed: true
  }
]
const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)

  return (
    <div className='todoapp'>
      <h1>ToDo App</h1>
      <Todos todos={ todos } />
    </div>
  );
}

export default App;

import { useState } from 'react'
import { Todos } from './components/Todos'
import { type Todo as TodoType, type TodoId } from './types/types'

const mockTodos = [
  {
    id: 1,
    title: 'Learn React',
    completed: false
  },
  {
    id: 2,
    title: 'Learn React + TypeScript',
    completed: false
  },
  {
    id: 3,
    title: 'Drink coffee',
    completed: true
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <h1>ToDo App</h1>
      <Todos
        todos={ todos }
        onToggleCompleteTodo={ handleCompleted }
        onRemoveTodo={ handleRemove } />
    </div>
  );
}

export default App;

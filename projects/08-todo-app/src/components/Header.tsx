import { TodoTitle } from "../types/types"
import { CreateTodo } from "./CreateTodo"

interface Props {
  onAddTodo: ({title}: TodoTitle) => void
}

export const Header: React.FC<Props> = ({onAddTodo}) => {
  return (
    <header className='header'>
      <h1>Todo App</h1>
      <CreateTodo saveTodo={onAddTodo}/>
    </header>
  )
}
import { type Todo as TodoType, type TodoId, type ListOfTodos } from '../types'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodos,
  onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void,
  onRemoveTodo: ({ id }: TodoId) => void// otro modo: Function
}

export const Todos: React.FC<Props> = ({ todos, onToggleCompleteTodo, onRemoveTodo }) => {
  return (
    <ul className='todo-list'>
      { todos.map((todo) => {
        return (
          <li key={ todo.id } className={ `${ todo.completed ? 'completed' : '' }` }>
            <Todo
              id={ todo.id }
              title={ todo.title }
              completed={ todo.completed }
              onToggleCompleteTodo={ onToggleCompleteTodo }
              onRemoveTodo={ onRemoveTodo } />
          </li>
        );
      }) }
    </ul>
  );
};

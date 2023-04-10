import { type ListOfTodos } from '../types'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodos;
}

export const Todos: React.FC<Props> = ({ todos }) => {
  return (
    <ul className='todo-list'>
      { todos.map((todo) => {
        return (
          <li key={ todo.id } className={ `${ todo.completed ? "completed" : "" }` }>
            <Todo id={ todo.id } title={ todo.title } completed={ todo.completed } />
          </li>
        );
      }) }
    </ul>
  );
};

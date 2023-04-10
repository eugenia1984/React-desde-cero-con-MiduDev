import { type Todo as TodoType, type TodoId } from '../types'

interface Props extends TodoType {
  onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void,
  onRemoveTodo: ({ id }: TodoId) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onToggleCompleteTodo, onRemoveTodo }) => {
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleteTodo({
      id,
      completed: event.target.checked
    })
  }

  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={ completed }
        onChange={ handleChangeCheckbox }
      />
      <label>{ title }</label>
      <button className='destroy' onClick={ () => {
        onRemoveTodo({ id })
      } } />
    </div>
  );
};

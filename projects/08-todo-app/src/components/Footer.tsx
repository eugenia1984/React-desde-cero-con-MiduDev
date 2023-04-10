import { FilterValue, ListOfTodos } from "../types/types"
import { Filters } from "./Filters"

interface Props {
  activeCount: number,
  completedCount: number,
  filterSelected: FilterValue,
  handleFilterChange: (filter: FilterValue) => void
  todos: ListOfTodos,
  onClearCompleted: () => void
}

export const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  todos,
  filterSelected,
  handleFilterChange,
  onClearCompleted
}) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{ activeCount }</strong> pending task
      </span>
      <Filters 
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
    </footer>
  )
}
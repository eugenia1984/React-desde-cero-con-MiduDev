export const Filters: React.FC<Props> = ({filterSelected, onFilterChange}) => {
  return(
    <ul className='filters'>
      <li>
        <a
          className={`${filterSelected === 'all'? 'selected': ''}`}
          onClick={() => {
            onFilterChange('all')
          }} 
        >
          All
        </a>  
      </li>
      <li>
        <a
          className={`${filterSelected === 'active'? 'selected': ''}`}
          onClick={() => {
            onFilterChange('active')
          }} 
        >
          Active
        </a>
      </li>
      <li>
        <a
          className={`${filterSelected === 'completed'? 'selected': ''}`}
          onClick={() => {
            onFilterChange('completed')
          }} 
        >
          Completed
        </a>
      </li>
    </ul>
  )
}
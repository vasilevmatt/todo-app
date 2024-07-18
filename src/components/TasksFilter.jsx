import React, { useContext } from 'react'
import FilterButton from './FilterButton'
import TodoContext from '../context/todo-context'

export default function TasksFilter() {
  const { filterStatus, todoFilter } = useContext(TodoContext)

  function handleFilterChange(filter) {
    todoFilter(filter)
  }

  return (
    <ul className="filters">
      <FilterButton isActive={filterStatus === 'all'} onFiltered={() => handleFilterChange('all')}>
        All
      </FilterButton>
      <FilterButton isActive={filterStatus === 'active'} onFiltered={() => handleFilterChange('active')}>
        Active
      </FilterButton>
      <FilterButton isActive={filterStatus === 'completed'} onFiltered={() => handleFilterChange('completed')}>
        Completed
      </FilterButton>
    </ul>
  )
}

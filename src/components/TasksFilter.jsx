import PropTypes from 'prop-types'
import React, { useState } from 'react'
import FilterButton from './FilterButton'

export default function TasksFilter({ onFiltered }) {
  const [activeFilter, setActiveFilter] = useState('all')

  function handleFilterChange(filter) {
    setActiveFilter(filter)
    onFiltered(filter)
  }

  return (
    <ul className="filters">
      <FilterButton isActive={activeFilter === 'all'} onFiltered={() => handleFilterChange('all')}>
        All
      </FilterButton>
      <FilterButton isActive={activeFilter === 'active'} onFiltered={() => handleFilterChange('active')}>
        Active
      </FilterButton>
      <FilterButton isActive={activeFilter === 'completed'} onFiltered={() => handleFilterChange('completed')}>
        Completed
      </FilterButton>
    </ul>
  )
}

TasksFilter.propTypes = {
  onFiltered: PropTypes.func,
}

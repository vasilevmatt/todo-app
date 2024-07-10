import PropTypes from 'prop-types'
import React from 'react'

export default function FilterButton({ isActive, children, onFiltered }) {
  return (
    <li>
      <button className={isActive ? 'selected' : null} onClick={onFiltered}>
        {children}
      </button>
    </li>
  )
}

FilterButton.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.string,
  onFiltered: PropTypes.func,
}

FilterButton.defaultProps = {
  isActive: false,
}

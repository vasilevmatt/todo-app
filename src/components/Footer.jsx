import PropTypes from 'prop-types'
import React from 'react'
import TasksFilter from './TasksFilter'

export default function Footer({ leftItemsNum, onFiltered, deleteCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{leftItemsNum} items left</span>
      <TasksFilter onFiltered={(status) => onFiltered(status)} />
      <button className="clear-completed" onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  leftItemsNum: PropTypes.number,
  onFiltered: PropTypes.func.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
}

Footer.defaultProps = {
  leftItemsNum: 0,
}

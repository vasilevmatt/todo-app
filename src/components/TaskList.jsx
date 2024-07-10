import PropTypes from 'prop-types'
import React from 'react'
import Task from './Task'

export default function TaskList({ todos, onDeleted, onEdited, toggleStatus }) {
  const elements = todos.map((item) => {
    return (
      <Task
        {...item}
        key={item.id}
        onEdited={(text) => onEdited(item.id, text)}
        onDeleted={() => onDeleted(item.id)}
        toggleStatus={(status) => toggleStatus(item.id, status)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onEdited: PropTypes.func,
  toggleStatus: PropTypes.func,
}

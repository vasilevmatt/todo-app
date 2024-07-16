import PropTypes from 'prop-types'
import React from 'react'
import Task from './Task'

export default function TaskList({ todos, handleTimerActiveChange, onDeleted, onEdited, toggleStatus, timerHandler }) {
  const elements = todos.map((item) => {
    return (
      <Task
        {...item}
        key={item.id}
        timerHandler={(timer) => timerHandler(item.id, timer)}
        setTimerActive={(isActive) => handleTimerActiveChange(item.id, isActive)}
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

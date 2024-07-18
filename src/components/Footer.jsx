import React, { useContext } from 'react'
import TasksFilter from './TasksFilter'
import TodoContext from '../context/todo-context'

export default function Footer() {
  const { data, deleteCompleted } = useContext(TodoContext)
  const leftItemsNum = data.filter((item) => item.status !== 'completed').length

  return (
    <footer className="footer">
      <span className="todo-count">{leftItemsNum} items left</span>
      <TasksFilter />
      <button className="clear-completed" onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

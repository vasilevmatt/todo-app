import React, { useContext } from 'react'
import Task from './Task'
import TodoContext from '../context/todo-context'

export default function TaskList() {
  const { data, filterStatus } = useContext(TodoContext)

  const filteredData = data.filter((item) => {
    if (filterStatus === 'all') return true
    if (filterStatus === 'active') return item.status === 'view' || item.status === 'editing'
    if (filterStatus === 'completed') return item.status === 'completed'
    return true
  })

  const elements = filteredData.map((item) => {
    return <Task {...item} key={item.id} />
  })

  return <ul className="todo-list">{elements}</ul>
}

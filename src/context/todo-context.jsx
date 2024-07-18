import { createContext, useState } from 'react'

const TodoContext = createContext()

export function TodoContextProvider({ children }) {
  const [idValues, setIdValues] = useState([0])
  const [data, setData] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')

  const createTaskObject = (label, timer = 60) => {
    const lastId = idValues[idValues.length - 1] + 1
    setIdValues((prev) => [...prev, lastId])
    return {
      label,
      status: 'view',
      date: new Date(),
      timer: Number(timer),
      id: lastId,
      isTimerActive: false,
    }
  }

  const findItemIndexInData = (data, id) => data.findIndex((el) => el.id === id)

  const updateData = (id, updateFunc) => {
    setData((data) => {
      const index = findItemIndexInData(data, id)
      const item = { ...data[index] }
      updateFunc(item)
      return [...data.slice(0, index), item, ...data.slice(index + 1)]
    })
  }

  const deleteItem = (id) => {
    setData((data) => {
      const index = findItemIndexInData(data, id)
      return [...data.slice(0, index), ...data.slice(index + 1)]
    })
  }

  const createItem = (label, timer) => {
    if (label.trim()) {
      const newItem = createTaskObject(label, timer)
      setData((prevData) => [...prevData, newItem])
    }
  }

  const editItem = (id, newLabel) => {
    updateData(id, (item) => {
      item.label = newLabel
    })
  }

  const toggleStatus = (id, status) => {
    updateData(id, (item) => {
      item.status = status === 'completed' && item.status === 'completed' ? 'view' : status
    })
  }

  const deleteCompleted = () => {
    setData((data) => data.filter((item) => item.status !== 'completed'))
  }

  const timerHandler = (id, timer) => {
    updateData(id, (item) => {
      item.timer = Number(timer)
    })
  }

  const handleTimerActiveChange = (id, state) => {
    updateData(id, (item) => {
      item.isTimerActive = state
    })
  }

  const todoFilter = (status) => {
    setFilterStatus(status)
  }

  return (
    <TodoContext.Provider
      value={{
        data,
        filterStatus,
        createItem,
        editItem,
        deleteItem,
        toggleStatus,
        deleteCompleted,
        timerHandler,
        handleTimerActiveChange,
        todoFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext

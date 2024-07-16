import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

export default function AppMain() {
  const [idValues, setIdValues] = useState([0])
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState(data)
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

  const FindItemIndexInData = (data, id) => data.findIndex((el) => el.id === id)

  const updateData = (id, updateFunc) => {
    setData((data) => {
      const index = FindItemIndexInData(data, id)
      const item = { ...data[index] }
      updateFunc(item)
      return [...data.slice(0, index), item, ...data.slice(index + 1)]
    })
  }

  useEffect(() => {
    todoFilter(filterStatus)
  }, [data, filterStatus])

  const deleteItem = (id) => {
    setData((data) => {
      const index = FindItemIndexInData(data, id)
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
      if (status === 'completed' && item.status === 'completed') {
        item.status = 'view'
      } else {
        item.status = status
      }
    })
  }

  const leftItemsNum = data.filter((item) => item.status !== 'completed').length

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
    let newData
    if (status === 'all') {
      newData = data
    } else if (status === 'active') {
      newData = data.filter((item) => item.status === 'view' || item.status === 'editing')
    } else {
      newData = data.filter((item) => item.status === 'completed')
    }
    setFilteredData(newData)
  }

  return (
    <section className="main">
      <NewTaskForm onCreated={(text, timer) => createItem(text, timer)} />
      <TaskList
        todos={filteredData}
        onEdited={(id, text) => editItem(id, text)}
        onDeleted={(id) => deleteItem(id)}
        handleTimerActiveChange={(id, state) => handleTimerActiveChange(id, state)}
        timerHandler={(id, timer) => timerHandler(id, timer)}
        toggleStatus={(id, status) => toggleStatus(id, status)}
      />
      <Footer
        leftItemsNum={leftItemsNum}
        onFiltered={(status) => todoFilter(status)}
        deleteCompleted={deleteCompleted}
      />
    </section>
  )
}

AppMain.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

AppMain.defaultProps = {
  data: [],
}

import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

export default function AppMain() {
  const [idValues, setIdValues] = useState([0])
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState(data)

  const createTaskObject = (label) => {
    const lastId = idValues[idValues.length - 1] + 1
    setIdValues((prev) => [...prev, lastId])
    return {
      label,
      status: 'view',
      date: new Date(),
      id: lastId,
    }
  }

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  const FindItemIndexInData = (data, id) => data.findIndex((el) => el.id === id)

  function deleteItem(id) {
    setData((data) => {
      const index = FindItemIndexInData(data, id)
      return [...data.slice(0, index), ...data.slice(index + 1)]
    })
  }

  const createItem = (label) => {
    if (label.trim()) {
      const newItem = createTaskObject(label)
      setData((prevData) => [...prevData, newItem])
    }
  }

  function editItem(id, newLabel) {
    setData((data) => {
      const index = FindItemIndexInData(data, id)
      const item = JSON.parse(JSON.stringify(data[index]))
      item.label = newLabel

      return [...data.slice(0, index), item, ...data.slice(index + 1)]
    })
  }

  function toggleStatus(id, status) {
    setData((data) => {
      const index = FindItemIndexInData(data, id)
      const item = JSON.parse(JSON.stringify(data[index]))
      if (status === 'completed' && item.status === 'completed') {
        item.status = 'view'
      } else {
        item.status = status
      }
      return [...data.slice(0, index), item, ...data.slice(index + 1)]
    })
  }
  let jamor

  const leftItemsNum = data.filter((item) => item.status !== 'completed').length

  function deleteCompleted() {
    setData((data) => data.filter((item) => item.status !== 'completed'))
    todoFilter('all')
  }

  function todoFilter(status) {
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
      <NewTaskForm onCreated={(text) => createItem(text)} />
      <TaskList
        todos={filteredData}
        onEdited={(id, text) => editItem(id, text)}
        onDeleted={(id) => deleteItem(id)}
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

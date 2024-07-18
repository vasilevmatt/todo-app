import React, { useContext, useState, useEffect, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import TodoContext from '../context/todo-context'

export default function Task({ id, label, status, date, timer, isTimerActive }) {
  const { toggleStatus, deleteItem, editItem, timerHandler, handleTimerActiveChange } = useContext(TodoContext)

  const [timerSeconds, setTimerSeconds] = useState(timer)
  const timerInterval = useRef(null)
  const [formattedTime, setFormattedTime] = useState({ minutes: '00', seconds: '00' })
  const [text, setText] = useState(label)

  const toggleDone = () => {
    toggleStatus(id, 'completed')
  }
  const toggleEdit = () => {
    toggleStatus(id, 'editing')
  }

  useEffect(() => {
    const seconds = timerSeconds % 60
    const minutes = Math.floor(timerSeconds / 60)

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    setFormattedTime({ minutes: formattedMinutes, seconds: formattedSeconds })
  }, [timerSeconds])

  useEffect(() => {
    if (isTimerActive) {
      startTimerInterval()
    }
    return () => {
      clearInterval(timerInterval.current)
    }
  }, [])

  function startTimerInterval() {
    timerInterval.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval.current)
          handleTimerActiveChange(id, false)
          timerHandler(id, 0)
          return 0
        }
        timerHandler(id, prev - 1)
        return prev - 1
      })
    }, 1000)
  }

  const togglePlay = () => {
    if (!timerInterval.current) {
      startTimerInterval()
      handleTimerActiveChange(id, true)
    }
  }

  const toggleStop = () => {
    timerHandler(id, timerSeconds)
    handleTimerActiveChange(id, false)
    clearInterval(timerInterval.current)
    timerInterval.current = null
  }

  function onLabelChange(e) {
    setText(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault()
    editItem(id, text)
    toggleStatus(id, 'view')
  }

  return (
    <li className={status}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={status === 'completed'} onChange={toggleDone} />
        <label>
          <span className="title" onClick={toggleDone}>
            {label}
          </span>
          <span className="description">
            <button className="icon icon-play" onClick={togglePlay} />
            <button className="icon icon-pause" onClick={toggleStop} />
            {formattedTime.minutes}:{formattedTime.seconds}
          </span>
          <span className="description">created {formatDistanceToNow(date, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit" onClick={toggleEdit} />
        <button className="icon icon-destroy" onClick={() => deleteItem(id)} />
      </div>
      {status === 'editing' && (
        <form onSubmit={onSubmit}>
          <input type="text" className="edit" value={text} onChange={onLabelChange} />
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string,
  label: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  timer: PropTypes.number,
  isTimerActive: PropTypes.bool,
}

Task.defaultProps = {
  date: new Date(),
  status: 'view',
  label: 'Unnamed task',
  timer: 0,
  isTimerActive: false,
}

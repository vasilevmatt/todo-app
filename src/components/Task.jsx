import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import React, { useEffect, useState, useRef } from 'react'

export default function Task(props) {
  const { label, status, date, onDeleted, toggleStatus, onEdited, timerHandler, timer, isTimerActive, setTimerActive } =
    props

  const [timerSeconds, setTimerSeconds] = useState(timer)
  const timerInterval = useRef(null)
  const [formattedTime, setFormattedTime] = useState({ minutes: '00', seconds: '00' })
  const [text, setText] = useState('')

  const toggleDone = () => {
    toggleStatus('completed')
  }
  const toggleEdit = () => {
    toggleStatus('editing')
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
          setTimerActive(false)
          timerHandler(0)
          return 0
        }
        timerHandler(prev - 1)
        return prev - 1
      })
    }, 1000)
  }

  const togglePlay = () => {
    if (!timerInterval.current) {
      startTimerInterval()
      setTimerActive(true)
    }
  }

  const toggleStop = () => {
    timerHandler(timerSeconds)
    setTimerActive(false)
    clearInterval(timerInterval.current)
    timerInterval.current = null
  }

  function onLabelChange(e) {
    setText(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault()
    onEdited(text)
    toggleStatus('view')
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
        <button className="icon icon-destroy" onClick={onDeleted} />
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
  status: PropTypes.string,
  label: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  onDeleted: PropTypes.func,
  onEdited: PropTypes.func,
  toggleStatus: PropTypes.func,
  timerHandler: PropTypes.func,
  timer: PropTypes.number,
}

Task.defaultProps = {
  date: new Date(),
  status: 'view',
  label: 'Unnamed task',
  timer: 0,
}

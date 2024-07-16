import PropTypes from 'prop-types'
import React, { useState } from 'react'

export default function NewTaskForm({ onCreated }) {
  const [text, setText] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  function onLabelChange(e) {
    setText(e.target.value)
  }
  function onMinutesChange(e) {
    setMinutes(e.target.value)
  }
  function onSecondsChange(e) {
    setSeconds(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault()

    const timer = Number(minutes) * 60 + Number(seconds)
    onCreated(text, timer)
    setText('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus=""
        value={text}
        onChange={onLabelChange}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        min={0}
        placeholder="Min"
        autoFocus
        value={minutes}
        onChange={onMinutesChange}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        min={0}
        max={60}
        type="number"
        autoFocus
        onChange={onSecondsChange}
        value={seconds}
      />
      <button type="submit" />
    </form>
  )
}

NewTaskForm.propTypes = {
  onCreated: PropTypes.func,
}

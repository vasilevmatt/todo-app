import PropTypes from 'prop-types'
import React, { useState } from 'react'

export default function NewTaskForm({ onCreated }) {
  const [text, setText] = useState('')
  function onLabelChange(e) {
    setText(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault()
    onCreated(text)
    setText('')
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus=""
        value={text}
        onChange={onLabelChange}
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  onCreated: PropTypes.func,
}

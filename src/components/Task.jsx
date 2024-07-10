import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

export default function Task(props) {
  const { label, status, date, onDeleted, toggleStatus, onEdited } = props

  const toggleDone = () => {
    toggleStatus('completed')
  }
  const toggleEdit = () => {
    toggleStatus('editing')
  }

  const [text, setText] = useState('')
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
          <span className="description" onClick={toggleDone}>
            {label}
          </span>
          <span className="created">created {formatDistanceToNow(date, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit" onClick={toggleEdit} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {status === 'editing' && (
        <form onSubmit={onSubmit}>
          <input type="text" className="edit" onChange={onLabelChange} />
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  status: PropTypes.string,
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onEdited: PropTypes.func,
  toggleStatus: PropTypes.func,
}

Task.defaultProps = {
  date: new Date(),
  status: 'view',
  label: 'Unnamed task',
}

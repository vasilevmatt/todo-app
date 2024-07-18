import React from 'react'
import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

export default function AppMain() {
  return (
    <section className="main">
      <NewTaskForm />
      <TaskList />
      <Footer />
    </section>
  )
}

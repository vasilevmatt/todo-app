import React from 'react'
import AppHeader from './components/layout/AppHeader'
import AppMain from './components/layout/AppMain'
import { TodoContextProvider } from './context/todo-context'

export default function AppLayout() {
  return (
    <TodoContextProvider>
      <section className="todoapp">
        <AppHeader />
        <AppMain />
      </section>
    </TodoContextProvider>
  )
}

import React from 'react'
import AppHeader from './components/layout/AppHeader'
import AppMain from './components/layout/AppMain'

export default function AppLayout() {
  return (
    <section className="todoapp">
      <AppHeader />
      <AppMain />
    </section>
  )
}

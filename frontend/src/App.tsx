import React from 'react'
import AppRouter from './router'
import styles from './App.module.css'
const App: React.FC = () => {
  return (
  <div className={styles.appContainer}>
    <AppRouter />
  </div>
  )
}

export default App

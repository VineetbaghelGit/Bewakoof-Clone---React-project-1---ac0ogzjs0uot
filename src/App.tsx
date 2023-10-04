import React from 'react'
import './App.css'
import './libs/bootstrap/bootstrap.min.css'
import AppRoutes from './routes'
import Headers from './components/common/Header'
const App: React.FC = (): React.JSX.Element => {
  return (
    <div className="main-app">
      <Headers />
      <AppRoutes />
    </div>
  )
}

export default App

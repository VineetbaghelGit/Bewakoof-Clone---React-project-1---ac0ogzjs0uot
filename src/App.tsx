import React, { useEffect } from 'react'
import './App.css'
import './libs/bootstrap/bootstrap.min.css'
import AppRoutes from './routes'
import Headers from './components/common/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/common/Footer'
import { useLocation } from 'react-router-dom'

const App: React.FC = (): React.JSX.Element => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <div className="main-app">
      <Headers />
      <AppRoutes />
      <Footer/>
      <ToastContainer />
    </div>
  )
}

export default App

import React from 'react'
import './App.css'
import './libs/bootstrap/bootstrap.min.css'
import AppRoutes from './routes'
import Headers from './components/common/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/common/Footer'

const App: React.FC = (): React.JSX.Element => {
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

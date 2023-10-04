import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { isUserAuthenticated } from '../helper/customUseSelector'

function AppRoutes (): React.JSX.Element {
  const isRouteProtected = isUserAuthenticated()
  return (
    <React.Fragment>
      <Routes>
        <Route
          path='/'
          element={
            !isRouteProtected
              ? (
                <Navigate to='/login' replace />
                )
              : (
                <Navigate to='/' replace />
                )
          }
        />      </Routes>
    </React.Fragment>
  )
}

export default AppRoutes

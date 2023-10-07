import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { isUserAuthenticated } from '../helper/customUseSelector'
import { authRoutes, protectedRoutes, publicRoutes } from './Routes'

function AppRoutes (): React.JSX.Element {
  const isRouteProtected = isUserAuthenticated()
  return (
    <React.Fragment>
      <Routes>
        {authRoutes.map((route) => {
          const id = crypto.randomUUID()
          return (
            <Route
              key={id}
              path={route.path}
              element={
                !isRouteProtected
                  ? (
                    <route.component />
                    )
                  : (
                  <Navigate to="/" replace state={{ from: route.path }} />
                    )
              }
            />
          )
        })}
        {publicRoutes.map((route) => {
          const id = crypto.randomUUID()
          return (
            <Route
              key={id}
              path={route.path}
              element={
                isRouteProtected
                  ? (
                  <Navigate
                    to={route.path}
                    replace
                    state={{ from: route.path }}
                  />
                    )
                  : (
                  <route.component />
                    )
              }
            />
          )
        })}
        {protectedRoutes.map((route) => {
          const id = crypto.randomUUID()
          return (
            <Route
              key={id}
              path={route.path}
              element={
                !isRouteProtected
                  ? (
                  <Navigate to="/login" replace state={{ from: route.path }} />
                    )
                  : (
                  <route.component />
                    )
              }
            />
          )
        })}
      </Routes>
    </React.Fragment>
  )
}

export default AppRoutes

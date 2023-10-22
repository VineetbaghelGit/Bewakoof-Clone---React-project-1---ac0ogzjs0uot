import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { isUserAuthenticated } from '../helper/customUseSelector'
import { authRoutes, protectedRoutes, publicRoutes } from './Routes'
import Error404 from '../components/pages/Error/Error404'

function AppRoutes (): React.JSX.Element {
  const isRouteProtected = isUserAuthenticated()
  // const { state } = useLocation()
  // state?.prevPage}
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
                  <Navigate to="/" replace state={{ prevPage: route.path }} />
                    )
              }
            />
          )
        })}
        {publicRoutes.map((route) => {
          const id = crypto.randomUUID()
          return (
            <Route key={id} path={route.path} element={<route.component />} />
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
                  <Navigate
                    to="/login"
                    replace
                    state={{ prevPage: route.path }}
                  />
                    )
                  : (
                  <route.component />
                    )
              }
            />
          )
        })}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </React.Fragment>
  )
}

export default AppRoutes

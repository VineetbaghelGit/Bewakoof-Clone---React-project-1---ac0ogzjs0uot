import React from 'react'
import MainHeader from './HeaderComponents/MainHeader'
import TabHeaderBar from './HeaderComponents/TabHeaderBar'
import SmallScSidebar from './SmallScSidebar/SmallScSidebar'
import TopHeaderBar from './HeaderComponents/TopHeaderBar'
import { userPathLocation } from '../../../helper/GetUserLocation'

function Headers (): React.JSX.Element {
  const location = userPathLocation()
  return (
    <>
      <header className="header-wrapper">
        <TopHeaderBar />
        <MainHeader />
      </header>
      <SmallScSidebar />
      {location === '/' && <TabHeaderBar />}
    </>
  )
}

export default Headers

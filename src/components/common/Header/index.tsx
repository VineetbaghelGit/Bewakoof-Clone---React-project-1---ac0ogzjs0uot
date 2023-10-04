import React from 'react'
import MainHeader from './HeaderComponents/MainHeader'
import TabHeaderBar from './HeaderComponents/TabHeaderBar'
import SmallScSidebar from './SmallScSidebar/SmallScSidebar'
import TopHeaderBar from './HeaderComponents/TopHeaderBar'

function Headers (): React.JSX.Element {
  return (
    <>
      <header className="header-wrapper">
        <TopHeaderBar />
        <MainHeader />
      </header>
      <SmallScSidebar />
      <TabHeaderBar />
    </>
  )
}

export default Headers

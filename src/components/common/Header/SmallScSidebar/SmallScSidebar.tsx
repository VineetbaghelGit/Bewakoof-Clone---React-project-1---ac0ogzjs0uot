import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SideDrawer from './SideDrawer'
import { primaryLogoEyes } from '../../../../config/Images'
function SmallScSidebar (): React.JSX.Element {
  const [openSidebar, setOpenSidebar] = useState(false)
  const openSideDrawer = (): void => {
    const bodyEl = document.body as HTMLElement | null
    if (bodyEl !== null) {
      bodyEl.classList.remove('noside-drawer')
      bodyEl.classList.add('open-side-drawer')
      setOpenSidebar(true)
    }
  }
  return (
    <>
      <div className="side-nav-box">
        <div className="sideMenuOverlay overlayId"></div>
        <header className="nav-header-sticky visible-sm">
          <div className="md-header">
            <span className="toggle-sidenav">
              <MenuIcon onClick={openSideDrawer} />
            </span>
            <div className="logo-sm-screen">
              <span className="">
                <Link to='/'>
                  <img src={primaryLogoEyes} />
                </Link>
              </span>
            </div>
            <div className="header-icon-menu">
              {/* <span className='action-innermenu'>
            <Link to='/'>Login</Link>
          </span> */}
              <span className='action-innermenu'>
                <Link to='/'>
                  <FavoriteBorderIcon />
                </Link>
              </span>
              <span className='action-innermenu'>
                <Link to='/'>
                  <ShoppingCartIcon />
                </Link>
              </span>
            </div>
          </div>
        </header>
      </div>
      <SideDrawer isOpen={openSidebar} setOpenSidebar={setOpenSidebar} />
    </>
  )
}

export default SmallScSidebar

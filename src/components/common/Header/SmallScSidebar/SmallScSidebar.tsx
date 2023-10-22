import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SideDrawer from './SideDrawer'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { primaryLogoEyes } from '../../../../config/Images'
import { cartItemsCount, isUserAuthenticated, loggedInUserInfo } from '../../../../helper/customUseSelector'
import { userPathLocation } from '../../../../helper/GetUserLocation'
import { type UserDetails } from '../../../../config/ResponseTypes'
import { COOKIE_STORAGE_KEY } from '../../../../config/Constant'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { removeUserAuth } from '../../../../store/slices/authSlices'
function SmallScSidebar (): React.JSX.Element {
  const [openSidebar, setOpenSidebar] = useState(false)
  const cartItemCount = cartItemsCount()
  const location = userPathLocation()
  const isRouteProtected = isUserAuthenticated()
  const userInfo: UserDetails = loggedInUserInfo()
  const dispatch = useDispatch()

  const openSideDrawer = (): void => {
    const bodyEl = document.body as HTMLElement | null
    if (bodyEl !== null) {
      bodyEl.classList.remove('noside-drawer')
      bodyEl.classList.add('open-side-drawer')
      setOpenSidebar(true)
    }
  }

  const handleLogout = (): void => {
    Cookies.remove(COOKIE_STORAGE_KEY)
    dispatch(removeUserAuth())
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
           <span className="action-innermenu">
                    {location !== '/login' &&
                      location !== '/signup' &&
                      location !== '/forget-password' &&
                      (isRouteProtected
                        ? (
                        <Link to="" className="user-profile-icon">
                          <PermIdentityIcon />
                        </Link>
                          )
                        : (
                        <Link to="/login" state={{ prevPage: location }}>
                          Login
                        </Link>
                          ))}

                    <div className="user-account-menuholder">
                      <ul className="user-account-menu">
                        <li>
                          <Link to="/" className="username-style">
                            Hi, {userInfo.name}
                          </Link>
                        </li>
                        <li>
                          <Link to="/account">My Account</Link>
                        </li>
                        <li>
                          <Link to="/wishlist">My Wishlist</Link>
                        </li>{' '}
                        <li>
                          <Link to="/account/orders">My Orders</Link>
                        </li>
                        <li onClick={handleLogout}>
                          <Link to="/">Logout</Link>
                        </li>
                      </ul>
                    </div>
                  </span>
              <span className='action-innermenu'>
                <Link to='/wishlist'>
                  <FavoriteBorderIcon />
                </Link>
              </span>
              <span className='action-innermenu'>
                <Link to='/cart'>
                  <ShoppingCartIcon />
                  {cartItemCount !== undefined && cartItemCount !== 0 && (
                        <span className="cart-count">{cartItemCount}</span>
                  )}
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

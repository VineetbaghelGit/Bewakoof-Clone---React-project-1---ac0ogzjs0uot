import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import FaceIcon from '@mui/icons-material/Face'
import Face3Icon from '@mui/icons-material/Face3'
import {
  isUserAuthenticated,
  loggedInUserInfo
} from '../../../../helper/customUseSelector'
import { type UserDetails } from '../../../../config/ResponseTypes'
import { LINK_TO_LOGIN, LINK_TO_SIGNUP } from '../../../../config/Constant'
interface SideDrawerProps {
  isOpen: boolean
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, setOpenSidebar }) => {
  const userInfo: UserDetails = loggedInUserInfo()
  const isRouteProtected = isUserAuthenticated()

  const sideNavRef = useRef<HTMLDivElement | null>(null)
  const drawerClassName = isOpen ? 'sidemenu-drawer open' : 'sidemenu-drawer'
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  function handleClickOutside (event: any): void {
    if (
      sideNavRef.current !== null &&
      !sideNavRef.current.contains(event.target)
    ) {
      setOpenSidebar(false)

      const bodyEl = document.body as HTMLElement | null
      if (bodyEl !== null) {
        bodyEl.classList.remove('open-side-drawer')
        bodyEl.classList.add('noside-drawer')
      }
    }
  }
  return (
    <div ref={sideNavRef} className={drawerClassName}>
      <div className="sidemenu-head">
        <div className="welcome-header">
          <h5 className="welcome-guest">
            {isRouteProtected
              ? (
              <span>Welcome {userInfo.name}</span>
                )
              : (
              <span>Welcome Guest</span>
                )}
            <div className="register">
              {!isRouteProtected && (
                <>
                  <Link to={LINK_TO_LOGIN}>Login</Link>
                  <span style={{ margin: '0px 3px' }}>/</span>
                  <Link to={LINK_TO_SIGNUP}>Signup</Link>
                </>
              )}
            </div>
          </h5>
        </div>
      </div>
      <div className="sidemenu-mainmenu">
        <div className="sidemenu-list-wrapper">
          <p className="menu-heading">shop in</p>
          <ul>
            <li className="menu-list-option">
              <Link to="/">Men</Link>
              <FaceIcon />
            </li>
            <li className="menu-list-option">
              <Link to="/">Women</Link>
              <Face3Icon />
            </li>
            <li className="menu-list-option">
              <Link to="/">COTM x Naruto</Link>
            </li>
            <li className="menu-list-option">
              <Link to="/">Mobile Covers</Link>
            </li>
          </ul>
        </div>
        <div className="sidemenu-list-wrapper contact">
          <p className="menu-heading">contact us</p>
          <ul>
            <li className="menu-list-option">
              <Link to="/">Help & Support</Link>
              <FaceIcon />
            </li>
            <li className="menu-list-option">
              <Link to="/">Feedback & Suggestions</Link>
              <Face3Icon />
            </li>
            <li className="menu-list-option">
              <Link to="/">Become a seller</Link>
            </li>
          </ul>
        </div>
        <div className="sidemenu-list-wrapper contact">
          <p className="menu-heading">about us</p>
          <ul>
            <li className="menu-list-option">
              <Link to="/">Our Story</Link>
              <FaceIcon />
            </li>
            <li className="menu-list-option">
              <Link to="/">Fanbook</Link>
              <Face3Icon />
            </li>
            <li className="menu-list-option">
              <Link to="/">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideDrawer

import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import FaceIcon from '@mui/icons-material/Face'
import Face3Icon from '@mui/icons-material/Face3'
interface SideDrawerProps {
  isOpen: boolean
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, setOpenSidebar }) => {
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

      // Additionally, if you want to update the body class, you can do it here.
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
            <span>Welcome Guest</span>
            <div className="register">
              <a>Login / Sign Up</a>
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

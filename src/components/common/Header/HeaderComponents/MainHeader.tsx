import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import {
  cartItemsCount,
  isUserAuthenticated,
  loggedInUserInfo
} from '../../../../helper/customUseSelector'
import { userPathLocation } from '../../../../helper/GetUserLocation'
import { mainLogo } from '../../../../config/Images'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { removeUserAuth } from '../../../../store/slices/authSlices'
import { COOKIE_STORAGE_KEY, LINK_TO_FORGET_PASSWORD, LINK_TO_LOGIN, LINK_TO_SIGNUP } from '../../../../config/Constant'
import { type UserDetails } from '../../../../config/ResponseTypes'
import { ToasterMessage } from '../../../../helper/ToasterHelper'
import ProductUtils from '../../../../apis/ProductUtils'
function MainHeader (): React.JSX.Element {
  const isRouteProtected = isUserAuthenticated()
  const userInfo: UserDetails = loggedInUserInfo()
  const cartItemCount = cartItemsCount()
  const location = userPathLocation()
  const [searchedValue, setSearchedValue] = useState<string>('')
  const dispatch = useDispatch()

  const onSearchItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value
    setSearchedValue(newValue)
    ProductUtils.searchingProduct(newValue)
      .then((res) => {})
      .catch((err) => { console.log(err) })
  }
  const handleLogout = (): void => {
    Cookies.remove(COOKIE_STORAGE_KEY)
    dispatch(removeUserAuth())
    ToasterMessage('success', 'Logout Successfully')
  }
  return (
      <div className="main-head">
        <div className="main-header">
          <Container className="main-header-left">
            <Row>
              <Col xs={2} className="brand-img col-differ">
                <Link to="/">
                  <Image src={mainLogo} fluid />
                </Link>
              </Col>
              <Col xs={5} className="main-header-dropdown col-differ">
                <ul className="menu-wrapper">
                  <li className="menuSelect">Men</li>
                  <li className="menuSelect">Women</li>
                  <li className="menuSelect">Mobile Covers</li>
                </ul>
              </Col>
              <Col xs={5} className="d-flex col-differ">
                <div className="search-container col-differ">
                  <input
                    className="search-box-input"
                    placeholder="Search by product, category or collection"
                    onChange={onSearchItem}
                    value={searchedValue}
                  />
                  <SearchIcon className="search-icon" />
                </div>
                <div className="actions-menu col-differ">
                  <span className="action-innermenu">
                    {location !== LINK_TO_LOGIN &&
                      location !== LINK_TO_SIGNUP &&
                      location !== LINK_TO_FORGET_PASSWORD &&
                      (isRouteProtected
                        ? (
                        <Link to="#" className="user-profile-icon">
                          <PermIdentityIcon />
                        </Link>
                          )
                        : (
                        <Link to={LINK_TO_LOGIN} state={{ prevPage: location }}>
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
                  <span className="action-innermenu">
                    <Link to="/wishlist">
                      <FavoriteBorderIcon />
                    </Link>
                  </span>
                  <span className="action-innermenu">
                    <Link to="/cart">
                      <ShoppingCartIcon />
                      {cartItemCount !== undefined && cartItemCount !== 0 && (
                        <span className="cart-count">{cartItemCount}</span>
                      )}
                    </Link>
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
  )
}

export default MainHeader

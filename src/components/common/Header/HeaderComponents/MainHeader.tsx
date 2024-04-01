/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import {
  COOKIE_STORAGE_KEY,
  LINK_TO_FORGET_PASSWORD,
  LINK_TO_LOGIN,
  LINK_TO_SIGNUP
} from '../../../../config/Constant'
import { type UserDetails } from '../../../../config/ResponseTypes'
import { ToasterMessage } from '../../../../helper/ToasterHelper'
import ProductUtils from '../../../../apis/ProductUtils'
function MainHeader (): React.JSX.Element {
  const navigate = useNavigate()
  const isRouteProtected = isUserAuthenticated()
  const userInfo: UserDetails = loggedInUserInfo()
  const cartItemCount = cartItemsCount()
  const location = userPathLocation()
  const [searchedValue, setSearchedValue] = useState<string>('')
  const dispatch = useDispatch()
  const [searchedData, setSearchedData] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  useEffect(() => {
    if (searchedValue.trim().length > 0) {
      const fetchData = setTimeout(async () => {
        try {
          const response: any = await ProductUtils.searchingProduct(
            `?search=${encodeURIComponent(
              JSON.stringify({
                brand: searchedValue,
                subCategory: searchedValue,
                category: searchedValue,
                name: searchedValue,
                gender: searchedValue
              })
            )}`
          )
          setSearchedData(response?.data?.data)
          if (response?.data?.length === 0) {
            setErrorMsg('No result found')
          }
        } catch (err: any) {
          setSearchedData([])
          setErrorMsg(err?.data?.message)
        }
      }, 500)
      return () => {
        clearTimeout(fetchData)
      }
    } else {
      // setErrorMsg('Type something for search')
    }
  }, [searchedValue])
  const handleLogout = (): void => {
    Cookies.remove(COOKIE_STORAGE_KEY)
    dispatch(removeUserAuth())
    ToasterMessage('success', 'Logout Successfully')
  }
  const handleRedirect = (id: string): void => {
    navigate(`/product/${id}`)
    setSearchedValue('')
    setSearchedData([])
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
                <li className="menuSelect">
                  <Link to="/coming-soon">Men</Link>
                </li>
                <li className="menuSelect">
                  <Link to="/coming-soon">Women</Link>
                </li>
                <li className="menuSelect">
                  <Link to="/coming-soon">Mobile Covers</Link>
                </li>
              </ul>
            </Col>
            <Col xs={5} className="d-flex col-differ position-relative">
              <div className="search-container col-differ">
                <input
                  className="search-box-input"
                  placeholder="Search by product, category or collection"
                  onChange={(e) => {
                    setSearchedValue(e.target.value)
                  }}
                  value={searchedValue}
                />
                <SearchIcon className="search-icon" />
              </div>
              {searchedValue.trim().length > 0 && (
                <div className={searchedData?.length > 0 ? 'searchContainer' : 'searchContainer no-data'}>
                  <div className="search-result-list overflow-auto">
                    {searchedData?.length > 0
                      ? (
                          searchedData?.map((data: any) => {
                            return (
                          <div
                            className="d-flex justify-content-start align-items-center"
                            key={data?._id}
                          >
                            <Image src={data.displayImage} />
                            <span onClick={() => handleRedirect(data?._id)}>
                              {data.name}
                            </span>
                          </div>
                            )
                          })
                        )
                      : (
                      <div className="not-found">
                        <span>{errorMsg}</span>
                      </div>
                        )}
                  </div>
                </div>
              )}

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

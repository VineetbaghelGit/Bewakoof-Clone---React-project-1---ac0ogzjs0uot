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
import { isUserAuthenticated } from '../../../../helper/customUseSelector'
import { userPathLocation } from '../../../../helper/GetUserLocation'
import { mainLogo } from '../../../../config/Images'
import ApiUtils from '../../../../apis/ApiUtils'
function MainHeader (): React.JSX.Element {
  const isRouteProtected = isUserAuthenticated()
  const location = userPathLocation()
  const [searchedValue, setSearchedValue] = useState<string>('')

  function debounce<T extends (...args: any[]) => any> (
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timer: NodeJS.Timeout | null = null
    return function (this: ThisParameterType<T>, ...args: Parameters<T>): any {
      clearTimeout(timer as NodeJS.Timeout)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
  const debouncedOnSearchItem = debounce((value: string) => {
    // This function will be called after the debounce delay with the latest value
    console.log('Searched Value:', value)
    // You can call any other functions or set state here.
    ApiUtils.searchingProduct(searchedValue).then((res) => {
      console.log('🚀 ~ file: MainHeader.tsx:37 ~ ApiUtils.searchingProduct ~ res:', res)
    }).catch((err) => {
      console.log('🚀 ~ file: MainHeader.tsx:39 ~ ApiUtils.searchingProduct ~ err:', err)
      return {
      }
    })
  }, 1500)

  const onSearchItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value
    setSearchedValue(newValue)
    debouncedOnSearchItem(newValue) // Call the debounced function with the input value
  }
  return (
    <React.Fragment>
      <div className="main-head">
        <div className="main-header">
          <Container className="main-header-left">
            <Row>
              <Col xs={2} className="brand-img col-differ">
                <Link to="/">
                  <Image
                    src={mainLogo}
                    fluid
                  />
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
                    {(location !== '/login' && location !== '/signup' && location !== '/forget-password') &&
                    (isRouteProtected
                      ? (
                        <Link to="" className="user-profile-icon">
                          <PermIdentityIcon />
                        </Link>
                        )
                      : (
                        <Link to="/login" state={{ prevPage: location }}>Login</Link>
                        ))}

                    <div className="user-account-menuholder">
                      <ul className="user-account-menu">
                        <li>
                          <Link to="/" className="username-style">
                            Hi, vineet
                          </Link>
                        </li>
                        <li>
                          <Link to="/">My Account</Link>
                        </li>
                        <li>
                          <Link to="/">My Wishlist</Link>
                        </li>{' '}
                        <li>
                          <Link to="/">My Orders</Link>
                        </li>
                        <li>
                          <Link to="/">My Wallet</Link>
                        </li>
                        <li>
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
                    <Link to="/">
                      <ShoppingCartIcon />
                    </Link>
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MainHeader

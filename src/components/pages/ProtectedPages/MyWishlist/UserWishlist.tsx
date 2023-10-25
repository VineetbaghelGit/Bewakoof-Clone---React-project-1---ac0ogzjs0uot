import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { bagIcon, wishlistEmpty } from '../../../../config/Images'
import ApiUtils from '../../../../apis/ApiUtils'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setItemCountCart } from '../../../../store/slices/cartSlice'
import Cookies from 'js-cookie'
import { type WishlistItem, type cartList } from '../../../../config/ResponseTypes'
import { COOKIE_STORAGE_KEY } from '../../../../config/Constant'
import './style.css'
import { ToasterMessage } from '../../../../helper/ToasterHelper'

function UserWishlist (): React.JSX.Element {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [cartItemList, setCartItemList] = useState<cartList[]>([])

  const dispatch = useDispatch()
  useEffect(() => {
    fetchUserWishlist()
    fetchCartItemList()
  }, [])
  function fetchUserWishlist (): void {
    ApiUtils.getMyWishlist()
      .then((res: any) => {
        if (res.status === 200) {
          setWishlist(res.data.data.items)
        }
      })
      .catch((err: any) => {
        if (err === undefined) {
          ToasterMessage('error', 'Network error')
        }
        ToasterMessage('error', err?.data?.message)
      })
  }
  const removewishlistedItem = (id: string): void => {
    ApiUtils.removeFromWishlist(id)
      .then((res: any) => {
        if (res.status === 200) {
          fetchUserWishlist()
          ToasterMessage('success', res?.data?.message)
        }
      })
      .catch((err: any) => {
        ToasterMessage('error', err?.data?.message)
      })
  }

  function fetchCartItemList (): void {
    ApiUtils.getCartItemList()
      .then((res: any) => {
        if (res.status === 200) {
          setCartItemList(res.data.data.items)
        }
      })
      .catch((err: any) => {
        if (err === undefined) {
          ToasterMessage('error', 'Network error')
        }
        ToasterMessage('error', err?.data?.message)
      })
  }
  const addProductToBag = (id: string): void => {
    ApiUtils.addItemInCart(id)
      .then((res: any) => {
        if (res.status === 200) {
          removewishlistedItem(id)
          dispatch(setItemCountCart(res.data.results))
          const existingUserDataString: any = Cookies.get(COOKIE_STORAGE_KEY)
          const existingUserData = JSON.parse(existingUserDataString)
          const updatedUserData = {
            ...existingUserData,
            cart: res.data.results
          }
          const updatedUserDataString = JSON.stringify(updatedUserData)
          Cookies.set(COOKIE_STORAGE_KEY, updatedUserDataString)
        }
      })
      .catch((err: any) => {
        if (err === undefined) {
          ToasterMessage('error', 'Network error')
        }
        ToasterMessage('error', err?.data?.message)
      })
  }
  return (
    <div className="wishlist-wrapper">
      <Container>
        {wishlist.length > 0
          ? (
          <div className="product-widget">
            <Row>
              {wishlist.map((wishlistItem) => {
                return (
                  <>
                    <Col md={3} xs={6} sm={6} className="card-col">
                      <div className="product-card-box">
                        <div>
                          <div className="product-card-img">
                            <Image
                              src={wishlistItem?.products?.displayImage}
                              fluid
                              title={wishlistItem?.products?.name}
                            />{' '}
                            <div
                              className="product-seller-tag remove-item"
                              onClick={() => {
                                removewishlistedItem(wishlistItem.products._id)
                              }}
                            >
                              <span>X</span>
                            </div>
                          </div>
                          <div className="product-card-detail">
                            <div className="d-flex justify-content-between p-1">
                              <div className="product-naming">
                                <h3 className="brand-name">Bewakoof®</h3>
                                <h2 className="name">
                                  {wishlistItem?.products?.name}
                                </h2>
                              </div>
                            </div>
                            <div className="d-flex product-price-box px-1">
                              <div className="discounted-price-text">
                                <span>₹</span>
                                {wishlistItem?.products?.price}
                              </div>
                              <div className="actual-price-text">
                                <span>₹</span>
                                3456
                              </div>
                              <div className="discount-percent">65% OFF</div>
                            </div>
                            <div className="add-to-cart-btn">
                              {cartItemList.length > 0 &&
                              cartItemList?.some(
                                (cartItem) =>
                                  cartItem?.product?._id ===
                                  wishlistItem?.products?._id
                              )
                                ? (
                                <>
                                  <div className="add-to-bag d-flex justify-content-center align-items-center">
                                    <span>
                                      <Image
                                        fluid
                                        className="bag-icon"
                                        src={bagIcon}
                                      />
                                    </span>
                                    <Link to="/cart">
                                      <p>GO TO BAG</p>
                                    </Link>
                                  </div>
                                </>
                                  )
                                : (
                                <div
                                  className="add-to-bag d-flex justify-content-center align-items-center"
                                  onClick={() => {
                                    addProductToBag(wishlistItem.products._id)
                                  }}
                                >
                                  <span>
                                    <Image
                                      fluid
                                      className="bag-icon"
                                      src={bagIcon}
                                    />
                                  </span>
                                  <p>ADD TO CART</p>
                                </div>
                                  )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </>
                )
              })}
            </Row>
          </div>
            )
          : (
          <div className="wishlist-empty">
            <Image src={wishlistEmpty} fluid />
            <div className="empty-list-title">Hey! Your wishlist is empty.</div>
            <div className="empty-list-subtitle">
              Save your favourites here and make them yours soon!
            </div>
            <Link to="/">
              <div className="wishlist-btn">Shop now</div>
            </Link>
          </div>
            )}
      </Container>
    </div>
  )
}

export default UserWishlist

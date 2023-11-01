import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  cartBadgeTrust,
  cartEasyReturn,
  discount,
  qualityCheck
} from '../../../../config/Images'
import ApiUtils from '../../../../apis/ApiUtils'
import { useDispatch } from 'react-redux'
import { setItemCountCart } from '../../../../store/slices/cartSlice'
import Cookies from 'js-cookie'
import { isUserAuthenticated } from '../../../../helper/customUseSelector'
import { type cartList } from '../../../../config/ResponseTypes'
import { COOKIE_STORAGE_KEY } from '../../../../config/Constant'
import { ToasterMessage } from '../../../../helper/ToasterHelper'

function BagItem (): React.JSX.Element {
  const isRouteProtected = isUserAuthenticated()
  const dispatch = useDispatch()
  const [cartItemList, setCartItemList] = useState<cartList[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  useEffect(() => {
    fetchCartItemList()
  }, [])
  useEffect(() => {
    const total = cartItemList.reduce(
      (acc, cartItem) => acc + cartItem.product.price,
      0
    )
    setTotalAmount(total)
  }, [cartItemList])
  const removeProductFromBag = (id: string): void => {
    if (isRouteProtected) {
      ApiUtils.removeItemFromCart(id)
        .then((res: any) => {
          if (res.status === 200) {
            fetchCartItemList()
            dispatch(setItemCountCart(res.data.results))
            const existingUserDataString: string =
              Cookies.get(COOKIE_STORAGE_KEY) ?? ''
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
  }
  function fetchCartItemList (): void {
    ApiUtils.getCartItemList()
      .then((res: any) => {
        if (res.status === 200) {
          setCartItemList(res.data.data.items)
          dispatch(setItemCountCart(res.data.results))
        }
      })
      .catch((err: any) => {
        if (err === undefined) {
          ToasterMessage('error', 'Network error')
        }
        ToasterMessage('error', err?.data?.message)
      })
  }
  const moveItemToWishlist = (id: string): void => {
    if (isRouteProtected) {
      const body = {
        productId: id
      }
      ApiUtils.addToWishlist(body)
        .then((res: any) => {
          if (res.status === 200) {
            removeProductFromBag(id)
            ToasterMessage('success', res?.data?.message)
          }
        })
        .catch((err: any) => {
          ToasterMessage('error', err?.data?.message)
        })
    }
  }
  return (
    <div className="bag-item-wrapper">
      <Container className="cart-item-container">
        <Row>
          <Col md={7} className="noPadding">
            {cartItemList.length > 0 &&
              cartItemList.map((cartItem, i) => {
                return (
                  <div className="left-section" key={i}>
                    <div className="cart-product-wrapper">
                      <div className="cart-product">
                        <div className="product-offer-wrapper">
                          <div className="offer-text">
                            <p className="offer-head">
                              Buy 1 Get 1 offer applicable
                            </p>
                            <p className="offer-desc">
                              Add 1 more item to avail this offer
                            </p>
                          </div>
                          <div>
                            <Link to="/">
                              <button className="offer-btn">Add Item</button>
                            </Link>
                          </div>
                        </div>
                        <div className="cart-product-inner">
                          <div className="product-left">
                            <div className="product-text">
                              <span>
                                <Link
                                  to={`/product/${cartItem.product._id}`}
                                  className="product-name"
                                >
                                  {cartItem.product.name}
                                </Link>
                              </span>
                              <div className="product-price">
                                <span className="disc-price">
                                  <b>₹</b> {cartItem.product.price}
                                </span>
                                <span className="actual-price">₹999</span>
                              </div>
                              <div className="product-apply">
                                <Image loading="lazy" src={discount} />
                                <p>Buy 1 Get 1 offer applicable</p>
                              </div>
                              <div className="product-quantity">
                                {/* <Form.Select
                                  size="sm"
                                  className="select-quantity"
                                >
                                  <option>Qty: 1</option>
                                  <option>Qty: 2</option>
                                  <option>Qty: 3</option>
                                  <option>Qty: 4</option>
                                  <option>Qty: 5</option>
                                  <option>Qty: 6</option>
                                </Form.Select> */}
                              </div>
                              <div className="product-msg">
                                Return not applicable.
                              </div>
                            </div>

                            <div className="product-img">
                              <Link to={`/product/${cartItem.product._id}`}>
                                <Image
                                  src={cartItem.product.displayImage}
                                  title="Women's Black T-shirt"
                                  alt="Women's Black T-shirt"
                                  loading="lazy"
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="cart-bottom">
                            <div className="product-action">
                              <div
                                className="remove-cart-item"
                                onClick={() => {
                                  removeProductFromBag(cartItem.product._id)
                                }}
                              >
                                Remove
                              </div>
                              <div
                                className="move-item-wishlist"
                                onClick={() => {
                                  moveItemToWishlist(cartItem.product._id)
                                }}
                              >
                                Move to Wishlist
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </Col>

          <Col md={5} className="noPadding">
            <div className="right-section noPadding">
              <div className="offer-box">
                <p>
                  Whistles! Get extra 15% cashback on prepaid orders above
                  Rs.699. Coupon code - OOF15
                </p>
              </div>
              <div className="offer-box">
                <p>
                  Get Rs.200 instant discount on your First Purchase above
                  Rs.999. Coupon code -NEW200
                </p>
              </div>
              <div className="offer-box">
                <p>
                  Whistles! Get extra 20% Cashback on prepaid orders above
                  Rs.499. Coupon code - NEW20. Applicable for new customers
                  only!
                </p>
              </div>
              <div className="price-summary-box">
                <div className="summary-head">
                  <h4>PRICE SUMMARY</h4>
                </div>
                <div className="summary-payment-box">
                  <div className="price-calculate">
                    <div className="d-flex justify-content-between w-100 inner">
                      <p>Total MRP (Incl. of taxes)&nbsp;</p>
                      <p>₹{totalAmount}</p>
                    </div>
                    <div className="d-flex justify-content-between w-100 inner">
                      <p>Shipping Charges &nbsp;</p>
                      <p style={{ color: 'green' }}>Free</p>
                    </div>
                    <div className="d-flex justify-content-between w-100 inner">
                      <p className="subtotal">Subtotal &nbsp;</p>
                      <p className="subtotal">₹{totalAmount}</p>
                    </div>

                    <div className="add-address">
                      <Link to="/checkout" state={{ data: cartItemList }}>
                        <Button>Proceed to Checkout</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="trust-badge-wrapper">
                  <div className="container d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row">
                        <div className="d-flex inner  flex-column align-items-center">
                          <Image
                            fluid
                            alt="offer"
                            loading="lazy"
                            src={cartBadgeTrust}
                          />
                          <span>100% SECURE PAYMENTS</span>
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div className="d-flex inner  flex-column align-items-center">
                          <Image
                            fluid
                            alt="offer"
                            loading="lazy"
                            src={cartEasyReturn}
                          />
                          <span>EASY RETURNS &amp; QUICK REFUNDS</span>
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div className="d-flex inner flex-column align-items-center">
                          <Image
                            fluid
                            alt="offer"
                            loading="lazy"
                            src={qualityCheck}
                          />
                          <span>QUALITY ASSURANCE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BagItem

import React, { useEffect, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import {
  Globe,
  bagIcon,
  discount,
  easyReturns,
  prodDesc,
  returnImg,
  starOffer,
  trustCart,
  wishlistIcon,
  wishlistSelected
} from '../../../../config/Images'
import ImageGallery from 'react-image-gallery'
import Accordion from 'react-bootstrap/Accordion'
import ApiUtils from '../../../../apis/ApiUtils'
import { isUserAuthenticated } from '../../../../helper/customUseSelector'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { setItemCountCart } from '../../../../store/slices/cartSlice'
import {
  type ProductInfoType,
  type WishlistItem,
  type cartList
} from '../../../../config/ResponseTypes'
import { ToasterMessage } from '../../../../helper/ToasterHelper'
import { COOKIE_STORAGE_KEY } from '../../../../config/Constant'

function ProductInfo (productDetails: ProductInfoType): React.JSX.Element {
  const isRouteProtected = isUserAuthenticated()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [cartItemList, setCartItemList] = useState<cartList[]>([])
  const images = [
    {
      original: productDetails.productDetails.displayImage,
      thumbnail: productDetails.productDetails.displayImage
    }
  ]
  productDetails?.productDetails?.images?.forEach((img: string) => {
    images.push({
      original: img,
      thumbnail: img
    })
  })
  const colorShade = [
    { color: 'rgb(14, 14, 14)', colorName: 'jet black' },
    { color: 'rgb(20, 28, 48)', colorName: 'navy blazer' },
    { color: 'rgb(157, 32, 47)', colorName: 'bold red' },
    { color: 'rgb(21, 103, 217)', colorName: 'blue' },
    { color: 'rgb(251, 209, 52)', colorName: 'yellow' },
    { color: 'rgb(37, 42, 54)', colorName: 'dark sapphire' }
  ]
  const sizeSelect = [
    { size: 'S' },
    { size: 'M' },
    { size: 'L' },
    { size: 'XL' },
    { size: '2XL' }
  ]
  useEffect(() => {
    if (isRouteProtected) {
      fetchGetWishlist()
      fetchCartItemList()
    }
  }, [productDetails])
  function fetchGetWishlist (): void {
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
  const wishlistedItem = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ): void => {
    if (isRouteProtected) {
      ApiUtils.removeFromWishlist(id)
        .then((res: any) => {
          if (res.status === 200) {
            fetchGetWishlist()
            ToasterMessage('success', res?.data?.message)
          }
        })
        .catch((err: any) => {
          ToasterMessage('error', err?.data?.message)
        })
    }
  }
  const notWishlistedItem = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ): void => {
    if (isRouteProtected) {
      const body = {
        productId: id
      }
      ApiUtils.addToWishlist(body)
        .then((res: any) => {
          if (res.status === 200) {
            fetchGetWishlist()
            ToasterMessage('success', res?.data?.message)
          }
        })
        .catch((err: any) => {
          ToasterMessage('error', err?.data?.message)
        })
    } else {
      navigate('/wishlist')
    }
  }
  const addProductToBag = (id: string): void => {
    if (isRouteProtected) {
      ApiUtils.addItemInCart(id)
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
    } else {
      navigate('/wishlist')
    }
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
  return (
    <div className="product-details-container">
      {productDetails !== null && (
        <>
          <Row>
            <Col md={6} sm={12}>
              <div className="product-gallery">
                <ImageGallery
                  items={images}
                  thumbnailPosition="left"
                  useBrowserFullscreen={false}
                  showPlayButton={false}
                  slideOnThumbnailOver={true}
                  showFullscreenButton={false}
                  lazyLoad={true}
                />
              </div>
            </Col>
            <Col md={5} sm={12} className="details-wrapper">
              <div className="product-desc w-100 d-flex flex-column">
                <div className="manufacturer-name d-flex">
                  <h3 className="brand-name noPadding">Bewakoof®</h3>
                </div>
                <h1 className="product-name">
                  {productDetails?.productDetails?.name}
                </h1>
                <div className="price-details mt-2 w-100">
                  <span className="price-container d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="prices d-flex flex-row align-items-end">
                        <span className="selling-price mr-2">
                          <span className="rupee_icon">₹</span>{' '}
                          {productDetails?.productDetails?.price}
                        </span>
                        <div className="disc-price mr-2">
                          <span>₹</span>1199
                        </div>
                        <div className="offer-perc">
                          <p>68% OFF</p>
                        </div>
                      </div>
                    </div>
                  </span>
                  <span className="inclusive-tax-text mb-1">
                    inclusive of all taxes
                  </span>
                  <div className="tag w-100">
                    <div className="tags-wrapper d-flex flex-wrap">
                      <div className="tags-rect d-flex flex-column">
                        <p className="desk">BUY 3 FOR 999</p>
                      </div>
                      <div className="tags-rect second d-flex flex-column">
                        <p className="desk">100% cotton</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tribe-container">
                  <div className="tribe-msg-wrapper">
                    <span className="tribe-msg">
                      TriBe members get an extra discount of ₹30 and FREE
                      shipping.
                    </span>
                  </div>
                </div>
                <div className="size-container">
                  <div className="color-block">
                    <div className="color-name">
                      <label>COLOUR OPTIONS:</label> &nbsp; White
                    </div>
                    <div className="multi-color-box">
                      <div className="multi-color-div d-flex align-items-center justify-content-start flex-wrap">
                        {colorShade.map((box, i) => {
                          return (
                            <div className="multi-color-block" key={i}>
                              <span>
                                <div
                                  style={{ backgroundColor: `${box.color}` }}
                                ></div>
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="size-wrapper">
                    <div className="size-outer-wrapper">
                      <h2 className="select-size-title">Select Size</h2>
                    </div>
                    <div className="select-size">
                      {sizeSelect.map((item, i) => {
                        return (
                          <div
                            className="each-size"
                            key={i}
                            id={`test-size-${item.size}`}
                          >
                            <span>{item.size}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="add-button-wrapper d-flex flex-column">
                  <div className="add-buttons d-flex flex-row align-items-center justify-content-between flex-row flex-grow-1 flex-row-reverse">
                    <div className="add-wishlist btn-border d-flex flex-row align-items-center justify-content-center">
                      {wishlist.length > 0 &&
                      wishlist?.some(
                        (wishlistItem) =>
                          wishlistItem?.products?._id ===
                          productDetails?.productDetails?._id
                      )
                        ? (
                        <div
                          onClick={(e) => {
                            wishlistedItem(
                              e,
                              productDetails?.productDetails?._id
                            )
                          }}
                        >
                          <Image
                            fluid
                            className="bag-icon"
                            loading="lazy"
                            src={wishlistSelected}
                          />
                          <span>WISHLISTED</span>
                        </div>
                          )
                        : (
                        <div
                          onClick={(e) => {
                            notWishlistedItem(
                              e,
                              productDetails?.productDetails?._id
                            )
                          }}
                        >
                          <Image
                            fluid
                            className="bag-icon"
                            loading="lazy"
                            src={wishlistIcon}
                          />
                          <span>WISHLIST</span>
                        </div>
                          )}
                    </div>
                    {cartItemList.length > 0 &&
                    cartItemList?.some(
                      (cartItem) =>
                        cartItem?.product?._id ===
                        productDetails?.productDetails?._id
                    )
                      ? (
                      <>
                        <div className="add-bag btn-border d-flex flex-row align-items-center justify-content-center">
                          <Link to="/cart">
                            <Image
                              fluid
                              className="bag-icon"
                              loading="lazy"
                              src={bagIcon}
                            />
                            <span>GO TO BAG</span>
                          </Link>
                        </div>
                      </>
                        )
                      : (
                      <>
                        <div
                          className="add-bag btn-border d-flex flex-row align-items-center justify-content-center"
                          onClick={() => {
                            addProductToBag(
                              productDetails?.productDetails?._id
                            )
                          }}
                        >
                          <Image
                            fluid
                            className="bag-icon"
                            loading="lazy"
                            src={bagIcon}
                          />
                          <span>ADD TO BAG</span>
                        </div>
                      </>
                        )}
                  </div>
                </div>
                <div className="about-product">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <div className="accordion-title d-flex align-items-center mb-2">
                          <Image fluid src={starOffer} className="mr-2" />
                          <div className="d-flex flex-column">
                            <div className="d-flex flex-row pl-1">
                              <h2>Offers</h2>
                            </div>
                            <div className="accordion-subtitle pl-1 pt-1">
                              SAVE EXTRA WITH 3 OFFERS
                            </div>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="coupon-body">
                          <section className="coupon-body d-flex mb-2">
                            <Image
                              width="18px"
                              height="18px"
                              fluid
                              src={discount}
                            />
                            <p className="desc-text">
                              Get Rs.200 instant discount on your First Purchase
                              above Rs.999. Coupon code -<strong>NEW200</strong>
                            </p>
                          </section>
                          <section className="coupon-body d-flex mb-2">
                            <Image
                              width="18px"
                              height="18px"
                              fluid
                              src={discount}
                            />
                            <p className="desc-text">
                              Whistles! Get extra 20% Cashback on prepaid orders
                              above Rs.499. Coupon code - <strong>NEW20</strong>
                              . Applicable for new customers only!
                            </p>
                          </section>
                          <section className="coupon-body d-flex mb-2">
                            <Image
                              width="18px"
                              height="18px"
                              fluid
                              src={discount}
                            />
                            <p className="desc-text">
                              Whistles! Get extra 15% cashback on prepaid orders
                              above Rs.699. Coupon code - <strong>OOF15</strong>
                            </p>
                          </section>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <div className="accordion-title d-flex align-items-center mb-2">
                          <Image fluid src={prodDesc} className="mr-2" />
                          <div className="d-flex flex-column">
                            <div className="d-flex flex-row pl-1">
                              <h2>Product Description</h2>
                            </div>
                            <div className="accordion-subtitle pl-1 pt-1">
                              Manufacture, Care and Fit
                            </div>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="product-desc-text ml-1 mb-3">
                          {productDetails.productDetails.description}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <div className="accordion-title d-flex align-items-center mb-2">
                          <Image fluid src={returnImg} className="mr-2" />
                          <div className="d-flex flex-column">
                            <div className="d-flex flex-row pl-1">
                              <h2>15 Days Returns & Exchange</h2>
                            </div>
                            <div className="accordion-subtitle pl-1 pt-1">
                              Know about return & exchange policy
                            </div>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="product-desc-text ml-1 mb-3">
                          Easy returns upto 15 days of delivery. Exchange
                          available on select pincodes{' '}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className="trust-badge-container">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row  containerInner">
                      <div className="d-flex flex-column align-items-center">
                        <Image
                          fluid
                          loading="lazy"
                          alt="offer"
                          src={trustCart}
                        />
                        <span className="trustBadgeTitle">
                          100% SECURE PAYMENTS
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-row  containerInner">
                      <div className="d-flex flex-column align-items-center">
                        <Image
                          fluid
                          loading="lazy"
                          alt="offer"
                          src={easyReturns}
                        />
                        <span className="trustBadgeTitle">
                          EASY RETURNS &amp; INSTANT REFUNDS
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-row  containerInner">
                      <div className="d-flex flex-column align-items-center">
                        <Image
                          fluid
                          loading="lazy"
                          alt="offer"
                          src={Globe}
                        />
                        <span className="trustBadgeTitle">
                          SHIPPING GLOBALLY
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default ProductInfo

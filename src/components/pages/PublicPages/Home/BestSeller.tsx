import React, { useEffect, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import ApiUtils from '../../../../apis/ApiUtils'
import { useNavigate } from 'react-router-dom'
import { wishlistIcon, wishlistSelected } from '../../../../config/Images'
import { isUserAuthenticated } from '../../../../helper/customUseSelector'
import {
  type GetProductResType,
  type WishlistItem
} from '../../../../config/ResponseTypes'
import { ToasterMessage } from '../../../../helper/ToasterHelper'

function BestSeller (): React.JSX.Element {
  const navigate = useNavigate()
  const isRouteProtected = isUserAuthenticated()
  const [product, setProduct] = useState<GetProductResType[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  const redirectToProduct = (
    e: React.MouseEvent<HTMLDivElement>,
    item: GetProductResType
  ): void => {
    e.stopPropagation()
    navigate(`/product/${item._id}`, { state: item })
  }
  const notWishlistedItem = (
    e: React.MouseEvent<HTMLImageElement>,
    id: string
  ): void => {
    e.stopPropagation()
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
  const wishlistedItem = (
    e: React.MouseEvent<HTMLImageElement>,
    id: string
  ): void => {
    e.stopPropagation()
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
  useEffect(() => {
    ApiUtils.getProductList()
      .then((res: any) => {
        if (res.status === 200) {
          setProduct(res?.data.data)
        }
      })
      .catch((err: any) => {
        if (err === undefined) {
          ToasterMessage('error', 'Network error')
        }
        ToasterMessage('error', err?.data?.message)
      })
    if (isRouteProtected) {
      fetchGetWishlist()
    }
  }, [isRouteProtected])
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
  return (
    <React.Fragment>
      <div className="best-sellers-wrapper">
        <div className="section-heading">
          <h4>BESTSELLERS</h4>
        </div>
        <div className="product-widget">
          <Row>
            {product.length > 0 &&
              product.map((item, i) => {
                return (
                  <Col key={i} md={3} xs={6} sm={6} className="card-col">
                    <div className="product-card-box">
                      <div
                        onClick={(e) => {
                          redirectToProduct(e, item)
                        }}
                      >
                        <div className="product-card-img">
                          <Image
                            src={item.displayImage}
                            fluid
                            title={item.name}
                            loading="lazy"
                          />
                          <div className="product-seller-tag">
                            <span>{item.sellerTag}</span>
                          </div>
                        </div>
                        <div className="product-card-detail">
                          <div className="d-flex justify-content-between p-1">
                            <div className="product-naming">
                              <h3 className="brand-name">{item.brand}</h3>
                              <h2 className="name">{item.name}</h2>
                            </div>
                            <div className="wishlist-product">
                              {wishlist.some(
                                (wishlistItem) =>
                                  wishlistItem.products?._id === item?._id
                              )
                                ? (
                                <Image
                                  src={wishlistSelected}
                                  fluid
                                  loading="lazy"
                                  onClick={(e) => {
                                    wishlistedItem(e, item?._id)
                                  }}
                                />
                                  )
                                : (
                                <Image
                                  src={wishlistIcon}
                                  fluid
                                  loading="lazy"
                                  onClick={(e) => {
                                    notWishlistedItem(e, item?._id)
                                  }}
                                />
                                  )}
                            </div>
                          </div>
                          <div className="d-flex product-price-box px-1">
                            <div className="discounted-price-text">
                              <span>₹</span>
                              {item.price}
                            </div>
                            <div className="actual-price-text">
                              <span>₹</span>
                              3456
                            </div>
                            <div className="discount-percent">65% OFF</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              })}
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BestSeller

import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { bagIcon } from '../../../config/Images'
import ApiUtils from '../../../apis/ApiUtils'

interface WishlistItem {
  products: {
    displayImage: string
    name: string
    price: number
    ratings: number
    _id: string
  }
}
function UserWishlist (): React.JSX.Element {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  useEffect(() => {
    fetchUserWishlist()
  }, [])
  function fetchUserWishlist (): void {
    ApiUtils.getMyWishlist()
      .then((res: any) => {
        if (res.status === 200) {
          setWishlist(res.data.data.items)
        }
      })
      .catch((err: any) => {
        console.error('🚀 ~ file: Home.tsx:53 ~ useEffect ~ err:', err)
        // ToasterMessage('error', 'Something went wrong');
      })
  }
  return (
    <div className="wishlist-wrapper">
      <Container>
        <div className="product-widget">
          <Row>
          {wishlist?.length > 0 &&
              wishlist
                .map((wishlistItem) => {
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
                          <div className="product-seller-tag remove-item">
                            <span>X</span>
                          </div>
                        </div>
                        <div className="product-card-detail">
                          <div className="d-flex justify-content-between p-1">
                            <div className="product-naming">
                              <h3 className="brand-name">Bewakoof®</h3>
                              <h2 className="name">{wishlistItem?.products?.name}</h2>
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
                            <div className="add-to-bag d-flex justify-content-center align-items-center">
                              <span>
                                <Image
                                  fluid
                                  className="bag-icon"
                                  src={bagIcon}
                                />
                              </span>
                              <p>ADD TO CART</p>
                            </div>
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
      </Container>
    </div>
  )
}

export default UserWishlist

import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { bagIcon, offsalecommon } from '../../../config/Images'

function UserWishlist (): React.JSX.Element {
  return (
    <div className="wishlist-wrapper">
      <Container>
        <div className="product-widget">
          <Row>
            <Col md={3} xs={6} sm={6} className="card-col">
              <div className="product-card-box">
                <div>
                  <div className="product-card-img">
                    <Image src={offsalecommon} fluid />
                    <div className="product-seller-tag remove-item">
                      <span>X</span>
                    </div>
                  </div>
                  <div className="product-card-detail">
                    <div className="d-flex justify-content-between p-1">
                      <div className="product-naming">
                        <h3 className="brand-name">Bewakoof®</h3>
                        <h2 className="name">Mens Blue T-shirt</h2>
                      </div>
                    </div>
                    <div className="d-flex product-price-box px-1">
                      <div className="discounted-price-text">
                        <span>₹</span>
                        999
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
                          <Image fluid className="bag-icon" src={bagIcon} />
                        </span>
                        <p>ADD TO CART</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default UserWishlist

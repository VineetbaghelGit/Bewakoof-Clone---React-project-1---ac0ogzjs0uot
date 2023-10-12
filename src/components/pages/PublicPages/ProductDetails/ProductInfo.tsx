import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { bagIcon, tshirtbanner, wishlistIcon } from '../../../../config/Images'

function ProductInfo (productDetails: any): React.JSX.Element {
  console.log(
    '🚀 ~ file: ProductInfo.tsx:5 ~ ProductInfo ~ productDetails:',
    productDetails
  )
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
  return (
    <div className="product-details-container">
      <Row>
        <Col sm={6} xs={12}>
          <Image fluid src={tshirtbanner} className="product-gallery" />
        </Col>
        <Col sm={6} xs={12} className="details-wrapper">
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
                  TriBe members get an extra discount of ₹30 and FREE shipping.
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
                    {colorShade.map((box) => {
                      return (
                        <>
                          <div className="multi-color-block">
                            <span>
                              <div
                                style={{ backgroundColor: `${box.color}` }}
                              ></div>
                            </span>
                          </div>
                        </>
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
                      <>
                        <div
                          className="each-size"
                          id={`test-size-${item.size}`}
                        >
                          <span>{item.size}</span>
                        </div>
                      </>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="add-button-wrapper d-flex flex-column">
              <div className="add-buttons d-flex flex-row align-items-center justify-content-between flex-row flex-grow-1 flex-row-reverse">
                <div className="add-wishlist btn-border d-flex flex-row align-items-center justify-content-center">
                  <Image fluid className="bag-icon" src={wishlistIcon} />
                  <span>WISHLIST</span>
                </div>
                <div className="add-bag btn-border d-flex flex-row align-items-center justify-content-center">
                  <Image fluid className="bag-icon" src={bagIcon} />
                  <span>ADD TO BAG</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductInfo

import React, { useEffect, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import ApiUtils from '../../../../apis/ApiUtils'
import { Link } from 'react-router-dom'

interface GetProductResType {
  brand: string
  displayImage: string
  name: string
  price: number
  sellerTag: string
}

function BestSeller (): React.JSX.Element {
  const [product, setProduct] = useState<GetProductResType[]>([])

  useEffect(() => {
    ApiUtils.getProductList()
      .then((res: any) => {
        if (res.status === 200) {
          setProduct(res?.data.data)
        }
      })
      .catch((err: any) => {
        console.error('🚀 ~ file: Home.tsx:53 ~ useEffect ~ err:', err)
        // ToasterMessage('error', 'Something went wrong');
      })
  }, [])
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
                      <div className="product-card-img">
                        <Image
                          src={item.displayImage}
                          fluid
                          title={item.name}
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
                            <Link to="/wishlist">
                              <Image
                                src="https://images.bewakoof.com/web/Wishlist.svg"
                                fluid
                              />
                            </Link>
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

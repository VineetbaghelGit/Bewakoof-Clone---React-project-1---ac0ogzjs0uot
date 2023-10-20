import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Col, Container, Image, Row } from 'react-bootstrap'
import ApiUtils from '../../../apis/ApiUtils'
import { loggedInUserInfo } from '../../../helper/customUseSelector'

interface OrderResponse {
  items: any[]
  orderDate: string
  shipmentDetails: {
    address: {
      city: string
      street: string
      country: string
      state: string
      zipCode: string
    }
    type: string
  }
  status: string
  totalPrice: number
  _id: string
}
interface UserDetails {
  name: string
  email: string
  passwordCurrent: string
  password: string
}

function SingleOrder (): React.JSX.Element {
  const { id } = useParams()
  const userInfo: UserDetails = loggedInUserInfo()
  const [orderDetails, setOrderDetails] = useState<OrderResponse>({
    items: [],
    orderDate: '',
    shipmentDetails: {
      address: {
        city: '',
        street: '',
        country: '',
        state: '',
        zipCode: ''
      },
      type: ''
    },
    status: '',
    totalPrice: 0,
    _id: ''
  })

  useEffect(() => {
    if (id !== null) {
      fetchOrderDetail(id as string)
    }
  }, [id])
  function fetchOrderDetail (params: string): void {
    ApiUtils.getOrderItem(params)
      .then((res) => {
        if (res.status === 200) {
          setOrderDetails(res.data.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="single-order-wrapper">
      <Container>
        <div className="backto-account">
          <Link to="/account/orders">
            <ChevronLeftIcon />
            Back to My Order
          </Link>
        </div>
        <div className="order-wrapper">
          <div className="order-container">
            <Row>
              <Col md={7}>
                <div className="order-number">
                  <h6>
                    ORDER# <strong>652bc00514432434954432f4</strong>{' '}
                  </h6>
                </div>
                <div className="item-detail">
                  <div className="inner-box">
                    <div className="left">
                      <Link to="/">
                        <Image
                          fluid
                          src="https://images.bewakoof.com/t320/men-s-white-t-shirt-1093-1672982318-1.jpg"
                        />
                      </Link>
                    </div>
                    <div className="right">
                      <div className="d-flex flex-column justify-content-between ">
                        <div className="text">
                          <p>Mens White T-shirt</p>
                          <div className="size">Size:L</div>
                          <p>Rs. 379</p>
                          <h6>
                            Order Placed <span>15th Oct 23 04:06 PM</span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4} className="shipping-detail">
                <div className="address">
                  <h5>Shipping Details</h5>
                  <h6>
                    {userInfo.name} <label>{orderDetails.shipmentDetails.type}</label>{' '}
                  </h6>
                  <p>
                    {orderDetails.shipmentDetails.address.street}, {orderDetails.shipmentDetails.address.city}, {orderDetails.shipmentDetails.address.zipCode}, {orderDetails.shipmentDetails.address.state}, {orderDetails.shipmentDetails.address.country}
                  </p>
                </div>
                <div className="payment-wrapper">
                  <h4>Payment Summary</h4>
                  <div className="price-wrapper">
                    <span>Cart Total</span>
                    <span className="amount">₹ 379</span>
                  </div>
                  <div className="price-wrapper">
                    <span>Delivery Fee</span>
                    <span className="amount">₹ 30</span>
                  </div>
                  <div className="price-wrapper">
                    <span>Order Total</span>
                    <span className="amount">₹ 429</span>
                  </div>
                  <div className="price-wrapper totalrow">
                    <span>Amount To Be Paid</span>
                    <span className="amount">₹ 429</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SingleOrder

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { loggedInUserInfo } from '../../../../helper/customUseSelector'
import {
  type OrderResponse,
  type UserDetails
} from '../../../../config/ResponseTypes'
import './style.css'
import { ToasterMessage } from '../../../../helper/ToasterHelper'
import OrderUtils from '../../../../apis/OrderUtils'
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
    OrderUtils.getOrderItem(params)
      .then((res) => {
        if (res.status === 200) {
          setOrderDetails(res.data.data)
        }
      })
      .catch((err: any) => {
        if (err === undefined) {
          ToasterMessage('error', 'Network error')
        }
        ToasterMessage('error', err?.data?.message)
      })
  }
  const convertTime = (timestamp: string): string => {
    const date = new Date(timestamp)
    const localDate = date.toLocaleDateString()
    const localTime = date.toLocaleTimeString()
    return localDate + ' ' + localTime
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
                    ORDER# <strong>{orderDetails?._id}</strong>{' '}
                  </h6>
                </div>
                <div className="item-detail">
                  <div className="inner-box">
                    <div className="left">
                      <Link to={`/product/${orderDetails?.items[0]?.product?._id}`}>
                        <Image
                          fluid
                          src={orderDetails?.items[0]?.product?.displayImage}
                        />
                      </Link>
                    </div>
                    <div className="right">
                      <div className="d-flex flex-column justify-content-between ">
                        <div className="text">
                          <p>{orderDetails?.items[0]?.product?.name}</p>
                          <div className="size">Size:L</div>
                          <p>Rs. {orderDetails?.items[0]?.product?.price}</p>
                          <h6>
                            Order Placed{' '}
                            <span>{convertTime(orderDetails?.orderDate)}</span>
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
                    {userInfo?.name}{' '}
                    <label>{orderDetails?.shipmentDetails?.type}</label>{' '}
                  </h6>
                  <p>
                    {orderDetails?.shipmentDetails?.address?.street},{' '}
                    {orderDetails?.shipmentDetails?.address?.city},{' '}
                    {orderDetails?.shipmentDetails?.address?.zipCode},{' '}
                    {orderDetails?.shipmentDetails?.address?.state},{' '}
                    {orderDetails?.shipmentDetails?.address?.country}
                  </p>
                </div>
                <div className="payment-wrapper">
                  <h4>Payment Summary</h4>
                  <div className="price-wrapper">
                    <span>Cart Total</span>
                    <span className="amount">
                      ₹ {orderDetails?.items[0]?.product?.price}
                    </span>
                  </div>
                  <div className="price-wrapper">
                    <span>Delivery Fee</span>
                    {orderDetails?.items[0]?.product?.price < 1000
                      ? (
                      <span className="amount">₹ 30</span>
                        )
                      : (
                      <span className="amount">₹ 0</span>
                        )}
                  </div>
                  <div className="price-wrapper">
                    <span>Order Total</span>
                    <span className="amount">
                      ₹
                      {orderDetails?.items[0]?.product?.price < 1000
                        ? orderDetails?.items[0]?.product?.price + 30
                        : orderDetails?.items[0]?.product?.price}
                    </span>
                  </div>
                  <div className="price-wrapper totalrow">
                    <span>Amount To Be Paid</span>
                    <span className="amount">
                      ₹
                      {orderDetails?.items[0]?.product?.price < 1000
                        ? orderDetails?.items[0]?.product?.price + 30
                        : orderDetails?.items[0]?.product?.price}
                    </span>
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

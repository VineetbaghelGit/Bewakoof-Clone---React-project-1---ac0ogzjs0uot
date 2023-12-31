import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { type OrderItem } from '../../../../config/ResponseTypes'
import './style.css'
import { ToasterMessage } from '../../../../helper/ToasterHelper'
import OrderUtils from '../../../../apis/OrderUtils'

function MyOrders (): React.JSX.Element {
  const [orderList, setOrderList] = useState<OrderItem[]>([])
  function getOrderItemList (): void {
    OrderUtils.getOrderItemList()
      .then((res: any) => {
        if (res.status === 200) {
          setOrderList(res.data.data)
        }
      })
      .catch((err: any) => {
        if (err === undefined) {
          ToasterMessage('error', 'Network error')
        }
        ToasterMessage('error', err?.data?.message)
      })
  }
  useEffect(() => {
    getOrderItemList()
  }, [])
  return (
    <div className="profile-wrapper">
      <Container>
        <div className="backto-account">
          <Link to="/account">
            <ChevronLeftIcon />
            Back to My Account
          </Link>
        </div>
        <div className="profile-head">
          <div className="profile-title">My Orders</div>
          <hr />
        </div>
        {orderList?.length > 0
          ? orderList?.map((order, i) => {
            return order?.order?.items?.map((item, k) => {
              return (
                  <div key={k}>
                    <div className="orders-wrapper">
                      <div className="orders-container">
                        <div className="order-number">
                          <h6>
                            ORDER# <strong>{order.order._id}</strong>{' '}
                          </h6>
                        </div>
                        <div>
                          <Link to={`/account/order/${order.order._id}`}>
                            <div className="order-details">
                              <div className="order-outer-box">
                                <div className="inner-box">
                                  <div className="box-left">
                                    <Link to={`/product/${item.product._id}`}>
                                      <Image
                                        fluid
                                        src={item.product.displayImage}
                                        loading='lazy'
                                      />
                                    </Link>
                                  </div>
                                  <div className="box-right">
                                    <div className="text">
                                      <p className="name">
                                        {item.product.name}
                                      </p>
                                      <p>
                                        <span>Size: L</span>
                                      </p>
                                      <label className="order-confirmed">
                                        Confirmed
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
              )
            })
          })
          : ''}
      </Container>
    </div>
  )
}

export default MyOrders

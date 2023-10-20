import { Image } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import { OrderSuccessAnime } from '../../../config/Images'

function OrderSuccess (): React.JSX.Element {
  return (
    <div className="wishlist-wrapper">
      <div className="wishlist-empty">
        <Image src={OrderSuccessAnime} fluid width="70%" />
        <div className="empty-list-title" style={{ fontSize: '20px', marginBottom: '14px' }} >Thank you for shopping!</div>
        <div className="empty-list-subtitle">Your order has been placed.</div>
        <Link to="/">
          <div className="wishlist-btn">Shop now</div>
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess

import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import { emptyCartDoodle } from '../../../../config/Images'
import CartHead from './CartHead'
import BagItem from './BagItem'
import { cartItemsCount } from '../../../../helper/customUseSelector'

function Index (): React.JSX.Element {
  const cartItemCount: number | undefined = cartItemsCount()

  if (cartItemCount !== undefined && cartItemCount !== 0) {
    return (
      <div className="cart-wrapper">
        <CartHead />
        <BagItem />
      </div>
    )
  } else {
    return (
      <div className="wishlist-wrapper">
        <div className="wishlist-empty">
          <Image src={emptyCartDoodle} fluid width="50%" />
          <div className="empty-list-title">Nothing in the bag</div>
          <div className="empty-list-subtitle">
            Add your product here and make them yours soon!
          </div>
          <Link to="/">
            <div className="wishlist-btn">Shop now</div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Index

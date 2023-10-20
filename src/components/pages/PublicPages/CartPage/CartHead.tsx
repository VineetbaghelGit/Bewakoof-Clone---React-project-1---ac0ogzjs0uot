import React from 'react'
import { Container } from 'react-bootstrap'
import { cartItemsCount } from '../../../../helper/customUseSelector'

function CartHead (): React.JSX.Element {
  const cartItemCount = cartItemsCount()

  return (
    <Container className="cart-head">
      <span className="qty">
        <b>My Bag </b>{cartItemCount} item(s)
      </span>
    </Container>
  )
}

export default CartHead

import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { emptyCartDoodle } from '../../../../config/Images'

function Index (): React.JSX.Element {
  return (
    <div className="wishlist-wrapper">
      <div className="wishlist-empty">
        <Image
          src={emptyCartDoodle}
          fluid
          width="50%"
        />
        <div className="empty-list-title">Nothing in the bag</div>
        <div className="empty-list-subtitle">
        Add your product here and make them yours soon!
        </div>
        <div className="wishlist-btn">
          <Link to="/">Shop now</Link>
        </div>
      </div>
    </div>
  )
}

export default Index

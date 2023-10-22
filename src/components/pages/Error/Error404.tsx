import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Error404Img } from '../../../config/Images'

function Error404 (): React.JSX.Element {
  return (
    <div className="errorpage-wrapper">
      <div className="error-empty">
        <Image src={Error404Img} fluid />
        <div className="empty-list-title">OH SNAP !</div>
        <div className="empty-list-subtitle">
          The page you are looking for does not exist.
        </div>
        <Link to="/">
          <div className="error-btn">Go to Homepage</div>
        </Link>
      </div>
    </div>
  )
}

export default Error404

/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eol-last */
import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ComingSoonImg } from '../../../../config/Images'
import "./style.css"
function ComingSoon (): JSX.Element {
  return (
    <div className="wishlist-empty">
    <Image src={ComingSoonImg} fluid />
    <div className="empty-list-title">Hey! We are building our website.</div>
    <Link to="/">
      <div className="wishlist-btn">Go to home</div>
    </Link>
  </div>
  )
}

export default ComingSoon
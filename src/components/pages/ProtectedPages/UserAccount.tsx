import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
function UserAccount (): React.JSX.Element {
  return (
    <div className="account-wrapper">
      <Container>
        <div className="account-head">
          <div className="account-title">My Account</div>
          <hr />
        </div>
      </Container>
      <div className="account-options">
        <Container>
          <div className="account-container">
            <div className="account-inner">
              <Link to="/account/orders">
                My Orders
                <ChevronRightIcon />
              </Link>
              <span className="account-text">
                View, modify and track orders
              </span>
            </div>
            {/* <div className="account-inner">
              <Link to="/account/address">
                My Addresses
                <ChevronRightIcon />
              </Link>
              <span className="account-text">
                Edit, add or remove addresses{' '}
              </span>
            </div> */}
            <div className="account-inner">
              <Link to="/account/profile">
                My Profile
                <ChevronRightIcon />
              </Link>
              <span className="account-text">
                Edit personal info, change password{' '}
              </span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default UserAccount

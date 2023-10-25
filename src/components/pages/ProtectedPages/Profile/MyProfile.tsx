import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { loggedInUserInfo } from '../../../../helper/customUseSelector'
import { ToasterMessage } from '../../../../helper/ToasterHelper'
import ApiUtils from '../../../../apis/ApiUtils'
import Cookies from 'js-cookie'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useDispatch } from 'react-redux'
import { COOKIE_STORAGE_KEY } from '../../../../config/Constant'
import { removeUserAuth } from '../../../../store/slices/authSlices'
import { type UserDetails } from '../../../../config/ResponseTypes'
import './style.css'

function MyProfile (): React.JSX.Element {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo: UserDetails = loggedInUserInfo()
  const [userData, setUserData] = useState<UserDetails>({
    name: userInfo?.name,
    email: userInfo?.email,
    passwordCurrent: '',
    password: ''
  })
  const handleSaveChange = (e: any): void => {
    e.preventDefault()
    if (
      userData.email.length === 0 ||
      userData.name.length === 0 ||
      userData.passwordCurrent.length === 0 ||
      userData.password.length === 0
    ) {
      ToasterMessage('error', 'All fields are mandatory')
    } else {
      ApiUtils.updateUserPassword(userData)
        .then((res) => {
          if (res.status === 200) {
            ToasterMessage('success', 'Password changed successfully')
            setUserData({
              name: userInfo?.name,
              email: userInfo?.email,
              passwordCurrent: '',
              password: ''
            })
          }
        })
        .catch((err) => {
          ToasterMessage('error', err.data.message)
        })
    }
  }
  const handleDeleteAccount = (e: any): void => {
    e.preventDefault()
    if (
      userData.email.length === 0 ||
      userData.name.length === 0 ||
      userData.passwordCurrent.length === 0 ||
      userData.password.length === 0
    ) {
      ToasterMessage('error', 'All fields are mandatory')
    } else {
      ApiUtils.deleteMyAccount(userData)
        .then((res) => {
          if (res.status === 204) {
            navigate('/signup')
            Cookies.remove(COOKIE_STORAGE_KEY)
            dispatch(removeUserAuth())
            ToasterMessage('success', 'Account Delete Successfully')
            setUserData({
              name: userInfo?.name,
              email: userInfo?.email,
              passwordCurrent: '',
              password: ''
            })
          }
        })
        .catch((err) => {
          ToasterMessage('error', err.data.message)
        })
    }
  }

  const handleChange = (e: any): void => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
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
          <div className="profile-title">My Profile</div>
          <hr />
        </div>
        <Form noValidate>
          <Form.Floating className="mb-3">
            <Form.Control
              id="profile-name"
              type="text"
              placeholder="Name"
              value={userData.name}
              onChange={handleChange}
              name="name"
            />
            <label htmlFor="profile-name">Name</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="profile-email"
              type="email"
              placeholder="Email"
              value={userData.email}
              name="email"
            />
            <label htmlFor="profile-email">Email address</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="profile-password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="passwordCurrent"
            />
            <label htmlFor="new-password">Password</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="new-password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
            <label htmlFor="new-password">New Password</label>
          </Form.Floating>
        </Form>
        <Button type="button" onClick={handleSaveChange} className="save-btn">
          Save Changes
        </Button>
        <Button type="button" onClick={handleDeleteAccount} className="save-btn delete-account">
          <DeleteOutlineIcon/>
          Delete My Account
        </Button>
      </Container>
    </div>
  )
}

export default MyProfile

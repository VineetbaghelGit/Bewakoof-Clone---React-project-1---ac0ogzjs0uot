/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
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
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import './style.css'

function MyProfile (): React.JSX.Element {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo: UserDetails = loggedInUserInfo()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [userData, setUserData] = useState<UserDetails>({
    name: userInfo?.name,
    email: userInfo?.email,
    profileImage: userInfo?.profileImage,
    passwordCurrent: '',
    password: ''
  })
  const handleSaveChange = (e: React.MouseEvent<HTMLButtonElement>): void => {
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
              password: '',
              profileImage: userInfo.profileImage
            })
          }
        })
        .catch((err) => {
          ToasterMessage('error', err.data.message)
        })
    }
  }
  const handleDeleteAccount = (e: React.MouseEvent<HTMLButtonElement>): void => {
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
              password: '',
              profileImage: ''
            })
          }
        })
        .catch((err) => {
          ToasterMessage('error', err.data.message)
        })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files != null && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      const objectUrl: string = URL.createObjectURL(e.target.files[0])
      setUserData({
        ...userData,
        profileImage: objectUrl
      })
    }
  }

  const handleImageUpload = (): void => {
    if (selectedFile !== null) {
      const formData = new FormData()
      formData.append('profileImage', selectedFile)
      ApiUtils.uploadUserProfileImg(formData)
        .then((res) => {
          const getCookiesValue = Cookies.get(COOKIE_STORAGE_KEY)
          const parsedValue = JSON.parse(getCookiesValue ?? 'null')
          const updateData = {
            ...parsedValue,
            profileImage: res?.data?.data?.user?.profileImage
          }
          const userDataString = JSON.stringify(updateData)
          ToasterMessage('success', 'Upload Successfully')
          Cookies.set(COOKIE_STORAGE_KEY, userDataString)
        })
        .catch((err) => {
          ToasterMessage('error', err.data.message)
        })
    }
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

        <Row>
          <Col md={4}>
            <div className="avatar-upload">
              <div className="avatar-edit">
                <form action="" method="post" id="form-image">
                  <input
                    type="file"
                    id="imageUpload"
                    onChange={handleImage}
                    accept=".png, .jpg, .jpeg"
                  />
                  <label htmlFor="imageUpload" className="image-upload-cam">
                    <CameraAltIcon />
                  </label>
                </form>
              </div>
              <div className="avatar-preview">
                <img
                  className="profile-user-img img-responsive img-circle"
                  id="imagePreview"
                  alt="User profile picture"
                  src={userData.profileImage}
                  style={{ height: '130px' }}
                />
              </div>
              <Button
                type="button"
                onClick={handleImageUpload}
                className="save-btn"
                style={{ height: '30px' }}
              >
                Upload Image
              </Button>
            </div>
          </Col>
          <Col md={8}>
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
                  defaultValue={userData.email}
                  name="email"
                  readOnly
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
            <Button
              type="button"
              onClick={handleSaveChange}
              className="save-btn"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={handleDeleteAccount}
              className="save-btn delete-account"
            >
              <DeleteOutlineIcon />
              Delete My Account
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MyProfile

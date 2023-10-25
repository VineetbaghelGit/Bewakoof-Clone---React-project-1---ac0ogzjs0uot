import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { ToasterMessage } from '../../../helper/ToasterHelper'
import ApiUtils from '../../../apis/ApiUtils'
import { type UserAddressInfo } from '../../../config/ResponseTypes'
import { useDispatch } from 'react-redux'
import { setItemCountCart } from '../../../store/slices/cartSlice'
import Cookies from 'js-cookie'
import { COOKIE_STORAGE_KEY } from '../../../config/Constant'

function Checkout (): React.JSX.Element {
  const { state } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userAddressDetails, setUserAddressDetails] = useState<UserAddressInfo>(
    {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      addressType: 'HOME'
    }
  )
  const handleSaveChange = (e: any): void => {
    e.preventDefault()
    if (
      userAddressDetails.street.length === 0 ||
      userAddressDetails.city.length === 0 ||
      userAddressDetails.state.length === 0 ||
      userAddressDetails.addressType.length === 0 ||
      userAddressDetails.country.length === 0 ||
      userAddressDetails.zipCode.length === 0
    ) {
      ToasterMessage('error', 'All fields are mandatory')
    } else {
      const promises = state.data.map(async (item: any) => {
        const body = {
          productId: item.product._id,
          quantity: 1,
          addressType: userAddressDetails.addressType,
          address: {
            street: userAddressDetails.street,
            city: userAddressDetails.city,
            state: userAddressDetails.state,
            country: userAddressDetails.country,
            zipCode: userAddressDetails.zipCode
          }
        }
        await ApiUtils.buyItemNow(body)
          .then((res) => {
            if (res.status === 200) {
              removeProductFromBag(item.product._id)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })

      Promise.all(promises)
        .then((successResults) => {
          ToasterMessage('success', 'Order placed successfully')
          navigate('/ordersuccess')
        })
        .catch((error) => {
          console.error('One or more promises rejected:', error)
        })
    }
  }

  const removeProductFromBag = (id: string): void => {
    ApiUtils.removeItemFromCart(id)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(setItemCountCart(res.data.results))
          const existingUserDataString: any = Cookies.get(COOKIE_STORAGE_KEY)
          const existingUserData = JSON.parse(existingUserDataString)
          const updatedUserData = {
            ...existingUserData,
            cart: res.data.results
          }
          const updatedUserDataString = JSON.stringify(updatedUserData)
          Cookies.set(COOKIE_STORAGE_KEY, updatedUserDataString)
        }
      })
      .catch((err: any) => {
        if (err === undefined) {
          ToasterMessage('error', 'Network error')
        }
        ToasterMessage('error', err?.data?.message)
      })
  }
  const handleChange = (e: any): void => {
    setUserAddressDetails({
      ...userAddressDetails,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="profile-wrapper checkout">
      <Container>
        <div className="backto-account">
          <Link to="/cart">
            <ChevronLeftIcon />
            Back to My Cart
          </Link>
        </div>
        <div className="profile-head">
          <div className="profile-title">Delivery Address Details</div>
          <hr />
        </div>
        <Form noValidate>
          <Row>
            <Col sm={6}>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="street"
                  type="text"
                  placeholder="Street Name"
                  value={userAddressDetails.street}
                  onChange={handleChange}
                  name="street"
                />
                <label htmlFor="street">Street Name</label>
              </Form.Floating>
            </Col>
            <Col sm={6}>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="city"
                  type="text"
                  placeholder="City Name"
                  value={userAddressDetails.city}
                  onChange={handleChange}
                  name="city"
                />
                <label htmlFor="city">City Name</label>
              </Form.Floating>
            </Col>
            <Col sm={6}>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="zipCode"
                  type="text"
                  placeholder="Zip Code"
                  value={userAddressDetails.zipCode}
                  onChange={handleChange}
                  name="zipCode"
                />
                <label htmlFor="zipCode">Zip Code</label>
              </Form.Floating>
            </Col>

            <Col sm={6}>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="state"
                  type="text"
                  placeholder="State"
                  value={userAddressDetails.state}
                  onChange={handleChange}
                  name="state"
                />
                <label htmlFor="state">State</label>
              </Form.Floating>
            </Col>
            <Col sm={6}>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="country"
                  type="text"
                  placeholder="Country"
                  value={userAddressDetails.country}
                  onChange={handleChange}
                  name="country"
                />
                <label htmlFor="country">Country</label>
              </Form.Floating>
            </Col>
            <Col sm={6}>
              <Form.Select
                name="addressType"
                size="sm"
                className="select-quantity"
                onChange={handleChange}
              >
                <option value="HOME">Home</option>
                <option value="OFFICE">Office</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
        <Button type="button" onClick={handleSaveChange} className="save-btn">
          Buy Now
        </Button>
      </Container>
    </div>
  )
}

export default Checkout

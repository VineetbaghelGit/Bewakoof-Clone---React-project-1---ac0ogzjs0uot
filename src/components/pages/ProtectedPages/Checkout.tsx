import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { ToasterMessage } from '../../../helper/ToasterHelper'
import { type UserDetails, type UserAddressInfo } from '../../../config/ResponseTypes'
import { useDispatch } from 'react-redux'
import { setItemCountCart } from '../../../store/slices/cartSlice'
import Cookies from 'js-cookie'
import { COOKIE_STORAGE_KEY, RAZORPAY_KEY_ID, RAZORPAY_SECRET_ID } from '../../../config/Constant'
import OrderUtils from '../../../apis/OrderUtils'
import CartUtils from '../../../apis/CartUtils'
import { cartItemsCount, loggedInUserInfo } from '../../../helper/customUseSelector'
import useRazorpay from 'react-razorpay'
import { emptyCartDoodle } from '../../../config/Images'

function Checkout (): React.JSX.Element {
  const { state } = useLocation()
  const userInfo: UserDetails = loggedInUserInfo()

  const [Razorpay] = useRazorpay()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItemCount = cartItemsCount()

  useEffect(() => {
    if (cartItemCount === 0) {
      // navigate('/')
    }
  }, [cartItemCount])
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
  const handlePayment = (): void => {
    const options: any = {
      key: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_SECRET_ID,
      amount: state?.totalAmount * 100,
      currency: 'INR',
      name: 'Bewakoof',
      description: 'Test Transaction',
      image: 'https://bewakoof-clone-react-project-1-ac0ogzjs0uot.vercel.app/static/media/bwk-primary-logo-eyes.58c3a149f93facfd3e5bd36dbdb0ff60.svg',
      handler: function (response: any) {
        if (response.razorpay_payment_id != null) {
          ToasterMessage('success', 'Order placed successfully')
          navigate('/ordersuccess')
        }
      },
      prefill: {
        name: userInfo?.name,
        email: userInfo?.email
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#3399cc'
      }
    }
    const rzpay = new Razorpay(options)
    rzpay.open()
  }
  const handleSaveChange = (e: React.MouseEvent<HTMLButtonElement>): void => {
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
      const promises = state?.data?.map(async (item: any) => {
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
        await OrderUtils.buyItemNow(body)
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
          handlePayment()
        })
        .catch((error) => {
          console.error('One or more promises rejected:', error)
        })
    }
  }
  const removeProductFromBag = (id: string): void => {
    CartUtils.removeItemFromCart(id)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(setItemCountCart(res?.data?.results))
          const existingUserDataString: string = Cookies.get(COOKIE_STORAGE_KEY) ?? ''
          const existingUserData = JSON.parse(existingUserDataString)
          const updatedUserData = {
            ...existingUserData,
            cart: res?.data?.results
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserAddressDetails({
      ...userAddressDetails,
      [e.target.name]: e.target.value
    })
  }
  function handleSelectChange (e: React.ChangeEvent<HTMLSelectElement>): void {
    setUserAddressDetails({
      ...userAddressDetails,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="profile-wrapper checkout">
      {cartItemCount !== undefined && cartItemCount !== 0
        ? <Container>
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
                onChange={handleSelectChange}
              >
                <option value="HOME">Home</option>
                <option value="OFFICE">Office</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
        <Button type="button" disabled={cartItemCount === 0} onClick={handleSaveChange} className="save-btn">
          Place Order
        </Button>
      </Container>
        : <div className="wishlist-wrapper">
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
      }

    </div>
  )
}

export default Checkout

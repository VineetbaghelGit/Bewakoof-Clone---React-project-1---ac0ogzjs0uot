import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { loginCover } from '../../../config/Images'
import ApiUtils from '../../../apis/ApiUtils'

function Login (): React.JSX.Element {
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e: any): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      const body = {
        email: formData.email,
        password: formData.password,
        appType: 'ecommerce'
      }
      ApiUtils.authLogin(body)
        .then((res: any) => {
          console.log('🚀 ~ file: Login.tsx:35 ~ .then ~ res:', res)
        })
        .catch((err: any) => {
          console.log('🚀 ~ file: Login.tsx:53 ~ handleSubmit ~ err:', err)
        // ToasterMessage('error', 'Something went wrong')
        })
    }
    setValidated(true)
  }
  return (
    <div className="auth-container">
      <Container fluid>
        <Row>
          <Col md={7}>
            <div className="welcome-section">
              <h2 className="login-welcome-text">
                Welcome to the world of Bewakoof®!
              </h2>
              <div className="login-welcome-img">
                <Image src={loginCover} fluid />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div className="login-section">
              <h3 className="login-text">Log in</h3>
              <p className="login-para">
                for Latest trends, exciting offers and everything Bewakoof®!
              </p>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    onChange={handleChange}
                    placeholder="Email"
                    name="email"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="login-btn">
                  Login
                </Button>
              </Form>
              <div className="d-flex justify-content-between">
                <div className="forget-password mt-3">
                  <span>
                    <Link to="/forget-password">Forget Password?</Link>
                  </span>
                </div>
                <div className="register mt-3">
                  <span>
                    <Link to="/signup">Dont have an account?</Link>
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login

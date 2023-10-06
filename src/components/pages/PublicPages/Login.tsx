import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { loginCover } from '../../../config/Images'

function Login (): React.JSX.Element {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event: any): void => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
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
                <Image
                  src={loginCover}
                  fluid
                />
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
                <Form.Group controlId="validationCustom01" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control required type="email" placeholder="Email" />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom01" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Form>
              {/* <div className="login-input-wrapper email-input mt-3">
                <input type="text" placeholder="Email" />
              </div>
              <div className="login-input-wrapper password-input mt-4">
                <input type="password" placeholder="Password" />
              </div> */}
              <div className="forget-password mt-2 mb-2">
                <span>
                  <Link to="/forget-password">Forget Password?</Link>
                </span>
              </div>
              <div className="login-input-wrapper password-input mt-2">
                <button>Login</button>
              </div>
              <div className="register mt-3 mb-2">
                <span>
                  <Link to="/register">Dont have an account?</Link>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login

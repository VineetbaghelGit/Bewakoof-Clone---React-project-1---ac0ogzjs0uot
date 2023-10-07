import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { loginCover } from '../../../config/Images'
import ApiUtils from '../../../apis/ApiUtils'
import { ToasterMessage } from '../../../helper/ToasterHelper'

function Signup (): React.JSX.Element {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
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
        name: formData.name,
        email: formData.email,
        password: formData.password,
        appType: 'ecommerce'
      }
      ApiUtils.authSignup(body)
        .then((res: any) => {
          if (res.status === 201) {
            ToasterMessage('success', 'Register Successfully')
            setFormData({
              name: '',
              email: '',
              password: ''
            })
            navigate('/login')
          }
        })
        .catch((err: any) => {
          console.log('🚀 ~ file: Signup.tsx:50 ~ handleSubmit ~ err:', err)
          ToasterMessage('error', 'Something went wrong')
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
              <h3 className="login-text">Sign up</h3>
              <p className="login-para">
                for Latest trends, exciting offers and everything Bewakoof®!
              </p>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationCustom01" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={handleChange}
                    placeholder="Name"
                    name="name"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom02" className="mb-3">
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
                <Form.Group controlId="validationCustom03" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    minLength={6}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="login-btn">
                  Sign up
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
                    <Link to="/login">Already have an account?</Link>
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

export default Signup

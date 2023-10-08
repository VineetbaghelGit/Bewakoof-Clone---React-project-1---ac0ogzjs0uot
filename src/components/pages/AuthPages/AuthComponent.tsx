import React, { useState, type FormEvent } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { loginCover } from '../../../config/Images'

interface AuthComponentProps {
  title: string
  actionText: string
  onSubmit: (formData: AuthFormData, navigate: any) => void
  firstLinkTo: string
  firstLinkText: string
  secondLinkTo: string
  secondLinkText: string
  initialState: AuthFormData
}

type AuthFormData = Record<string, string>

function AuthComponent ({
  title,
  actionText,
  onSubmit,
  firstLinkTo,
  firstLinkText,
  secondLinkTo,
  secondLinkText,
  initialState
}: AuthComponentProps): JSX.Element {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState<AuthFormData>(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.checkValidity()) {
      event.stopPropagation()
    } else {
      onSubmit(formData, navigate)
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
              <h3 className="login-text">{title}</h3>
              <p className="login-para">
                for Latest trends, exciting offers and everything Bewakoof®!
              </p>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {(title === 'Sign up' || title === 'Reset') && (
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
                )}

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
                  {actionText}
                </Button>
              </Form>
              <div className="d-flex justify-content-between">
                <div className="forget-password mt-3">
                  <span>
                    <Link to={firstLinkTo}>{firstLinkText}</Link>
                  </span>
                </div>
                <div className="register mt-3">
                  <span>
                    <Link to={secondLinkTo}>{secondLinkText}</Link>
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

export default AuthComponent

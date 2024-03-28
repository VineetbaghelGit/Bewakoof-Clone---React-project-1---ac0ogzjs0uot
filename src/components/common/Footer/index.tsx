import React from 'react'
import './Footer.css'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import PaymentsIcon from '@mui/icons-material/Payments'
import PinterestIcon from '@mui/icons-material/Pinterest'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import { AppAndriodStore, AppIosStore, SecurePaymentsImg } from '../../../config/Images'
function Footer (): React.JSX.Element {
  return (
    <div className="footer-wrapper">
      <Container className='footer-container'>
        <Row>
          <Col xs={12} className="footer-logo">
            <Link to="/">Bewakoof</Link>
          </Col>
        </Row>
        <section>
          <Row>
            <Col sm={4} md={3} className="menu-section">
              <span className="title">CUSTOMER SERVICE</span>
              <ul>
                <li>
                  <Link to="/coming-soon">Contact us</Link>
                </li>
                <li>
                  <Link to="/coming-soon">Track Order</Link>
                </li>{' '}
                <li>
                  <Link to="/coming-soon">Return Order</Link>
                </li>{' '}
                <li>
                  <Link to="/coming-soon">Cancel Order</Link>
                </li>
              </ul>
            </Col>
            <Col sm={4} md={3} className="menu-section">
              <span className="title">COMPANY</span>
              <ul>
                <li>
                  <Link to="/coming-soon">About us</Link>
                </li>
                <li>
                  <Link to="/coming-soon">We are Hiring</Link>
                </li>{' '}
                <li>
                  <Link to="/coming-soon">Terms & Conditions</Link>
                </li>{' '}
                <li>
                  <Link to="/coming-soon">Privacy Policy</Link>
                </li>
              </ul>
            </Col>

            <Col sm={4} md={3} className="menu-section">
              <span className="title">CONNECT WITH US</span>
              <ul>
                <li>
                  <Link to="/coming-soon">
                    <FacebookIcon />
                    <span>4.7M People Like this</span>
                  </Link>
                </li>
                <li>
                  <Link to="/coming-soon">
                    <InstagramIcon />
                    <span>10.7M People Like this</span>
                  </Link>{' '}
                </li>{' '}
                <li>
                  <Link to="/coming-soon">
                    <TwitterIcon />
                    <span>5.7M People Like this</span>
                  </Link>{' '}
                </li>{' '}
                <li>
                  <Link to="/coming-soon">
                    <PinterestIcon />
                    <span>2.7M People Like this</span>
                  </Link>{' '}
                </li>
              </ul>
            </Col>
            <Col sm={4} md={3} className="menu-section">
              <span className="title">CONNECT WITH US</span>
              <ul>
                <li>
                  <form>
                    <input type="text" placeholder="Enter Email Id" />
                    <input
                      type="submit"
                      value="SUBSCRIBE"
                      className="subs-btn"
                    />
                  </form>
                </li>
              </ul>
            </Col>
          </Row>
        </section>
        <section className="payment-gateway">
          <Row>
            <Col sm={4} md={3}>
              <ul>
                <li>
                  <Link to="/coming-soon">
                    <KeyboardReturnIcon />
                    <span>15 Days return policy*</span>
                  </Link>
                </li>
                <li>
                  <Link to="/coming-soon">
                    <PaymentsIcon />
                    <span> Cash on delivery*</span>
                  </Link>
                </li>
              </ul>
            </Col>
            <Col sm={4} md={3} className="menu-section">
              <span className="title">DOWNLOAD THE APP</span>
              <div className="download-app">
                <Link to="/">
                  <Image
                    src={AppAndriodStore}
                    fluid
                    loading='lazy'
                  />
                </Link>
                <Link to="/">
                  <Image
                    src={AppIosStore}
                    fluid
                    loading='lazy'
                  />
                </Link>
              </div>
            </Col>
            <Col sm={4} md={3} className="menu-section">
              <span className="title">100% SECURE PAYMENT</span>
              <Image
                src={SecurePaymentsImg}
                fluid
                loading='lazy'
              />
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  )
}

export default Footer

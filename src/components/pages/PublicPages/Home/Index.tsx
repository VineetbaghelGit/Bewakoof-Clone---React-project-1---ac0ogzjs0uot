import React from 'react'
import BannerCarousel from './BannerCarousel'
import { Container } from 'react-bootstrap'
import FeaturedProduct from './FeaturedProduct'
import BestSeller from './BestSeller'

function Home (): React.JSX.Element {
  return (
    <div className="home-page-container">
      <BannerCarousel />
      <FeaturedProduct/>
      <Container fluid>
        <BestSeller/>
      </Container>
    </div>
  )
}

export default Home

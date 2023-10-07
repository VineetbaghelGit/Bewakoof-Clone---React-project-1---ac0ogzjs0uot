import React, { useEffect, useState } from 'react'
import ApiUtils from '../../../apis/ApiUtils'
import BannerCarousel from './Home/BannerCarousel'
import { Container } from 'react-bootstrap'
import FeaturedProduct from './Home/FeaturedProduct'

function Home (): React.JSX.Element {
  const [data, setData] = useState([])
  console.log('🚀 ~ file: Home.tsx:6 ~ Home ~ data:', data)

  useEffect(() => {
    ApiUtils.getProductList()
      .then((res: any) => {
        console.log('🚀 ~ file: Home.tsx:35 ~ .then ~ res:', res)
        setData(res)
      })
      .catch((err: any) => {
        console.error('🚀 ~ file: Home.tsx:53 ~ useEffect ~ err:', err)
        // ToasterMessage('error', 'Something went wrong');
      })
  }, [])

  return (
    <div className="home-page-container">
      <BannerCarousel />
      <FeaturedProduct/>
      <Container fluid>
        <h1>fjhsb</h1>
      </Container>
    </div>
  )
}

export default Home

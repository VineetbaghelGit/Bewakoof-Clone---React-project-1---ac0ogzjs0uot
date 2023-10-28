import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import BreadCrumBox from './BreadCrumBox'
import ProductInfo from './ProductInfo'
import { useNavigate, useParams } from 'react-router-dom'
import ApiUtils from '../../../../apis/ApiUtils'
import { ToasterMessage } from '../../../../helper/ToasterHelper'
import './style.css'
import Review from './Review'

function Index (): React.JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()
  const [productDetails, setProductDetails] = useState([])
  useEffect(() => {
    if (id !== null) {
      fetchProductDetails(id as string)
      fetchReviewOfProduct(id as string)
    }
  }, [id])
  function fetchProductDetails (params: string): void {
    ApiUtils.getProductInfo(params)
      .then((res) => {
        if (res.status === 200) {
          setProductDetails(res.data.data)
        }
      })
      .catch((err: any) => {
        if (err === undefined) {
          ToasterMessage('error', 'Network error')
        }
        ToasterMessage('error', err?.data?.message)
        navigate('/')
      })
  }
  function fetchReviewOfProduct (params: string): void {
    ApiUtils.getProductReviews(params)
      .then((res) => {
        console.log('🚀 ~ file: Index.tsx:39 ~ .then ~ res:', res)
        // if (res.status === 200) {
        //   setProductDetails(res.data.data)
        // }
      })
      .catch((err: any) => {
        if (err === undefined) {
          ToasterMessage('error', 'Network error')
        }
        ToasterMessage('error', err?.data?.message)
        navigate('/')
      })
  }
  return (
    <div className="product-wrapper">
      <Container>
        <BreadCrumBox />
      </Container>
      <Container>
        <ProductInfo productDetails={productDetails} />
        <Review id={id}/>
      </Container>
    </div>
  )
}

export default Index

import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import BreadCrumBox from './BreadCrumBox'
import ProductInfo from './ProductInfo'
import { useNavigate, useParams } from 'react-router-dom'
import ApiUtils from '../../../../apis/ApiUtils'
import { ToasterMessage } from '../../../../helper/ToasterHelper'

function Index (): React.JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()
  const [productDetails, setProductDetails] = useState([])
  useEffect(() => {
    if (id !== null) {
      fetchProductDetails(id as string)
    }
  }, [id])
  function fetchProductDetails (params: string): void {
    ApiUtils.getProductInfo(params)
      .then((res) => {
        if (res.status === 200) {
          setProductDetails(res.data.data)
        }
      })
      .catch((err) => {
        console.log(err)
        ToasterMessage('error', 'Something went wrong')
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
      </Container>
    </div>
  )
}

export default Index

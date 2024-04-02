/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../Home/ProductCard'
import { type WishlistItem, type GetProductResType } from '../../../../config/ResponseTypes'
import ProductUtils from '../../../../apis/ProductUtils'
import { isUserAuthenticated } from '../../../../helper/customUseSelector'
import { ToasterMessage } from '../../../../helper/ToasterHelper'
import WishlistUtils from '../../../../apis/WishlistUtils'
import { wishlistEmpty } from '../../../../config/Images'
import BreadCrumBox from '../ProductDetails/BreadCrumBox'

function CollectionPage (): JSX.Element {
  const isRouteProtected = isUserAuthenticated()
  const [searchParams] = useSearchParams()
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [productsList, setProductsList] = useState<GetProductResType[]>([])
  const gender = searchParams.get('gender')
  const category = searchParams.get('category')
  useEffect(() => {
    if (gender && category) {
      void fetchCategoryProducts(gender, category)
    }
    if (isRouteProtected) {
      fetchGetWishlist()
    }
  }, [gender, category])
  async function fetchCategoryProducts (
    gender: string,
    category: string
  ): Promise<void> {
    try {
      const response: any = await ProductUtils.searchingProduct(
        `?search=${encodeURIComponent(
          JSON.stringify({
            subCategory: category,
            gender
          })
        )}`
      )
      setProductsList(response?.data?.data)
    } catch (err: any) {
      console.log('🚀 ~ useEffect ~ err:', err)
    }
  }
  function fetchGetWishlist (): void {
    WishlistUtils.getMyWishlist()
      .then((res: any) => {
        if (res.status === 200) {
          setWishlist(res.data.data.items)
        }
      })
      .catch((err: any) => {
        if (err === undefined) {
          ToasterMessage('error', 'Network error')
        }
        ToasterMessage('error', err?.data?.message)
      })
  }
  return (
    <div className="product-wrapper">
      <Container>
      <BreadCrumBox />

        {productsList?.length > 0 ? (
          <div className="product-widget">
            <ProductCard
              productsList={productsList}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          </div>
        ) : (
          <div className="wishlist-empty">
            <Image src={wishlistEmpty} fluid />
            <div className="empty-list-title">Hey! There is no product available.</div>
            {/* <div className="empty-list-subtitle">
              Save your favourites here and make them yours soon!
            </div> */}
            <Link to="/">
              <div className="wishlist-btn">Shop now</div>
            </Link>
          </div>
        )}
      </Container>
    </div>
  )
}

export default CollectionPage

import React, { useEffect, useState } from 'react'
import { isUserAuthenticated } from '../../../../helper/customUseSelector'
import {
  type GetProductResType,
  type WishlistItem
} from '../../../../config/ResponseTypes'
import { ToasterMessage } from '../../../../helper/ToasterHelper'
import WishlistUtils from '../../../../apis/WishlistUtils'
import ProductUtils from '../../../../apis/ProductUtils'
import ProductCard from './ProductCard'

function BestSeller (): React.JSX.Element {
  const isRouteProtected = isUserAuthenticated()
  const [trendingProducts, setTrendingProducts] = useState<GetProductResType[]>([])
  const [bestSellingProduct, setBestSellingProduct] = useState<
  GetProductResType[]
  >([])
  const [topRatedProduct, setTopRatedProduct] = useState<GetProductResType[]>(
    []
  )
  const [newArrivalProduct, setNewArrivalProduct] = useState<
  GetProductResType[]
  >([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const fetchData = async (): Promise<void> => {
      try {
        const resTrending = await ProductUtils.getProductList(
          `?filter=${encodeURIComponent(
            JSON.stringify({ sellerTag: 'trending' })
          )}`,
          signal
        )
        const resBestSeller = await ProductUtils.getProductList(
          `?filter=${encodeURIComponent(
            JSON.stringify({ sellerTag: 'best seller' })
          )}`,
          signal
        )
        const resNewArrival = await ProductUtils.getProductList(
          `?filter=${encodeURIComponent(
            JSON.stringify({ sellerTag: 'new arrival' })
          )}`,
          signal
        )
        const resTopRated = await ProductUtils.getProductList(
          `?filter=${encodeURIComponent(
            JSON.stringify({ sellerTag: 'top rated' })
          )}`,
          signal
        )
        setTrendingProducts(resTrending.data.data)
        setBestSellingProduct(resBestSeller.data.data)
        setNewArrivalProduct(resNewArrival.data.data)
        setTopRatedProduct(resTopRated.data.data)
      } catch (err: any) {
        // if (err === undefined) {
        //   ToasterMessage('error', 'Network error')
        // } else {
        //   ToasterMessage('error', err.response.data.message)
        // }
      }
    }

    void fetchData()

    if (isRouteProtected) {
      fetchGetWishlist()
    }
    return () => {
      controller.abort()
    }
  }, [isRouteProtected])

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
    <div className="best-sellers-wrapper">
      <div className="trending-section">
        <div className="section-heading">
          <h4>TRENDING</h4>
        </div>
        <div className="product-widget">
         <ProductCard productsList={trendingProducts} wishlist={wishlist} setWishlist={setWishlist}/>
        </div>
      </div>
      <div className="bestseller-section">
        <div className="section-heading">
          <h4>BESTSELLER</h4>
        </div>
        <div className="product-widget">
        <ProductCard productsList={bestSellingProduct} wishlist={wishlist} setWishlist={setWishlist}/>
        </div>
      </div>
      <div className="bestseller-section">
        <div className="section-heading">
          <h4>NEW ARRIVALS</h4>
        </div>
        <div className="product-widget">
        <ProductCard productsList={newArrivalProduct} wishlist={wishlist} setWishlist={setWishlist}/>
        </div>
      </div>
      <div className="bestseller-section">
        <div className="section-heading">
          <h4>TOP RATED</h4>
        </div>
        <div className="product-widget">
        <ProductCard productsList={topRatedProduct} wishlist={wishlist} setWishlist={setWishlist}/>
        </div>
      </div>
    </div>
  )
}

export default BestSeller

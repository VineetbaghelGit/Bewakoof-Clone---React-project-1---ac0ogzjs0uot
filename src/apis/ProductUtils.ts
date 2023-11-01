import api from './index'
const ProductUtils = {
  getProductList: async function () {
    try {
      const response = await api.get('ecommerce/clothes/products')
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  getProductInfo: async function (params: string) {
    try {
      const response = await api.get(`ecommerce/product/${params}`)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  searchingProduct: async function (params: string) {
    try {
      const response = await api.get(
            `ecommerce/clothes/products?search=${params}`
      )
      return response
    } catch (error: any) {
      throw error.response
    }
  }
}
export default ProductUtils

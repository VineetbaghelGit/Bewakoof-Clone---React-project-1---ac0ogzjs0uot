import api from './index'
const ProductUtils = {
  getProductList: async function (params: string, signal: any) {
    try {
      const response = await api.get(`ecommerce/clothes/products${params}`, { signal })
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
            `ecommerce/clothes/products${params}`
      )
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  getClothesCategories: async function () {
    try {
      const response = await api.get('ecommerce/clothes/categories')
      return response
    } catch (error: any) {
      throw error.response
    }
  }
}
export default ProductUtils

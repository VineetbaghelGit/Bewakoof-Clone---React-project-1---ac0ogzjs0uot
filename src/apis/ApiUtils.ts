import api from './index'
const ApiUtils = {
  authSignup: async function (params: any) {
    try {
      const response = await api.post('user/signup', params)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  authLogin: async function (params: any) {
    try {
      const response = await api.post('user/login', params)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  forgetPassword: async function (params: any) {
    try {
      const response = await api.post('user/forgotPassword', params)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
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
      const response = await api.get(`ecommerce/clothes/products?search={"title":"${params}"}`)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  addToWishlist: async function (params: any) {
    try {
      const response = await api.patch('ecommerce/wishlist', params)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  getMyWishlist: async function () {
    try {
      const response = await api.get('ecommerce/wishlist')
      return response
    } catch (error: any) {
      throw error.response
    }
  }
}
export default ApiUtils

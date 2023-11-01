import api from './index'
const ReviewUtils = {
  getProductReviews: async function (params: string) {
    try {
      const response = await api.get(`ecommerce/review/${params}`)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  deleteProductReview: async function (params: string) {
    try {
      const response = await api.delete(`ecommerce/review/${params}`)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  addProductReview: async function (params: string) {
    try {
      const response = await api.post(`ecommerce/review/${params}`)
      return response
    } catch (error: any) {
      throw error.response
    }
  }
}
export default ReviewUtils

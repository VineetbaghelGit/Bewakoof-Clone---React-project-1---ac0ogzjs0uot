import api from './index'
const WishlistUtils = {
  addToWishlist: async function (params: any) {
    try {
      const response = await api.patch('ecommerce/wishlist', params)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  removeFromWishlist: async function (params: any) {
    try {
      const response = await api.delete(`ecommerce/wishlist/${params}`)
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
  },
  deleteAllItemWishlist: async function () {
    try {
      const response = await api.delete('ecommerce/wishlist')
      return response
    } catch (error: any) {
      throw error.response
    }
  }
}
export default WishlistUtils

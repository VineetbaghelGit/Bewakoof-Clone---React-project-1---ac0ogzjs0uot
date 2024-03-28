import api from './index'
const CartUtils = {
  addItemInCart: async function (params: string) {
    try {
      const response = await api.patch(`ecommerce/cart/${params}`)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  getCartItemList: async function () {
    try {
      const response = await api.get('ecommerce/cart')
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  removeItemFromCart: async function (params: any) {
    try {
      const response = await api.delete(`ecommerce/cart/${params}`)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  deleteCartItems: async function () {
    try {
      const response = await api.delete('ecommerce/cart')
      return response
    } catch (error: any) {
      throw error.response
    }
  }
}
export default CartUtils

import api from './index'
const OrderUtils = {
  buyItemNow: async function (params: any) {
    try {
      const response = await api.post('ecommerce/order', params)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  getOrderItemList: async function () {
    try {
      const response = await api.get('ecommerce/order')
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  getOrderItem: async function (params: string) {
    try {
      const response = await api.get(`ecommerce/order/${params}`)
      return response
    } catch (error: any) {
      throw error.response
    }
  }
}
export default OrderUtils

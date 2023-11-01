import api from './index'
const AuthUtils = {
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
  }
}
export default AuthUtils

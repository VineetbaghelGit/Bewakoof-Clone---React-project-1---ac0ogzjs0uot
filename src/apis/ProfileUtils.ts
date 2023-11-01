import api from './index'
const ProfileUtils = {
  updateUserPassword: async function (params: any) {
    try {
      const response = await api.patch('user/updateMyPassword', params)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  deleteMyAccount: async function (params: any) {
    try {
      const response = await api.delete('user/deleteMe', params)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  uploadUserProfileImg: async function (params: any) {
    try {
      const response = await api.patch('user/updateProfileImage', params)
      return response
    } catch (error: any) {
      throw error.response
    }
  }
}
export default ProfileUtils

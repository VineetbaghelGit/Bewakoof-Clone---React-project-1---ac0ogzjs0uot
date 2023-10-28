import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { COOKIE_STORAGE_KEY } from '../../config/Constant'
import { type SliceState } from '../../config/ResponseTypes'

const getCookiesValue = Cookies.get(COOKIE_STORAGE_KEY)
const parsedValue = JSON.parse(getCookiesValue ?? 'null')

const initialState: SliceState = {
  userInfo: parsedValue?.token?.length > 0 ? parsedValue : ''
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuthDetails: (state, action) => {
      state.userInfo = action.payload
    },
    removeUserAuth: (state) => {
      state.userInfo = {
        name: '',
        email: '',
        token: '',
        profileImage: ''
      }
    }
  }
})
export const { setUserAuthDetails, removeUserAuth } = authSlice.actions
export default authSlice.reducer

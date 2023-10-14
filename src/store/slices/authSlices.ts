import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { COOKIE_STORAGE_KEY } from '../../config/Constant'

const getCookiesValue = Cookies.get(COOKIE_STORAGE_KEY)
const parsedValue = JSON.parse(getCookiesValue ?? 'null')
interface SliceState {
  userInfo: {
    name: string
    email: string
    token: string
  }
}

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
        token: ''
      }
    }
  }
})
export const { setUserAuthDetails, removeUserAuth } = authSlice.actions
export default authSlice.reducer

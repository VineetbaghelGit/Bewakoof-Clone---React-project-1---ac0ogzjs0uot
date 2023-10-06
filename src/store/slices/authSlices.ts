import { createSlice } from '@reduxjs/toolkit'
// import { LOCAL_STORAGE_KEY } from "../../config/Constant";

// const getLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY)
interface SliceState {
  loginToken: boolean
}

const initialState: SliceState = {
  loginToken: true
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginToken: (state, action) => {
      state.loginToken = action.payload
    },
    removeLoginToken: (state) => {
      state.loginToken = false
    }
  }
})
export const { setLoginToken, removeLoginToken } = authSlice.actions
export default authSlice.reducer

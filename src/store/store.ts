import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlices'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
})
export default store

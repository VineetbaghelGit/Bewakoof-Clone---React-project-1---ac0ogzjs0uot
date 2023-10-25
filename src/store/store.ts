import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlices'
import { cartSlice } from './slices/cartSlice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer
  }
})
export default store

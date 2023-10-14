import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { COOKIE_STORAGE_KEY } from '../../config/Constant'

const getCookiesValue = Cookies.get(COOKIE_STORAGE_KEY)
const parsedValue = JSON.parse(getCookiesValue ?? 'null')

interface cartState {
  cartItemCount: number
}

const initialState: cartState = {
  cartItemCount: parsedValue.cart
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItemCountCart: (state, action) => {
      state.cartItemCount = action.payload
    }
  }
})
export const { setItemCountCart } = cartSlice.actions
export default cartSlice.reducer

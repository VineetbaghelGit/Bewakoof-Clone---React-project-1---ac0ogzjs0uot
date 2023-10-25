import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { COOKIE_STORAGE_KEY } from '../../config/Constant'
import { type cartState } from '../../config/ResponseTypes'

const getCookiesValue = Cookies.get(COOKIE_STORAGE_KEY)
const parsedValue = JSON.parse(getCookiesValue ?? 'null')

const initialState: cartState = {
  cartItemCount: parsedValue?.cart
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

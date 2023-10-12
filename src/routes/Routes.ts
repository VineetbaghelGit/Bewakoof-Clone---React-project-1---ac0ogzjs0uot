import ForgetPassword from '../components/pages/AuthPages/ForgetPassword'
import Login from '../components/pages/AuthPages/Login'
import Signup from '../components/pages/AuthPages/Signup'
import UserWishlist from '../components/pages/ProtectedPages/UserWishlist'
import Cart from '../components/pages/PublicPages/CartPage/Index'
import Home from '../components/pages/PublicPages/Home/Index'
import ProductDetail from '../components/pages/PublicPages/ProductDetails/Index'

const authRoutes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forget-password', component: ForgetPassword }
]

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/product/:id/:name', component: ProductDetail },
  { path: '/cart', component: Cart }
]
const protectedRoutes = [{ path: '/wishlist', component: UserWishlist }]
export { publicRoutes, protectedRoutes, authRoutes }

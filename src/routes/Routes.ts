import ForgetPassword from '../components/pages/AuthPages/ForgetPassword'
import Login from '../components/pages/AuthPages/Login'
import Signup from '../components/pages/AuthPages/Signup'
import Checkout from '../components/pages/ProtectedPages/Checkout'
import MyOrders from '../components/pages/ProtectedPages/MyOrders'
import MyProfile from '../components/pages/ProtectedPages/MyProfile'
import OrderSuccess from '../components/pages/ProtectedPages/OrderSuccess'
import SingleOrder from '../components/pages/ProtectedPages/SingleOrder'
import UserAccount from '../components/pages/ProtectedPages/UserAccount'
import UserWishlist from '../components/pages/ProtectedPages/UserWishlist'
import Cart from '../components/pages/ProtectedPages/CartPage/Index'
import Home from '../components/pages/PublicPages/Home/Index'
import ProductDetail from '../components/pages/PublicPages/ProductDetails/Index'

const authRoutes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forget-password', component: ForgetPassword }
]

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetail }
]
const protectedRoutes = [
  { path: '/cart', component: Cart },
  { path: '/wishlist', component: UserWishlist },
  { path: '/ordersuccess', component: OrderSuccess },
  { path: '/account/order/:id', component: SingleOrder },
  { path: '/account', component: UserAccount },
  { path: '/account/profile', component: MyProfile },
  { path: '/account/orders', component: MyOrders },
  { path: '/checkout', component: Checkout }

]
export { publicRoutes, protectedRoutes, authRoutes }

import ForgetPassword from '../components/pages/AuthPages/ForgetPassword'
import Login from '../components/pages/AuthPages/Login'
import Signup from '../components/pages/AuthPages/Signup'
import Checkout from '../components/pages/ProtectedPages/Checkout'
import MyOrders from '../components/pages/ProtectedPages/MyOrders/MyOrders'
import MyProfile from '../components/pages/ProtectedPages/Profile/MyProfile'
import OrderSuccess from '../components/pages/ProtectedPages/OrderSuccess'
import SingleOrder from '../components/pages/ProtectedPages/SingleOrder/SingleOrder'
import UserAccount from '../components/pages/ProtectedPages/MyAccount/UserAccount'
import UserWishlist from '../components/pages/ProtectedPages/MyWishlist/UserWishlist'
import Cart from '../components/pages/ProtectedPages/CartPage/Index'
import Home from '../components/pages/PublicPages/Home/Index'
import ProductDetail from '../components/pages/PublicPages/ProductDetails/Index'
import ComingSoon from '../components/pages/ProtectedPages/ComingSoon'

const authRoutes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forget-password', component: ForgetPassword }
]

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetail },
  { path: '/coming-soon', component: ComingSoon }
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

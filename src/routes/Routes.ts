import UserWishlist from '../components/pages/ProtectedPages/UserWishlist'
import ForgetPassword from '../components/pages/PublicPages/ForgetPassword'
import Home from '../components/pages/PublicPages/Home'
import Login from '../components/pages/PublicPages/Login'
import Signup from '../components/pages/PublicPages/Signup'

const authRoutes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forget-password', component: ForgetPassword }

]

const publicRoutes = [{ path: '/', component: Home }]
const protectedRoutes = [{ path: '/wishlist', component: UserWishlist }]
export { publicRoutes, protectedRoutes, authRoutes }

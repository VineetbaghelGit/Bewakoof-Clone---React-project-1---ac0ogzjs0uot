import UserWishlist from '../components/pages/ProtectedPages/UserWishlist'
import Home from '../components/pages/PublicPages/Home'
import Login from '../components/pages/PublicPages/Login'

const authRoutes = [{ path: '/login', component: Login }]

const publicRoutes = [
  { path: '/', component: Home }
]
const protectedRoutes = [{ path: '/wishlist', component: UserWishlist }]
export { publicRoutes, protectedRoutes, authRoutes }

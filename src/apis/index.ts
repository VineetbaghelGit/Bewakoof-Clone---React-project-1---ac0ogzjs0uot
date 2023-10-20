import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL, COOKIE_STORAGE_KEY } from '../config/Constant'
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    projectId: 'ac0ogzjs0uot'
  }
})

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const loader: HTMLElement | null =
      document.getElementById('loader-spinner')
    if (loader !== null) {
      loader.style.display = 'block'
    }
    const getCookiesValue = Cookies.get(COOKIE_STORAGE_KEY)
    const cookieData = JSON.parse(getCookiesValue ?? 'null')
    // if (config?.url.includes('ecommerce/wishlist/')) {
    config.headers.Authorization = `Bearer ${cookieData?.token}`
    // }

    return config
  },
  async function (error) {
    // Do something with request error
    return await Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // const loader: HTMLElement | null =
    //   document.getElementById('loader-spinner')
    // if (loader !== null) {
    //   loader.style.display = 'none'
    // }
    return response
  },
  async function (error) {
    if (error?.response?.status === 401) {
      // const loader: HTMLElement | null =
      //   document.getElementById('loader-spinner')
      // if (loader !== null) {
      //   loader.style.display = 'none'
      // }
      return await Promise.reject(error)
    } else {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // const loader: HTMLElement | null =
      //   document.getElementById('loader-spinner')
      // if (loader !== null) {
      //   loader.style.display = 'none'
      // }
      return await Promise.reject(error)
    }
  }
)
export default instance

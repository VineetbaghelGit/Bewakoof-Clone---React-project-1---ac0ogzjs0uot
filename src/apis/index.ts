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
    const loader: HTMLElement | null =
      document.getElementById('cover-spin')
    if (loader !== null) {
      loader.style.display = 'block'
    }
    const getCookiesValue = Cookies.get(COOKIE_STORAGE_KEY)
    const cookieData = JSON.parse(getCookiesValue ?? 'null')
    config.headers.Authorization = `Bearer ${cookieData?.token}`
    return config
  },
  async function (error) {
    return await Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    const loader: HTMLElement | null =
      document.getElementById('cover-spin')
    if (loader !== null) {
      loader.style.display = 'none'
    }
    return response
  },
  async function (error) {
    if (error?.response?.status === 401) {
      const loader: HTMLElement | null =
        document.getElementById('cover-spin')
      if (loader !== null) {
        loader.style.display = 'none'
      }
      return await Promise.reject(error)
    } else {
      const loader: HTMLElement | null =
        document.getElementById('cover-spin')
      if (loader !== null) {
        loader.style.display = 'none'
      }
      return await Promise.reject(error)
    }
  }
)
export default instance

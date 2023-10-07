import axios from 'axios'
import { BASE_URL } from '../config/Constant'
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
    const loader: HTMLElement | null = document.getElementById('loader-spinner')
    if (loader !== null) {
      loader.style.display = 'block'
    }
    const localStorageValue = localStorage.getItem('rat-auth') as string
    const parsedValue: string = JSON.parse(localStorageValue)
    if (parsedValue !== '') config.headers.Authorization = `Bearer ${parsedValue}`

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
    const loader: HTMLElement | null = document.getElementById('loader-spinner')
    if (loader !== null) {
      loader.style.display = 'none'
    }
    return response
  },
  async function (error) {
    if (error?.response?.status === 401) {
      const loader: HTMLElement | null = document.getElementById('loader-spinner')
      if (loader !== null) {
        loader.style.display = 'none'
      }
      localStorage.removeItem('rat-auth')
      window.location.reload()
      return await Promise.reject(error)
    } else {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const loader: HTMLElement | null = document.getElementById('loader-spinner')
      if (loader !== null) {
        loader.style.display = 'none'
      }
      return await Promise.reject(error)
    }
  }
)
export default instance

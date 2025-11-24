import axios, { Axios, AxiosError } from "axios"
import { refreshTokens } from "./auth"

const api = axios.create({
  // baseURL: 'http://localhost:5000/api/v1'  // Base URL for all API requests
  baseURL: 'https://smart-blog-be-nine.vercel.app/api/v1'  // Base URL for all API requests
})

const PUBLIC_ENDPOINTS = [  // List of public endpoints that don't require authentication, mewata token ek nathuwa call krla puluwan
  '/auth/login',
  '/auth/register'
]

api.interceptors.request.use((config) => {
    // Add authorization token to headers
    // config.headers is the headers object of the request
    // config.url is the endpoint being called

    const token = localStorage.getItem('accessToken') // Get token from local storage
    const isPublic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url)) // Check if the URL is public

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`  // Set the Authorization header with the token
    }
    return config // Return the modified config, mek return kloth witharai api ek call krnne
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config
    const isPublic = PUBLIC_ENDPOINTS.some((url) => 
      originalRequest.url?.includes(url)
    )

    if (error.response?.status === 401 && !isPublic && !originalRequest._retry) {
      originalRequest._retry = true   // hriyt token ek enne nathnm retry krnw
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }
        const res = await refreshTokens(refreshToken)
        localStorage.setItem('accessToken', res.accessToken)

        originalRequest.headers.Authorization = `Bearer ${res.accessToken}`

        return axios(originalRequest) // Retry the original request with the new token
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login' // Redirect to login on failure
        console.error('Token refresh failed', error)
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default api
  // mek haraha thama api call krnne
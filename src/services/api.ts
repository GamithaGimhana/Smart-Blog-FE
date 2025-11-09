import axios from "axios"

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1'  // Base URL for all API requests
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

// api.interceptors.response.use((response) => {
//   // Handle successful responses
//   return response
// }
// )

export default api
  // mek haraha thama api call krnne
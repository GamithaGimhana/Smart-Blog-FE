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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          'http://localhost:5000/api/v1/auth/refresh',
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        localStorage.setItem('accessToken', newToken);
        originalRequest.headers.Authorization = ~`Bearer ${newToken}`;
        return api(originalRequest); // try original request again with new token
      } catch (error) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api
  // mek haraha thama api call krnne
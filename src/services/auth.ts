import api from './api'

type RegisterDataType = {
  firstname: string
  lastname: string
  email: string
  password: string
  role: string
}

// http://localhost:5000/api/v1/auth/register
export const register = async (data: RegisterDataType) => {
  const res = await api.post('/auth/register', data)
  return res.data
}

// http://localhost:5000/api/v1/auth/login
export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password })
  return res.data
}

// http://localhost:5000/api/v1/auth/me
export const getMe = async () => {
  const res = await api.get('/auth/me')
  return res.data
}

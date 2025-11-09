import { useState, type FormEvent } from "react"
import { getMe, login } from '../services/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

export default function Login() {
  const navigate = useNavigate()  // for navigation after login
  
  const { setUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Please fill in all fields')
      return
    }

    try {
      // const obj = {
      //     email,
      //     password
      // }
      const res = await login(email, password)
      console.log(res.data.accessToken)

      if (!res?.data?.accessToken) {
        alert('Login failed: No token received')
        return
      }
      await localStorage.setItem('accessToken', res.data.accessToken)

      // import { getMe, login } from "../services/auth"
      const detail = await getMe()

      // save user data redux
      // auth context
      // console.log('Profile details:', detail.data)
      setUser(detail.data)

      navigate('/home')
    } catch (error) {
      console.error('There was an error!', error)
    }
  }

  return (
    // <div>
    //   <h1>Login</h1>
    //   <input
    //     type="email"
    //     placeholder="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button onClick={handleLogin}>Login</button>
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back
        </h1>
        
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>

  )
}

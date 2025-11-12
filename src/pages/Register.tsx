import { useState, type FormEvent } from 'react'
import { register } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  // state - component data
  // useState - react hook(components) to manage state in functional components

  const navigate = useNavigate()  // for navigation

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('USER') // 'USER' or 'AUTHOR'

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()  // ignore page refresh

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      // find alert libraries
      alert('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const obj = {
        firstname,
        lastname,
        email,
        password,
        role
      }
      const res: any = await register(obj)
      console.log(res.data)
      console.log(res.message);

      alert(`Registration successful! Please login with ${res?.data?.email}`);
      // const navigate = useNavigate()
      navigate('/login');

      // const response = await axios.post('http://localhost:5000/api/register', {
      //   firstname,
      //   lastname,
      //   email,
      //   password,
      //   role
      // },
      // { headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }
      // )
      // console.log('Registration successful:', response.data)
    } catch (error: any) {
      console.error('There was an error!', error?.response?.data)
    }
  }

  return (
    // <div>
    //   <h1>Register as User or Author</h1>
    //   <input
    //     type="text"
    //     placeholder="firstname"
    //     value={firstname}
    //     onChange={(e) => setFirstName(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     placeholder="lastname"
    //     value={lastname}
    //     onChange={(e) => setLastName(e.target.value)}
    //   />
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
    //   <input
    //     type="password"
    //     placeholder="confirm password"
    //     value={confirmPassword}
    //     onChange={(e) => setConfirmPassword(e.target.value)}
    //   />
    //   <select value={role} onChange={(e) => setRole(e.target.value)}>
    //     <option value="USER">User</option>
    //     <option value="AUTHOR">Author</option>
    //   </select>
    //   <button onClick={handleRegister}>Register</button>
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create an Account
        </h1>

        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="USER">User</option>
          <option value="AUTHOR">Author</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>

  )
}

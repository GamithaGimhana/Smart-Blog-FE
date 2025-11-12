import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register')) 
const Welcome = lazy(() => import('../pages/Welcome'))
const Post = lazy(() => import('../pages/Post'))

export default function Router() {
  return ( 
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  )
}

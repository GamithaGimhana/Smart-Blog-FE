import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import Layout from '../components/Layout'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register')) 
const Welcome = lazy(() => import('../pages/Welcome'))
const Post = lazy(() => import('../pages/Post'))
const AdminHome = lazy(() => import('../pages/AdminHome'))
const MyPost = lazy(() => import('../pages/MyPost'))

type RequireAuthTypes = { children: ReactNode; roles?: string[] } 

// const RequireAuth = ({ children, gamitha }: RequireAuthTypes) => {
const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>User Loading...</div>
  }
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (roles && roles.some((role)=> user.roles?.includes(role)) === false) {   // role ek check krnw
    return <div className='p-6 text-center'>
        <h2 className='text'>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
  }

  return<>{children}</>
}

export default function Router() {
  return ( 
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Layout />}>
              <Route path="/home" element={
                <RequireAuth roles={["ADMIN", "AUTHOR", "USER"]}>
                  <Home />
                </RequireAuth>
              } />
              <Route path="/home/admin" element={
                <RequireAuth roles={["ADMIN"]}>
                  <AdminHome />
                </RequireAuth>
              } />
              <Route path="/post" element={
                <RequireAuth roles={["ADMIN", "AUTHOR"]}>
                  <Post />
                </RequireAuth>
              } />
            </Route>
            
            <Route path="/my-post" element={
              <RequireAuth roles={["ADMIN", "AUTHOR"]}>
                <MyPost />
              </RequireAuth>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
  )
}

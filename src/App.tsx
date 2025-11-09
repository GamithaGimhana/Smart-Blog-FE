import { AuthProvider, useAuth } from './contexts/authContext'
import Router from './routes'

// const Home = lazy(() => import('./pages/Home'))
// const Login = lazy(() => import('./pages/Login'))
// const Register = lazy(() => import('./pages/Register')) 
// const Welcome = lazy(() => import('./pages/Welcome'))

export default function App() {
  // methn useAuth ek use krnna ba, meka context ekak nisa, app.tsx eke AuthProvider ek wrap krla thiyenne
  // const { setUser } = useAuth() //mem use krnn puluwn
  return (
    <AuthProvider>  
      {/* <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </BrowserRouter> 
      me tik routes walata genichcha */}
      <Router />
    </AuthProvider>
  )
}

// AuthProvider - app eke oni thanaka idl authContext eka use krnna puluwn, eken user data gnn puluwn oni thanaka idl

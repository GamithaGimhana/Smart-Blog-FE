import { createContext, useContext, useEffect, useState } from "react"
import { getMe } from "../services/auth"

// meka hdnne user ekata adala data context ekak widiyta store krnna

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(true)

  // component eke lifecycle eka aduragnn use karanw
  // mek nis page ek refresh klth data nathi wenne na 
  useEffect(() => {
    const token = localStorage.getItem('accessToken')   // token ekk thiyed blnw
    if (token) {
      getMe()
      .then((res) => {
        setUser(res.data)
        localStorage.setItem("user", JSON.stringify(res.data))
      })
      .catch((err) => {
        setUser(null)   // token eka naththam hri expire welnm hri /me api call ek failnm hri userw null krnwa
        console.error('Failed to fetch user details', err)
        localStorage.removeItem("user")
        localStorage.removeItem("accessToken")
      }). finally(() => {
        setLoading(false)
      })
    } else {
      setUser(null)
      setLoading(false)
    }      
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// { user, setUser } mewidiytne api dunne e widiytm eliyt gnn puluwn eken
// mek custom hook ekak
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

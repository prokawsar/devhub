import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import { useUserStore } from '@/store/index'
import { createContext, ReactNode, useEffect } from 'react'
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/utils/constants'

export const AuthContext = createContext<{ userData: User | null }>({
  userData: null,
})

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { userData, setUser } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!userData) {
      const res = supabase.auth.getUser()
      res.then((response) => {
        if (!response.data.user) {
          if (PROTECTED_ROUTES.includes(location.pathname)) {
            navigate('/login')
          }
        } else {
          const { id, email } = response.data.user,
            user = { id, email }
          setUser(user)
        }
      })
    } else {
      if (PUBLIC_ROUTES.includes(location.pathname)) {
        navigate('/')
      }
    }
  }, [navigate, location, userData, setUser])

  return (
    <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>
  )
}

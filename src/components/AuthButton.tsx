import { supabase } from '@/utils/supabase'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUserStore } from '@/store/index'
import { Icon } from '@iconify/react'

export default function AuthButton() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { userData, setUser } = useUserStore()

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    navigate('/login')
  }

  if (userData?.id) {
    return (
      <div className="flex text-gray-500 flex-row hover:text-primary items-center gap-2">
        <Icon icon="websymbol:logout" />
        <button className="hidden md:block" onClick={signOut}>
          Sign out
        </button>
      </div>
    )
  }

  const isHomeRoute = () => {
    const showHome = ['/login', '/signup'].includes(pathname)
    if (showHome) return ['/', 'Home']
    else return ['/login', 'Login']
  }

  return (
    <Link
      className="flex border-slate-500 px-3 py-2 hover:text-slate-600"
      to={isHomeRoute()[0]}
    >
      {isHomeRoute()[1]}
    </Link>
  )
}

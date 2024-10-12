import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from 'antd'
import AuthButton from '@/components/AuthButton'

export default function Header({
  handleSection,
  activeSection,
}: {
  handleSection?: (section: string) => void
  activeSection?: string
}) {
  const location = useLocation()
  const [pathname, setPathname] = useState(location.pathname)

  useEffect(() => {
    setPathname(location.pathname)
  }, [location.pathname])

  return (
    <header className="relative flex items-center rounded-lg w-full justify-between bg-white px-2 py-2">
      <Link to="/" className="text-center text-[26px] font-bold tracking-wide">
        DevHub
      </Link>
      {handleSection && (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleSection && handleSection('links')}
            type="text"
            size="large"
            className={`flex items-center rounded-xl px-4 py-6 text-xl font-semibold hover:text-primary ${activeSection === 'links' ? 'bg-primary-hover text-primary' : 'text-gray-500'}`}
          >
            <p className="">Links</p>
          </Button>
          <Button
            onClick={() => handleSection && handleSection('profile')}
            type="text"
            size="large"
            className={`flex items-center rounded-xl px-4 py-6 text-xl font-semibold hover:text-primary ${activeSection === 'profile' ? 'bg-primary-hover text-primary' : 'text-gray-500'}`}
          >
            <p className="">Profile Details</p>
          </Button>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Link
          to={pathname === '/preview' ? '/dashboard' : '/preview'}
          className="rounded-xl border border-solid border-primary py-2 px-5 text-xl font-semibold text-primary transition-all duration-300 hover:bg-primary-hover"
        >
          <span className="">
            {pathname === '/preview' ? 'Back toEdit' : 'Preview'}
          </span>
        </Link>
        <AuthButton />
      </div>
    </header>
  )
}

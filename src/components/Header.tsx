import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from 'antd'
import AuthButton from '@/components/AuthButton'
import { Icon } from '@iconify/react'

export default function Header({
  handleSection,
  activeSection,
  url,
}: {
  handleSection?: (section: string) => void
  activeSection?: string
  url?: string
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
            <Icon icon="mdi:link" />
            <p className="hidden md:block">Links</p>
          </Button>
          <Button
            onClick={() => handleSection && handleSection('profile')}
            type="text"
            size="large"
            className={`flex items-center rounded-xl px-4 py-6 text-xl font-semibold hover:text-primary ${activeSection === 'profile' ? 'bg-primary-hover text-primary' : 'text-gray-500'}`}
          >
            <Icon icon="mdi:account" />
            <p className="hidden md:block">Profile Details</p>
          </Button>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Link
          onClick={(e) => {
            if (!url) {
              e.preventDefault()
            }
          }}
          to={pathname.includes('/preview/') ? '/dashboard' : `/preview/${url}`}
          className={`rounded-xl flex items-center gap-1 border border-solid ${
            url
              ? 'border-primary text-primary hover:bg-primary-hover'
              : 'border-gray-300 text-gray-300 cursor-not-allowed'
          } py-2 px-5 text-xl font-semibold transition-all duration-300`}
        >
          <Icon icon="mdi:eye" />
          <span className="hidden md:block">
            {pathname.includes('/preview/') ? 'Back to Edit' : 'Preview'}
          </span>
        </Link>
        <AuthButton />
      </div>
    </header>
  )
}

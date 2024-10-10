import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from 'antd'

export default function Header({
  handleSection,
  activeSection,
}: {
  handleSection: (section: string) => void
  activeSection: string
}) {
  const location = useLocation()

  const [pathname, setPathname] = useState(location.pathname)

  useEffect(() => {
    setPathname(location.pathname)
  }, [location.pathname])

  return (
    <header className="relative flex items-center rounded-lg w-full justify-between bg-white px-2 py-2">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => handleSection('links')}
          type="text"
          size="large"
          className={`flex items-center rounded-xl px-4 py-7 text-xl font-semibold hover:text-[#633cff] ${activeSection === 'links' ? 'bg-[#efebff] text-[#633cff]' : 'text-[#737373]'}`}
        >
          <p className="">Links</p>
        </Button>
        <Button
          onClick={() => handleSection('profile')}
          type="text"
          size="large"
          className={`flex items-center rounded-xl px-4 py-7 text-xl font-semibold hover:text-[#633cff] ${activeSection === 'profile' ? 'bg-[#efebff] text-[#633cff]' : 'text-[#737373]'}`}
        >
          <p className="">Profile Details</p>
        </Button>
      </div>

      <div className="flex items-center gap-8 tablet:gap-4">
        <Link
          to={`/preview`}
          className="rounded-xl border border-solid border-[#633cff] py-3 px-5 text-xl font-semibold text-[#633cff] transition-all duration-300 hover:bg-[#efebff]"
        >
          <span className="">Preview</span>
        </Link>
      </div>
    </header>
  )
}

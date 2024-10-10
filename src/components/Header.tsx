import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from 'antd/es/button'

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
      <div className="flex items-center">
        <Button
          onClick={() => handleSection('links')}
          type="text"
          size="large"
          className={`flex items-center gap-[0.8rem] rounded-[0.8rem] px-11 py-6 text-[1.6rem] font-semibold leading-[2.4rem] ${activeSection === 'links' ? 'bg-[#efebff] text-[#633cff]' : 'text-[#737373] hover:text-[#633cff]'}`}
        >
          <p className="">Links</p>
        </Button>
        <Button
          onClick={() => handleSection('profile')}
          type="text"
          size="large"
          className={`flex items-center gap-[0.8rem] rounded-[0.8rem] px-11 py-6 text-[1.6rem] font-semibold leading-[2.4rem] text-[#633cff] ${activeSection === 'profile' ? 'bg-[#efebff] text-[#633cff]' : 'text-[#737373] hover:text-[#633cff]'}`}
        >
          <p className="">Profile Details</p>
        </Button>
      </div>

      <div className="flex items-center gap-8 tablet:gap-4">
        <Link
          to={`/preview`}
          className="rounded-[0.8rem] border border-solid border-[#633cff] px-11 py-4 text-[1.6rem] font-semibold leading-[2.4rem] text-[#633cff] transition-all duration-300 hover:bg-[#efebff]"
        >
          <span className="">Preview</span>
        </Link>
      </div>
    </header>
  )
}

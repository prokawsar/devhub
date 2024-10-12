import { Toaster } from 'sonner'
import { Link, Outlet } from 'react-router-dom'
import AuthButton from '@/components/AuthButton'
import { useContext } from 'react'
import { AuthContext } from '@/components/context/AuthProvider'
import { ConfigProvider } from 'antd'

export function Layout() {
  const { userData } = useContext(AuthContext)

  return (
    <main className="h-[100svh] flex flex-col justify-between">
      <div className="flex flex-col h-full items-center bg-gray-50">
        {!userData && (
          <nav className="max-w-6xl border-b py-2 mx-auto w-full gap-2 flex flex-row justify-between">
            <Link
              to="/"
              className="text-center text-[26px] font-bold tracking-wide"
            >
              DevHub
            </Link>
            <AuthButton />
          </nav>
        )}
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorBgTextHover: '#efebff',
                defaultHoverBg: '#7b62dc',
              },
            },
            token: {
              colorPrimary: '#633cff',
              colorPrimaryHover: '#efebff',
            },
          }}
        >
          <Outlet />
        </ConfigProvider>
      </div>
      <Toaster
        toastOptions={{
          className: 'py-2.5 mb-7',
          closeButton: true,
        }}
        position="bottom-center"
        richColors
      />
    </main>
  )
}

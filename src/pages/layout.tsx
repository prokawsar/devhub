import { Toaster } from 'sonner'
import { Outlet, useLocation } from 'react-router-dom'
import { ConfigProvider } from 'antd'

export function Layout() {
  const location = useLocation()

  const fullHeightRoutes = ['/', '/login', '/signup']
  const isFullHeight = fullHeightRoutes.includes(location.pathname)

  return (
    <main
      className={`flex flex-col justify-between ${isFullHeight ? 'h-screen' : ''}`}
    >
      <div className="flex flex-col h-full items-center bg-gray-50">
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
            },
          }}
        >
          <Outlet />
        </ConfigProvider>
      </div>
      <Toaster
        toastOptions={{
          closeButton: true,
        }}
        position="bottom-center"
        richColors
      />
    </main>
  )
}

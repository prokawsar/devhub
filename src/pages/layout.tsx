import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom'
import AuthButton from '@/components/AuthButton'

export function Layout() {
  return (
    <main className="h-[100svh] flex flex-col justify-between">
      <div className="flex flex-col h-[92%] items-center">
        <nav className="max-w-6xl border-b py-2 mx-auto w-full gap-2 flex flex-row justify-between">
          <p className="text-center text-[26px] font-bold tracking-wide">
            DevHub
          </p>
          <AuthButton />
        </nav>
        <Outlet />
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

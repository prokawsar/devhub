import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard/page'
import Signup from './pages/signup'
import Preview from './pages/preview/page'
import AuthProvider from './components/context/AuthProvider'
import { Layout } from './pages/layout'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'login',
        element: (
          <AuthProvider>
            <Login />
          </AuthProvider>
        ),
      },
      {
        path: 'signup',
        element: (
          <AuthProvider>
            <Signup />
          </AuthProvider>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <AuthProvider>
            <Dashboard />
          </AuthProvider>
        ),
      },
      {
        path: '/preview',
        element: (
          <AuthProvider>
            <Preview />
          </AuthProvider>
        ),
      },
    ],
  },
])

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

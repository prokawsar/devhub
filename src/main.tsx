import ReactDOM from 'react-dom/client'
import { StrictMode, Suspense, lazy } from 'react'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/context/AuthProvider'
import { Layout } from './pages/layout'
import Error from './pages/error'
import Loader from './components/Loader'

const Signup = lazy(() => import('./pages/signup'))
const Login = lazy(() => import('./pages/login'))
const Dashboard = lazy(() => import('./pages/dashboard/page'))
const Preview = lazy(() => import('./pages/profile/page'))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    errorElement: <Error />,
    children: [
      {
        path: 'login',
        element: (
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          </AuthProvider>
        ),
      },
      {
        path: 'signup',
        element: (
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              <Signup />
            </Suspense>
          </AuthProvider>
        ),
      },
      {
        index: true,
        path: '/',
        element: (
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          </AuthProvider>
        ),
      },
      {
        path: '/profile/:url',
        element: (
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              <Preview />
            </Suspense>
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

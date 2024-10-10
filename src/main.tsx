import ReactDOM from 'react-dom/client'
import { StrictMode, Suspense, lazy } from 'react'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/context/AuthProvider'
import { Layout } from './pages/layout'
import Error from './pages/error'

const Signup = lazy(() => import('./pages/signup'))
const Login = lazy(() => import('./pages/login'))
const Dashboard = lazy(() => import('./pages/dashboard/page'))
const Preview = lazy(() => import('./pages/preview/page'))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'login',
        element: (
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          </AuthProvider>
        ),
      },
      {
        path: 'signup',
        element: (
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
            </Suspense>
          </AuthProvider>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          </AuthProvider>
        ),
      },
      {
        path: '/preview',
        element: (
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
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

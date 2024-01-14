import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Goods } from './pages/app/goods/goods'
import { Users } from './pages/app/users/users'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/mercadorias', element: <Goods /> },
      { path: '/usuarios', element: <Users /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
])

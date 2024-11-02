import { AuthStore } from '../context/auth.store'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

interface props {
  children?: React.ReactNode
}

function ProtectedRoute({ children }: props): JSX.Element {
  const isAuthenticated = AuthStore((state) => state.isAuthenticated)
  const verifyToken = AuthStore((state) => state.verifyToken)

  verifyToken()

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute

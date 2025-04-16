import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Store/Auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const Protected: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login page while saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default Protected 
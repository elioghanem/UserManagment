import { createContext, useContext, useState, FC, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (result.status === 200) {
        setIsAuthenticated(true)
        localStorage.setItem('accessToken', result.result.data.accessToken)
        return { success: true }
      } else {
        return { success: false, error: result.result.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'An error occurred during login.' }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('accessToken')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

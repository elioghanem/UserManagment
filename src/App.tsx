import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from "./Components/Pages/Home.tsx"
import Login from "./Components/Pages/Login.tsx"
import { AuthProvider } from './Store/Auth'
import Protected from './Routes/Protected.tsx'

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/home" 
            element={
              <Protected>
                <Home />
              </Protected>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

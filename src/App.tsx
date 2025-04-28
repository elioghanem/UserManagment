import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import Home from "./Components/Pages/Home.tsx"
import Login from "./Components/Pages/Login.tsx"
import NewUserForm from "./Components/Pages/new"
import EditUser from "./Components/Pages/EditUser"
import { AuthProvider } from './Store/Auth'
import Protected from './Routes/Protected.tsx'
import DashboardLayout from './Components/Layouts/DashboardLayout'

const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/home" 
            element={
              <Protected>
                  <DashboardLayout>
                <Home />
                  </DashboardLayout>
                </Protected>
              } 
            />
            <Route 
              path="/dashboard/new" 
              element={
                <Protected>
                  <DashboardLayout>
                    <NewUserForm />
                  </DashboardLayout>
                </Protected>
              } 
            />
            <Route 
              path="/dashboard/edit/:id" 
              element={
                <Protected>
                  <DashboardLayout>
                    <EditUser />
                  </DashboardLayout>
              </Protected>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
        <Toaster position="top-right" />
    </AuthProvider>
    </QueryClientProvider>
  )
}

export default App

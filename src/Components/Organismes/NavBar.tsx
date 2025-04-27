import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsMoon } from 'react-icons/bs'
import { Button } from '../Atoms/Button'

const NavBar: FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">User Management</h1>
        <div className="flex items-center gap-4">
          <Button variant="primary" onClick={() => navigate('/dashboard/new')}>
            Create User
          </Button>
         
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="icon">
            <BsMoon size={20} />
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar 
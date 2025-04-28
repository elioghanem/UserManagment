import { FC, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search } from "../Atoms/Search"
import { UserCard } from '../Molecules'
import { useUsers } from '../../hooks/useUsers'
import ConfirmationModal from '../Molecules/ConfirmationModal'
import { useDeleteUser } from '../../hooks/useUser'
import { toast } from 'react-hot-toast'

const Home: FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: '' })
  const [showSpinner, setShowSpinner] = useState(false)
  const [spinnerMessage, setSpinnerMessage] = useState('')
  const { data, isLoading, error, refetch } = useUsers(searchQuery)
  const navigate = useNavigate()
  const location = useLocation()
  const deleteMutation = useDeleteUser()

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (location.state?.showSpinner) {
      setSpinnerMessage(
        location.state.action === 'update' 
          ? 'Updating user...' 
          : location.state.action === 'delete'
          ? 'Deleting user...'
          : 'Creating user...'
      )
      setShowSpinner(true)
      timer = setTimeout(() => {
        setShowSpinner(false)
        toast.success(
          location.state.action === 'update'
            ? 'User updated successfully!'
            : location.state.action === 'delete'
            ? 'User deleted successfully!'
            : 'User created successfully!',
          { id: 'user-action-toast' }
        )
      }, 5000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [location.state])

  const handleEdit = (id: string) => {
    navigate(`/dashboard/edit/${id}`)
  }

  const handleDelete = (id: string) => {
    setDeleteModal({ isOpen: true, userId: id })
  }

  const confirmDelete = async () => {
    try {
      await deleteMutation.mutateAsync(deleteModal.userId)
      navigate('/home', { state: { showSpinner: true, action: 'delete' } })
    } catch (error) {
      toast.error('Failed to delete user')
    } finally {
      setDeleteModal({ isOpen: false, userId: '' })
    }
  }

  return (
    <>
      {showSpinner && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-700">{spinnerMessage}</p>
            </div>
          </div>
        </>
      )}
      <div className="mb-8">
        <Search 
          aria-label="Search users" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className="text-center text-gray-600">Loading users...</div>
      )}

      {error && (
        <div className="text-center text-red-600">Error loading users</div>
      )}

      {!isLoading && !error && data?.result?.data?.users && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-5">
          {data.result.data.users.map((user) => (
            <UserCard
              key={user.id}
              {...user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!isLoading && !error && (!data?.result?.data?.users || data.result.data.users.length === 0) && (
        <div className="text-center text-gray-600">No users found</div>
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, userId: '' })}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
      />
    </>
  )
}

export default Home 
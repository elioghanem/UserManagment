import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from "../Atoms/Search"
import { UserCard } from '../Molecules'
import { useUsers } from '../../hooks/useUsers'
import ConfirmationModal from '../Molecules/ConfirmationModal'
import { useDeleteUser } from '../../hooks/useUser'
import { toast } from 'react-hot-toast'

const Home: FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: '' })
  const { data, isLoading, error, refetch } = useUsers(searchQuery)
  const navigate = useNavigate()
  const deleteMutation = useDeleteUser()

  const handleEdit = (id: string) => {
    navigate(`/dashboard/edit/${id}`)
  }

  const handleDelete = (id: string) => {
    setDeleteModal({ isOpen: true, userId: id })
  }

  const confirmDelete = async () => {
    try {
      await deleteMutation.mutateAsync(deleteModal.userId)
      toast.success('User deleted successfully')
      refetch()
    } catch (error) {
      toast.error('Failed to delete user')
    } finally {
      setDeleteModal({ isOpen: false, userId: '' })
    }
  }

  return (
    <>
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
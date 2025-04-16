import { FC, useEffect } from 'react'
import NavBar from "../Organismes/NavBar"
import { Search } from "../Atoms/Search"
import { UserCard } from '../Molecules'
import { useUserStore } from '../../Store/UserFetch'

const Home: FC = () => {
  const { users, isLoading, error, fetchUsers } = useUserStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleEdit = (id: string) => {
    // Handle edit action
    console.log('Edit user:', id)
  }

  const handleDelete = (id: string) => {
    // Handle delete action
    console.log('Delete user:', id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Search aria-label="Search users" />
        </div>

        {isLoading && (
          <div className="text-center text-gray-600">Loading users...</div>
        )}

        {error && (
          <div className="text-center text-red-600">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-5">
          {users.map((user) => (
            <UserCard
              key={user.id}
              {...user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home 
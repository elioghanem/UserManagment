import { create } from 'zustand'

interface User {
  id: string
  firstName: string
  lastName?: string
  email: string
  status: 'ACTIVE' | 'LOCKED'
  dateOfBirth: string
}

interface UserStore {
  users: User[]
  isLoading: boolean
  error: string | null
  searchQuery: string
  fetchUsers: () => Promise<void>
  setSearchQuery: (query: string) => void
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  searchQuery: '',

  fetchUsers: async () => {
    set({ isLoading: true, error: null })
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (result.status === 200) {
        set({ users: result.result.data.users })
      } else {
        set({ error: result.result.message })
      }
    } catch (error) {
      set({ error: 'Failed to fetch users' })
    } finally {
      set({ isLoading: false })
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
}))

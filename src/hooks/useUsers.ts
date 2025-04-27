import { useQuery } from '@tanstack/react-query'

interface User {
  id: string
  firstName: string
  lastName?: string
  email: string
  status: 'ACTIVE' | 'LOCKED'
  dateOfBirth: string
}

interface UsersResponse {
  status: number
  result: {
    data: {
      users: User[]
    }
    message: string
  }
}

const getUsers = async (search?: string): Promise<UsersResponse> => {
  const token = localStorage.getItem('accessToken')
  const url = new URL('/api/users', window.location.origin)
  if (search) {
    url.searchParams.append('search', search)
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return response.json()
}

export const useUsers = (search?: string) => {
  return useQuery({
    queryKey: ['users', search],
    queryFn: () => getUsers(search),
  })
} 
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

interface User {
  firstName: string
  lastName?: string
  email: string
  status: 'active' | 'locked'
  dateOfBirth: string
}

const createUser = async (userData: User) => {
  const token = localStorage.getItem('accessToken')
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error('Failed to create user')
  }

  return response.json()
}

export const useUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully!')
    },
    onError: () => {
      toast.error('Failed to create user')
    },
  })
} 
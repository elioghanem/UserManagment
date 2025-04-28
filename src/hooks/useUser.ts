import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

interface User {
  id: string
  firstName: string
  lastName?: string
  email: string
  status: 'active' | 'locked'
  dateOfBirth: string
}

const fetchUser = async (id: string): Promise<User> => {
  const token = localStorage.getItem('accessToken')
  const response = await fetch(`/api/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }

  const data = await response.json()
  return data.result.data.user
}

const updateUser = async ({ id, ...userData }: User): Promise<User> => {
  const token = localStorage.getItem('accessToken')
  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error('Failed to update user')
  }

  const data = await response.json()
  return data.result.data.user
}

const deleteUser = async (id: string): Promise<void> => {
  const token = localStorage.getItem('accessToken')
  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete user')
  }
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', data.id] })
    },
    onError: () => {
      toast.error('Failed to update user')
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
} 
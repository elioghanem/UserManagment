export interface UserCardProps {
  id: string
  firstName: string
  lastName?: string
  email: string
  status: 'ACTIVE' | 'LOCKED'
  dateOfBirth: string
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

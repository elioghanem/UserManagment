import { FC } from 'react'
import { UserCardProps } from './UserCard.type'
import { Button } from '../Atoms/Button'

const UserCard: FC<UserCardProps> = ({
  firstName,
  lastName,
  email,
  status,
  dateOfBirth,
  onEdit,
  onDelete,
  id,
}) => {
  const initials = `${firstName[0]}${lastName ? lastName[0] : ''}`

  return (
    <div className="bg-white rounded-lg shadow p-6 w-80">
      <div className="flex flex-col">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold bg-blue-600">
            {initials}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-1">
          {firstName} {lastName}
        </h3>
        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <p>Email: {email}</p>
          <p>Status: {status.toLowerCase()}</p>
          <p>Date of Birth: {dateOfBirth}</p>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-2 w-1/2">
            <Button
              variant="primary"
              onClick={() => onEdit(id)}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => onDelete(id)}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard

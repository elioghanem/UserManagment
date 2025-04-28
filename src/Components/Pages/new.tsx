import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useUserMutation } from '../../hooks/useUserMutation'
import { Toaster } from 'react-hot-toast'

const userSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  status: z.enum(['active', 'locked']),
})

type UserForm = z.infer<typeof userSchema>

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'locked', label: 'Locked' },
]

const NewUserForm: FC = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      status: 'active',
    },
  })

  const mutation = useUserMutation()

  const onSubmit = async (data: UserForm) => {
    try {
      setIsSubmitting(true)
      await mutation.mutateAsync(data)
      navigate('/home', { state: { showSpinner: true } })
    } catch (error) {
      console.error('Error creating user:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full flex justify-start mt-8 mb-4 px-8">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          ← Go Back
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-4">Add New User</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input {...register('firstName')} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
          {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name (Optional)</label>
          <input {...register('lastName')} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input {...register('email')} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input type="date" {...register('dateOfBirth')} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
          {errors.dateOfBirth && <span className="text-red-500 text-xs">{errors.dateOfBirth.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select {...register('status')} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button 
          type="submit" 
          disabled={!isValid || mutation.isPending} 
          className={`w-full py-2 rounded text-white ${isValid && !mutation.isPending ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          {mutation.isPending ? 'Creating...' : 'Submit'}
        </button>
      </form>
      <Toaster position="top-right" />
    </div>
  )
}

export default NewUserForm

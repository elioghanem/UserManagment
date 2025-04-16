import { FC } from 'react'
import { InputProps } from './Input.type'

const Input: FC<InputProps> = ({
  variant = 'search',
  className = '',
  placeholder = 'Search users...',
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg border focus:outline-none focus:ring-2'
  
  const variantStyles = {
    search: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full'
  }

  const inputStyles = `${baseStyles} ${variantStyles[variant]} ${className} [&::-ms-reveal]:hidden [&::-webkit-inner-spin-button]:hidden`

  return (
    <input
      type="text"
      className={inputStyles}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default Input

import { FC } from 'react'
import { ButtonProps } from './Button.type'

const Button: FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'font-bold py-2 px-4 rounded'
  
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    danger: 'bg-red-500 hover:bg-red-700 text-white',
    icon: 'text-white hover:text-gray-200'
  }

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  )
}

export default Button

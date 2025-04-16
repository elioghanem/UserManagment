import { InputHTMLAttributes } from 'react'

export type InputVariant = 'search'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  className?: string
  placeholder?: string
}

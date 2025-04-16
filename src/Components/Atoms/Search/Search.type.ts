import { InputHTMLAttributes } from 'react'

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  placeholder?: string
}

import { FC } from 'react'
import { SearchProps } from './Search.type'
import { BiSearch } from 'react-icons/bi'

const Search: FC<SearchProps> = ({
  className = '',
  placeholder = 'Search users...',
  ...props
}) => {
  return (
    <div className="relative w-64">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <BiSearch className="text-gray-400" size={20} />
      </div>
      <input
        type="text"
        className={`w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}

export default Search

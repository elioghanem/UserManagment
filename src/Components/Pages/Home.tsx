import { FC } from 'react'
import NavBar from "../Organismes/NavBar"
import { Search } from "../Atoms/Search"

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Search aria-label="Search users" />
        </div>
        {/* User cards will go here */}
      </main>
    </div>
  )
}

export default Home 
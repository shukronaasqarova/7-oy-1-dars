import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-6">
          <div className="flex justify-center space-x-12">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium text-lg transition duration-300 ease-in-out"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 font-medium text-lg transition duration-300 ease-in-out"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6 mt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
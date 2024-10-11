import React, { useState, useEffect } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'

function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(20)
  const [data, setData] = useState([])
  const [limit] = useState(10)
  const defaultImageUrl = 'https://via.placeholder.com/600x600.png?text=No+Image'
  const placeholderImageUrl = 'https://via.placeholder.com/600x600.png?text=Loading...'

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`)
    .then(res => res.json())      
    .then(data => {
      setData(data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [currentPage, limit])

  function handlePagination(page) {      
    setCurrentPage(page)
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="wrapper container mx-auto px-4 flex flex-wrap justify-center">
        { 
          data.map((photo) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={photo.id}>
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img 
                  src={placeholderImageUrl} 
                  data-src={photo.url}
                  alt={photo.title} 
                  className="w-full h-full object-cover rounded-md"
                  onLoad={(e) => {
                    e.target.src = e.target.dataset.src;
                  }}
                  onError={(e) => {
                    e.target.src = defaultImageUrl;
                  }}
                />
              </div>
            </div>
          ))
        }
      </div>
      <div className="mt-8">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={handlePagination}
        />
      </div>
    </div>
  )
}

export default Home
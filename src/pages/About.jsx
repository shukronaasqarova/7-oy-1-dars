import React, { useState, useEffect, useCallback } from 'react' 
import axios from 'axios'

function About() {
  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const defaultImageUrl = 'https://via.placeholder.com/600x600.png?text=No+Image'
  const placeholderImageUrl = 'https://via.placeholder.com/600x600.png?text=Loading...'
  const limit = 10

  useEffect(() => {
    if(fetching){
      console.log('fetching');
      axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`)
        .then(res => {
          setPhotos(prevPhotos => [...prevPhotos, ...res.data])
          setCurrentPage(prevState => prevState + 1)
          setTotalCount(parseInt(res.headers['x-total-count']))
        })
        .finally(() => setFetching(false))
    }
  }, [fetching, currentPage, limit])

  const scrollHandler = useCallback(() => {
    if(
      document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100 
      && photos.length < totalCount 
      && !fetching
    ){
      setFetching(true)
    }
    console.log('scrollHeight', document.documentElement.scrollHeight)
    console.log('scrollTop', document.documentElement.scrollTop)
    console.log('innerHeight', window.innerHeight)
  }, [photos.length, totalCount, fetching])

  useEffect(() => {           
    document.addEventListener('scroll', scrollHandler)
    return function (){
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [scrollHandler])

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="wrapper container mx-auto px-4 flex flex-wrap justify-center">
        {photos.map(photo => (
          <div className="w-1/4 border-gray-300 p-2 m-2" key={photo.id}>
            <img 
              src={placeholderImageUrl} 
              data-src={photo.url}
              alt={photo.title} 
              className="w-full rounded-md h-auto min-h-[200px] min-w-[200px] object-cover"
              onLoad={(e) => {
                e.target.src = e.target.dataset.src;
              }}
              onError={(e) => {
                e.target.src = defaultImageUrl;
              }}
            />
          </div>
        ))}
      </div>
      {fetching && <p className="text-center mt-4">Loading...</p>}
    </div>
  )
}

export default About
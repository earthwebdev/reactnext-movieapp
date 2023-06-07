import React from 'react'
import { MovieCardInterface } from '@/interface/movieinterface'
/* interface MovieCardInterface{  
  title: string;
  poster: string;
  releaseYear: string;
  rating: number;
  index: number;
} */
const MovieCard = ({title, poster, releaseYear, rating, index}: MovieCardInterface) => {
  return (
      <div className='col-3 mb-2'>
          {poster != '' ?<img className='w-full img-fluid' alt={title} src={poster} />:''}
          <div className='px-6 py-4 text-white'>
              <div className='font-bold text-xl mb-2'>{title}</div>
              <p className='text-gray-700 tet-base mb-2'>Release Year {releaseYear && releaseYear.split("-")[0]}</p>
              <p className='text-purple-400 text-base'>Rating: {rating}</p>
          </div>
    </div>
  )
}

export default MovieCard
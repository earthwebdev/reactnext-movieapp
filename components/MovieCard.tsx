import React from 'react'
import { MovieCardInterface } from '@/interface/movieinterface';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

/* interface MovieCardInterface{  
  title: string;
  poster: string;
  releaseYear: string;
  rating: number;
  index: number;
} */
const MovieCard = ({id, title, poster, releaseYear, rating, index}: MovieCardInterface) => {
  //console.log(id, 'ids  ');
  return (
      <div className='col-3 mb-2'>
          {poster != '' ?<Link href={  `/movies/${id}` } className='w-100'><img className='w-full img-fluid' alt={title} src={poster} /></Link>:''}
          <div className='px-6 py-4 text-white'>
              <div className='font-bold text-xl mb-2'>{title.length > 25? title.trim().slice(0,25) + '...' : title}</div>
              <p className='text-gray-700 tet-base mb-2'>Release Year {releaseYear && releaseYear.split("-")[0]}</p>
              <p className='text-purple-400 text-base'>Rating: {rating}</p>
              <Link href={  `/movies/${id}` } className='w-100'><Button variant='dark' className='w-100'>Details</Button></Link>
          </div>
    </div>
  )
}

export default MovieCard
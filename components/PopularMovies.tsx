import Carousel from 'react-bootstrap/Carousel'; 
import {useState, useEffect } from 'react' 
import { fetchMoviesByParamsData } from '@/services/axios.service';
import MoviesCarousel from './MoviesCarousel';
import { MovieInterface } from '@/interface/movieinterface';
import MovieCard from './MovieCard';

const PopularMovies = () => {

  const [movies, setMovies] = useState<MovieInterface[]>();

  const [page, setPage] = useState<number>(1);
  const fetchData =async () => {
        const resp = await fetchMoviesByParamsData({now_playing: 'popular', page});
        //console.log(resp);
        setMovies(resp.results);
  }
  useEffect(() => {
      fetchData();
  }, [])
  return (
    <>
    <div className="bg-secondary bg-gradient">
        <div className='container my-2'>
          <div className='row'>
          <h1 className='text-1xl font-bold mb-4'>Popular Movies</h1>
            <div className='popularmovies row row row-cols-4'>
                  {
                      movies && movies.map((movie: any, index: number) => {                        
                          return <MovieCard 
                          key={movie.id} 
                          id={movie.id}
                          poster={movie.poster_path != null ?'https://image.tmdb.org/t/p/w342/'+ movie.poster_path:''} 
                          title={movie.title}
                          releaseYear={movie.release_date}
                          rating={movie.vote_average}
                          index={index}
                          
                        />
                      })
                  }
                  
                  


                </div>
              </div>
          </div>
      </div>     
    </>
  )
}

export default PopularMovies
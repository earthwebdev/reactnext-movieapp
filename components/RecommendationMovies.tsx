
import {useState, useEffect } from 'react' 


import { MovieInterface } from '@/interface/movieinterface';
import MovieCard from './MovieCard';

const RecommendationsMoviesComp = (props: any) => {
  const {recommendationsMovies, id} = props;
  //console.log(recommendationsMovies)
  const [movies, setMovies] = useState<MovieInterface[]>();
  
  useEffect(() => {
    if(recommendationsMovies?.length > 0){
        setMovies(recommendationsMovies);
      }
}, [id])
  return (
    <>
    {
        recommendationsMovies && recommendationsMovies?.length > 0 && (
          <div className="bg-secondary bg-gradient">
          <div className='container my-2'>
            <div className='row'>
            <h1 className='text-1xl font-bold mb-4'>Recommendations Movies</h1>
              <div className='popularmovies row row row-cols-4'>
                    {
                        movies && movies.map((movie: any, index: number) => {                          
                          if( (movie.poster_path != null || movie.poster_path != '') && index <= (recommendationsMovies.length-2) ){
                            return <MovieCard 
                                        key={movie.id} 
                                        id={movie.id}
                                        poster={movie.poster_path != null ?'https://image.tmdb.org/t/p/w342/'+ movie.poster_path:''} 
                                        title={movie.title}
                                        releaseYear={movie.release_date}
                                        rating={movie.vote_average}
                                        index={index}
                                        
                                      />
                          }                        
                            
                        })
                    }                      
                  </div>
                </div>
            </div>
        </div> 
        )
    }        
    </>
  )
}

export default RecommendationsMoviesComp
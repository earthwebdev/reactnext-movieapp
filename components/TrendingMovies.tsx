import Carousel from 'react-bootstrap/Carousel'; 
import {useState, useEffect } from 'react' 
import { fetchTrendingMovies } from '@/services/axios.service';
import MoviesCarousel from './MoviesCarousel';
import { MovieInterface } from '@/interface/movieinterface';

const TrendingMovies = () => {
  const [index, setIndex] = useState<number>(0);

  const [movies, setMovies] = useState<MovieInterface[]>();

  const handleSelect = (selectedIndex: number) => {
    console.log(selectedIndex, 'selected index value');
    setIndex(selectedIndex);
  };
  const fetchData =async () => {
        const resp = await fetchTrendingMovies();
        //console.log(resp);
        setMovies(resp.results);
  }
  useEffect(() => {
      fetchData();
  }, [])
  return (
    <>
      <div className='container my-2'>
          <div className='row'>
              <h3>Trending Movies</h3>
              <Carousel  activeIndex={index} onSelect={handleSelect}>
                {
                   movies && movies.map((movie: any, ind: number) => {
                      
                      return (   
                        <Carousel.Item key={ind} interval={2000}>
                          <img 
                          className="d-block w-100"
                          src={'https://image.tmdb.org/t/p/original/'+ movie.poster_path}
                          alt={movie.title}
                          />
                          <Carousel.Caption>
                          <h3>{movie.title}</h3>
                          <p>{movie.overview}</p>
                          </Carousel.Caption>
                      </Carousel.Item>                       
                          
                          
                      );
                  })
                }                
            </Carousel>
              
          </div>
      </div>       
    </>
    
  )
}

{/* <MoviesCarousel 
                        key={movie.id} 
                        poster={'https://image.tmdb.org/t/p/w500/'+ movie.poster_path} 
                        title={movie.title}
                        index={ind}
                        overview={movie.overview}  /> */}
export default TrendingMovies
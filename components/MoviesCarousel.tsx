import Carousel from 'react-bootstrap/Carousel';
import { MovieCarouselInterface } from '@/interface/movieinterface'; 
const MoviesCarousel = ({title, poster, overview, index} : MovieCarouselInterface) => {
  return (
        <Carousel.Item interval={500} className='active'>
            <img
            className="d-block w-100"
            src={poster}
            alt={title}
            />
            <Carousel.Caption>
            <h3>{title}</h3>
            <p>{overview}</p>
            </Carousel.Caption>
        </Carousel.Item>
  )
};

{/* <MoviesCarousel 
                          key={movie.id} 
                          poster={'https://image.tmdb.org/t/p/w500/'+ movie.poster_path} 
                          title={movie.title}
                          index={ind}
                          overview={movie.overview}  /> */}

export default MoviesCarousel
import RootLayouts from '@/components/Layouts';
import PopularMovies from '@/components/PopularMovies';
import React from 'react';
import {useState, useEffect } from 'react' 
import { fetchMoviesByParamsData, fetchMoviesDataBySearch } from '@/services/axios.service';
//import MoviesCarousel from './components/MovieCard';
import { MovieInterface } from '@/interface/movieinterface';
import MovieCard from '@/components/MovieCard';
import FilterMoviesAside from '@/components/FilterMoviesAside';
import FilterLists from '@/components/FilterLists';
import Button from 'react-bootstrap/Button'
import { Spinner } from 'react-bootstrap';


const PopularMoviesPage = () => {
    const [movies, setMovies] = useState<MovieInterface[]>([]);
    //for the spinner use state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    //filter part
    const [sortFiltervalue , setSortFiltervalue] = useState<string>();

    const [genreId , setGenreId] = useState<number>();
    const [searchKeyword , setSearchKeyword] = useState<string>();
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const searchResults = async(e: any) => {
      e.preventDefault();
      setIsLoading(true);
      setIsSearch(true);
      //console.log(genreId, searchKeyword, sortFiltervalue);
      const data: any = {
        genreId, searchKeyword, sortFiltervalue, page: 1
      }
      const resp = await fetchMoviesDataBySearch(data);
          //console.log(resp);
          setMovies(resp.results);
          setIsLoading(false);
    }

    const loadMorePages =async (e:any) => {
      e.preventDefault();
      setIsLoading(true);
      if(isSearch){
        const data: any = {
          genreId, searchKeyword, sortFiltervalue, page
        }
        const resp = await fetchMoviesDataBySearch(data);
            //console.log(resp);
            setPage(page + 1);
            setMovies([...movies, ...resp.results]);
            setIsPageLoading(false);
      }
      else{
        const resp = await fetchMoviesByParamsData({now_playing: 'popular', page});
        //console.log(resp);
        setPage(page + 1);
        setMovies([...movies, ...resp.results]);
        setIsPageLoading(false);
      }
      setIsLoading(false);
    }

    //console.log(sortFiltervalue);
  
    const fetchData =async () => {
          setPage(1);
          const resp = await fetchMoviesByParamsData({now_playing: 'popular', page});
          //console.log(resp);
          setMovies(resp.results);
          setIsPageLoading(false);
    }
    useEffect(() => {
      //console.log(`Hello  ${process.env.NODE_ENV} ${process.env.NEXT_PUBLIC_API_KEY}`)
        
        fetchData();
    }, [])
  return (
    <RootLayouts>
        {
            isPageLoading && (
                            <div className='position-relative w-100'>
                                <div className='d-flex justify-content-center align-items-center w-100' style={{minHeight: '50vh'}}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                    
                                </Spinner>
                                </div>
                            </div>
            )
        }
        {
          !isPageLoading && (
            <div className='container my-2'>
              <div className='row'>
              <h1 className='text-1xl font-bold mb-4'>Popular Movies</h1>
                
                <div className='popularmovies row'>
                    <div className='col-md-3'>
                        <FilterMoviesAside sortFiltervalue={sortFiltervalue} setSortFiltervalue={setSortFiltervalue} />
                        <FilterLists setSearchKeyword={setSearchKeyword} searchKeyword={searchKeyword} genreId={genreId} setGenreId={setGenreId} />
                        <Button onClick={(e) => searchResults(e)} className='w-full mt-2 w-100' variant='secondary'>Search</Button>
                    </div>
                    <div className='popularmoviespages row row-cols-4 col-md-9'>
                        {
                            isLoading && (
                                          <div className='position-relative w-100'>
                                              <div className='d-flex justify-content-center align-items-center w-100' style={{minHeight: '50vh'}}>
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                  
                                                </Spinner>
                                              </div>
                                          </div>
                            )
                        }
                          
                      {
                          !isLoading && movies && movies.map((movie: any, index: number) => {
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
    
                      {
                          !isLoading && movies && (
                            <Button onClick={(e) => loadMorePages(e)} className='w-full mt-2 w-100' variant='secondary'>Load More</Button>
                          )
                      }
                    </div> 
                      
    
    
                    </div>
                  </div>
              </div>  
          )
        }              
    </RootLayouts>
  )
}

export default PopularMoviesPage
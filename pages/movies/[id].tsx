import { useRouter } from "next/router";
import { fetchMoviesDetailsByParamsData } from "@/services/axios.service";
import { useEffect, useState } from "react";
import { MovieInterface, MovieDetailsInterface, MovieCreditCastDetailsInterface, MovieCreditCrewDetailsInterface, MovieSocialDataInterface } from "@/interface/movieinterface";
import RootLayouts from "@/components/Layouts";
import Link  from 'next/link'
import { Carousel } from "react-bootstrap";
import { Facebook, Twitter, Instagram, Wikipedia, Link as LinkIcon } from "react-bootstrap-icons";
import RecommendationsMoviesComp from "@/components/RecommendationMovies";

const MoviesDetailsPage = () => {
    const [movieDetails, setMovieDetails] = useState<MovieDetailsInterface>();
    const [movieCreditCastDetails, setMovieCreditCastDetails] = useState<MovieCreditCastDetailsInterface[]>([]);

    const [movieCreditCrewDetails, setMovieCreditCrewDetails] = useState<MovieCreditCrewDetailsInterface[]>([]);

    const [movieSocialsData, setMovieSocialsData] = useState<MovieSocialDataInterface>();

    const [movieRecommendationsData, setMovieRecommendationsData] = useState<MovieInterface>();

    

    const [index, setIndex] = useState<number>(0);

    const router = useRouter();
    //console.log(router.query.id);
    const id = router.query.id?router.query.id:0;
    
    const releaseYear = movieDetails?.release_date;
    const runningMovieTime = movieDetails?.runtime;
    const runningMovieTimeHours = runningMovieTime && Math.floor(runningMovieTime / 60);
    const runningMovieTimeMinutes = runningMovieTime && runningMovieTime % 60;

    let creditDeparmentLists = ['Production', 'Directing', 'Writing'];

    const handleSelect = (selectedIndex: number) => {
        //console.log(selectedIndex, 'selected index value');
        setIndex(selectedIndex);
    }

    const fetchDataById =async () => {
        const data = {
            id, fetchType: '',
        }
        //const resp: any = await getMovieDetailsById(id);
        const resp = await fetchMoviesDetailsByParamsData(data);
        //console.log(resp);
        setMovieDetails(resp);

        
    }

    const fetchCreditDataByID = async () => {
        const data = {
            id, fetchType: '/credits',
        }
        //const resp: any = await getMovieCreditDetailsById(id);
        const resp: any = await fetchMoviesDetailsByParamsData(data);
        //console.log(resp);
        setMovieCreditCastDetails( resp?.cast);
        //const respData = resp;
  
        const movieCredits = resp && resp.crew && resp.crew.filter( (movieCreditDetail: any) => {
            let departmentMovie = movieCreditDetail.department.trim();
            //console.log(departmentMovie, 'deparment data');
            if( creditDeparmentLists.includes(departmentMovie) ){
                //console.log(movieCreditDetail, ' working')
                return `${movieCreditDetail}`;
            }
            

        })        
        setMovieCreditCrewDetails( movieCredits);        
    }
    const fetchSocialDataById = async () => {
        const data = {
            id, fetchType: '/external_ids',
        }
        //const resp: any = await getMovieSocialDataById(id);
        const resp: any = await fetchMoviesDetailsByParamsData(data);
        //console.log(resp);
        setMovieSocialsData( resp);
        
    }

    const fetchRecommendationMoviesById = async () => {
        const data = {
            id, fetchType: '/recommendations',
        }        
        const resp: any = await fetchMoviesDetailsByParamsData(data);
        console.log(resp);
        setMovieRecommendationsData( resp);
        
    }
    
    //console.log(movieDetails?.poster_path);
    useEffect(() => {
        fetchDataById();

        fetchCreditDataByID();

        fetchSocialDataById();

        fetchRecommendationMoviesById();
    }, [id]); 
  return (
    <RootLayouts>
        <div className='container my-2'>
            <div className='row'>
                <h1 className='text-1xl font-bold mb-4'>Overview Movie</h1>
            </div>
        </div>
        
        <div className="bg-secondary bg-gradient">
            <div className='container my-2 py-2'>
            <div className='moviedetails row'>
                <div className='col-md-3'>                
                    {
                        movieDetails?.poster_path && (
                            <img style={{ maxWidth: "100%" }} src={`https://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`}  alt={movieDetails.title} />
                        )
                    }                    
                </div>
                <div className='moviedetailspage col-md-9'>
                    <section className="header poster">
                        <div className="title ott_false" dir="auto">

                        <h2 className="20">
                        <a href="#">{movieDetails?.title}</a>
                        <span className="tag release_date me-0">({releaseYear && releaseYear.split("-")[0]})</span>
                        </h2>

                        <div className="facts">
                            {/* <span className="certification">
                                R
                            </span> */}

                            <span className="release me-1">
                            { movieDetails?.release_date.replace(/-/g, '/')}
                            </span>


                            <span className="genres">
                                {
                                    movieDetails && movieDetails.genres && movieDetails.genres.map((genre: any) =>{
                                        return (
                                            <a href={`/genre/${genre.id}`} title={genre.name}>{genre.name}, </a>
                                        )
                                    })
                                }
                            </span>

                            <span className="runtime">{ `${runningMovieTimeHours}h ${runningMovieTimeMinutes}m`}</span>
                        </div>


                    </div>


                            <ul className="auto actions d-flex">

                                <li className="chart d-flex">
                                    <div className="text-white">Average: <strong>{movieDetails && movieDetails.vote_average}</strong> </div>
                                    <div className="text-white">Count: <strong>{movieDetails && movieDetails.vote_count}</strong> </div>                    
                                    <div className="text-white">Popularity: <strong>{movieDetails && movieDetails.popularity}</strong> </div>                    
                                    
                                </li>

                                <li className="text-white" title="Imdb Url">
                                <a target="_blank" className="text-white" href={movieDetails && `https://www.imdb.com/title/${movieDetails.imdb_id}`}>Click to check IMDB Site</a>
                                </li>

                                <li className="video none">
                                    <a className="no_click play_trailer" href="#" data-site="YouTube" data-id="yjRHZEUamCc" data-title="Play Trailer"><span className="glyphicons_v2 play"></span> Play Trailer</a>
                                </li>
                            </ul>

                            <div className="header_info">
                                    {movieDetails && movieDetails.tagline && (<h3 className="tagline" dir="auto">{movieDetails.tagline}</h3>)}
                                    <h3 dir="auto">Overview</h3>
                                    <div className="overview" dir="auto">
                                        <p>{movieDetails && movieDetails.overview}</p>
                                    </div>

                                <ol className="people no_image row row-cols-4">
                                    {
                                        movieCreditCrewDetails && movieCreditCrewDetails.map( (movieCreditCrewDetail: any) => {
                                            return (
                                                
                                                        <li className="profile">
                                                            <p className="mb-0">
                                                                <Link className="text-white" href={`/person/${movieCreditCrewDetail.id}`}>{movieCreditCrewDetail.name}</Link>
                                                            </p>
                                                        <p className="character mb-1">{movieCreditCrewDetail.job}</p>
                                                        </li>
                                                    
                                                
                                                
                                            )
                                        })
                                    }                                    
                                </ol>
                            </div>
                    </section>
                </div> 
                  


                </div>
              </div>
          </div>

        <div className='container my-2 py-2'>
            <div className='moviedetails row'>
                <div className="col-md-9">
                    <section className="topbilledcast">
                        <h4>Top Billed Cast</h4>
                        <div className="tbcastcarousel">
                        <Carousel  activeIndex={index} onSelect={handleSelect}>
                            {
                                movieCreditCastDetails && movieCreditCastDetails.map((movie: any, ind: number) => {                                                                                
                                            {
                                                //console.log(movie.profile_path, 'movie path')
                                                movie.profile_path  && movie.profile_path !== null
                                                {
                                                        return  (
                                                            <Carousel.Item key={ind} interval={5000}>
                                                                <img 
                                                                className="d-block w-100"
                                                                src={'https://image.tmdb.org/t/p/original/'+ movie.profile_path}
                                                                alt={movie.name}
                                                                />
                                                                <Carousel.Caption className="text-danger-50 ">
                                                                    <h3>{movie.name}</h3>
                                                                    <p>{movie.character}</p>
                                                                </Carousel.Caption>
                                                            </Carousel.Item> 
                                                        )
                                                }                                                                                                         
                                            }                                                                                                                                                                                                                
                                })
                            }                
                        </Carousel>
                        </div>
                    </section>

                </div>
                <div className="col-md-3">
                    {
                        movieSocialsData && (
                            <ul className="d-flex flex-cols sociallinks">
                                <li><Link className="bg-gray me-2 " href={`https://facebook.com/${movieSocialsData?.facebook_id}`}><Facebook className="text-black-50 fs-4" /></Link></li>
                                <li><Link className="bg-gray me-2 " href={`https://twitter.com/${movieSocialsData?.twitter_id}`}><Twitter className="text-black-50 fs-4" /></Link></li>
                                <li><Link className="bg-gray me-2" href={`https://instagram.com/${movieSocialsData?.instagram_id}`}><Instagram className="text-black-50 fs-4" /></Link></li>
                                <li><Link className="bg-gray me-2" href={`${movieDetails?.homepage}`}><LinkIcon className="text-black-50 fs-4" /></Link></li>
                            </ul>
                        )
                    }
                            
                            <p>
                                <strong><bdi>Status</bdi></strong></p><p> {movieDetails?.status}
                            </p>

                            <p>
                                <strong><bdi>Original Language</bdi></strong></p><p> 
                                {
                                    movieDetails && movieDetails.production_countries.length > 0 && 
                                    movieDetails.production_countries.map((country) => {                                        
                                        return country.iso_3166_1.toLowerCase() === movieDetails.original_language ? country.name : movieDetails?.original_language
                                    }) 
                                }
                            </p>

                            <p>
                                <strong><bdi>Budget</bdi></strong></p><p>${movieDetails?.budget}
                            </p>

                            <p>
                                <strong><bdi>Revenue</bdi></strong></p><p>${movieDetails?.revenue}
                            </p>
                                 
                            
                </div>
            </div>
        </div>
        {
            movieRecommendationsData && (
                <RecommendationsMoviesComp recommendationsMovies={movieRecommendationsData} />
            )
        }
        
    </RootLayouts>
  )
}

export default MoviesDetailsPage
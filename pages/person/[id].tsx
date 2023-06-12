import { useRouter } from "next/router";
import { fetchPersonsDetailsByParamsData } from "@/services/axios.service";
import { useEffect, useState } from "react";
import { MovieInterface, MovieDetailsInterface, MovieCreditCastDetailsInterface, MovieCreditCrewDetailsInterface, MovieSocialDataInterface } from "@/interface/movieinterface";
import RootLayouts from "@/components/Layouts";
import Link  from 'next/link'
import { Carousel, Spinner } from "react-bootstrap";
import { Facebook, Twitter, Instagram, Wikipedia, Link as LinkIcon } from "react-bootstrap-icons";
import RecommendationsMoviesComp from "@/components/RecommendationMovies";
import { PersonDetailsInterface, PeopleInterface, PersonSocialDataInterface } from "@/interface/peopleinterface";
import MovieCard from '@/components/MovieCard'

const PersonDetailsPage = () => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [personDetails, setPersonDetails] = useState<PersonDetailsInterface>();
    const [movieCreditCastDetails, setMovieCreditCastDetails] = useState<MovieCreditCastDetailsInterface[]>([]);

    const [movieCreditKnownDetails, setMovieCreditKnownDetails] = useState<MovieCreditCastDetailsInterface[]>([]);

    const [personSocialsData, setPersonSocialsData] = useState<PersonSocialDataInterface>();

    //const [movieRecommendationsData, setMovieRecommendationsData] = useState<PeopleInterface>();

    const [index, setIndex] = useState<number>(0);

    const router = useRouter();
    //console.log(router.query.id);
    const id = router.query.id?router.query.id:0;
    
    /* const releaseYear = personDetails?.release_date;
    const runningMovieTime = personDetails?.runtime;
    const runningMovieTimeHours = runningMovieTime && Math.floor(runningMovieTime / 60);
    const runningMovieTimeMinutes = runningMovieTime && runningMovieTime % 60; */

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
        const resp = await fetchPersonsDetailsByParamsData(data);
        //console.log(resp);
        if(resp)
        {
            setPersonDetails(resp);

            const socialdata:any = {};
            setPersonSocialsData(socialdata);

            fetchSocialDataById();

            setMovieCreditCastDetails([]);
            setMovieCreditKnownDetails( []);

             fetchCreditDataByID(resp);           
        }
        else{
            router.push('/pagenotfound');
            return;
        }
                           
        
    }
    const fetchSocialDataById = async () => {
        const data = {
            id, fetchType: '/external_ids',
        }
        //const resp: any = await getMovieSocialDataById(id);
        const resp: any = await fetchPersonsDetailsByParamsData(data);
        //console.log(resp);
        setPersonSocialsData( resp);
        
    }
    const random = (min:any, max: any) => Math.floor(Math.random() * (max - min)) + min;
    const fetchCreditDataByID = async (props:any) => {
        //console.log(props.also_known_as);
        const data = {
            id, fetchType: '/movie_credits', //'/combined_credits', //
        }
        //const resp: any = await getMovieCreditDetailsById(id);
        const resp: any = await fetchPersonsDetailsByParamsData(data);
        //console.log(resp);
        setMovieCreditCastDetails( resp?.cast);
        //const respData = resp;
        let movieCreditsKnownData = [];
        for(let i= 0;i < 20;i++){
          const ranNum = random(0,(resp.cast.length-1) );
          //console.log(i, 'index', ranNum);
          //console.log(ranNum, resp.cast[ranNum]);
          movieCreditsKnownData.push(resp.cast[ranNum]);
        }
        //console.log(movieCreditsKnownData)       
        setMovieCreditKnownDetails( movieCreditsKnownData);  
        setIsPageLoading(false);      
    }
    
    //console.log(personDetails?.profile_path);
    useEffect(() => {
        fetchDataById();        
        
    }, [id]); 
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
            <>
                <div className='container my-2'>
                    <div className='row'>
                        <h1 className='text-1xl font-bold mb-4'>Overview Person</h1>
                    </div>
                </div>
                
                <div className="my-2">
                    <div className='container my-2 py-2'>
                    <div className='personDetails row'>
                        <div className='col-md-3'> 
                        <section className="full_wrapper facts left_column">              
                            {
                                personDetails?.profile_path && (
                                    <img style={{ maxWidth: "100%" }} src={`https://image.tmdb.org/t/p/w342/${personDetails.profile_path}`}  alt={personDetails.name} />
                                )
                            }


                
                            <div className="social_links d-flex row-flex my-4">
                                { personSocialsData && personSocialsData.facebook_id &&
                                    (
                                        <div className="facebook">
                                            <Link className="bg-gray me-2 " href={`https://facebook.com/${personSocialsData?.facebook_id}`}><Facebook className="text-black-50 fs-4" /></Link>                              
                                        </div>
                                        )
                                }

                                { personSocialsData && personSocialsData.twitter_id &&
                                    (
                                        <div className="facebook">
                                            <Link className="bg-gray me-2 " href={`https://twitter.com/${personSocialsData?.twitter_id}`}><Twitter className="text-black-50 fs-4" /></Link>                              
                                        </div>
                                        )
                                }

                                { personSocialsData && personSocialsData.instagram_id &&
                                    (
                                        <div className="facebook">
                                            <Link className="bg-gray me-2 " href={`https://instagram.com/${personSocialsData?.instagram_id}`}><Instagram className="text-black-50 fs-4" /></Link>                              
                                        </div>
                                        )
                                }

                                { personDetails && personDetails.homepage &&
                                    (
                                        <div className="facebook">
                                            <Link className="bg-gray me-2 " href={`${personDetails.homepage}`}><LinkIcon className="text-black-50 fs-4" /></Link>                              
                                        </div>
                                        )
                                }
                            </div>
                            <h3><b>Personal Info</b></h3>

                            <section>
                            <p><strong>Known For</strong></p><p> {personDetails?.known_for_department}</p>
                            <p><strong>Known Credits</strong></p><p>{personDetails?.popularity}</p>
                            <p><strong>Gender</strong></p><p> {personDetails && personDetails.gender && personDetails.gender === 1? 'Female': 'Male'} </p>
                            <p className="full">
                                <strong>Birthday</strong></p><p>
                                {personDetails?.birthday}
                            </p>
                            <p className="full"><strong>Place of Birth</strong></p><p> {personDetails?.place_of_birth}</p>

                                <p className="full true">
                                <strong>Also Known As</strong></p><p>
                                </p>
                                <ul>
                                {
                                    personDetails && personDetails.also_known_as.length > 0 && personDetails.also_known_as.map((known,index) => {
                                        return (
                                            <li key={`${known}_${index}`} className="additionalName">{known}</li>
                                        )
                                    })
                                }            
                                </ul>
                            </section>

            

            

            
                        </section>
                        </div>



                        
                        <div className='personDetailspage col-md-9'>
                            <section className="">
                                <div className="title">

                                <h2 className="title">
                                <a href="#">{personDetails?.name}</a>
                                </h2>                                
                                </div>
                                <div className="biography">                          
                                            <h3 className="h4">Biography</h3>
                                            <div className="overview">
                                                <p>{personDetails && personDetails.biography}</p>
                                            </div>
                                </div>
                                        
                            <div className='popularmoviespages row row-cols-4'>
                                
                                {
                                    movieCreditKnownDetails && setMovieCreditKnownDetails.length > 0 && movieCreditKnownDetails.map((movie:any,index) => {
                                        if(movie && (movie.poster_path != null || movie.poster_path != '') ){
                                            return (                                    
                                                <MovieCard
                                                    key={`personmovie_${movie.id}_${index}`} 
                                                    id={movie.id}
                                                    poster={movie.poster_path != null ?'https://image.tmdb.org/t/p/w342/'+ movie.poster_path:''} 
                                                    title={movie.title}
                                                    releaseYear={movie.release_date}
                                                    rating={movie.vote_average}
                                                    index={index}
                                                    
                                                />
                                            )
                                        }                                        
                                    })
                                }            
                                
                            </div>                                                                                                                                                        
                            </section>
                        </div> 
                        


                        </div>
                    </div>
                </div>     
            </>
            )
        }
               
    </RootLayouts>
  )
}

export default PersonDetailsPage
import RootLayouts from '@/components/Layouts';

import {useState, useEffect } from 'react' 
import { fetchPopularPeoples } from '@/services/axios.service';

import PopularPersonCard from '@/components/PopularPersonCard';

import Button from 'react-bootstrap/Button'
import { Spinner } from 'react-bootstrap';
import { PeopleInterface } from '@/interface/peopleinterface';


const popularPeoplesPage = () => {
    const [popularPeoples, setPopularPeoples] = useState<PeopleInterface[]>([]);
    //for the spinner use state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);


    const loadMorePages =async (e:any) => {
      e.preventDefault();
      setIsLoading(true);
      
        const resp = await fetchPopularPeoples( page );
        //console.log(resp);
        setPage(page + 1);
        setPopularPeoples([...popularPeoples, ...resp.results]);
        setIsLoading(false);
    }
  
    const fetchData =async () => {
          setPage(1);
          const resp = await fetchPopularPeoples( page );
          console.log(resp);
          setPopularPeoples(resp.results);
    }
    useEffect(() => {
        fetchData();
        
    }, [])
  return (
    <RootLayouts>
        
        <div className='container my-2'>
          <div className='row'>
          <h1 className='text-1xl font-bold mb-4'>Popular Peoples</h1>
            
            <div className='popularPeoples row'>                
                <div className='popularPeoplesPage row row row-cols-4 col-md-12'>                      
                  {
                      popularPeoples && popularPeoples.map((person: any, index: number) => {
                          return (
                            <PopularPersonCard key={`person_${index}`} name={person.name} profile_path={'https://image.tmdb.org/t/p/original'+ person.profile_path} known_for={person.known_for} index={index} />                            
                          )
                      })
                  }

                  {
                        isLoading && (
                                      <div className='position-relative w-100'>
                                          <div className='d-flex justify-content-center align-items-center w-100'>
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                              
                                            </Spinner>
                                          </div>
                                      </div>
                        )
                    }

                  {
                      !isLoading && popularPeoples && (
                        <Button onClick={(e) => loadMorePages(e)} className='w-full mt-2 w-100' variant='secondary'>Load More</Button>
                      )
                  }
                 </div> 
                  


                </div>
              </div>
          </div>        
    </RootLayouts>
  )
}

export default popularPeoplesPage
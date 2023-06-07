import Carousel from 'react-bootstrap/Carousel'; 
import {useState, useEffect } from 'react' 
import { fetchPopularPeoples } from '@/services/axios.service';
import { PeopleInterface } from '@/interface/peopleinterface';

const PopularPeoples = () => {
  const [index, setIndex] = useState<number>(0);

  const [peoples, setPeoples] = useState<PeopleInterface[]>();

  const handleSelect = (selectedIndex: number) => {
    console.log(selectedIndex, 'selected index value');
    setIndex(selectedIndex);
  };
  const fetchData =async () => {
        const resp = await fetchPopularPeoples();
        //console.log(resp);
        setPeoples(resp.results);
  }
  useEffect(() => {
      fetchData();
  }, [])
  return (
    <>
      <div className='container my-2'>
          <div className='row'>
              <h3>Popular Peoples</h3>
            <Carousel  activeIndex={index} onSelect={handleSelect}>
                {
                   peoples && peoples.map((people: any, ind: number) => {
                      
                      return (   
                        <Carousel.Item key={ind} interval={2000}>
                          <img 
                          className="d-block w-100"
                          src={'https://image.tmdb.org/t/p/original'+ people.profile_path}
                          alt={people.name}
                          />
                          <Carousel.Caption>
                          <h3>{people.name}</h3>
                          <p>{people.known_for[0].title}</p>
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

export default PopularPeoples
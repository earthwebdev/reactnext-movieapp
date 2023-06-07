import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect } from 'react'
import SortFilterList from './SortFilterList';
import { Form } from 'react-bootstrap';
import { fetchGenreMoviesList } from '@/services/axios.service';
import { GenreInterface } from '@/interface/genreinterface';

const FilterLists = (props: any) => {
  const {searchKeyword, setSearchKeyword, genreId, setGenreId} = props;

  const [genreList, setGenreList] = useState<GenreInterface[]>([]);

  const fetchData = async () => {
    const resp = await fetchGenreMoviesList();
      console.log(resp);
      setGenreList(resp.genres);
  }
  useEffect(() => {
      fetchData();
  }, [])
  return (
    <Accordion className='mt-2'>
        <Accordion.Item eventKey="0">
        <Accordion.Header className='h2'>Filters</Accordion.Header>
        <Accordion.Body>
            <h6>Genres</h6>
            <div className="genreslist my-2">
                <select value={genreId} onChange={(e) => setGenreId(e.target.value)} className="Select Select_sm select-sortingfilters py-2 rounded w-100 my-2">
                    <option value="">Genre Movies List</option>
                    {
                        genreList && genreList.map( (genre: any) => {
                            
                                return (<option key={genre.id} value={genre.id}>{genre.name}</option>)
                        })
                    }                    
                </select>
            </div>
            <p>Filter genres by given above list</p>

            <Form.Control value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} type='text' placeholder='Search Keywords' />
        </Accordion.Body>
        </Accordion.Item>        
    </Accordion>
  )
}

export default FilterLists
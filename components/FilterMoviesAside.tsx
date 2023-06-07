import Accordion from 'react-bootstrap/Accordion';
import React, { useState } from 'react'
import SortFilterList from './SortFilterList';

const FilterMoviesAside = (props: any) => { 
    const { sortFiltervalue , setSortFiltervalue} = props;
  return (
    <Accordion>
        <Accordion.Item eventKey="0">
        <Accordion.Header className='h2'>Sort</Accordion.Header>
        <Accordion.Body>
            <h6>Sort Results By</h6>
            <SortFilterList sortFiltervalue={sortFiltervalue} setSortFiltervalue={setSortFiltervalue} />
            <p>Filter sort by given above list</p>
        </Accordion.Body>
        </Accordion.Item>        
    </Accordion>
  )
}

export default FilterMoviesAside
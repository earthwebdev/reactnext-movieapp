//import Head from 'next/head'
//import Image from 'next/image'
//import { Inter } from 'next/font/google'
//import styles from '@/styles/Home.module.css'

import RootLayouts from '@/components/Layouts'
import TrendingMovies from '@/components/TrendingMovies'
import PopularMovies from '@/components/PopularMovies'
import HeroComp from '@/components/HeroComp'
import PopularPeoples from '@/components/PopularPeoples'
import { useState } from 'react'

//const inter = Inter({ subsets: ['latin'] })

import { Spinner } from "react-bootstrap";

export default function Home() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  return (
    <>
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
          
                <HeroComp />
                
                <TrendingMovies />
                <PopularMovies />

                <PopularPeoples setIsPageLoading={setIsPageLoading } />              
      </RootLayouts>
    </>
  )
}

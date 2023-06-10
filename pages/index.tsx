//import Head from 'next/head'
//import Image from 'next/image'
//import { Inter } from 'next/font/google'
//import styles from '@/styles/Home.module.css'

import RootLayouts from '@/components/Layouts'
import TrendingMovies from '@/components/TrendingMovies'
import PopularMovies from '@/components/PopularMovies'
import HeroComp from '@/components/HeroComp'
import PopularPeoples from '@/components/PopularPeoples'

//const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  return (
    <>
    <RootLayouts>
        
          <HeroComp />
          
          <TrendingMovies />
          <PopularMovies />

          <PopularPeoples />
      </RootLayouts>
    </>
  )
}

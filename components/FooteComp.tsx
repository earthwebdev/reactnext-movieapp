import Link from 'next/link'
import React from 'react'
import { Facebook, Github, Instagram } from 'react-bootstrap-icons';

const FooteComp = () => {
  return (
    <>
        <div className="container py-2">
            <div className="row">
                <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='text-center text-white'>
                    Copyright © 2023 The Movie App
                </div>

                <div className="text-center text-white">
                    <Link href="#!" className="btn btn-primary gap-2"><Facebook /></Link>
                    <Link href="#!" className="btn btn-danger mx-3 gap-2"><Instagram /></Link>
                    <Link href="#!" className="btn btn-secondary gap-2"><Github /></Link>
            
                </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default FooteComp
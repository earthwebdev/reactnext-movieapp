import React from 'react'
import Link from 'next/link'
import RootLayouts from '@/components/Layouts'

const pagenotfound = () => {
  return (
    <RootLayouts>
        <div className='container'>
            <div className='row'>
                <h1>404 - Page Not Found</h1>
                <Link href="/">
                    
                    Go back home
                    
                </Link>
            </div>
        </div>
    </RootLayouts>
  )
}

export default pagenotfound
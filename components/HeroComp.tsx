import React from 'react'

const HeroComp = () => {
  return (
    <>
        <div className='heroimageparent'>
             <img className='heroimage' src="./movies-hero-image.jpg" alt="Hero image of movies app" />
             <div className="heroimgserchbox">
                    <h2>welcome.</h2>
                    <h4>Millions of movies, TV shows and people to discover. Explore now.</h4>
                    <div className='searchbox'>
                        <input type='search' name='search' placeholder='Search for a movie' />
                        <button>Search</button>
                    </div>
             </div>
        </div>
    </>
  )
}

export default HeroComp
import React from 'react'

// import css
import './home.css'

// import components
import Hero from './hero'
import Category from './category'
import Recommendation from './recommendation'
import Subscribe from './subscribe'
import Slider from '../../utility/slider/slider'

// dummy imports
import images from '../../../assets/images/images.js'

const Home = () => {
  return (
    <>
      <div className='homeContainer'>
          <Hero />
          <Category />
          <Recommendation />
          <Slider title='Featured Products' data={images} />
          <Slider title='Trending Products' data={images} />
          <Subscribe />
      </div>
    </>
   
  )
}

export default Home
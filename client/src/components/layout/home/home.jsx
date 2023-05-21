import React, { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'

// import css
import './home.css'

// import components
import Hero from './hero'
import Category from './category'
import Recommendation from './recommendation'
import Subscribe from './subscribe'
import Slider from '../../utility/slider/slider'

const Home = () => {
  const { data } = useFetch('/arts/recommendations');

  const [specialOffers, setSpecialOffers] = useState([]);

  useEffect(() => {
    if(data){
      setSpecialOffers(data.specialOffers);
    }  
  }, [data])

  return (
    <>
      <div className='homeContainer'>
          <Hero />
          <Category />
          <Recommendation />
          <Slider title='Special Offers' data={specialOffers} />
          <Subscribe />
      </div>
    </>
   
  )
}

export default Home
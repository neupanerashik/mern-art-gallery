import React from 'react'

// import css
import './hero.css'

// import compnonets
import Carousel from '../../utility/carousel/carousel.jsx'

// dummy imports
import artist from '../../../assets/images/angel.jpg'
import river from '../../../assets/images/river.jpg'
import lake from '../../../assets/images/lake.jpg'


const Hero = () => {
  const data = [
    {title: "The Product Name", imgLink: artist,  description: "In publishing and graphic design, Lorem ipsum is a placeholder text."},
    {title: "The Product Name", imgLink: river, description: "It is commonly used to demonstrate the visual form of a document or a typeface."},
    {title: "The Product Name", imgLink: lake,  description: "Lorem ipsum may be used as a placeholder before final copy is available."},
]
  return (
    <>
        <div className='heroContainer'>
        </div>
    </>
  )
}

export default Hero
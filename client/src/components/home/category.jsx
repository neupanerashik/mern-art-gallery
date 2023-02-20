import React from 'react'
import {Link} from 'react-router-dom'

// import css
import './category.css'

// import images
import paintcolor from '../../assets/images/paintcolor.jpg'
import mountain from '../../assets/images/mountain.jpg'
import ganesh from '../../assets/images/ganesh.jpg'
import sketch from '../../assets/images/sketch.jpg'
import digital from '../../assets/images/digital.jpg'

// component
function CategoryItem (props) {
    return (
        <div className='category'>
            <img src={props.image} alt='pic'></img>
            
            <p>{props.title}</p>
            
            <Link to={props.address}></Link>
        </div>
    )
}

const Category = () => {
  return (
    <>
        <section className='categorySection'>
            <h2>Browse By Category</h2>
            <div className='categories'>            
               <CategoryItem title='Painting' address='/arts/painting' image={paintcolor} />
               <CategoryItem title='Photography' address='/arts/photography' image={mountain} />
               <CategoryItem title='Sculpture' address='/arts/sculpture' image={ganesh}  />
               <CategoryItem title='Drawing' address='/arts/drawing' image={sketch} />
               <CategoryItem title='Digital Art' address='/arts/digital' image={digital}  />
            </div>
        </section>
    </>
  )
}

export default Category;
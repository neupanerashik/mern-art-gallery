import React from 'react'
import { Link } from 'react-router-dom';

// import css
import './detail.css'

// import components
import Carousel from '../utility/carousel/carousel';

// dummy import
import images from '../../assets/images/images.js'

const Detail = () => {
  return (
    <>
      <div className='productDetailContainer'>
        <div className="firstRow">
          <Carousel data={images} />
          
          <div className="infoContainer">
            <h2>Product Name - Any Name</h2>
           
            <Link to='/'>Artist Name</Link>
           
            <div className='rating'>
              <div>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>
              <p>2 ratings</p>
            </div>
           
            <div className='description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A porro quisquam libero voluptatem quibusdam eos omnis itaque id ex ad! Unde fuga dignissimos vero omnis, ex nam corporis commodi. Explicabo!</div>
           
            <div className="price">Rs 200</div>

            <div className="buttons">
              <button><i className="fa-regular fa-heart"></i></button>
              <button><i className="fa-regular fa-star"></i></button>
              <button><i className="fa-solid fa-cart-shopping"></i></button>
              <button className='buyNowBtn'>Buy Now</button>
            </div>
          </div>
        </div>

        <div className="secondRow">
          <div className='reviews'>
              <h2>Reviews</h2>
              {
                [1, 2, 3, 4, 5].map((review, index) => {
                  return(
                    <div className='review' key={index}>
                      <div className="reviewer">
                        <img src="https://source.unsplash.com/1600x900/?face" alt="profile-pic" />

                        <div>
                          <div className='name'>Yogendra Rana</div>
                          
                          <div className='rating'>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                          </div>

                          <div className='date'>Nov 2, 2023</div>
                        </div>                                          
                      </div>

                      <div className='comment'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro odit accusantium aperiam, obcaecati, deserunt iste libero suscipit laudantium nemo totam veritatis quidem veniam ea.</div>
                    </div>
                  )
                })
              }
          </div>

        </div>
      </div>
    </>
  )
}

export default Detail
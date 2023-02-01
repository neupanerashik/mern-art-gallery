import React from 'react'

// import css
import './subscribe.css'

// import images
import paint from '../../../assets/images/paint.jpg'
import buddha from '../../../assets/images/buddha.jpg'


const Subscribe = () => {
  return (
    <>
        <section className='subscribeSection'>
            <div className="subscribeContainer">             
                <div>
                  <img src={buddha} alt="pic" />
                  <div>
                    <p> Why you should subscribe us ?</p>
                  </div>
                </div>
                
                <div>
                  <img src={paint} alt="pic" />
                  <div>
                    <h2>Subscribe Us</h2>
                    <p>Register to our newsletter and get <br/> notified about exciting deals!</p>
                    <input type="email" placeholder="your@email.com" required />
                    <button type='button'>Subscribe</button>
                  </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Subscribe
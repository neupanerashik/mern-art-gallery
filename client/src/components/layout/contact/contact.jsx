import React from 'react'

// import css
import './contact.css'

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

    return (
        <>
            <div className="contactContainer">
                <div className="heading">
                    <h2>Contact Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    <br/>incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className="content">
                    <div className="info">
                        <i className="fas fa-mobile-alt"></i>
                        <h4>PHONE </h4>
                        <p>+12457836913 , +12457836913</p>
                    </div>
                    {/* <div className="info">
                        <i className="far fa-envelope"></i>
                        <h4>EMAIL</h4>
                        <p>6743 last street , Abcd, Xyz</p>
                    </div> */}
                    <div className="info">
                        <i className="fas fa-map-marker-alt"></i> 
                        <h4>ADDRESS </h4>
                        <p>6743 last street , Abcd, Xyz</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Your Name</label> <br />
                        <input type="text" placeholder="John Doe" />
                    </div>

                    <div>
                        <label>Your Email</label> <br />
                        <input type="text" placeholder="example@emil.com" />
                    </div>

                    <div>
                        <label>Subject</label> <br />
                        <input type="text" placeholder="Optional" />
                    </div>

                    <div>
                        <label>Message</label> <br />
                        <textarea type="text" placeholder="Message..." />
                    </div>

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Contact
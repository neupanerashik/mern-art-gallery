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
                    <h2>Get in touch with us</h2>
                    <p>For more information about our product & Services. please feel free to drop us an
                    <br/>email. our staff always be there to help you out. do not hesitate!</p>
                </div>

                <div className="content">
                    <div className="info">
                        <i className="fas fa-mobile-alt"></i>
                        <h4>PHONE </h4>
                        <p>061-208924 , 061-462953</p>
                    </div>
                    <div className="info">
                        <i className="fas fa-map-marker-alt"></i> 
                        <h4>ADDRESS </h4>
                        <p>8th Street, Baidam-6, Pokhara</p>
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
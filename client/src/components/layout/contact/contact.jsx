import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

// import css and conponents
import './contact.css'
import Seo from '../../seo/seo'

const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!name || !email || !message) {return toast.warn("Fill all the required fields!")}
        try {   
            const { data, status } = await axios.post('/api/v1/send/email', {name, email, subject, message}, {headers: {'Content-Type': 'application/json'}});
            if (status >= 300) {throw new Error(data);};
            if (data.success) {
                toast.success(data.message);
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            } else {
                toast.error(data.message);
            } 
        } catch (err) {
            return toast.error(err.response.data.message);
        }
    }

    return (
        <>
            <Seo title="Contact Page"  description="Contact page of the website." />
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
                        <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <label>Your Email</label> <br />
                        <input type="text" placeholder="example@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label>Subject</label> <br />
                        <input type="text" placeholder="Optional" value={subject} onChange={e => setSubject(e.target.value)} />
                    </div>

                    <div>
                        <label>Message</label> <br />
                        <textarea type="text" placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)}/>
                    </div>

                    <button type='submit'>Send</button>
                </form>
            </div>
        </>
    )
}

export default Contact
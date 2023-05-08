import React from "react";

// import css
import "./about.css";
import aboutImage from '../../../assets/images/frame.jpg';


const About = () => {
    const aboutStyle = {
        backgroundImage: `url(${aboutImage})`,
        backgroundSize: 'cover',
        backgroundPosition: "center",
        backgroundRepeat: 'no-repeat',
    }

    return (
        <div className="aboutContainer">
            <div className="aboutBanner" style={aboutStyle}>
                <h1>About Us</h1>
                <p>
                “VisArt: Visual Art Market” is a web application platform with an
                objective to provide a wide range 
                <br />
                of  high-quality photographs, pictures, drawings, sculptures and crafts
                that meet the needs of a diverse audience
                </p>
            </div>

            <div className="missions">
                <h1>Our Mission</h1>

                <p>
                We also To fill the gap between artists and buyers in the Nepali market using online platform.
                </p>
                <br/>

                <p>
                Our mission is also create a commercial web platform where artists can showcase their work and monetize them.
                </p>
                <br/>
                
                <p>
                Our mission is to create a web platform where visual artists can
                showcase their work and monetize their content and also to make it possible for the users to browse the available
                artworks, pay and download or order the artwork.
                </p>                
            </div>

            <div className="services">
                <h1>Our Services</h1>
                <div>
                    <div>
                        <i className="fa-solid fa-dolly"></i>
                        <h1>Free Shipping</h1>
                        <p>on orders above NRs. 1000</p>
                    </div>

                    <div>
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                        <h1>Return Guarantee</h1>
                        <p>within 30 days</p>
                    </div>

                    <div>
                        <i className="fa-solid fa-phone-volume"></i>
                        <h1>24/7 Support</h1>
                        <p>anytime you need</p>
                    </div>

                    <div>
                        <i className="fa-solid fa-file-shield"></i>
                        <h1>Secure Payment</h1>
                        <p>fast & safe checkout</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
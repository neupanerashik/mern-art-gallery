import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// import css and components
import './profile.css'
import Seo from '../../seo/seo.jsx'

// import dummy image
import buddha from '../../../assets/images/buddha.jpg'
import MyDetail from './myDetail.jsx'
import MyWorks from './myWorks'
import MyLikes from './myLikes'
import Upload from './upload'

const allMenu = ["My Works", "My Likes", "My Detail", "Upload"] 

const Profile = () => {
    const [menu, setMenu] = useState(allMenu[0]);
    const menuRef = useRef(null)

    // scroll to products
    const handleScroll = (mnu) => {
        menuRef.current.scrollIntoView({ behavior: 'smooth' });
        setMenu(mnu)
    };

    return (
        <>
            <Seo title="Profile" description="Profile page of user." />

            <section className='profileSection'>
                <div className="profileCard">
                    <div className="avatar">
                        <img src={buddha} alt="profilePic" />
                    </div>
                    <div className="name">
                        <h2>Yogendra Rana</h2>
                        <p>Painter</p>
                        <p>yogendrarana9595@gmail.com</p>
                    </div>
                    <div className="social">
                        <Link to="#"><i className="fa-brands fa-facebook facebook"></i></Link>
                        <Link to="#"><i className="fa-brands fa-instagram instagram"></i></Link>
                        <Link to="#"><i className="fa-brands fa-twitter twitter"></i></Link>
                    </div>
                    <div className="buttons">
                        <button>Hire</button>
                        <button>Donate</button>
                    </div>
                </div>
                <div className="profileOptions" ref={menuRef}>
                    <ul>
                        {
                            allMenu.map((mn, index) => {
                                return <li key={index} onClick={() => handleScroll(mn)} style={{borderBottom: mn === menu ? "1px solid black" : ""}}>{mn}</li>
                            })
                        }
                    </ul>
                    
                    <div className="options">
                        {menu === "My Works" && <MyWorks />}
                        {menu === "My Likes" && < MyLikes />}
                        {menu === "My Detail" && <MyDetail />}
                        {menu === "Upload" && <Upload />}
                    </div>
                </div>
                
            </section>
        </>
    )
}

export default Profile;
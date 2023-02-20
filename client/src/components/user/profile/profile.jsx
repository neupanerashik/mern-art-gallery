import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector}  from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// import css and components
import './profile.css'
import Seo from '../../seo/seo.jsx'
import Detail from './detail'
import Artworks from './artworks'
import MyLikes from './likes'
import Upload from './upload'
import Spinner from '../../utility/spinner/spinner'
import { toast } from 'react-toastify'
import { clearError, clearMessage, updateAvatar } from '../../../redux/profileSlice'
import { getUserProfile } from '../../../redux/userSlice'

const allMenu = ["Artworks", "Likes", "Detail", "Upload"] 

const Profile = () => {
    const {id} = useParams()
    const menuRef = useRef(null)
    const dispatch = useDispatch();
    const {myData} = useSelector(state => state.user);
    const {message, error, isLoading} = useSelector(state => state.profile);

    const [menu, setMenu] = useState(allMenu[0]);
    const [avatar, setAvatar] = useState(myData?.avatar?.url || "");

    // scroll to products
    const handleScroll = (mnu) => {
        menuRef.current.scrollIntoView({ behavior: 'smooth' });
        setMenu(mnu);
    };

    const handleAvatarChange = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = async () => {
            if(reader.DONE) {
                setAvatar(reader.result);
                dispatch(updateAvatar({ avatar: reader.result }));
            }
        }
    }

    useEffect(() => {
        dispatch(getUserProfile(id));

        if(message){
            toast.success(message);
            dispatch(clearMessage());
        }
    
        if(error){
            toast.error(error);
            dispatch(clearError());
        }

    }, [dispatch, error, message, id]);

    return (
        <>
            <Seo title={`Profile of ${myData.name}`} description="Profile page of user." />

            <section className='profileSection'>
                <div className="profileCard">
                    <div className="avatar">
                        <label htmlFor='avatar'>
                            {isLoading ? <Spinner /> : (
                                <>
                                    <i className="fa-solid fa-plus"></i>
                                    <input id="avatar" type="file" name='avatar' accept='image/*' onChange={handleAvatarChange}/>
                                </>
                            )}
                        </label>
                        {avatar!== "" && <img src={avatar} alt='avatar' />}
                        {avatar === "" && <p>{myData.name[0]}</p>}
                    </div>
                    <div className="name">
                        <h2>{myData?.name}</h2>
                        <p>{myData?.role}</p>
                        <p>{myData?.email}</p>
                    </div>
                    {myData.socials && 
                        <div className="social">
                            {myData.socials.facebook !== '' &&
                                <a href={`https://facebook.com/${myData.socials.facebook}`} target='_blank' rel="noopener noreferrer">
                                    <i className="fa-brands fa-facebook facebook"></i>
                                </a>
                            }

                            {myData.socials.instagram !== '' &&
                                <a href={`https://instagram.com/${myData.socials.instagram}`} target='_blank' rel="noopener noreferrer">
                                    <i className="fa-brands fa-instagram instagram"></i>
                                </a>
                            }

                            {myData.socials.twitter !== '' &&
                                <a href={`https://twitter.com/${myData.socials.twitter}`} target='_blank' rel="noopener noreferrer">
                                    <i className="fa-brands fa-twitter twitter"></i>
                                </a>
                            }
                        </div>
                    }
                    <div className="buttons">
                        <button>Hire</button>
                        <button>Donate</button>
                        {/* <button onClick={handleAvatarSave}>Save</button> */}
                    </div>
                </div>
                <div className="profileOptions" ref={menuRef}>
                    <ul>
                        {
                        allMenu.map((mn, index) => {
                            if ((mn === 'Upload' || 'Artworks') && myData.role === 'user') { return null }

                            return (
                                <li key={index} onClick={() => handleScroll(mn)} style={{ borderBottom: mn === menu ? "1px solid black" : "" }}>
                                    {mn}
                                </li>
                            );
                        })}
                    </ul>
                    
                    <div className="options">
                        {menu === "Artworks" && <Artworks />}
                        {menu === "Likes" && < MyLikes />}
                        {menu === "Detail" && <Detail />}
                        {menu === "Upload" && <Upload />}
                    </div>
                </div>
                
            </section>
        </>
    )
}

export default Profile;
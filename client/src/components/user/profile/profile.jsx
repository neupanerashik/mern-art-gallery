import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector}  from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearError, clearMessage, updateAvatar } from '../../../redux/profileSlice'
import { getUserProfile } from '../../../redux/profileSlice'

// import css and components
import './profile.css'
import ArtList from './artList/artList'
import Detail from './detail/detail'
import Likes from './likes/likes'
import Upload from './upload/upload'
import Seo from '../../seo/seo'
import Spinner from '../../utility/spinner/spinner'

const allMenu = ["Artworks", "Likes", "Detail", "Upload"] 

const Profile = () => {
    const {id} = useParams()
    const menuRef = useRef(null)
    const dispatch = useDispatch();
    const {myData} = useSelector(state => state.user);
    const {userData, message, error, isLoading} = useSelector(state => state.profile);

    const [menu, setMenu] = useState(allMenu[0]);

    // scroll to top
    const handleScroll = (mnu) => {
        menuRef.current.scrollIntoView({ behavior: 'smooth' });
        setMenu(mnu);
    };

    const handleAvatarChange = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = async () => {
            if(reader.readyState === 2) {
                dispatch(updateAvatar({ avatar: reader.result }));
            }
        }
    }

    useEffect(() => {
        dispatch(getUserProfile(id))

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
            <Seo title={`Profile of ${userData?.name}`} description="Profile page of user." />

            <section className='profileSection'>
                <div className="profileCard">
                    <div className="avatar">
                        {myData && userData._id === myData._id && 
                            <label htmlFor='avatar'>
                                {isLoading ? <Spinner /> : (
                                    <>
                                        <i className="fa-solid fa-plus"></i>
                                        <input id="avatar" type="file" name='avatar' accept='image/*' onChange={handleAvatarChange}/>
                                    </>
                                )}
                            </label>
                        }
                        {userData && userData.avatar && userData.avatar.url !== "" && <img src={userData.avatar.url} alt='avatar' />}
                        {userData && !userData.avatar && userData.name && Object.keys(userData).length !== 0 && <p>{userData.name[0]}</p>}

                    </div>

                    <div className="name">
                        {userData && (
                            <>
                                <h2>{userData.name}</h2>
                                <p>{userData.role}</p>
                                <p>{userData.email}</p>
                            </>
                        )}
                    </div>

                    {userData.socials && 
                        <div className="social">
                            {userData.socials.facebook !== '' &&
                                <a href={`https://facebook.com/${userData.socials.facebook}`} target='_blank' rel="noopener noreferrer">
                                    <i className="fa-brands fa-facebook facebook"></i>
                                </a>
                            }

                            {userData.socials.instagram !== '' &&
                                <a href={`https://instagram.com/${userData.socials.instagram}`} target='_blank' rel="noopener noreferrer">
                                    <i className="fa-brands fa-instagram instagram"></i>
                                </a>
                            }

                            {userData.socials.twitter !== '' &&
                                <a href={`https://twitter.com/${userData.socials.twitter}`} target='_blank' rel="noopener noreferrer">
                                    <i className="fa-brands fa-twitter twitter"></i>
                                </a>
                            }
                        </div>
                    }

                    <div className="buttons">
                        {userData._id !== myData?._id && <button>Hire</button>}
                        {userData._id !== myData?._id && <button>Donate</button>}
                    </div>
                </div>
                <div className="profileOptions" ref={menuRef}>
                    <ul>
                        {allMenu.map((mn, index) => {
                            if ((mn === 'Artwork' || mn === 'Upload') && userData.role === 'user') { return null }
                            if ((mn === 'Likes' || mn === 'Detail' || mn === "Upload") && (myData === null || userData._id !== myData._id)) { return null }                           

                            return (
                                <li key={index} onClick={() => handleScroll(mn)} style={{ borderBottom: mn === menu ? "1px solid black" : "" }}>
                                    {mn}
                                </li>
                            );
                        })}
                    </ul>
                    
                    <div className="options">
                        {/* {menu === "Artworks" && <Artworks />} */}
                        {menu === "Artworks" && <ArtList />}

                        {myData && userData._id === myData._id && menu === "Likes" && <Likes />}
                        {myData && userData._id === myData._id && menu === "Detail" && <Detail />}
                        {myData && userData._id === myData._id && menu === "Upload" && <Upload />}
                    </div>
                </div>
                
            </section>
        </>
    )
}

export default Profile;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserArtworks, getUserProfile } from '../../../redux/profileSlice';

// import css and components
import './artworks.css'
import Seo from '../../seo/seo';
import Card from '../../utility/card/card'
import { useParams } from 'react-router-dom';

const Artworks = () => {
    const {id} = useParams()
    const dispatch = useDispatch();
    const {userData = {}, userArtworks = []} = useSelector(state => state.profile);
    const {myData = {}} = useSelector(state => state.user);

    useEffect(() => {
        // dispatch(getUserProfile(id))
        dispatch(getUserArtworks(id))
    }, [dispatch, id]);

    return (
        <>
            <Seo description="Page for demonstrating works of an artist." />

            <div className="artworksContainer">
                {userArtworks && userArtworks[0] &&
                    <div className="arts">     
                        {
                            userArtworks.map((art, index) => {
                                return(
                                    <Card key={index} art={art} style={{height: '30rem'}} />
                                )
                            })
                        } 
                    </div>
                }

                {userData && userData._id && myData && myData._id && (userArtworks.length === 0) && (userData._id === myData._id) ?
                    <div className="noArts">{(userData.name).charAt(0).toUpperCase() + (userData.name || '').slice(1)} has not uploaded any works yet!</div>
                    :
                    null
                }
            </div> 
        </>
    );
}
export default Artworks;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyArtworks } from '../../../redux/profileSlice';

// import css and components
import './artworks.css'
import Seo from '../../seo/seo';
import Card from '../../utility/card/card'

const Artworks = () => {
    const dispatch = useDispatch();
    const { myArtworks} = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getMyArtworks());
    }, [dispatch]);

    return (
        <>
            <Seo description="Page for demonstrating works of an artist." />

            <div className="artworksContainer">
                {myArtworks && myArtworks[0] &&
                    <div className="arts">     
                        {
                            myArtworks.map((art, index) => {
                                return(
                                    <Card key={index} art={art} style={{height: '30rem'}} />
                                )
                            })
                        } 
                    </div>
                }

                {!myArtworks[0] && <div className="noArts">You have not uploaded any works yet!</div>}
            </div> 
        </>
    );
}
export default Artworks;
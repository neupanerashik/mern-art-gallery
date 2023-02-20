import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { addToLikes, readArtwork } from '../../redux/artSlice';


// import css and components
import './detail.css'
import Carousel from '../utility/carousel/carousel';
import { toast } from 'react-toastify';
import Reviews from './reviews';

const Detail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasLiked, setHasLiked] = useState(false);
  const {artwork} = useSelector(state => state.art);
  const {cartItems} = useSelector(state => state.cart);
  const {myData, isAuthenticated} = useSelector(state => state.user);


  // handle add to cart
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: artwork._id, 
      name: artwork.name, 
      price: artwork.price, 
      category: artwork.category, 
      image: artwork.images[0].url
    }))
  }

  // handle add to likes
  const handleAddToLikes = () => {
    if(!isAuthenticated) {
      toast.warn("Please, log in first to like the arts!")
      return navigate('/login')
    }

    if(hasLiked) {toast.warn("Already Liked!")}
		dispatch(addToLikes({
      artId: artwork._id, 
      artName: artwork.name, 
      artPrice: artwork.price, 
      artCategory: artwork.category, 
      artImage: artwork.images[0].url
    }));
	}

  useEffect(() => {
    dispatch(readArtwork(id))
  }, [dispatch, id])

  useEffect(() => {
    if (myData && myData.likes && artwork && artwork._id) {
      const foundLike = myData.likes.find(item => item.artId.toString() === artwork._id.toString());
      setHasLiked(foundLike !== undefined);
    }
  }, [myData, artwork]);
  
  return (
    <>
      <div className='productDetailContainer'>
        <div className="firstRow">
          <Carousel images={artwork.images}/>
          
          <div className="infoContainer">
            <h2>{artwork.name}</h2>
           
            <Link to={`/profile/${artwork.creator}`}>Creator Profile</Link>
           
            <div className='rating'>
              <div>
              {
                [1, 2, 3, 4, 5].map((val, index) => {
                  return(
                    <i key={index} className={val <= artwork.averageRating ? "fas fa-star" : "far fa-star"} aria-hidden='true' />
                  )		
                })
              }
              </div>
              <div>{artwork?.reviews?.length} reviews</div>
              {(artwork?.discount > 0) && <div>{artwork.discount} % discount</div>}
            </div>
           
            <div className='description'>{artwork.description}</div>
           
            <div className="price">Rs {artwork.price}</div>

            <div className="buttons">
              <button disabled={myData?._id === artwork.creator} onClick={handleAddToLikes} className={hasLiked ? "liked" : ""}>
                <i className="fa-regular fa-heart"></i>
              </button>
              <button onClick={handleAddToCart}>
                <i className={cartItems.find(item => item.id === artwork._id) ? "fa fa-check" : "fa-solid fa-cart-shopping"} aria-hidden="true"></i>
              </button>
            </div>

          </div>
        </div>

        <div className="secondRow">
          <Reviews />
        </div>
      </div>
    </>
  )
}

export default Detail
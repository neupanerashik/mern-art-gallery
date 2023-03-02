import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import { addToLikes } from '../../../redux/artSlice';
import { clearError as clearProfileError, clearMessage as clearProfileMessage } from '../../../redux/profileSlice';

// import css and components
import './card.css'

const Card = ({art, title, style}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasLiked, setHasLiked] = useState(false);
  const {cartItems} = useSelector(state => state.cart);
  const {myData, isAuthenticated} = useSelector(state => state.user);
  const {error: profileError, message: profileMessage} = useSelector(state => state.profile);

  // handle add to cart
  const handleAddToCart = (art) => {dispatch(addToCart({id: art._id, name: art.name, price: art.price, category: art.category, image: art.images[0].url}))}

  // handle add to likes
  const handleAddToLikes = () => {
    if(!isAuthenticated) {
      toast.warn("Please, log in first to like the arts!")
      return navigate('/login')
    }

    if(hasLiked) {toast.warn("Already Liked!")}
		dispatch(addToLikes({artId: art._id, artName: art.name, artPrice: art.price, artCategory: art.category, artImage: art.images[0].url}));
	}

  // useEffect
  useEffect(() => {
    if (myData && myData.likes) {
      const foundLike = myData.likes.find(item => item.artId.toString() === art._id.toString());
      setHasLiked(foundLike !== undefined);
    }
  }, [myData, art._id]);

  // useEffect
  useEffect(() => {
    if(profileMessage){
      toast.success(profileMessage);
      clearProfileMessage();
    }

    if(profileError){
      toast.error(profileError);
      clearProfileError();
    }
  }, [profileError, profileMessage])

  return (
    <div className="cardContainer" style={style}>
      <div className='itemImage'>
        <img src={art.images[0].url} alt='itemPic' />
      </div>

      <div className='itemInfo'>
        <p>{art.name}</p>
        <p>Rs {art.price} {title === "Special Offers" && <span>(-{art.discount}%)</span>}</p>
      </div>

      <div className="itemButtons">

        {
          myData?._id !== art.creator && (
            <button disabled={myData?._id === art.creator} onClick={() => handleAddToCart(art)}>
              <i className={cartItems.find(item => item.id === art._id) ? "fa fa-check" : "fa-solid fa-cart-shopping"} aria-hidden="true"></i>
              <span>{cartItems.find(item => item.id === art._id) ? "Added To Cart" : "Add To Cart"}</span>
            </button>
          )
        }

        <button onClick={() => navigate(`/art/${art._id}`)}>
          <i className="fa-regular fa-eye"></i>
          <span>View</span>
        </button>

        
        <button onClick={handleAddToLikes} className={hasLiked ? "liked" : ""}>
          <i className={hasLiked ? "fa-solid fa-check" : "fa-regular fa-heart"}></i>
          <span>{hasLiked ? "Liked" : "Like"}</span>
        </button>
      </div>
    </div>
  )
}

export default Card
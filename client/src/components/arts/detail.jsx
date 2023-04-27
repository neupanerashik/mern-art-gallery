import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { placeBid, clearError as clearAuctionError, clearMessage as clearAuctionMessage, findHighestBidder } from '../../redux/auctionSlice';
import { addToLikes, readArtwork } from '../../redux/artSlice';
import { toast } from 'react-toastify';

// import css and components
import './detail.css'
import Carousel from '../utility/carousel/carousel';
import Timer from '../utility/timer/timer';
import Reviews from './reviews';
import Share from '../dialogs/share/share';

const Detail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasLiked, setHasLiked] = useState(false);
  const [bidAmount, setBidAmount] = useState('')
  const [highestBid, setHighestBid] = useState({})
  const [timerEnded, setTimerEnded] = useState(false);

  const {artwork} = useSelector(state => state.art);
  const {cartItems} = useSelector(state => state.cart);
  const {myData, isAuthenticated} = useSelector(state => state.user);
  const {message: auctionMessage, error: auctionError} = useSelector(state => state.auction);

  
  // handle add to cart
  const handleAddToCart = () => {
    if(artwork?.artStatus === 'sold'){
      toast.warn('The artwork is already sold.')
      return;
    }

    dispatch(addToCart({
        artId: artwork._id, 
        artName: artwork.name, 
        artPrice: artwork.price, 
        artCategory: artwork.category, 
        artImage: artwork.images[0].original_image_url,
        artCreator: artwork.creator,
      })
    )
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
      artImage: artwork.images[0].original_image_url
    }));
	}

  // handle place bid
  const handlePlaceBid = (e) => {
    e.preventDefault();

    // disable when time ends
    if(timerEnded){
      toast.warn('The time of the auction has already ended!');
      return;
    }

    if(bidAmount <= artwork?.estimatedValueFrom) return toast.warning(`The bidding price should be bigger than the lower estimated value of Rs ${artwork?.estimatedValueFrom}`);
    dispatch(placeBid({bidAmount, artId: artwork?._id, bidder: myData?._id})).then(() => dispatch(readArtwork(id)))
    setBidAmount('');
  }

  // handle timer end
  const handleTimerEnd = (artId) => {
    setTimerEnded(true);
    dispatch(findHighestBidder(artId));
  };


  useEffect(() => {
    dispatch(readArtwork(id))
  }, [dispatch, id])


  useEffect(() => {
    if (myData && myData.likes && artwork && artwork._id) {
      const foundLike = myData.likes.find(item => item.artId.toString() === artwork._id.toString());
      setHasLiked(foundLike !== undefined);
    }

    if(artwork && artwork.bids){
        const highestBid = artwork.bids.reduce((prevBid, currBid) => {return (prevBid.bidAmount > currBid.bidAmount) ? prevBid : currBid}, {});
        setHighestBid(highestBid)
    }
  }, [myData, artwork]);


  useEffect(() => {
    if(auctionMessage){
      toast.success(auctionMessage);
      dispatch(clearAuctionMessage());
    }

    if(auctionError){
      toast.error(auctionError);
      dispatch(clearAuctionError());
    }

    return () => {
      dispatch(clearAuctionMessage());
      dispatch(clearAuctionError());
    };
  }, [dispatch, auctionMessage, auctionError])

  
  return (
    <>
      <div className='productDetailContainer'>
        <div className="firstRow">
          <div className='carousel'>
            <Carousel images={artwork?.images}/>
          </div>
          
          <div className="infoContainer">
            <h2>{artwork.name} {artwork?.artStatus === 'sold' && <span>(Sold)</span>}</h2>
           
            <Link to={`/user/${artwork?.creator}`}>Creator Profile</Link>
           
            <div className='rating'>
              <div>
              {
                [1, 2, 3, 4, 5].map((val, index) => {
                  return(
                    <i key={index} className={val <= artwork?.averageRating ? "fas fa-star" : "far fa-star"} aria-hidden='true' />
                  )		
                })
              }
              </div>
              <div>{artwork?.reviews?.length} reviews</div>
              {(artwork?.discount > 0) && <div>{artwork.discount} % discount</div>}
              {artwork?.isAuctionItem && <div>Auction Item</div>}
            </div>
           
            <div className='description'>{artwork.description}</div>

            <div className="buttons">
              {artwork?.isAuctionItem && <div className='price'>Top Bid: {artwork?.bids?.length ? `Rs ${highestBid.bidAmount}` : "No bids"}</div>}
              
              {!artwork?.isAuctionItem && <div className='price'>Rs {artwork.price}</div>}

              <button disabled={myData?._id === artwork.creator} onClick={handleAddToLikes} className={hasLiked ? "liked" : ""}>
                <i className="fa-regular fa-heart"></i>
              </button>

              {
                !artwork?.isAuctionItem && 
                <button onClick={handleAddToCart}>
                  <i className={cartItems.find(item => item.artId === artwork._id) ? "fa fa-check" : "fa-solid fa-cart-shopping"} aria-hidden="true"></i>
                </button>
              }

              <Share />
            </div>

            {artwork && artwork.isAuctionItem && 
              <div className='auctionInfo'>
                <h2>Auction Informations</h2>

                <div className='option'>
                  <div>Auction Ends In</div>
                  <div>
                    {artwork && artwork.endDate && <Timer endDate={artwork.endDate} artwork={artwork} handleTimerEnd={handleTimerEnd} />}
                  </div>
                </div>

                <div className='option'>
                  <div>Estimated Value</div>
                  <div>
                    <p>Rs {artwork?.estimatedValueFrom} - {artwork?.estimatedValueTo}</p>
                  </div>
                </div>

                <div className='option'>
                  <div>Current Bid</div>
                  <div>
                    <p>{artwork?.bids?.length ? `Rs ${highestBid.bidAmount}` : "No bids"}</p>
                    <p>{artwork?.bids?.length} {artwork?.bids?.length === 1 ? 'bid' : 'bids'}</p>
                  </div>
                </div>

                <form onSubmit={handlePlaceBid}>
                  <input type='number' autoComplete='off' placeholder='Bidding Amount' value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} required />
                  <button type='submit'>Place Bid</button>
                </form>
              </div>
            }
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
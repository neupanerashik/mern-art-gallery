import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getReviews } from '../../redux/artSlice.js'
import ReviewDialog from '../dialogs/review/reviewDialog.jsx'

// import css
import './reviews.css'

function ReviewBar({title, style}){
    return(
        <div className="reviewBar">
            <div className="starsTitle">{title}</div>
            <div className="ratingGraph">
                <div className="percentageBar" style={style}></div>
            </div>
        </div>
    )
}

const Reviews = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const {myData} = useSelector(state => state.user);
    const {allReviews} = useSelector(state => state.art);

    // get request
    useEffect(() => {
        dispatch(getReviews(id))
    }, [dispatch, id])

    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const ratingPercentages = { 1: "0%", 2: "0%", 3: "0%", 4: "0%", 5: "0%" };

    let sortedReviews = [];

    if (allReviews && allReviews.reviews) {
        // Sort the reviews
        sortedReviews = sortReviews(allReviews.reviews, myData?._id);

        // Count the ratings
        sortedReviews.reduce((acc, curr) => {
            acc[curr.rating]++;
            return acc;
        }, ratingCounts);

        const totalReviews = sortedReviews.length;

        for (const [rating, count] of Object.entries(ratingCounts)) {
            const percentage = count / totalReviews * 100;
            ratingPercentages[rating] = percentage.toFixed(2) + "%";
        }
    }
  
    function sortReviews(reviews, currentUserId) {
        let sortedReviews = [];
        let currentUserReview = null;

        for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i];
            if (review.reviewerId.toString() === currentUserId?.toString()) {
                currentUserReview = review;
            } else {
                sortedReviews.push(review);
            }
        }

        if (currentUserReview) {
            sortedReviews.unshift(currentUserReview);
        }

        return sortedReviews;
    }
   
    return (
        <>
            <div className='reviewsContainer'>
                <h2>Reviews</h2>

                <div className='reviewSummary'>
                    <div className='summary one'>
                        <p>{allReviews && allReviews.averageRating && (allReviews.averageRating).toFixed(1)}</p>
                        <p>{allReviews?.reviews?.length} reviews</p>
                        <ReviewDialog />
                    </div>

                    <div className="summary two">			
					   <ReviewBar title="5 Stars" style={{width: ratingPercentages[5]}} />
					   <ReviewBar title="4 Stars" style={{width: ratingPercentages[4]}} />
					   <ReviewBar title="3 Stars" style={{width: ratingPercentages[3]}} />
					   <ReviewBar title="2 Stars" style={{width: ratingPercentages[2]}} />
					   <ReviewBar title="1 Star" style={{width:ratingPercentages[1]}} />
                    </div>
                </div>

                <div className="reviews">
                    {
                        allReviews && sortedReviews.map((review, index) => {
                            return(
                            <div className='review' key={index}>
                                <div className="reviewer">
                                    <div className='name'>{review.reviewerName}</div>
                                    
                                    <div className='rating'>
                                        {
                                            [1, 2, 3, 4, 5].map((val, index) => {
                                                return(
                                                <i key={index} className={val <= review.rating ? "fas fa-star" : "far fa-star"} aria-hidden='true' />
                                                )		
                                            })
                                        }
                                    </div>

                                    <div className='date'>{moment(review.reviewedOn).format('YYYY-MM-DD')}</div>
                                </div>

                                <div className='comment'>{review.comment}</div>
                            </div>
                            )
                        })
                    }
                </div>
                
            </div>
        </>
    )
}

export default Reviews;
import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, clearMessage, createReview, getReviews, readArtwork } from '../../../redux/artSlice.js';


// import css
import './reviewDialog.css'

export default function ReviewDialog() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');
    const [openReviewDialog, setOpenReviewDialog] = useState(false);
    const {error, message} = useSelector(state => state.art)

    const handleClickOpen = () => {setOpenReviewDialog(true)};
    const handleClose = () => {setOpenReviewDialog(false)};

    const handleReviewSubmit = () => {
		if(rating === null && comment === ''){return toast.warn('Please, provide both the rating and comment.')}
		dispatch(createReview({rating, comment, id})).then(() => {dispatch(readArtwork(id))}).then(() => {dispatch(getReviews(id))});
        handleClose();
	}

    useEffect(() => {
        if(message){
			toast.success(message);
			dispatch(clearMessage());
		}

        if(error){
			toast.error(error);
			dispatch(clearError());
		}
    }, [error, message, dispatch])

    return (
        <>
            <button variant="outlined" onClick={handleClickOpen}>Write a Review</button>
            
            <Dialog open={openReviewDialog} onClose={handleClose} className="reviewDialogContainer">
                <div className='reviewDialogContent'>
                    <h2>Your review</h2>
                    
                    <div className="rating">
                        {
                            [1, 2, 3, 4, 5].map((val, index) => {
                                return(
                                    <i key={index} className={val <= rating ? "fas fa-star" : "far fa-star"} onClick={() => setRating(val)} aria-hidden='true' />
                                )		
                            })
                        }
                    </div>
                  
                    <textarea placeholder="Please, write your review..." value={comment} onChange={e => setComment(e.target.value)}></textarea>
                   
                    <div className='buttons'>
                        <button onClick={handleReviewSubmit}>Submit</button>
                    </div>
                </div>   
            </Dialog>
        </>
    );
}

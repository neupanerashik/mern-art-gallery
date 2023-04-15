import { useState } from 'react';
import { Dialog } from '@mui/material'
import { FacebookShareButton, TwitterShareButton, EmailShareButton, RedditShareButton, TelegramShareButton} from 'react-share'


//import css
import './share.css'

const Share = () => {
    const [openReviewDialog, setOpenReviewDialog] = useState(false);

    const handleClickOpen = () => {setOpenReviewDialog(true)};
    const handleClose = () => {setOpenReviewDialog(false)};

	let url = window.location.href;

	return (
        <>
            <button variant="outlined" onClick={handleClickOpen}><i className="fa-solid fa-share"></i></button>

            <Dialog  open={openReviewDialog} onClose={handleClose} className="shareDialog">			
                <div className="socialLinks">
                    <FacebookShareButton url={url} className="icon facebook">
                        <span><i className="fab fa-facebook-f"></i></span>
                    </FacebookShareButton>
                    
                    <TwitterShareButton url={url} className="icon twitter">
                        <span><i className="fab fa-twitter"></i></span>
                    </TwitterShareButton>

                    <TelegramShareButton url={url} className="icon telegram">
                        <span><i className="fa-brands fa-telegram"></i></span>
                    </TelegramShareButton>

                    <RedditShareButton url={url} className="icon reddit">
                        <span><i className="fa-brands fa-reddit"></i></span>
                    </RedditShareButton>
                    
                    <EmailShareButton url={url} className="icon mail">
                        <span><i className="fas fa-envelope"></i></span>
                    </EmailShareButton>
                </div>
            </Dialog>
        </>
	)
}

export default Share;
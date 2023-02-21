import { useState } from 'react'


// import css and components
import './chatDialog.css'
import Message from './message';
import Dialog from '@mui/material/Dialog';

export default function ChatDialog() {
    const [openReviewDialog, setOpenReviewDialog] = useState(false);
	const [newMessage, setNewMessage] = useState('');

    const handleClickOpen = () => {setOpenReviewDialog(true)};
    const handleClose = () => {setOpenReviewDialog(false)};

    const handleMessageSend = () => {
		console.log("elll");
	}


    return (
        <>
            <button variant="outlined" onClick={handleClickOpen}><i className="fa-regular fa-comment"></i></button>
            
            <Dialog className="chatDialogContainer" open={openReviewDialog} onClose={handleClose} BackdropProps={{ invisible: true }}> {/* BackdropProps={{ invisible: true }} */}
				<div className='chatBox'>
					<div className='chatHeading'>
						<div>
							<img src="" alt='pic' />
							<span>User Name</span>
						</div>

						<i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
					</div>

					<div className='chatFeed' id='chatFeed'>
						{/* {(currentChat === null) && <div className='no-chat'>Please click on one of the chats to send message.</div>}
						{(currentChat !== null && !currentMessages.length && !getChatLoading) && <div className='no-message'>No messages yet. Please start typing your message...</div>} */}
						
						{/* {
							currentMessages.map((msg, index) => {
								return <Message key={index} msg={msg} />
							})
						} */}

						<Message msg="Hello" />
						<Message msg="Hi" />
						<Message msg="How are you?" />
						<Message msg="How are you?" />
						<Message msg="How are you?" />
						<Message msg="How are you?" />
						<Message msg="How are you?" />


					</div>

					<div className='chatInput'>
						<input type='text' placeholder='Message...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
						<button className='send-btn' onClick={handleMessageSend}><i className="fa-solid fa-paper-plane"></i></button>
					</div>
				</div>  
            </Dialog>
        </>
    );
}

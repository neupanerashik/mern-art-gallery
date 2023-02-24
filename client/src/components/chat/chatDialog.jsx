import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { io }  from 'socket.io-client'
import { getMyChats } from '../../redux/userSlice';
import { getChatMessages, sendMessage } from '../../redux/chatSlice';

// import css and components
import './chatDialog.css'
import "swiper/css";
import Message from './message';
import Dialog from '@mui/material/Dialog';
import Participant from './participant';

export default function ChatDialog() {
	const socket = useRef();
	const dispatch = useDispatch();
	const [newText, setNewText] = useState('');
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [currentChatMessages, setCurrentChatMessages] = useState([]);

    const [openReviewDialog, setOpenReviewDialog] = useState(false);

	const {myData, chats, isAuthenticated} = useSelector(state => state.user);
	const {chatMessages} = useSelector(state => state.chat);

    const handleClickOpen = () => {setOpenReviewDialog(true)};
    const handleClose = () => {setOpenReviewDialog(false)};
	
	// get messages of specific chat
	useEffect(() =>{
		const getCurrentChatMessages = () => {
			if(currentChat === null) return;
			dispatch(getChatMessages(currentChat?._id));
			setCurrentChatMessages(chatMessages);
		};

		getCurrentChatMessages();
	}, [currentChat, chatMessages, dispatch]);

	// socket get message
	useEffect(() => {
		socket.current = io('http://localhost:8800');
		socket.current.on('getMessage', ({chatId, sender, receiver, text}) => {
				setArrivalMessage({chatId, sender, receiver, text});
		});
	}, []);
	
	// get my chats
	useEffect(() => {
		if (myData?._id) {dispatch(getMyChats(myData._id))}
	}, [dispatch, myData?._id]);
	  

	// socket add and get online user
	useEffect(() => {
		socket.current.emit('addOnlineUser', myData?._id);
		socket.current.on('getOnlineUsers', (onlineUsers) => {setOnlineUsers(onlineUsers)})
	}, [myData]);


	// arrival message
	useEffect(() => {
		if (arrivalMessage && currentChat) {
			if (currentChat.participants.includes(arrivalMessage.sender)) {setCurrentChatMessages(prev => [...prev, arrivalMessage]);}
		}
	}, [arrivalMessage, currentChat]);
	  
	  

	// handling the message send
	const handleSendMessage = async (e) => {
		e.preventDefault();

		// send message to socket io
		const sender = myData._id;
		const receiver = currentChat.participants.find(id => id !== myData._id);
		const message = {chatId: currentChat._id, sender, receiver, text: newText}
		socket.current.emit('sendMessage', message);
		
		// send message to backend
		dispatch(sendMessage(message));

		setCurrentChatMessages([...currentChatMessages, newText])
		setNewText('');

		// scroll to the last
		const chatFeed = document.getElementById('chatFeed');
		if (chatFeed) {chatFeed.scrollTop = chatFeed.scrollHeight;}	
	}

    return (
        <>
            <button variant="outlined" onClick={handleClickOpen}><i className="fa-regular fa-comment"></i></button>
            
            <Dialog className="chatDialogContainer" open={openReviewDialog} onClose={handleClose} BackdropProps={{ invisible: true }}> {/* BackdropProps={{ invisible: true }} */}
				<div className='chatBox'>
					<div className='chatHeading'>					
						<p>Chats</p>
						<i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
					</div>

					{!isAuthenticated && 
						<div className='loginFirst'>
							Please log in first to access <br /> chat feature.
						</div>
					}
					
					{isAuthenticated && 
						<div className='participants'> 
							{chats && chats.map((chat, index) => {
								return (
									<div onClick={() => setCurrentChat(chat)} key={index} className='participantContainer'>
										<Participant chat={chat} currentChat={currentChat} onlineUsers={onlineUsers}  />	
									</div>
								)
							})}
						</div>
					}

					{isAuthenticated && 
						<div className='chatFeed' id='chatFeed'>
							{(currentChat === null) && <div className='noChat'>Please click on one of the chats <br />to send message.</div>}
							{(currentChat !== null) && !currentChatMessages.length && <div className='noMessage'>No messages yet. <br />Please start typing your message.</div>}
							{currentChatMessages.map((message, index) => {
								return <Message key={index} message={message} />
							})
							}
						</div>
					}

					<div className='chatInput'>
						<input type='text' placeholder='Message...' value={newText} onChange={(e) => setNewText(e.target.value)} />
						<button onClick={handleSendMessage} disabled={!currentChat || !newText}><i className="fa-solid fa-paper-plane"></i></button>
					</div>
				</div>  
            </Dialog>
        </>
    );
}

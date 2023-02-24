import React from 'react'
import {useSelector} from 'react-redux';

// import css
import './message.css'

const Message = ({message}) => {
	const {myData} = useSelector(state => state.user);
	
	return (
		<div className={message.sender === myData._id ? "message out" : "message in"}>
			<div className='messageContent'>
				<p className='text'>{message.text}</p>
			</div>
		</div>
	)
}

export default Message;
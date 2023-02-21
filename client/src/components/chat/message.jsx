import React from 'react'
import {useSelector} from 'react-redux';

// import css
import './message.css'

const Message = ({msg}) => {
	const {myData} = useSelector(state => state.user);

	return (
		<div className="message in">
			<div className='messageContent'>
				<p>{msg}</p>
				<p>2 hours ago</p>
			</div>
		</div>
	)
}

export default Message;
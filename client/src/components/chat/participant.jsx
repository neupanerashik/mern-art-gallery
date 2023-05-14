import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch.js'

// import css and components
import './participant.css'

const Participant = ({chat, currentChat, onlineUsers}) => {
    const [online, setOnline] = useState(false);

    const { myData } = useSelector(state => state.user);
            
    const otherParticipantId = chat.participants.find(id => id !== myData._id)
    const {data, isLoading} = useFetch(`/user/${otherParticipantId}`)

    useEffect(() => {
		const onlineUser = onlineUsers.find(user => user.userId === otherParticipantId);

		if(onlineUser) {
			setOnline(true);
		}else{
			setOnline(false);
		}
	}, [onlineUsers, otherParticipantId])


    return (
        <div className='participant'>
            <div className={(currentChat !== null && chat._id.toString() === currentChat._id.toString()) ? "avatar active" : "avatar"}>
                {data?.user?.avatar ? <img src={data.user.avatar.url} alt='user' /> : <i className="fa-solid fa-user"></i>}
            </div>
            <div className={data?.user?.role === 'csr' ? "name csr" : "name"}>{isLoading ? 'Loading...' : (data?.user?.role === "admin") ? "Admin" : data?.user?.name}</div>
            <div className={online ? "status online" : "status"}></div>

        </div>
    )
}

export default Participant;
import { useEffect, useState } from 'react'
import { clearError, clearMessage, subscribe } from '../../../redux/userSlice'

// import css
import './subscribe.css'

// import images
import paintPic from '../../../assets/images/pencils.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const subscribeStyle = {
  backgroundImage: `url(${paintPic})`,
  backgroundSize: 'cover',
  backgroundPosition: "center",
  backgroundRepeat: 'no-repeat',
}

const Subscribe = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const { message, error } = useSelector(state => state.user);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email==='') return toast.warn('Fill up the email field first!');
    dispatch(subscribe(email));
  }

  useEffect(() => {
		if(error){
			toast.error(error)
			dispatch(clearError());
		}

		if(message){
			toast.success(message)
			dispatch(clearMessage());
		}
	}, [dispatch, error, message])

  return (
    <div className='subscribeContainer'style={subscribeStyle} >
      <form>
        <h2>Subscribe Us</h2>
        <p>Register to our newsletter and get <br/> notified about exciting deals!</p>
        <input type="email" placeholder="youremail@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type='button' onClick={handleSubscribe}>Subscribe</button>
      </form>
    </div>
  )
}

export default Subscribe
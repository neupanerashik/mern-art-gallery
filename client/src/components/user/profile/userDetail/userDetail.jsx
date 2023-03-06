import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearError, clearMessage, updateProfile } from '../../../../redux/profileSlice';
import { deleteAccount } from '../../../../redux/userSlice';

// import css and components
import './userDetail.css'
import Bubbles from '../../../utility/bubbles/bubbles';

const UserDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {myData} = useSelector(state => state.user);
  const { isLoading, error, message} = useSelector(state => state.profile);

  const [name, setName] = useState(myData.name);
  const [email, setEmail] = useState(myData.email);
  const [facebook, setFacebook] = useState(myData.socials.facebook);
  const [instagram, setInstagram] = useState(myData.socials.instagram);
  const [twitter, setTwitter] = useState(myData.socials.twitter);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('facebook', facebook);
    myForm.append('instagram', instagram);
    myForm.append('twitter', twitter);
    dispatch(updateProfile(myForm));
  }

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    dispatch(deleteAccount(myData._id));
    toast.success("Account deleted successfully!");
    navigate('/');
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
  }, [dispatch, message, error])
 
  return (
    <div className='profileDetailContainer'>
      <header>
        <div>
          <h2>Personal Info</h2>
          <p>Update your photo and personal details here.</p>
        </div>
      </header>

      <div className="information">
        <h1>General Information</h1>
        <div>
          <span>Name</span>
          <label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>

        <div>
          <span>Email Address</span>
          <label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        
        <div>
          <span>Your Role</span>
          <label>
            <input type="text" value={myData.role} disabled/>
          </label>
        </div>

        <div>
          <span>Joined At</span>
          <label>
            <input type="text" value={myData.joinedAt} disabled />
          </label>
        </div>

        <h1>Password Information</h1>
        <div>
          <span>Password</span>
          <label>
            <input type="button" value='Change Password' onClick={() => navigate('/password/change')} />
          </label>
        </div>

        <h1>Social Information</h1>
        <div>
          <span>Facebook Id</span>
          <label>
            <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
          </label>
        </div>

        <div>
          <span>Instagram Id</span>
          <label>
            <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
          </label>
        </div>

        <div>
          <span>Twitter Id:</span>
          <label>
            <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
          </label>
        </div>

        <h1>Account</h1>
        <div>
          <span>Delete Account</span>
          <label>
            <input type="button" value="Delete Account"  onClick={handleDeleteAccount}/>
          </label>
        </div>

        <button onClick={handleUpdate}>{isLoading ? <Bubbles /> : "Save"}</button>
        <div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail;
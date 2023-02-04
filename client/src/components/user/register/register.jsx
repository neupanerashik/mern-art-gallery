import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { registerUser, clearError, clearMessage } from '../../../redux/userSlice';

// import css and components
import './register.css'
import Seo from '../../seo/seo';
import Bubbles from '../../utility/bubbles/bubbles';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading} = useSelector(state => state.user)
  const { message, error, isAuthenticated} = useSelector(state => state.user)
  const [user, setUser] = useState({name: "", email: "", password: "", confirmPassword: "", role: ""});

  const handleChange = (e) => {return setUser({...user, [e.target.name]: e.target.value})};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password || !user.confirmPassword) return toast.warn("Fields cannot be empty!");
    if (user.password !== user.confirmPassword) return toast.warn("Password do not match!");
    dispatch(registerUser(user));
  };

  useEffect(() => {
    if(isAuthenticated){
      toast.success(message);
			dispatch(clearMessage());
      navigate('/');
    }

		if(error){
			toast.error(error);
			dispatch(clearError());
		}
	}, [dispatch, navigate, message, error, isAuthenticated]);

  return (
    <>
      <Seo title="Register Page" description="Page for user registration." />
      <div className='registerContainer'>
        <form className="registerForm">
          <label>
            <h2>Register</h2>
          </label>

          <label>
            <input type="text" name="name" value={user.name} placeholder='Name' autoComplete="off" onChange={handleChange} required />
          </label>

          <label>
            <input type="email" name="email" value={user.email} placeholder="Email" autoComplete="off" onChange={handleChange} required/>
          </label>

          <label>
            <input type="password" name="password" value={user.password} placeholder="Create Password" autoComplete="off" onChange={handleChange} required/>
          </label>

          <label>
            <input type="password" name="confirmPassword" value={user.confirmPassword} placeholder="Confirm Password" autoComplete="off" onChange={handleChange} required/>
          </label>

          <label>
              <p>Register as Creator? Then select your role.</p>
              <select name="role" value={user.role} onChange={handleChange}>
                <option value="" disabled>Role</option>
                <option value='painter'>Painter</option>
                <option value='drawer'>Drawer</option>
                <option value='sculptor'>Sculptor</option>
                <option value='photographer'>Photographer</option>
                <option value='digital artist'>Digital Artist</option>
              </select>
          </label>

          <label>
            <button type="submit" onClick={handleSubmit}>{isLoading ? <Bubbles /> : "Submit"}</button>
          </label>
        </form>
      </div>
    </>
  );
}

export default Register;
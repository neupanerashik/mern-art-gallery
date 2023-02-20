import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getMyProfile } from './redux/userSlice';


// import css and components
import './app.css';
import Navbar from './components/layout/navbar/navbar';
import Footer from './components/layout/footer/footer.jsx';
import Home from './components/home/home.jsx'
import Login from './components/user/login/login.jsx'
import Register from './components/user/register/register.jsx'
import Detail from './components/arts/detail.jsx';
import Arts from './components/arts/arts.jsx'
import ForgetPassword from './components/user/password/forgetPassword';
import ResetPassword from './components/user/password/resetPassword';
import ChangePassword from './components/user/password/changePassword';
import Profile from './components/user/profile/profile';
import Contact from './components/layout/contact/contact';

// redux store
import store from './store.js';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './components/layout/about/about';

function App() {
  // const dispatch = useDispatch();
  const { user, isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
   store.dispatch(getMyProfile())
  }, []);

  return (
    <div className="app">  
      <Navbar user={user} isAuthenticated={isAuthenticated} />    
      
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/art/:id' element={<Detail />} />
        <Route exact path='/arts/:category' element={<Arts />} />
        <Route exact path='/search/:keyword' element={<Arts />} />
        <Route exact path='/password/forget' element={<ForgetPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/password/change' element={<ChangePassword />} />
        <Route exact path='/profile/:id' element={<Profile />} />
      </Routes>
      
      <Footer />
      
      <ToastContainer position="top-center" autoClose={1500} newestOnTop={true} />
    </div>
  );
}

export default App;

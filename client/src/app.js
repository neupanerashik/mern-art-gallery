import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getProfile } from './redux/userSlice';


// import css and components
import './app.css';
import Navbar from './components/layout/navbar/navbar';
import Footer from './components/layout/footer/footer.jsx';
import Home from './components/layout/home/home.jsx'
import Login from './components/user/login/login.jsx'
import Register from './components/user/register/register.jsx'
import Detail from './components/products/detail.jsx';
import Products from './components/products/products.jsx'
import ForgetPassword from './components/user/password/forgetPassword';
import ResetPassword from './components/user/password/resetPassword';
import UpdatePassword from './components/user/password/updatePassword';
import Profile from './components/user/profile/profile';

// redux store
import store from './reduxStore';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const dispatch = useDispatch();
  const { user, isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
   store.dispatch(getProfile())
  }, []);

  return (
    <div className="app">  
      <Navbar user={user} isAuthenticated={isAuthenticated} />    
      
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/product/:id' element={<Detail />} />
        <Route exact path='/products/:type' element={<Products />} />
        <Route exact path='/password/forget' element={<ForgetPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/password/update' element={<UpdatePassword />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
      
      <Footer />
      
      <ToastContainer position="top-center" autoClose={1500} newestOnTop={true} />
    </div>
  );
}

export default App;

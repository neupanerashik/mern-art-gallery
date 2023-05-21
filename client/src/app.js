import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getMyProfile } from './redux/userSlice';

// import css and components
import './app.css';
import Navbar from './components/layout/navbar/navbar';
import Footer from './components/layout/footer/footer.jsx';
import Home from './components/layout/home/home.jsx'
import Contact from './components/layout/contact/contact';
import About from './components/layout/about/about';
import Company from './components/layout/company/company';
import Login from './components/user/login/login.jsx'
import Register from './components/user/register/register.jsx'
import Detail from './components/arts/detail.jsx';
import Arts from './components/arts/arts.jsx'
import ForgetPassword from './components/user/password/forgetPassword';
import ResetPassword from './components/user/password/resetPassword';
import ChangePassword from './components/user/password/changePassword';
import Profile from './components/user/profile/profile';
import ArtList from './components/user/profile/artList/artList';
import UserDetail from './components/user/profile/userDetail/userDetail';
import Likes from './components/user/profile/likes/likes';
import Upload from './components/user/profile/upload/upload';
import Orders from './components/user/profile/orders/orders';
import AdminLayout from './components/admin/adminLayout';
import UserList from './components/admin/userList/userList';
import Dashboard from './components/admin/dashboard/dashboard';
import OrderList from './components/admin/orderList/orderList';
import Error from './components/error/error';
import Checkout from './components/checkout/checkout';
import Auctions from './components/auction/auction';
import Download from './components/arts/download';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux store
import store from './store.js';

function App() {
  const { user, isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
   store.dispatch(getMyProfile())
  }, []);

  useEffect(() => {
    function handleContextMenu(event) {
      event.preventDefault();
    }

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div className="app">  
      <Navbar user={user} isAuthenticated={isAuthenticated} />    
      
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/help/about' element={<About />} />
        <Route exact path='/help/contact' element={<Contact />} />
        <Route exact path='/help/company' element={<Company />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/art/:id' element={<Detail />} />
        <Route exact path='/auction' element={<Auctions />} />
        <Route exact path='/arts' element={<Arts />} />
        <Route exact path='/arts/:type' element={<Arts />} />
        <Route exact path='/arts/search' element={<Arts />} />
        <Route exact path='/download-image/:id' element={<Download />} />
        <Route exact path='/password/forget' element={<ForgetPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/password/change' element={<ChangePassword />} />
        <Route exact path='/checkout' element={<Checkout />} />
        <Route exact path='/user/:id' element={<Profile />}>
          <Route index element={<ArtList />} />
          <Route exact path='artworks' element={<ArtList />} />
          <Route exact path='detail' element={<UserDetail />} />
          <Route exact path='likes' element={<Likes />} />
          <Route exact path='upload' element={<Upload />} />
          <Route exact path='orders' element={<Orders />} />
        </Route>
        <Route exact path='/admin' element={<AdminLayout />} >
          <Route index element={<Dashboard />} />
          <Route exact path='dashboard' element={<Dashboard />} />
          <Route exact path='arts' element={<ArtList />} />
          <Route exact path='users' element={<UserList />} />
          <Route exact path='orders' element={<OrderList />} />
        </Route>
        <Route path='*' element={<Error />} />    
      </Routes>
      
      <Footer />
      
      <ToastContainer position="top-center" autoClose={1500} newestOnTop={true} />
    </div>
  );
}

export default App;

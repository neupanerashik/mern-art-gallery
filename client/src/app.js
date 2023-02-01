
import { Routes, Route } from 'react-router-dom';

// import css
import './app.css';


// import conponents
import Footer from './components/layout/footer/footer.jsx';
import Home from './components/layout/home/home.jsx'
import Login from './components/user/login/login.jsx'
import Register from './components/user/register/register.jsx'
import Detail from './components/products/detail.jsx';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/navbar/navbar';

function App() {
  return (
    <div className="app">  
      <Navbar />    
      
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/product/:id' element={<Detail />} />
      </Routes>
      
      <Footer />
      
      <ToastContainer position="top-center" autoClose={1500} newestOnTop={true} />
    </div>
  );
}

export default App;

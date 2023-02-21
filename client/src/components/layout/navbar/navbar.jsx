import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { logoutUser } from '../../../redux/userSlice';
import Drawer from '@mui/material/Drawer';

// import css and components
import './navbar.css'
import Bubbles from '../../utility/bubbles/bubbles';
import Cart from '../../cart/cart';

// menu
const menus = [
  {title: 'home'},
  {title: 'about'},
  {title: 'contact'},
  {title: 'auction'},
  {title: 'arts', subMenu: ['painting', 'photography', 'sculpture', 'drawing', 'digital']},
];

const Navbar = ({user, isAuthenticated}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const {cartItems} = useSelector(state => state.cart);
  const {myData, isLoading} = useSelector(state => state.user);
  const [profileSpeedDial, setProfileSpeedDial] = useState(false);
  const [toggleCart, setToggleCart] = useState({ right: false });
  
  let activeStyle = {
    fontWeight: "bolder"
  };

  const handleLink = (menu) => (event) => {
    if (menu.title === 'arts') {
      event.preventDefault();
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {return}
    setToggleCart({ ...toggleCart, [anchor]: open });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/');
    toast.success("Logged out successfully!");
  };

  return (
    <>
      <nav className='navbar'>
        <div className="navLogo">
          <Link to='/'>VA</Link>
        </div>
        
        <ul className={!sidebar ? "navMenu" : "navMenu active" }>
          {
            menus.map((menu, index) => {
              return(
                <li key={index}>
                  <NavLink exact="true"
                    to={menu.title === 'home' ? '/' : `${menu.title}`} 
                    style={({ isActive }) => isActive ? activeStyle : undefined}
                    onClick={handleLink(menu)}
                  >
                    <span>{menu.title}</span>
                    {menu.subMenu && <i className="fa-solid fa-chevron-down"></i>}
                  </NavLink>

                  {
                    menu.subMenu && 
                    <ul className='subMenu'>
                      {
                        menu.subMenu.map((sm, index) => {
                          return(
                            <li key={index}>
                              <NavLink exact="true" to={sm ==='digital art' ? menu.title+'/digital' : menu.title+'/'+sm}>{sm}</NavLink>
                            </li>
                          )
                        })
                      }
                    </ul>
                  }
                </li>
              )
            })
          }
        </ul>
        
        <div className='navIcons'>
          {/* <div className='searchIcon'>
            <input type="text" placeholder="Search" autoComplete="off" required/>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div> */}
        
          <div className="profileIcon" onClick={() => setProfileSpeedDial(!profileSpeedDial)}>
            {profileSpeedDial ? <i className="fa-solid fa-xmark"></i> : <i className="fa-regular fa-user"></i>}
            
            <div className={profileSpeedDial ? "active" : ""}>
              {isAuthenticated && <Link to={`/user/${myData?._id}`}>My Profile</Link>}
              {isAuthenticated && user?.role === "admin" && <Link to='/admin'>Admin Panel</Link>} 
              {!isAuthenticated && <Link to='/login'>Login</Link>}
              {!isAuthenticated && <Link to='/register'>Register</Link>}
              {isAuthenticated && <Link to='#' onClick={handleLogout} style={{backgroundColor: "#ededed"}}>{isLoading ? <Bubbles /> : "Log Out"}</Link>}
            </div>
          </div>	

          <div className="cartIcon" onClick={toggleDrawer('right', true)}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="nav-total-quantity">{cartItems.length}</span>
          </div>

          <div className="barsIcon" onClick={() => setSidebar(!sidebar)}>
            {!sidebar ? <i className="fa-solid fa-bars"></i> : <i className="fa-solid fa-xmark"></i>}
          </div>	
        </div>  

        <Drawer anchor={'right'} open={toggleCart['right']} onClose={toggleDrawer('right', false)}>
          <Cart toggleDrawer={toggleDrawer} />
        </Drawer>
      </nav>
    </>
  )
}

export default Navbar
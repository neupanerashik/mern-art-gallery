import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { logoutUser } from '../../../redux/userSlice';
import Drawer from '@mui/material/Drawer';

// import css and components
import './navbar.css'
import Bubbles from '../../utility/bubbles/bubbles';
import Cart from '../../cart/cart';
import ChatDialog from '../../chat/chatDialog';

// import logo 
import logo from '../../../assets/logo/logo.png'

// menu
const menus = [
  {title: 'home'},
  {title: 'arts'},
  {title: 'auction'},
  {title: 'help', subMenu: ['about', 'contact', 'company']},
];

const Navbar = ({user, isAuthenticated}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const {cartItems} = useSelector(state => state.cart);
  const {myData, isLoading} = useSelector(state => state.user);
  const [accountPopover, setAccountPopover] = useState(false);
  const [toggleCart, setToggleCart] = useState({ right: false });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {return}
    setToggleCart({ ...toggleCart, [anchor]: open });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/');
    // toast.success("Logged out successfully!");
    alert("Logged out successfully!");
  };

  return (
    <>
      <nav className='navbar'>
        <div className="navLogo">
          <Link to='/'><img src={logo} alt='logo' /> Vis Art</Link>
        </div>
        
        <ul className={!sidebar ? "navMenu" : "navMenu active" }>
          {
            menus.map((menu, index) => {
              return(
                <li key={index} onClick={() => setSidebar(false)}>
                  <NavLink
                    exact='true'
                    to={menu.title === 'home' ? '/' : `${menu.title}`}
                    onClick={menu.title === 'help' ? (e) => e.preventDefault() : null}
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
          <ChatDialog />
        
          <div className="profileIcon" onClick={() => setAccountPopover(!accountPopover)}>
            {accountPopover ? <i className="fa-solid fa-xmark"></i> : <i className="fa-regular fa-user"></i>}
            
            <ul className={accountPopover ? "active" : ""}>
              {!isAuthenticated && 
                <>
                  <li>
                    <Link to='/login'>Login</Link>
                  </li>
                  <li>
                    <Link to='/register'>Register</Link>
                  </li>
                </>
              }

              {isAuthenticated && 
                <>
                  <li>
                    <Link to="#" style={{backgroundColor: "#ededed", borderRadius: "0.5rem"}}>Signed in as <br/><b>{myData?.name}</b></Link>
                  </li>
                  <li>
                    <Link to={`/user/${myData?._id}`}>My Profile</Link> 
                  </li>

                  {isAuthenticated && myData?.role === "admin" && 
                      <li>
                        <Link to='/admin'>Admin Panel</Link>
                      </li>
                  } 

                  <li>
                    <Link to='#' onClick={handleLogout} style={{borderTop: "1px solid #ededed"}}>{isLoading ? <Bubbles /> : "Log Out"}</Link>
                  </li>
                </>
              }

            </ul>
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
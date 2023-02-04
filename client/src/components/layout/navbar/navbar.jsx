import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, NavLink} from 'react-router-dom'
import { toast } from 'react-toastify';
import { logoutUser } from '../../../redux/userSlice';

// import css and components
import './navbar.css'
import Bubbles from '../../utility/bubbles/bubbles';

// menu
const menu = [
  {mainMenu: 'home'},
  {mainMenu: 'about'},
  {mainMenu: 'contact'},
  {mainMenu: 'auction'},
  {mainMenu: 'products', subMenu: ['painting', 'photography', 'sculpture', 'drawing', 'digital art']},
];

const Navbar = ({user, isAuthenticated}) => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.user);
  const [sidebar, setSidebar] = useState(false);
  const [profileSpeedDial, setProfileSpeedDial] = useState(false);

  let activeStyle = {
    fontWeight: "bolder",
  };

  const handleLogout = () => {
    dispatch(logoutUser());
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
            menu.map((mm, index) => {
              return(
                <li key={index}>
                  <NavLink exact="true" to={mm.mainMenu === 'home' ? '/' : mm.mainMenu} style={({ isActive }) => isActive ? activeStyle : undefined }>
                    <span>{mm.mainMenu}</span>
                    {mm.subMenu && <i className="fa-solid fa-chevron-down"></i>}
                  </NavLink>

                    {
                      mm.subMenu && 
                      <ul className='subMenu'>
                        {
                          mm.subMenu.map((sm, index) => {
                            return(
                              <li key={index}>
                                <NavLink exact="true" to={sm ==='digital art' ? mm.mainMenu+'/digital' : mm.mainMenu+'/'+sm}>{sm}</NavLink>
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
          <div className='searchIcon'>
            <input type="text" placeholder="Search" autoComplete="off" required/>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        
          <div className="profileIcon" onClick={() => setProfileSpeedDial(!profileSpeedDial)}>
            {profileSpeedDial ? <i className="fa-solid fa-xmark"></i> : <i className="fa-regular fa-user"></i>}
            
            <div className={profileSpeedDial ? "active" : ""}>
              {isAuthenticated && <Link to='/profile'>{user?.name || "Account"}</Link>}
              {isAuthenticated && user?.role === "admin" && <Link to='/admin'>Admin Panel</Link>} 
              {!isAuthenticated && <Link to='/login'>Login</Link>}
              {!isAuthenticated && <Link to='/register'>Register</Link>}
              {isAuthenticated && <button onClick={handleLogout}>{isLoading ? <Bubbles /> : "Log Out"}</button>}
            </div>
          </div>	

          <div className="cartIcon">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="nav-total-quantity">8</span>
          </div>

          <div className="barsIcon" onClick={() => setSidebar(!sidebar)}>
            {!sidebar ? <i className="fa-solid fa-bars"></i> : <i className="fa-solid fa-xmark"></i>}
          </div>	
        </div>  
      </nav>
    </>
  )
}

export default Navbar
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

// import css
import './adminLayout.css'

const AdminLayout = () => {
  const navRef = useRef(null)
  const {myData} = useSelector(state => state.user);

  // scroll to top
  const handleScroll = () => {
    navRef.current.scrollIntoView();
  };

  return (
    <>
      <div className='adminContainer'>
          <div className='welcomeBanner'>Welcome <b>{myData?.name}</b> to the admin panel!</div>

          <nav ref={navRef} onClick={handleScroll}>
              <NavLink to='dashboard'>Dashboard</NavLink>
              <NavLink to='arts'>Artworks</NavLink>
              <NavLink to='users'>Users</NavLink>
              <NavLink to='orders'>Orders</NavLink>
          </nav>

          <Outlet />
      </div>
    </>
  )
}

export default AdminLayout
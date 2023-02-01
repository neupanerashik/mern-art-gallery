import React from 'react'
import {Link} from 'react-router-dom'

// import css
import './login.css'

// import component
import Seo from '../../seo/seo.jsx'

const Login = (props) => {
    return (
      <>
        <Seo title='Login Page' descripion='Page for logging in already registered users.' />

        <div className='loginContainer'>
          <form className="loginForm">
            <div>
              <h2>Log In</h2>
            </div>

            <div>
              <input type="email" placeholder="Email" autoComplete="off" required/>
            </div>

            <div>
              <input type="password" placeholder="Password" autoComplete="off" required/>
            </div>

            <div className='moreOptions'>
              <div>
                <input type="checkbox" />
                <span>Remember me?</span>
              </div>

              <div className="forgotPassword">
                <Link to='/password/forgot'>Forgot Password?</Link>
              </div>
            </div>	

            <div>
              <button type="submit">Submit</button>
            </div>

            <div className="links">
              <p>New here? Register and discover great amount of new opportunities!</p>
              <div>
                <Link to="/register">Register</Link>	
                <Link to='/'>Back</Link>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
  
export default Login
import React from 'react';
import {Link} from 'react-router-dom'

// import css
import './register.css'

// import components
import Seo from '../../seo/seo';

const Register = (props) => {
  return (
    <>
      <Seo title="Register Page" description="Page for user registration." />
      <div className='registerContainer'>
        <form className="registerForm">
          <div>
            <h2>Register</h2>
          </div>

          <div>
            <input type="text" placeholder='Name' autoComplete="off" required />
          </div>

          <div>
            <input type="email" placeholder="Email" autoComplete="off" required/>
          </div>

          <div>
            <input type="password" placeholder="Create Password" autoComplete="off" required/>
          </div>

          <div>
            <input type="password" placeholder="Confirm Password" autoComplete="off" required/>
          </div>

          <div>
              <input type="checkbox" />
              <span>Register as Creator</span>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>

          <div className="links">
            <p>Already have an account? Please log in!</p>
            <div>
              <Link to="/login">Log In</Link>	    
              <Link to='/'>Back</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
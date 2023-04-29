import React from 'react'
import {Link} from 'react-router-dom'

// import css
import './footer.css'

const Footer = () => {
  return (
    <>
      <div className='footerContainer'>
        <div className="footerLinks">
          <div>
            <h2>Pages</h2>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/help/about'>About</Link></li>
              <li><Link to='/help/contact'>Contact</Link></li>
              <li><Link to='/auction'>Auction</Link></li>
              <li><Link to='/arts'>All Arts</Link></li>
            </ul>
          </div>

          <div>
            <h2>Categories</h2>
            <ul>
              <li><Link to='/arts/painting'>Painting</Link></li>
              <li><Link to='/arts/photography'>Photography</Link></li>
              <li><Link to='/arts/drawing'>Drawing</Link></li>
              <li><Link to='/arts/sculpture'>Sculpture</Link></li>
              <li><Link to='/arts/digital'>Digital</Link></li>
            </ul>
          </div>

          <div>
            <h2>Company</h2>
            <ul>
              <li><Link to='/help/company'>Terms of Use</Link></li>
              <li><Link to='/help/company'>Privacy Policy</Link></li>
              <li><Link to='/help/company'>Copyright Policy</Link></li>
              <li><Link to='/help/company'>FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h2>Contact</h2>
            <ul>
              <li>061-234865</li>
              <li>visart@gmail.com</li>
              <li>Baidam 6, Pokhara</li>
            </ul>
          </div>
        </div>


        <div className='footerBottom' >
          <div className="footerCopyright">
            <p>&#x00A9; 2023 VisArt. All Rights Reserved.</p>
          </div>

          <div className='footerSocial'>
            <p>Follow Us: </p>
            <ul>
              <li><Link to="#"><i className="fa-brands fa-facebook facebook"></i></Link></li>
              <li><Link to="#"><i className="fa-brands fa-instagram instagram"></i></Link></li>
              <li><Link to="#"><i className="fa-brands fa-twitter twitter"></i></Link></li>
            </ul>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Footer
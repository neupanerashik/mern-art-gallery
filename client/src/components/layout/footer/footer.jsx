import React from 'react'
import {Link} from 'react-router-dom'

// import css
import './footer.css'

// menu
const footerLinks = [
  {title: 'pages', subLinks: ['home', 'about', 'contact']},
  {title: 'categories', subLinks: ['painting', 'photography', 'drawing', 'sculpture', 'digital']},
  {title: 'company', subLinks: ['terms of use', 'privacy policy', 'copyright policy', 'faq']},
  {title: 'support', subLinks: ['Troubleshooting', 'Report a bug']},
  {title: 'contact', subLinks: ['viasrt@gmail.com', '061-233456', 'Pokhara 7, Masbar']},
];

const Footer = () => {
  return (
    <>
      <div className='footerContainer'>
        <div  className='footerTop'>Vis Art Gallery</div>

        {/* <div className="footerLinks">
            {
              footerLinks.map((link, index) => {
                return(
                  <div key={index}>
                    <h2>{link.title}</h2>
                    <ul>
                      {link.subLinks && link.subLinks.map((sl, idx) => <li key={idx}><Link to="#">{sl}</Link></li>)}
                    </ul>
                  </div>
                )
              })
            }
        </div> */}


        <div className='footerBottom' >
          <div className="footerCopyright">
            {/* <p><span>VisArt Gallery</span></p> */}
            <p><span>&#x00A9; 2023 VisArt. All Rights Reserved.</span></p>
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
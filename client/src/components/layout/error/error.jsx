import React from 'react'
import { Link } from 'react-router-dom'

// import css
import './error.css'

const Error = () => {
  return (
    <div className='errorContainer'>
      <div className="number">
        <div className="four">4</div>
        <div className="zero">0</div>
        <div className="four">4</div>
      </div>

      <h1>Page not found</h1>
      
      <Link to="/">Return to home</Link>
    </div>
  )
}

export default Error
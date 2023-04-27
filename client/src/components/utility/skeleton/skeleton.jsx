import React from 'react'

// import css
import './skeleton.css'

const Skeleton = ({style}) => {
  return (
    <div className="skeleton loading" style={style}></div>
  )
}

export default Skeleton
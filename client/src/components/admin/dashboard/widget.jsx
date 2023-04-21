import React from 'react'

const Widget = ({title, value}) => {
  return (
    <div className='widget'>
        <div className="left">{title}</div>
        <div className="right">{value}</div>
    </div>
  )
}

export default Widget
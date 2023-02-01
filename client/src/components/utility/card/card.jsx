import React from 'react'
import { useNavigate } from 'react-router-dom';

// import css
import './card.css'

const Card = ({data, style}) => {
  const navigate = useNavigate();

  return (
    <div className="cardContainer" style={style}>
      <div className='itemImage'>
        <img src={data.imgLink} alt='itemPic' />
      </div>

      <div className='itemInfo'>
        <p>Name of the item</p>
        <p>Rs 1212</p>
      </div>

      <div className="itemButtons">
        <button type="button">
          <i className="fa-solid fa-plus"></i>
          <span>Add To Cart</span>
        </button>
        <button type="button" onClick={() => navigate(`/product/${data.id}`)}>
          <i className="fa-regular fa-eye"></i>
          <span>View</span>
        </button>
        <button>
          <i className="fa-regular fa-heart"></i>
          <span>Like</span>
        </button>
      </div>
    </div>
  )
}

export default Card
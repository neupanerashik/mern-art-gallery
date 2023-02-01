import {useState, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'

// import css
import './products.css'

// dev imports
import images from '../../data/images.js'

const categories = ['Paintings', "Photography", "Sculpture", "Drawing", "Digital"]

const Products = () => {
  const navigate = useNavigate();
  const productsRef = useRef(null);
  const [category, setCategory] = useState(categories[0]);


  // scroll to products
  const handleScroll = (cat) => {
    productsRef.current.scrollIntoView({ behavior: 'smooth' });
    setCategory(cat)
  };

  return (
    <>
      <div ref={productsRef} className="productsContainer">
        <div className="productsCategories">
          <ul>
            {categories.map((cat, index) => {
              return(
                <li key={index}>
                  <Link onClick={() => handleScroll(cat)} style={{
                    background: cat === category ? "#24252a" : "",
                    color: cat === category ? "white" : ""}}
                  >
                    {cat}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="products">
          {images.map((product, index) => {
            return(
              <div className="productCard" key={index}>
                <div className='productImage'>
                  <img src={product.link} alt='productPic' />
                </div>

                <div className='productInfo'>
                  <p>Name of the product</p>
                  <p>Rs 1212</p>
                </div>

                <div className="productButtons">
                  <button type="button">
                    <i className="fa-solid fa-plus"></i>
                    <span>Add To Cart</span>
                  </button>
                  <button type="button" onClick={() => navigate(`/product/${product.id}`)}>
                    <i className="fa-regular fa-eye"></i>
                    <span>View</span>
                  </button>
                  <button>
                    <i className="fa-regular fa-heart"></i>
                    <span>Like</span>
                  </button>
                  {/* <button type="buttonName">
                    <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                    <span>Expand</span>
                  </button>    */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Products
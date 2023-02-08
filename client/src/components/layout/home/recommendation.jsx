import {useState, useRef} from 'react'

// import css
import './recommendation.css'

// import components
import Card from '../../utility/card/card.jsx'

// dummy imports
import images from '../../../assets/images/images.js'

const recommendations = ['New Arrivals', "Best Sellers", "Highest Rated"]

const Recommendation = () => {
  const recommendRef = useRef(null);
  const [recommendation, setRecommendation] = useState(recommendations[0]);


  // scroll to products
  const handleScroll = (cat) => {
    recommendRef.current.scrollIntoView({ behavior: 'smooth' });
    setRecommendation(cat)
  };

  return (
    <>
      <section ref={recommendRef} className="recommendationSection">
        <div className="recommendations">
          <ul>
            {recommendations.map((rec, index) => <li key={index} onClick={() => handleScroll(rec)} style={{color: rec === recommendation ? "black" : ""}}>{rec}</li>)}
          </ul>
        </div>

        <div className="items">
          {images.slice(0, 8).map((item, index) => {
            return(
              <Card key={index} data={item} style={{height: '30rem'}} />
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Recommendation;
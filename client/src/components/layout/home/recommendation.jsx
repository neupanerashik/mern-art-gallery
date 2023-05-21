import { useState, useRef, useEffect } from 'react'
import useFetch from '../../../hooks/useFetch.js'

// import css and components
import './recommendation.css'
import Card from '../../utility/card/card'
import Bubbles from '../../utility/bubbles/bubbles'
import { toast } from 'react-toastify'

const recommendations = ['New Arrivals', "Highest Rated"]

const Recommendation = () => {
  const recommendRef = useRef(null);
  const [newArrivals, setNewArrivals] = useState([]);
  const [highestRated, setHighestRated] = useState([]);
  const [recommendation, setRecommendation] = useState(recommendations[0]);

  const { data, isLoading, error } = useFetch('/arts/recommendations');

  // scroll to recomendations
  const handleScroll = (recom) => {
    recommendRef.current.scrollIntoView({ behavior: 'smooth' });
    setRecommendation(recom)
  };

  useEffect(() => {
    if(data && data.newArrivals && data.highestRated){
      setNewArrivals(data.newArrivals);
      setHighestRated(data.highestRated);
    }  
  }, [data])

  useEffect(() => {
    if(error) {
      toast.error(error);
    }
  }, [error])

  return (
    <>
      <section ref={recommendRef} className="recommendationSection">
        <div className="recommendations">
          <ul>
            {recommendations.map((rec, index) => <li key={index} onClick={() => handleScroll(rec)} style={{color: rec === recommendation ? "black" : ""}}>{rec}</li>)}
          </ul>
        </div>

        {isLoading && <div className='loading'><Bubbles /></div>}
        
        <div className="items">
          {recommendation === recommendations[0] && !isLoading && newArrivals.slice(0, 8).map((item, index) => {
            return(
              <Card key={index} art={item} style={{height: '30rem'}} />
            )
          })}

          {recommendation === recommendations[1] && !isLoading && highestRated.slice(0, 8).map((item, index) => {
            return(
              <Card key={index} art={item} style={{height: '30rem'}} />
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Recommendation;
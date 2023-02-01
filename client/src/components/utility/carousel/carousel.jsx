import {useState, useEffect, useRef} from 'react'

// import css
import './carousel.css'

const Carousel = ({data, style}) => {
  const productImages = data.slice(0, 4);

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselImgRef = useRef(null);

	const prev = () => currentIndex > 0 ? setCurrentIndex(prevState => prevState - 1) : setCurrentIndex(productImages.length - 1);   
	const next = () => currentIndex < productImages.length - 1 ? setCurrentIndex(prevState => prevState + 1) : setCurrentIndex(0);
  
  
  useEffect(()=> {
    const intervalId = setInterval(next, 4000);
    return () => clearInterval(intervalId);
  })  

  useEffect(() => {
    carouselImgRef.current.style.opacity = 0;
    carouselImgRef.current.style.transition = "all 0.75s ease-in-out";
    const timeoutId = setTimeout(() => {
      carouselImgRef.current.style.opacity = 1;
    }, 450);
    return () => clearTimeout(timeoutId);
  }, [currentIndex, productImages]);

  return (
    <div className='carouselContainer'>
      <div className="carouselSlide">
        <img src={productImages[currentIndex].imgLink} alt="product-img" ref={carouselImgRef}/>

        <div className='actions'>
          <i className="fa-solid fa-chevron-left" onClick={prev}></i>
          <i className="fa-solid fa-chevron-right" onClick={next}></i>
        </div>
      </div>
      
      <div className="carouselThumb">
        {
          productImages.map((image, index) => 
            <img src={image.imgLink} alt="product-images" key={index} 
            onClick={() => setCurrentIndex(index)} 
            className={currentIndex === index ? "active" : ""}/>
          )
        }
      </div>
    </div>
  )
}

export default Carousel
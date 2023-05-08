import { Watermark } from 'antd';
import {useState, useEffect, useRef} from 'react'

// import css
import './carousel.css'
import logo from "../../../assets/logo/logo.png"

const Carousel = ({images, style}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselImgRef = useRef(null);

	const prev = () => currentIndex > 0 ? setCurrentIndex(prevState => prevState - 1) : setCurrentIndex(images.length - 1);   
	const next = () => currentIndex < images.length - 1 ? setCurrentIndex(prevState => prevState + 1) : setCurrentIndex(0);
  

  useEffect(()=> {
    const intervalId = setInterval(next, 5000);
    return () => clearInterval(intervalId);
  })  

  // for fade out effect
  useEffect(() => {
    if (carouselImgRef.current) {
      carouselImgRef.current.style.opacity = 0.5;
      carouselImgRef.current.style.transition = "opacity 0.25s ease-out";
      const timeoutId = setTimeout(() => {
        carouselImgRef.current.style.opacity = 1;
      }, 250);
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex]);
  

  return (
    <div className='carouselContainer' style={style}>
      <div className="carouselSlide">
        {images && 
          <Watermark className='watermark' content={['Visart', 'Copyright Reserved']}>
            <img src={images[currentIndex].watermarked_image_url} alt="art-img" ref={carouselImgRef}/>
          </Watermark>
        }
      </div>

      {images && images.length > 1 && 
        <div className='actions'>
          <i className="fa-solid fa-chevron-left" onClick={prev}></i>
          <i className="fa-solid fa-chevron-right" onClick={next}></i>
      </div>}

      {images && images.length > 1 && 
        <div className="carouselIndicators">
          {
            images && images.map((image, index) => 
            <div className={index === currentIndex ? "indicator active" : "indicator"} onClick={() => setCurrentIndex(index)} key={index}></div>
            )
          }
        </div>}
    </div>
  )
}

export default Carousel
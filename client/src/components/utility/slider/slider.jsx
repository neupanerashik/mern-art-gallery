import {useRef} from 'react'

// import css and components
import './slider.css'
import Card from '../../utility/card/card.jsx'

// import swiper components
import { Swiper, SwiperSlide } from "swiper/react";

// import required swiper modules
import { Pagination } from "swiper";

// import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';

const Slider = ({title, data}) => {
    const swiperRef = useRef();

    return (
        <div className='sliderContainer'>
            <h2>{title}</h2>
           
            <div className="slider">
                <i className="fa-solid fa-chevron-left" onClick={() => swiperRef.current.slidePrev()}></i>

                <Swiper
                    ref={swiperRef}
                    className="mySwiper"
                    modules={[Pagination]}
                    slidesPerView={1}
                    spaceBetween={9}
                    pagination={{clickable: true}}
                    onSwiper={(swiper) => {swiperRef.current = swiper}}
                    breakpoints={{
                        576: {slidesPerView: 2, spaceBetween: 5},
                        768: {slidesPerView: 3, spaceBetween: 10},
                        1024: {slidesPerView: 4, spaceBetween: 20},
                    }}
                >
                    {
                        data.slice(0, 7).map((slide, index) => {
                            return(
                                <SwiperSlide key={index}>
                                    <Card art={slide} title={title} style={{height: '30rem'}} />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>

                <i className="fa-solid fa-chevron-right" onClick={() => swiperRef.current.slideNext()}></i>
            </div>

            <div className='navigators'>
                <i className="fa-solid fa-chevron-left" onClick={() => swiperRef.current.slidePrev()}></i>
                <i className="fa-solid fa-chevron-right" onClick={() => swiperRef.current.slideNext()}></i>
            </div>
        </div>
    )
}

export default Slider
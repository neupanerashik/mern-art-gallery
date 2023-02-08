import React, { useEffect, useState } from 'react'

// import css and components
import './arts.css'
import Card from '../utility/card/card'
import { useParams } from 'react-router-dom'

// dev imports
import images from '../../assets/images/images.js'

const Arts = () => {
    const [arts, setArts] = useState(images);
    const [lowFirst, setLowFirst] = useState(false);

    const {category} = useParams();

    const handlePriceFilter = () => {
        if(lowFirst){ setArts(arts.sort((a, b) => a.id > b.id ? -1 : a.id > b.id ? 1 : 0))}
        if(!lowFirst){ setArts(arts.sort((a, b) => a.id > b.id ? 1 : a.id > b.id ? -1 : 0))}
        setLowFirst(!lowFirst);
    }

    useEffect(() => {
        
    }, [lowFirst])

    return (
        <div className='artsContainer'>
            <header>
                <div className="breadcrumb">{`arts / ${category}`}</div>
                
                <div className="filter">
                    <div onClick={() => {
                        handlePriceFilter();
                    }}>
                        <span>Price</span>
                        <i className={lowFirst ? "fa-solid fa-arrow-up" : "fa-solid fa-arrow-down"}></i>
                    </div>
                </div>
            </header>

            <div className="arts">
                {arts.map((art, index) => {
                    return(
                        <Card data={art} style={{height: "30rem"}} key={index} />
                    )
                })}
            </div>
        </div>
    )
}

export default Arts
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllArts } from '../../redux/artSlice'

// import css and components
import './arts.css'
import Card from '../utility/card/card'

const Arts = () => {
    const dispatch = useDispatch();
    const {category, keyword} = useParams();
    const {allArts} = useSelector(state => state.art);

    const [minPrice, handleMinPrice] = useState(0);
    const [maxPrice, handleMaxPrice] = useState(20000);
    const [sortByPrice, setSortByPrice] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {setShowFilters(!showFilters)}
    
    useEffect(() => { 
        if (category) {dispatch(getAllArts({ category, maxPrice, minPrice, sortByPrice }))} 
        else if (keyword) {dispatch(getAllArts({ keyword, maxPrice, minPrice, sortByPrice }))}
    }, [dispatch, keyword, category, maxPrice, minPrice, sortByPrice]);

    return (
        <div className='artsContainer'>
            <header>
                <div className='filtersHeader'>
                    {keyword && <p>{`arts / ${keyword}`}</p>}
                    {category && <p>{`arts / ${category}`}</p>}
                    <button disabled={!allArts[0]} onClick={toggleFilters}>Filters<i className={showFilters ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}></i></button>
                </div>

                <div className={`filters ${showFilters ? 'open' : 'closed'}`}>
                    <select value={sortByPrice} onChange={e => setSortByPrice(e.target.value)}>
                        <option value='' disabled>Sort By Price</option>
                        <option value='priceHighToLow'>Price High To Low</option>
                        <option value='priceLowToHigh'>Price Low To High</option>
                    </select>

                    <div className='priceFields'>
                        <label>Min Price</label>
                        <input type='number' placeholder="Min" onChange={e => handleMinPrice(e.target.value)} />
                        <label>Max Price</label>
                        <input type='number' placeholder="Max" onChange={e => handleMaxPrice(e.target.value)} />
                    </div>
                </div>
            </header>

            {
                allArts[0] && (
                    <div className="arts">
                        {allArts[0] && allArts.map((art, index) => {
                            return(
                                <Card art={art} style={{height: "30rem"}} key={index} />
                            )
                        })}
                    </div>
                )
            }

            {!allArts[0] && <p className='noArt'>No {category} art has been posted yet!</p>}

        </div>
    )
}

export default Arts
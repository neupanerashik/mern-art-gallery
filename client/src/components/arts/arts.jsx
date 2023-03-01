import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getAllArts } from '../../redux/artSlice'

// import css and components
import './arts.css'
import Card from '../utility/card/card'

const Arts = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const {keyword, type} = useParams();
    const {allArts} = useSelector(state => state.art);
    const [category, setCategory] = useState('');
    const [minPrice, handleMinPrice] = useState('');
    const [maxPrice, handleMaxPrice] = useState('');
    const [sortByPrice, setSortByPrice] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {setShowFilters(!showFilters)}
    
    useEffect(() => { 
        if(location.pathname === '/auction') {dispatch(getAllArts({isAuctionItem: true, maxPrice, minPrice, sortByPrice, category}))}
        else {dispatch(getAllArts({ keyword, category, maxPrice, minPrice, sortByPrice }))}
    }, [dispatch, location, keyword, category, maxPrice, minPrice, sortByPrice]);

    return (
        <div className='artsContainer'>
            <header>
                <div className='filtersHeader'>
                    <p>arts {location.pathname === '/auction' ? "/ auction" : (type ? `/ ${type}` : (keyword ? `/ ${keyword}` : ""))}</p>
                    <button disabled={!allArts[0]} onClick={toggleFilters}>Filters<i className={showFilters ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}></i></button>
                </div>

                <div className={`filters ${showFilters ? 'open' : 'closed'}`}>
                    <div className='selectFields'>
                        <select value={category} onChange={e => setCategory(e.target.value)}>
                            <option value='' disabled>Category</option>
                            <option value=''>All</option>
                            <option value='painting'>Painting</option>
                            <option value='photography'>Photography</option>
                            <option value='sculpture'>Sculpture</option>
                            <option value='drawing'>Drawing</option>
                            <option value='digital'>Digital</option>
                        </select>

                        <select value={sortByPrice} onChange={e => setSortByPrice(e.target.value)}>
                            <option value='' disabled>Sort By Price</option>
                            <option value='priceHighToLow'>Price High To Low</option>
                            <option value='priceLowToHigh'>Price Low To High</option>
                        </select>
                    </div>

                    <div className='priceFields'>
                        <label>Filter By Price</label>
                        <input type='number' placeholder="Min Price" onChange={e => handleMinPrice(e.target.value)} />
                        <input type='number' placeholder="Max Price" onChange={e => handleMaxPrice(e.target.value)} />
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
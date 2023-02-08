import * as React from 'react';
import { Link } from 'react-router-dom';

// import css
import './cart.css'

export default function Cart({ toggleDrawer }) {
    return (
        <>
            <div className="cartContainer">
                <header>
                    <h2>Your Cart</h2>
                    <i className="fa-solid fa-xmark" onClick={toggleDrawer('right', false)}></i>
                </header>

                <ul>
                    <li>
                        <img src='https://source.unsplash.com/1600x900/?art' alt='artPic' />
                        <div>
                            <p>Name of the Art</p>
                            <p>1 * Rs 2400</p>
                        </div>
                        <i className="fa-regular fa-trash-can"></i>
                    </li>

                    <li>
                        <img src='https://source.unsplash.com/1600x900/?art' alt='artPic' />
                        <div>
                            <p>Name of the Art</p>
                            <p>1 * Rs 2400</p>
                        </div>
                        <i className="fa-regular fa-trash-can"></i>
                    </li>

                    <li>
                        <img src='https://source.unsplash.com/1600x900/?art' alt='artPic' />
                        <div>
                            <p>Name of the Art</p>
                            <p>1 * Rs 2400</p>
                        </div>
                        <i className="fa-regular fa-trash-can"></i>
                    </li>

                    <li>
                        <img src='https://source.unsplash.com/1600x900/?art' alt='artPic' />
                        <div>
                            <p>Name of the Art</p>
                            <p>1 * Rs 2400</p>
                        </div>
                        <i className="fa-regular fa-trash-can"></i>
                    </li>
                </ul>

                <div className='cartFooter'>
                    <div>
                        <p>Shipping</p>
                        <strong>Rs 200</strong>
                    </div>

                    <div>
                        <p>Total</p>
                        <strong>Rs 3000</strong>
                    </div>

                    <Link to='/login?redirect=checkout' onClick={toggleDrawer('right', false)}>Checkout</Link>

                    <p className="shipping-cart">Free shipping on all orders over Rs 1000</p>
                </div>
            </div>      
        </>
    );
}

import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart } from '../../redux/cartSlice.js'

// import css
import './cart.css'

export default function Cart({ toggleDrawer }) {
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart);

    return (
        <>
            <div className="cartContainer">
                <header>
                    <h2>Your Cart</h2>
                    <i className="fa-solid fa-xmark" onClick={toggleDrawer('right', false)}></i>
                </header>

                <ul>
                    {cartItems[0] && cartItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <img src={item.image} alt='artPic' />
                                <div>
                                    <p>{item.name}</p>
                                    <p>Rs {item.price}</p>
                                </div>
                                <i className="fa-regular fa-trash-can" onClick={() => dispatch(deleteFromCart(item))}></i>
                            </li>
                        )
                    })}

                    {
                        !cartItems[0] && <div className='noCartItem'>No cart items yet!</div>
                    }
                </ul>

                <div className='cartFooter'>
                    <div>
                        <p>Shipping</p>
                        <strong>Rs 200</strong>
                    </div>

                    <div>
                        <p>Total</p>
                        <strong>Rs {cartItems.reduce((accumulator, item) => accumulator + item.price, 0)}</strong>
                    </div>

                    <Link to='/login?redirect=checkout' onClick={toggleDrawer('right', false)}>Checkout</Link>

                    <p className="shipping-cart">Free shipping on all orders over Rs 1000</p>
                </div>
            </div>      
        </>
    );
}

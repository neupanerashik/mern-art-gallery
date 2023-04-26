import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart } from '../../redux/cartSlice.js'

// import css
import './cart.css'

export default function Cart({ toggleDrawer }) {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.user);

    const orderSubtotal = cartItems.reduce((accumulator, item) => accumulator + item.artPrice, 0);

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
                                <img src={item.artImage} alt='artPic' />
                                <div>
                                    <p>{item.artName}</p>
                                    <p>Rs {item.artPrice}</p>
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
                        <strong>{orderSubtotal <= 1000 ? `Rs 100` : 'Free Shipping'}</strong>
                    </div>

                    <div>
                        <p>Total</p>
                        <strong>Rs {orderSubtotal}</strong>
                    </div>
                    
                    {cartItems.length === 0 ?
                        <Link to="/" onClick={toggleDrawer('right', false)}>Shop More</Link> :
                        (isAuthenticated ? 
                            <Link to="/checkout" onClick={toggleDrawer('right', false)}>Checkout</Link> : 
                            <Link to="/login?redirect=checkout" onClick={toggleDrawer('right', false)}>Login First</Link>
                        )
                    }

                    <p className="shipping-cart">Free shipping on all orders over Rs 1000</p>
                </div>
            </div>      
        </>
    );
}

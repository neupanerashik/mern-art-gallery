import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { clearCart } from '../../../redux/cartSlice';
import { createOrder, clearError, clearMessage } from '../../../redux/userSlice';

// import css
import './payment.css'

const Payment = ({activeStep, handleStepChange, orderTotal}) => {
  const payBtn = useRef(null)
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const [name, setName] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  const orderDetail = JSON.parse(localStorage.getItem('orderDetail'));
  const shippingDetail = JSON.parse(localStorage.getItem('shippingDetail'));
  const { cartItems } = useSelector(state => state.cart);
  const { myData, message, error } = useSelector(state => state.user);

  const orderData = {
    shippingDetail,
    orderItems: cartItems,
    orderSubtotal: orderDetail?.orderSubtotal,
    taxPrice: orderDetail?.tax,
    shippingPrice: orderDetail?.shippingCharge,
    orderTotal: orderDetail?.orderTotal
  };

  //payment-handler
	const handlePayment = async (e) => {
		e.preventDefault();

    setPaymentLoading(true);
    if(!stripe || !elements){
      return;
    };

    // create payment intent
    const {data} = await axios.post('/api/v1/create-payment-intent', {amount: orderTotal, email: myData?.email}, {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    })

    // confirm the payment on the client
    const {paymentIntent, error: stripeError} = await stripe.confirmCardPayment(data.client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: shippingDetail.name,
          phone: `+977 ${shippingDetail.phone}`,
          email: shippingDetail.email,
          address: {
            state: shippingDetail.province,
            city: shippingDetail.city,
            line1: shippingDetail.address,
          }
        },
      },
    });	

    if(stripeError){
      setPaymentLoading(false);
      payBtn.current.disabled = false;
      toast.error(stripeError.message);	
      return;
    }

    if(paymentIntent && paymentIntent.status === 'succeeded'){
      toast.success('Payment successful');
      dispatch(clearCart());
      localStorage.removeItem('cartItems');	
      localStorage.removeItem('orderDetail');	
      localStorage.removeItem('shippingDetail');

      orderData.paymentDetail = {
        id: paymentIntent.id,
        status: paymentIntent.status,
      };
    }

    dispatch(createOrder(orderData));
    setPaymentLoading(false);
    handleStepChange(activeStep + 1);
	};

  useEffect(() => {
    if(message){
      toast.success(message);
      clearMessage();
    }

    if(error){
      toast.error(error);
      clearError();
    }
  }, [error, message]); 

  return (
    <div className='paymentContainer'>
        <h2>Payment Detail</h2>
        
        <form>
          <div>
            <label>Cardholder's Name</label>
            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label>Card Number</label>
            <CardNumberElement className='stripeInputField' />
          </div>

          <div>
            <label>Expiration</label>
            <CardExpiryElement className='stripeInputField' />
          </div>

          <div>
            <label>Security Code</label>
            <CardCvcElement className='stripeInputField' />
          </div>
        </form>

        <Divider className="divider">
            <button onClick={() => handleStepChange(activeStep - 1)}>Back</button>
            <button onClick={handlePayment} ref={payBtn} disabled={!stripe || !name}>{paymentLoading ? 'Processing...' : 'Pay'}</button>
        </Divider>

    </div>
  )
}

export default Payment
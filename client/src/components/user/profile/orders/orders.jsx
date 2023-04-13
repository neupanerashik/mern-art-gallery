import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersMade, getOrdersReceived } from '../../../../redux/userSlice';

// import css
import './orders.css'
// import UpdateOrder from '../../../admin/orderList/updateOrder';

const Orders = () => {
  const dispatch = useDispatch();
  const {ordersMade, ordersReceived} = useSelector(state => state.user)
  
  useEffect(( ) => {
    dispatch(getOrdersMade())
    dispatch(getOrdersReceived())
  }, [dispatch]);

  return (
    <div className='ordersContainer'>
      <div className='ordersMade'>
        <h2>My Orders</h2>

        <table>
          <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Order Total</th>
                <th>Ordered On</th>
              </tr>
            </thead>
          <tbody>
            {
              ordersMade[0] && ordersMade.map((order, index) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.paymentDetail.status}</td>
                    <td>{order.orderTotal}</td>
                    <td>{moment(order.orderCreatedOn).format('YYYY-MM-DD')}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        {!ordersMade[0] && <div className='noOrders'>No orders made!</div>}
      </div>

      <div className='ordersReceived'>
        <h2>Orders Received</h2>

        <table>
          <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Order Total</th>
                <th>Ordered On</th>
              </tr>
            </thead>
          <tbody>
            {
              ordersReceived[0] && ordersReceived.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.paymentDetail.status}</td>
                    <td>{order.orderTotal}</td>
                    <td>{moment(order.orderCreatedOn).format('YYYY-MM-DD')}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        {!ordersReceived[0] && <div className='noOrders'>No orders made!</div>}
      </div>
    </div>
  )
}

export default Orders
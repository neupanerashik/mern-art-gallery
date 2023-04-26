import moment from 'moment';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getAllOrders } from '../../../redux/adminSlice';

// import css
import './orderList.css'
import UpdateOrder from './updateOrder';

const OrderList = () => {
  const dispatch = useDispatch();

  const { allOrders } = useSelector(state => state.admin);
  const [orders, setOrders] = useState([])

  const handleOrderDelete = (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete the order? This action cannot be undone.");
    if(confirmDelete){
      dispatch(deleteOrder(orderId));
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    }
  }

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch]);

  useEffect(() => {
    setOrders(allOrders);
  }, [allOrders]);

  return (
    <div className='orderList'>      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Order Status</th>
            <th>Payment Status</th>
            <th>Amount</th>
            <th>Ordered On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            orders[0] && orders.map((order, index) => {
              return (
                <tr key={index}> 
                  <td>{order._id}</td>
                  <td>{order.shippingDetail.name}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.paymentDetail.status}</td>
                  <td>Rs {order.orderTotal}</td>
                  <td>{moment(order.orderCreatedOn).format('YYYY-MM-DD')}</td>
                  <td>
                    <UpdateOrder currentOrder={order} />
                    <i className="fa-regular fa-trash-can" onClick={() => handleOrderDelete(order._id)}></i>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </table>

      {!orders[0] && <div className='noOrders'>No orders yet!</div>}
    </div>
  )
}

export default OrderList
import React from 'react'
import moment from 'moment';

const RecentOrders = ({newOrders}) => {
  return (
    <div className='recentOrdersContainer'>
        <h2>Recent Orders</h2>
        <table>
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Order Status</th>
                    <th>Payment Status</th>
                    <th>Ordered On</th>
                    <th>Order Total</th>
                </tr>
            </thead>
            <tbody>
            {
                newOrders.map((newOrder, index) => {
                    return(
                        <tr key={index}>
                            <td>{newOrder.shippingDetail.name}</td>
                            <td>{newOrder.orderStatus}</td>
                            <td>{newOrder.paymentDetail.status}</td>
                            <td>{moment(newOrder.orderCreatedOn).format('YYYY-MM-DD')}</td>
                            <td>Rs {newOrder.orderTotal}</td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    </div>
  )
}

export default RecentOrders
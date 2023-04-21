import React from 'react'

const TopSellers = ({topSellers}) => {
  return (
    <div className='topSellersContainer'>
        <h2>Top Sellers</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Total Sales</th>
            </tr>
          </thead>   
          <tbody>
          {
            topSellers.map((seller, index) => {
              return(
                <tr key={index}>
                  <td>{seller.artist}</td>
                  <td>{seller.role}</td>
                  <td>{seller.total_sales}</td>
                </tr>
              )
            })
          }
          </tbody>       
        </table>
    </div>
  )
}

export default TopSellers
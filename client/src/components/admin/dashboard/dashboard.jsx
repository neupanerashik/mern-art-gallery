import { useEffect, useState } from 'react'
import { useDispatch, useSelector,  } from 'react-redux'
import { getStats } from '../../../redux/adminSlice'

// import css and components
import './dashboard.css'
import BarChart from './barChart'
import Widgets from './widget.jsx'
import NewUsers from './newUsers'
import RecentOrders from './recentOrders'
import TopSellers from './topSellers'
import Skeleton from '../../utility/skeleton/skeleton'

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector(state =>state.admin);
  const [barData, setBarData] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch])

  useEffect(() => {
    if(stats && stats.totalSalesByCategory){
      setBarData([
        stats.totalSalesByCategory.painting || 0,
        stats.totalSalesByCategory.drawing || 0,
        stats.totalSalesByCategory.sculpture || 0,
        stats.totalSalesByCategory.photography || 0
      ]);
    }

    if(stats && stats.newUsers){
      setNewUsers(stats.newUsers);
    }

    if(stats && stats.newOrders){
      setNewOrders(stats.newOrders);
    }

    if(stats && stats.topSellingArtists){
      setTopSellers(stats.topSellingArtists);
    }
  }, [stats]);
  

  if (isLoading || !barData.length) {
    return <Skeleton style={{height: "30vh", width: "100%", marginTop: '1rem'}} />;
  }

  return (
    <div className='dashboardContainer'>
      <div className="widgetsContainer">
        <Widgets title="Total Users" value={stats ? stats.totalUsers : 0} />
        <Widgets title="Total Artists" value={stats ? stats.totalArtists : 0} />
        <Widgets title="Total Artworks" value={stats ? stats.totalArtworks : 0} />
        <Widgets title="Total Orders" value={stats ? stats.totalOrders : 0} />
        <Widgets title="Total Sales (in Rs)" value={stats ? stats.totalSales : 0} />
      </div>

      <div className="featuredInfo">
        <NewUsers newUsers={newUsers} />
        <RecentOrders newOrders={newOrders} />
      </div>

      <div className="charts">
        <TopSellers topSellers={topSellers} />
        <BarChart barData={barData} />
      </div>
    </div>
  )
}

export default Dashboard
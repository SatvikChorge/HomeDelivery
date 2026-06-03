import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalReviews: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const statsRes = await axios.get("http://localhost:5000/api/admin/stats");
      setStats(statsRes.data);

      const ordersRes = await axios.get(
        "http://localhost:5000/api/admin/recent-orders"
      );
      setRecentOrders(ordersRes.data);

      const chartRes = await axios.get(
        "http://localhost:5000/api/admin/revenue-chart"
      );
      setChartData(chartRes.data);

      const productsRes = await axios.get("http://localhost:5000/api/products");
      
      const lowStock = productsRes.data.filter(
            (product) => Number(product.stock) <= 5

      );
      setLowStockProducts(lowStock);
    }


    fetchData();
  }, []);

  return (
    <div className="admin-page">
      <h1>Admin Analytics</h1>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>{stats.totalProducts}</h2>
          <p>Total Products</p>
        </div>

        <div className="admin-card">
          <h2>{stats.totalOrders}</h2>
          <p>Total Orders</p>
        </div>

        <div className="admin-card">
          <h2>₹{stats.totalRevenue}</h2>
          <p>Total Revenue</p>
        </div>

        <div className="admin-card">
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>

        <div className="admin-card">
          <h2>{stats.totalReviews}</h2>
          <p>Total Reviews</p>
        </div>
      </div>

      <div className="chart-box">
        <h2>Revenue Chart</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h2>Orders Chart</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2>Recent Orders</h2>

      {recentOrders.length === 0 ? (
        <p>No recent orders.</p>
      ) : (
        <div className="manage-list">
          {recentOrders.map((order) => (
            <div className="order-card" key={order.id}>
              <h3>Order #{order.id}</h3>
              <p>Customer: {order.customerName}</p>
              <p>Total: ₹{order.totalPrice}</p>
              <p>Payment: {order.paymentMethod}</p>
              <p>Status: {order.status}</p>
              <small>{new Date(order.created_at).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminAnalytics;
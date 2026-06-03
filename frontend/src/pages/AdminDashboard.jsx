import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useOrders } from "../context/OrderContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function AdminDashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>{products.length}</h2>
          <p>Total Products</p>
        </div>

        <div className="admin-card">
          <h2>{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div className="admin-card">
          <h2>{cartItems.length}</h2>
          <p>Cart Items</p>
        </div>

        <div className="admin-card">
          <h2>{wishlistItems.length}</h2>
          <p>Wishlist Items</p>
        </div>
      </div>

      <Link to="/admin/add-product">
        <button className="admin-main-btn">Add Product</button>
      </Link>

      <Link to="/admin/products">
        <button className="admin-main-btn">Manage Products</button>
      </Link>
      <Link to="/admin/orders">
        <button className="admin-main-btn">
          Manage Orders
        </button>
      </Link>
      <Link to="/admin/analytics">
  <button className="admin-main-btn">Analytics</button>
</Link>
    </div>
  );
}

export default AdminDashboard;
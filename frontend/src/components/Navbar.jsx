import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <h2>NonPerishKart 🛒</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/wishlist">
          Wishlist ({wishlistItems.length})
        </Link>

        <Link to="/orders">Orders</Link>

        {Boolean(user?.isAdmin) && <Link to="/admin">Admin</Link>}

        <button className="theme-btn" onClick={toggleTheme}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <Link to="/cart" className="cart-link">
          Cart
          {totalItems > 0 && (
            <span className="cart-badge">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="user-name">
              👤 {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
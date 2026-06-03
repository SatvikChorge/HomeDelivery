import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="success-page">
      <div className="success-card">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for shopping with NonPerishKart.</p>

        <Link to="/orders">
          <button>View Orders</button>
        </Link>

        <Link to="/products">
          <button className="secondary-btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
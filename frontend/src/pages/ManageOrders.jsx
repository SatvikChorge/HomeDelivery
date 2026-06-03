import { useOrders } from "../context/OrderContext";

function ManageOrders() {
  const { orders, updateOrderStatus } = useOrders();

  return (
    <div className="admin-page">
      <h1>Manage Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>Order #{order.id}</h3>

            <p>Status: <strong>{order.status}</strong></p>
            <p>Total: ₹{order.totalPrice}</p>
            <p>Payment: {order.paymentMethod}</p>

            <h4>Items</h4>
            {order.items.map((item) => (
              <p key={item.id}>
                {item.name} × {item.quantity} = ₹
                {item.discountPrice * item.quantity}
              </p>
            ))}

            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}

export default ManageOrders;
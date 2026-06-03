import { useOrders } from "../context/OrderContext";

function Orders() {
  const { orders } = useOrders();

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

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

            <h4>Delivery Details</h4>
            <p>Name: {order.customerName}</p>
            <p>Phone: {order.phone}</p>
            <p>
              Address: {order.address}, {order.city} - {order.pincode}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
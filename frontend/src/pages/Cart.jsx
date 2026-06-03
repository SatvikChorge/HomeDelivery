import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>
                  <span className="old-price">₹{item.price}</span>{" "}
                  <span className="new-price">₹{item.discountPrice}</span>
                </p>

                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span> {item.quantity} </span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>

                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <h2>Total: ₹ {totalPrice}</h2>

          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
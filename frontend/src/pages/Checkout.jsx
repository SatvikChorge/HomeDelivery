import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useCoupon } from "../context/CouponContext";
import toast from "react-hot-toast";

function Checkout() {
  const { cartItems, totalPrice } = useCart();
  const { placeOrder } = useOrders();
  const { discountPercent, appliedCoupon, applyCoupon, clearCoupon } = useCoupon();

  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const discountAmount = Math.round((totalPrice * discountPercent) / 100);
  const finalAmount = totalPrice - discountAmount;

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  function handleChange(e) {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  }

  function handleApplyCoupon() {
    applyCoupon(couponCode);
  }

  function handlePlaceOrder() {
    if (cartItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    if (
      !address.name ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.pincode
    ) {
      toast.error("Please fill all address fields!");
      return;
    }

    placeOrder(cartItems, finalAmount, {
      ...address,
      paymentMethod,
      appliedCoupon,
      discountPercent,
      discountAmount,
    });

    clearCoupon();
    navigate("/order-success");
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <form className="checkout-form">
          <h2>Delivery Address</h2>

          <input name="name" type="text" placeholder="Full Name" value={address.name} onChange={handleChange} />
          <input name="phone" type="text" placeholder="Phone Number" value={address.phone} onChange={handleChange} />
          <input name="address" type="text" placeholder="Address" value={address.address} onChange={handleChange} />
          <input name="city" type="text" placeholder="City" value={address.city} onChange={handleChange} />
          <input name="pincode" type="text" placeholder="Pincode" value={address.pincode} onChange={handleChange} />

          <h2>Payment Method</h2>

          <div className="payment-options">
            <label>
              <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
              Cash on Delivery
            </label>

            <label>
              <input type="radio" value="UPI" checked={paymentMethod === "UPI"} onChange={(e) => setPaymentMethod(e.target.value)} />
              UPI
            </label>

            <label>
              <input type="radio" value="Card" checked={paymentMethod === "Card"} onChange={(e) => setPaymentMethod(e.target.value)} />
              Credit / Debit Card
            </label>
          </div>

          <button type="button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity} = ₹
              {item.discountPrice * item.quantity}
            </p>
          ))}

          <div className="coupon-box">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />

            <button type="button" onClick={handleApplyCoupon}>
              Apply
            </button>
          </div>

          {appliedCoupon && (
            <p className="discount">
              Coupon {appliedCoupon} applied: {discountPercent}% OFF
            </p>
          )}

          <p>Subtotal: ₹{totalPrice}</p>
          <p>Discount: ₹{discountAmount}</p>
          <h3>Total: ₹{finalAmount}</h3>
          <p>Payment: {paymentMethod}</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
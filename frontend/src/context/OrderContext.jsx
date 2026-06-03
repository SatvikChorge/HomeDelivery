import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderContext = createContext();

const API_URL = "http://localhost:5000/api/orders";

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (error) {
      console.log("FETCH ORDERS ERROR:", error.response?.data || error.message);
      toast.error("Failed to fetch orders");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function placeOrder(cartItems, totalPrice, addressData) {
  try {
    await axios.post(API_URL, {
      totalPrice,
      paymentMethod: addressData.paymentMethod,
      customerName: addressData.name,
      phone: addressData.phone,
      address: addressData.address,
      city: addressData.city,
      pincode: addressData.pincode,
      items: cartItems,
    });

    toast.success("Order placed successfully!");
    fetchOrders();
  } catch (error) {
    console.log("PLACE ORDER ERROR:", error.response?.data || error.message);
    toast.error(error.response?.data?.error || "Failed to place order");
  }
}

  async function updateOrderStatus(id, status) {
  try {
    await axios.put(`${API_URL}/${id}/status`, { status });
    toast.success("Order status updated!");
    fetchOrders();
  } catch (error) {
    console.log("UPDATE ORDER ERROR:", error.response?.data || error.message);
    toast.error(error.response?.data?.error || "Failed to update order");
  }
}

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
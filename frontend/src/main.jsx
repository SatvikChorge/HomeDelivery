import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ReviewProvider } from "./context/ReviewContext";
import { CouponProvider } from "./context/CouponContext";
import { ThemeProvider } from "./context/ThemeContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <OrderProvider>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <ReviewProvider>
                  <CouponProvider>
                    <Toaster position="top-right" />
                    <App />
                  </CouponProvider>
                </ReviewProvider>
              </WishlistProvider>
            </CartProvider>
          </ProductProvider>
        </OrderProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
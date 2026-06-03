import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";
import OrderSuccess from "./pages/OrderSuccess"
import ManageOrders from "./pages/ManageOrders";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={<Checkout />}
        />
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin/add-product"
          element={<AddProduct />}
        />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route
          path="/admin/edit/:id"
          element={<EditProduct />}
        />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route
          path="/admin/orders"
          element={
            <ManageOrders />
          }
        />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />        

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
  
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          }
        />
  
        <Route
          path="/admin/edit/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
  
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>
          }
        />
  
        <Route
          path="/admin/analytics"
          element={
            <AdminRoute>
              <AdminAnalytics />
            </AdminRoute>
          }
        />
              </Routes>
            </BrowserRouter>
          );
        }

export default App;
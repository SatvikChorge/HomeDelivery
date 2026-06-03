import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProductContext = createContext();

const API_URL = "https://homedelivery-1.onrender.com/api/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function addProduct(product) {
  try {
    await axios.post(API_URL, product);
    toast.success("Product added successfully!");
    fetchProducts();
  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error.response?.data || error.message);
    toast.error(error.response?.data?.error || "Failed to add product");
  }
}

  async function deleteProduct(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success("Product deleted successfully!");
    fetchProducts();
  } catch (error) {
    console.log("DELETE PRODUCT ERROR:", error.response?.data || error.message);
    toast.error(error.response?.data?.error || "Failed to delete product");
  }
}

  async function updateProduct(id, updatedProduct) {
  try {
    await axios.put(`${API_URL}/${id}`, updatedProduct);
    toast.success("Product updated successfully!");
    fetchProducts();
  } catch (error) {
    console.log("UPDATE PRODUCT ERROR:", error.response?.data || error.message);
    toast.error(error.response?.data?.error || "Failed to update product");
  }
}

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  function addToWishlist(product) {
    const exists = wishlistItems.find((item) => item.id === product.id);

    if (exists) {
      toast.error(`${product.name} already in wishlist!`);
      return;
    }

    setWishlistItems([...wishlistItems, product]);
    toast.success(`${product.name} added to wishlist!`);
  }

  function removeFromWishlist(id) {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    toast.success("Removed from wishlist!");
  }

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="products-page">
      <h1>Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid">
          {wishlistItems.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />

              <button
                className="remove-wishlist-btn"
                onClick={() => removeFromWishlist(product.id)}
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
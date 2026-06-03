import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const discountPercent = Math.round(
    ((Number(product.price) - Number(product.discountPrice)) /
      Number(product.price)) *
      100
  );

  function handleAddToCart() {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  }

  return (
    <div className="card">
      <button className="wishlist-btn" onClick={() => addToWishlist(product)}>
        ❤
      </button>

      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>

      <div className="price-box">
        <span className="old-price">₹{product.price}</span>
        <span className="new-price">₹{product.discountPrice}</span>
        <span className="discount">{discountPercent}% OFF</span>
      </div>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
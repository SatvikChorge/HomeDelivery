import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useReviews } from "../context/ReviewContext";
import { useProducts } from "../context/ProductContext";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products } = useProducts();

  const { addReview, getProductReviews, getAverageRating } = useReviews();

  const product = products.find((item) => Number(item.id) === Number(id));

  const [reviews, setReviews] = useState([]);

  const [reviewData, setReviewData] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  async function loadReviews() {
    const data = await getProductReviews(id);
    setReviews(data);
  }

  useEffect(() => {
    loadReviews();
  }, [id]);

  if (!product) {
    return <h2 className="page">Product not found</h2>;
  }

  const averageRating = getAverageRating(reviews);

  const discountPercent = Math.round(
    ((Number(product.price) - Number(product.discountPrice)) /
      Number(product.price)) *
      100
  );

  function handleChange(e) {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();

    await addReview(id, reviewData);

    setReviewData({
      name: "",
      rating: 5,
      comment: "",
    });

    loadReviews();
  }

  return (
    <div>
      <div className="details-page">
        <img src={product.image} alt={product.name} />

        <div className="details-info">
          <h1>{product.name}</h1>

          <p className="category">{product.category}</p>

          <div className="price-box">
            <span className="old-price">₹{product.price}</span>
            <span className="new-price">₹{product.discountPrice}</span>
            <span className="discount">{discountPercent}% OFF</span>
          </div>

          <h3>⭐ {averageRating} / 5</h3>

          <p>{product.description}</p>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>

      <div className="review-section">
        <h2>Customer Reviews</h2>

        <form className="review-form" onSubmit={handleReviewSubmit}>
          <input
            name="name"
            placeholder="Your Name"
            value={reviewData.name}
            onChange={handleChange}
          />

          <select
            name="rating"
            value={reviewData.rating}
            onChange={handleChange}
          >
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>

          <textarea
            name="comment"
            placeholder="Write review..."
            value={reviewData.comment}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Submit Review</button>
        </form>

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div className="review-card" key={review.id}>
                <h4>{review.userName}</h4>
                <p>⭐ {review.rating}/5</p>
                <p>{review.comment}</p>
                <small>{new Date(review.created_at).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
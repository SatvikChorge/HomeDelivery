import { createContext, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ReviewContext = createContext();

const API_URL = "http://localhost:5000/api/reviews";

export function ReviewProvider({ children }) {
  async function addReview(productId, review) {
    try {
      await axios.post(API_URL, {
        productId,
        userName: review.name,
        rating: review.rating,
        comment: review.comment,
      });

      toast.success("Review added successfully!");
    } catch (error) {
      console.log("ADD REVIEW ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to add review");
    }
  }

  async function getProductReviews(productId) {
    try {
      const res = await axios.get(`${API_URL}/${productId}`);
      return res.data;
    } catch (error) {
      console.log("FETCH REVIEWS ERROR:", error.response?.data || error.message);
      toast.error("Failed to fetch reviews");
      return [];
    }
  }

  function getAverageRating(reviews) {
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating),
      0
    );

    return (total / reviews.length).toFixed(1);
  }

  return (
    <ReviewContext.Provider
      value={{ addReview, getProductReviews, getAverageRating }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewContext);
}
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Review {
  rating: number;
  feedback: string;
}

const ReviewSection = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch reviews (replace with actual API call)
    const fetchedReviews: Review[] = [
      { rating: 5, feedback: "Amazing service! Highly recommend." },
      { rating: 4, feedback: "Great experience, but room for improvement." },
    ];
    setReviews(fetchedReviews);
  }, []);

  const handleRatingClick = (value: number) => setRating(value);

  const handleFeedbackSubmit = () => {
    if (rating && feedback.trim()) {
      // Save the review (API integration needed here)
      const newReview = { rating, feedback };
      setReviews([newReview, ...reviews].slice(0, 2)); // Show last two reviews
      setRating(0);
      setFeedback("");
    } else {
      alert("Please provide a rating and feedback.");
    }
  };

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length ||
    0;

  const handleLoginRedirect = () => navigate("/login");

  return (
    <div className="relative bg-gray-100 py-10">
      {!isLoggedIn && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <button
            onClick={handleLoginRedirect}
            className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200"
          >
            Login to Leave a Review
          </button>
        </div>
      )}
      <div
        className={`container mx-auto px-4 ${
          !isLoggedIn ? "opacity-30" : "opacity-100"
        }`}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Leave a Review
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={30}
                className={`cursor-pointer ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your feedback..."
            className="w-full border border-gray-300 rounded-md p-3 mb-4"
            rows={4}
            disabled={!isLoggedIn}
          />
          <button
            onClick={handleFeedbackSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 disabled:bg-gray-400"
            disabled={!isLoggedIn}
          >
            Submit Review
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Overall Rating: {averageRating.toFixed(1)}
          </h3>
          <div className="space-y-4">
            {reviews.slice(0, 2).map((review, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={20}
                      className={`${
                        review.rating >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.feedback}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/reviews")}
            className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-900"
          >
            See All Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;

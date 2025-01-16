import { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaStar } from "react-icons/fa";
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

  return (
    <div className="relative bg-gray-100 py-10">
      <div
        className={`container mx-auto px-4 ${
          !isLoggedIn ? "opacity-30" : "opacity-100"
        }`}
      >
        {/* <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Show All Reviews
        </h2> */}
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
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800">
              Overall Rating:{" "}
              <span className="text-yellow-500">
                {averageRating.toFixed(1)}
              </span>
            </h3>
            <button
              onClick={() => navigate("/reviews")}
              className="flex items-center gap-2 text-blue-500 font-medium hover:text-blue-600 transition"
            >
              See All Reviews <FaArrowAltCircleRight size={20} />
            </button>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;

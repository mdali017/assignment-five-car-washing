import { useState } from "react";
import { FaArrowAltCircleRight, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} from "../../../redux/api/api";

// interface Review {
//   rating: number;
//   feedback: string;
// }

const ReviewSection: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  // API hooks
  const { data: reviewsData, isLoading: isReviewsLoading, refetch: refetchReviews } =
    useGetAllReviewsQuery(undefined);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const loggedInUserData = JSON.parse(localStorage.getItem("carWash") || "{}");
  const isLoggedIn = Boolean(loggedInUserData.user);
  const customerId = loggedInUserData?.user?.id || "";

  // Parse reviews data
  const reviews =
    reviewsData?.data?.map((item: any) => ({
      rating: item.ratings,
      feedback: item.reviewText,
    })) || [];

  const handleRatingClick = (value: number) => setRating(value);

  const handleFeedbackSubmit = async () => {
    if (rating && feedback.trim()) {
      try {
        const data = {
          customer: customerId,
          ratings: rating,
          reviewText: feedback,
        };

        await createReview({ data }).unwrap();
        refetchReviews();
        setFeedback("");
        setRating(0);
      } catch (error) {
        console.error("Error creating review:", error);
        alert("Failed to submit review. Please try again.");
      }
    } else {
      alert("Please provide a rating and feedback.");
    }
  };

  const averageRating =
    reviews.reduce((acc: any, review: any) => acc + review.rating, 0) /
      reviews.length || 0;

  if (isReviewsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="relative">
          {!isLoggedIn && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
              <div>
                <p className="text-white font-semibold text-lg">
                  Please log in to leave a review.
                </p>
                <Link to="/auth/login">
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </button>
                </Link>
              </div>
            </div>
          )}
          <div
            className={`bg-white shadow-lg rounded-lg p-6 relative z-0 ${
              !isLoggedIn ? "pointer-events-none" : ""
            }`}
          >
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
              disabled={!isLoggedIn || isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
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
            {reviews.slice(0, 2).map((review: any, index: any) => (
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

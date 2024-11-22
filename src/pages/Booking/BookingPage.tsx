import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface BookingState {
  service: {
    name: string;
    description: string;
    price: number;
  };
  selectedSlot: {
    date: string;
    startTime: string;
    endTime: string;
  };
}

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state as BookingState;

  // If no booking data is present, redirect to services
  React.useEffect(() => {
    if (!bookingData) {
      navigate('/services');
    }
  }, [bookingData, navigate]);

  const handlePayment = async () => {
    try {
      // Redirect to AAMARPAY for payment
      const paymentUrl = "https://sandbox.aamarpay.com/checkout"; // Replace with actual payment URL
      const formData = new URLSearchParams({
        cus_name: "User Name", // Replace with actual user name
        cus_email: "user@example.com", // Replace with actual user email
        amount: bookingData.service.price.toString(),
        tran_id: `BOOKING-${Date.now()}`, // Generate a unique transaction ID
      });

      // Submit payment data
      const response = await fetch(paymentUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (response.ok) {
        navigate("/success"); // Replace with the actual success page route
      } else {
        alert("Payment failed! Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("An error occurred during payment.");
    }
  };

  if (!bookingData) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col lg:flex-row p-6 max-w-4xl mx-auto gap-8">
      {/* Left Side: Service and Time Slot Details */}
      <div className="flex-1 border rounded-lg p-6 shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Service Details</h2>
        <p className="text-lg font-medium text-gray-700">{bookingData.service.name}</p>
        <p className="text-gray-600 mt-2">{bookingData.service.description}</p>
        <p className="text-gray-600 mt-2">
          Price: <span className="font-bold">${bookingData.service.price}</span>
        </p>
        <p className="text-gray-600 mt-2">
          Selected Slot:{" "}
          <span className="font-bold">
            {bookingData.selectedSlot.date} {bookingData.selectedSlot.startTime} -{" "}
            {bookingData.selectedSlot.endTime}
          </span>
        </p>
      </div>

      {/* Right Side: User Information Form */}
      <div className="flex-1 border rounded-lg p-6 shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">User Information</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="timeSlot">
              Selected Time Slot
            </label>
            <input
              type="text"
              id="timeSlot"
              value={`${bookingData.selectedSlot.date} ${bookingData.selectedSlot.startTime} - ${bookingData.selectedSlot.endTime}`}
              className="w-full p-3 border rounded-lg bg-gray-100"
              readOnly
            />
          </div>
          <button
            type="button"
            onClick={handlePayment}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
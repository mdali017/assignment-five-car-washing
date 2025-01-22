import React from "react";

const PaymentSuccess: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7 12h.01M15 12h.01M9 12l2 2 4-4"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction was successful.
        </p>
        <button
          onClick={() => (window.location.href = "/dashboard")} // Redirect example
          className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

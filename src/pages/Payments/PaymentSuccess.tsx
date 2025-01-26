// PaymentSuccess.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PaymentStatus {
  pay_status: string;
  cus_name: string;
  amount: string;
  currency: string;
  pay_time: string;
  tran_id: string;
}

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState<PaymentStatus | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get payment data from URL parameters
    const params = new URLSearchParams(location.search);
    const status = {
      pay_status: params.get("pay_status") || "",
      cus_name: params.get("cus_name") || "",
      amount: params.get("amount") || "",
      currency: params.get("currency") || "",
      pay_time: params.get("pay_time") || "",
      tran_id: params.get("tran_id") || "",
    };

    // if (status.pay_status === "Successful") {
    //   setPaymentData(status);
    // } else {
    //   // If no valid payment data, redirect to home
    //   navigate("/");
    // }
  }, [location, navigate]);

  // if (!paymentData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <div className="check-mark mt-4">
          <svg
            className="w-16 h-16 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* <div className="space-y-4">
        <div className="border-b pb-2">
          <p className="text-gray-600">Transaction ID</p>
          <p className="font-semibold">{paymentData.tran_id}</p>
        </div>
        <div className="border-b pb-2">
          <p className="text-gray-600">Customer Name</p>
          <p className="font-semibold">{paymentData.cus_name}</p>
        </div>
        <div className="border-b pb-2">
          <p className="text-gray-600">Amount</p>
          <p className="font-semibold">
            {paymentData.amount} {paymentData.currency}
          </p>
        </div>
        <div className="border-b pb-2">
          <p className="text-gray-600">Payment Time</p>
          <p className="font-semibold">{paymentData.pay_time}</p>
        </div>
      </div> */}

      <div className="mt-8">
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

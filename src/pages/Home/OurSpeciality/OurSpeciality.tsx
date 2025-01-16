import React from "react";

const OurSpeciality: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto my-12">
        <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
          <div>
            <h1 className="text-blue-700 text-3xl font-bold mb-4 whitespace-nowrap ">
              Revolutionize Your Car Wash Business with Advanced POS Solutions
            </h1>
            <p className="text-gray-700 mb-4">
              Managing a car wash business requires more than just keeping cars
              clean. With evolving customer demands and intense competition,
              having a robust POS system is essential to stand out and succeed.
            </p>
            <p className="text-gray-700 mb-4">
              Discover how our cutting-edge car wash POS system can help you:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Streamline daily operations</li>
              <li>Track and manage unlimited memberships</li>
              <li>Enhance customer loyalty with tailored promotions</li>
              <li>Gain actionable insights to boost profits</li>
              <li>Provide a seamless payment experience</li>
            </ul>
            <p className="text-gray-700 mb-6">
              Whether you're managing a single location or expanding your car
              wash business, our POS solution adapts to your needs and ensures
              your success.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-bold">
              Explore Our POS System
            </button>
          </div>

          <div className="mt-12">
            <img
              src="https://drb.com/getmedia/e6168879-a1f9-4b43-ad79-0e4afda12bcd/pos_car_wash_software_scalability.png"
              alt="Car Wash POS System"
              className="rounded-lg shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSpeciality;

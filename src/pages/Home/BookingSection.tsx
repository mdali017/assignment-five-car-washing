import React from "react";

const BookingSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 max-w-lg">
          <h2 className="text-4xl font-bold mb-4">Book Your Car Wash Today</h2>
          <p className="text-gray-600 mb-8">
            Experience a spotless shine with our quick and convenient car wash
            booking service
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors">
              Book
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <div className="bg-gray-200 rounded-lg w-full aspect-video">
            <img
              src="https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Car Wash Service"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;

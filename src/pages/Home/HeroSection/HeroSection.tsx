import React from "react";

const HeroSection: React.FC = () => {
  const services = [
    "Exterior Details",
    "Interior Details",
    "Internal Cleaning",
    "Water Stain Removal",
  ];

  return (
    <div className="w-full  mx-auto bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-r from-violet-500 to-violet-700 text-white ">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
            <span className="text-white font-medium">Magnetic Codes.</span>
          </div>

          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              CAR WASH
              <br />
              SERVICE
            </h1>
          </div>

          {/* Services List */}
          <div className="grid grid-cols-2 gap-y-3 my-3">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-orange-500"></div>
                <span className="text-white">{service}</span>
              </div>
            ))}
          </div>

          {/* Book Now Button */}
          <div className="relative mb-12">
            <button className="bg-orange-500 text-white px-8 py-3 clip-path-arrow hover:bg-orange-600 transition-colors">
              BOOK NOW
            </button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row gap-4 text-sm">
            <span>+123-456-7890</span>
            <span>www.reallygreasite.com</span>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

          {/* Car Image */}
          <img
            src="https://images.pexels.com/photos/6873178/pexels-photo-6873178.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Orange Sports Car"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Decorative Circles */}
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-orange-500/30 blur-2xl animate-pulse z-10"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-gray-500/50 blur-xl z-10"></div>

          {/* Content Overlay */}
          <div className="relative z-20 flex flex-col justify-end items-start p-8 h-full text-white">
            <h2 className="text-xl md:text-2xl font-bold">
              The Ultimate Car Wash
            </h2>
            <p className="text-sm md:text-base mt-2">
              Experience a sparkling finish like never before.
            </p>
            <button className="mt-4 px-6 py-2 bg-orange-500 text-sm md:text-base font-semibold rounded-md hover:bg-orange-600 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

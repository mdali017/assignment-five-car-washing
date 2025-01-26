import React from "react";
import heroImg from "../../../assets/hero_img.jpg";

const HeroSection: React.FC = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${heroImg}')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative  py-60 px-6 sm:px-8">
        <div className="max-w-3xl  ">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-white mb-2">
              Effortless Car Wash
            </h1>
            <h2 className="text-3xl font-bold text-white mb-6">
              Booking at Your Fingertips
            </h2>

            <p className="text-lg text-gray-200 mb-8">
              Experience a seamless car wash booking process tailored to your
              needs. Choose from a variety of services and schedule your
              appointment in just a few clicks!
            </p>

            <div className="flex gap-4">
              <button className="bg-white text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Book
              </button>
              <button className="text-white border border-white px-6 py-2 rounded-md font-medium hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

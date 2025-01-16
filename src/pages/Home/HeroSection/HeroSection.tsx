const HeroSection = () => {
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
        <div className="w-full md:w-1/2 p-8 md:p-12">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
            <span className="text-gray-700">Magnetic Codes.</span>
          </div>

          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
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
                <span className="text-gray-700">{service}</span>
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
          <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600">
            <span>+123-456-7890</span>
            <span>www.reallygreasite.com</span>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
          {/* Car Image Container */}
          <div className="relative h-full min-h-[300px] md:min-h-[400px]">
            {/* Using placeholder image - replace with actual car image in production */}
            <img
              src="https://images.pexels.com/photos/6873178/pexels-photo-6873178.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Orange Sports Car"
              className="absolute right-0 bottom-0 w-full h-auto object-cover transform translate-x-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

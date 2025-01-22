import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import FeaturedServices from "./FeaturedServices/FeaturedServices";
import HeroSection from "./HeroSection/HeroSection";
import OurSpeciality from "./OurSpeciality/OurSpeciality";
import ReviewSection from "./ReviewSection/ReviewSection";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 200px
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <HeroSection />
      <FeaturedServices />
      <OurSpeciality />
      <ReviewSection />

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Home;

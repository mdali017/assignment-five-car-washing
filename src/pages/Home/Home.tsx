import FeaturedServices from "./FeaturedServices/FeaturedServices";
import HeroSection from "./HeroSection/HeroSection";
import ReviewSection from "./ReviewSection/ReviewSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedServices />
      <ReviewSection isLoggedIn />
    </div>
  );
};

export default Home;

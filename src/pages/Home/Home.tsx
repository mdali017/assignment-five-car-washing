import FeaturedServices from "./FeaturedServices/FeaturedServices";
import HeroSection from "./HeroSection/HeroSection";
import OurSpeciality from "./OurSpeciality/OurSpeciality";
import ReviewSection from "./ReviewSection/ReviewSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedServices />
      <OurSpeciality />
      <ReviewSection />
    </div>
  );
};

export default Home;

import FeaturedServices from "./FeaturedServices/FeaturedServices";
import HeroSection from "./HeroSection/HeroSection";
import OurSpeciality from "./OurSpeciality/OurSpeciality";
import ReviewSection from "./ReviewSection/ReviewSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <OurSpeciality />
      <FeaturedServices />
      <ReviewSection isLoggedIn />
    </div>
  );
};

export default Home;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeatureSection";
import HowItWorks from "./components/HowItWorks";
import CompanionSection from "./components/CompanionSection";
import TrustSection from "./components/TrustSection";
import TestimonialsSection from "./components/TestimonialSection";
import Footer from "./components/Footer";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="bg-[#050510] text-white font-['Inter']">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CompanionSection />
      <TrustSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;

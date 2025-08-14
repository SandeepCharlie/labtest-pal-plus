
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TestCategories } from '@/components/TestCategories';
import { VideoTestimonials } from '@/components/VideoTestimonials';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Footer } from '@/components/Footer';
import { FloatingRecommendationButton } from '@/components/FloatingRecommendationButton';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <TestCategories />
      <VideoTestimonials />
      <WhyChooseUs />
      <Footer />
      <FloatingRecommendationButton />
    </div>
  );
};

export default Index;

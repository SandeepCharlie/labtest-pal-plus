
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { UpcomingTestReminder } from '@/components/UpcomingTestReminder';
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
      <div className="container mx-auto px-4">
        <UpcomingTestReminder />
      </div>
      <TestCategories />
      <VideoTestimonials />
      <WhyChooseUs />
      <Footer />
      <FloatingRecommendationButton />
    </div>
  );
};

export default Index;

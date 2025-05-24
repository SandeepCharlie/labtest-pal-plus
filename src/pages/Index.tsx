
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PopularTests } from '@/components/PopularTests';
import { HealthPackages } from '@/components/HealthPackages';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PopularTests />
      <HealthPackages />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Index;

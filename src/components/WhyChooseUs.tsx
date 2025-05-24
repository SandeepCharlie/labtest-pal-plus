
import { Shield, Clock, Home, Award, Headphones, FileText } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "NABL Certified Labs",
    description: "All our partner labs are NABL certified ensuring highest quality standards"
  },
  {
    icon: Home,
    title: "Home Sample Collection",
    description: "Trained phlebotomists collect samples from your home at your convenience"
  },
  {
    icon: Clock,
    title: "Fastest Reports",
    description: "Get your reports within 6-24 hours via email, SMS, and our mobile app"
  },
  {
    icon: Award,
    title: "Best Prices",
    description: "Up to 70% discount on lab tests with no compromise on quality"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round the clock customer support for all your queries and assistance"
  },
  {
    icon: FileText,
    title: "Digital Reports",
    description: "Secure digital reports accessible anytime, anywhere with doctor consultations"
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-medical-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LabTest+?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make lab testing simple, affordable, and reliable with our comprehensive services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <IconComponent className="w-8 h-8 text-medical-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

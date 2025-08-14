import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Stethoscope } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { SymptomTestRecommendation } from './SymptomTestRecommendation';

export const FloatingRecommendationButton: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-medical-primary hover:bg-medical-dark text-white rounded-full px-6 py-3 shadow-lg animate-pulse hover:animate-none transition-all duration-300 hover:scale-105"
        >
          <Stethoscope className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">
            {t('symptomRecommendation.findYourTest')}
          </span>
          <span className="sm:hidden">
            {t('symptomRecommendation.findTest')}
          </span>
        </Button>
      </div>

      <SymptomTestRecommendation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
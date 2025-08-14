import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X, Calendar } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { symptomTestMappings, availableSymptoms } from '@/data/symptomTestMapping';

interface SymptomTestRecommendationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SymptomTestRecommendation: React.FC<SymptomTestRecommendationProps> = ({
  isOpen,
  onClose
}) => {
  const { t } = useTranslation();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    }
  };

  const getRecommendations = () => {
    if (selectedSymptoms.length === 0) return;

    const matchedTests = new Set();
    symptomTestMappings.forEach(mapping => {
      const hasMatchingSymptoms = mapping.symptoms.some(symptom => 
        selectedSymptoms.includes(symptom)
      );
      if (hasMatchingSymptoms) {
        mapping.recommendedTests.forEach(test => matchedTests.add(test));
      }
    });

    setRecommendations(Array.from(matchedTests));
    setShowRecommendations(true);
  };

  const resetForm = () => {
    setSelectedSymptoms([]);
    setRecommendations([]);
    setShowRecommendations(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl text-foreground">
              {t('symptomRecommendation.title')}
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            {t('symptomRecommendation.subtitle')}
          </p>
        </DialogHeader>

        {!showRecommendations ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                {t('symptomRecommendation.selectSymptoms')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableSymptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom}
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={(checked) => 
                        handleSymptomChange(symptom, checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={symptom} 
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {t(`symptoms.${symptom}` as any)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={getRecommendations}
                disabled={selectedSymptoms.length === 0}
                className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-2"
              >
                <Search className="w-4 h-4 mr-2" />
                {t('symptomRecommendation.getRecommendation')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {t('symptomRecommendation.recommendedTests')}
              </h3>
              <Button 
                variant="outline" 
                onClick={resetForm}
                className="text-sm"
              >
                {t('symptomRecommendation.tryAgain')}
              </Button>
            </div>

            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((test: any, index) => (
                  <Card key={index} className="border border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-foreground">
                        {test.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">
                        {test.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-medical-primary">
                          ₹{test.price}
                        </div>
                        <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                          <Calendar className="w-4 h-4 mr-2" />
                          {t('common.bookNow')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {t('symptomRecommendation.noRecommendations')}
                </p>
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                  className="mt-4"
                >
                  {t('symptomRecommendation.tryAgain')}
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
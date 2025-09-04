import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

export const UpcomingTestReminder = () => {
  const { t } = useTranslation();
  
  // Demo data - in real app this would come from backend
  const upcomingTest = {
    testName: 'Lipid Profile',
    scheduledDate: 'Tomorrow',
    scheduledTime: '9:00 AM',
    preparationInstructions: [
      t('reminder.fastingRequired'),
      t('reminder.drinkWaterOnly'),
      t('reminder.avoidMedication')
    ]
  };

  // For demo purposes, always show the reminder
  // In real app, this would check if user has upcoming tests
  const hasUpcomingTests = true;

  if (!hasUpcomingTests) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-medical-light to-background border-medical-primary/20 mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-medical-primary">
          <Clock className="h-5 w-5" />
          {t('reminder.upcomingTestTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-medical-primary/10 p-2 rounded-lg">
            <Calendar className="h-4 w-4 text-medical-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{upcomingTest.testName}</h4>
            <p className="text-sm text-muted-foreground">
              {upcomingTest.scheduledDate} {t('reminder.at')} {upcomingTest.scheduledTime}
            </p>
          </div>
        </div>
        
        <div className="bg-accent/50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-medical-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-foreground mb-2">
                {t('reminder.preparationNeeded')}
              </p>
              <ul className="space-y-1">
                {upcomingTest.preparationInstructions.map((instruction, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-1 h-1 bg-medical-primary rounded-full"></span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
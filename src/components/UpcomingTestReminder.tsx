import { Clock, Calendar, AlertCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

export const UpcomingTestReminder = () => {
  const { t } = useTranslation();
  
  // Demo data - in real app this would come from backend
  const upcomingTest = {
    testName: 'Lipid Profile Test',
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
    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-l-4 border-l-amber-400 shadow-lg hover:shadow-xl transition-all duration-300 mb-8 mx-4 md:mx-0">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Reminder Icon */}
          <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
            <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          
          {/* Content */}
          <div className="flex-1 space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {t('reminder.upcomingTestTitle')}
              </h3>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {upcomingTest.testName}
              </p>
            </div>
            
            {/* Date & Time */}
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium">
                {upcomingTest.scheduledDate} {t('reminder.at')} {upcomingTest.scheduledTime}
              </span>
            </div>
            
            {/* Preparation Instructions */}
            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-amber-800 dark:text-amber-200 mb-2">
                    {t('reminder.preparationNeeded')}
                  </p>
                  <ul className="space-y-1">
                    {upcomingTest.preparationInstructions.map((instruction, index) => (
                      <li key={index} className="text-sm text-amber-700 dark:text-amber-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="italic">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-end pt-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white dark:bg-gray-800 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30"
              >
                <Eye className="h-4 w-4 mr-2" />
                {t('reminder.viewDetails')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
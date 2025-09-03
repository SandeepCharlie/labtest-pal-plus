import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  TestTube2, 
  FileText, 
  Download, 
  ChevronLeft,
  CheckCircle,
  Truck,
  FlaskConical,
  FileCheck,
  Star,
  User
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface TrackingStage {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  completed: boolean;
  current: boolean;
}

interface DemoBooking {
  booking_id: string;
  test_name: string;
  lab_name: string;
  booking_date: string;
  booking_time: string;
  status: 'in_progress' | 'completed';
  stages: TrackingStage[];
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
}

const TrackReportsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState<DemoBooking | null>(null);
  const [reportDownloaded, setReportDownloaded] = useState(false);

  // Demo bookings data
  const demoBookings: DemoBooking[] = [
    {
      booking_id: 'CBC001',
      test_name: 'Complete Blood Count (CBC)',
      lab_name: 'MedLab Diagnostics',
      booking_date: '2024-01-20',
      booking_time: '09:00',
      status: 'in_progress',
      stages: [
        {
          id: 'collected',
          title: t('demo.stages.collected'),
          description: t('demo.stages.collectedDesc'),
          icon: Truck,
          completed: true,
          current: false
        },
        {
          id: 'testing',
          title: t('demo.stages.testing'),
          description: t('demo.stages.testingDesc'),
          icon: FlaskConical,
          completed: false,
          current: true
        },
        {
          id: 'pending',
          title: t('demo.stages.pending'),
          description: t('demo.stages.pendingDesc'),
          icon: FileCheck,
          completed: false,
          current: false
        }
      ]
    },
    {
      booking_id: 'LIP002',
      test_name: 'Lipid Profile Test',
      lab_name: 'HealthFirst Lab',
      booking_date: '2024-01-15',
      booking_time: '08:30',
      status: 'completed',
      stages: [
        {
          id: 'collected',
          title: t('demo.stages.collected'),
          description: t('demo.stages.collectedDesc'),
          icon: Truck,
          completed: true,
          current: false
        },
        {
          id: 'testing',
          title: t('demo.stages.testing'),
          description: t('demo.stages.testingDesc'),
          icon: FlaskConical,
          completed: true,
          current: false
        },
        {
          id: 'ready',
          title: t('demo.stages.ready'),
          description: t('demo.stages.readyDesc'),
          icon: FileCheck,
          completed: true,
          current: false
        }
      ]
    }
  ];

  const dummyDoctors: Doctor[] = [
    {
      id: '1',
      name: t('demo.doctors.doctor1.name'),
      specialty: t('demo.doctors.doctor1.specialty'),
      rating: 4.8,
      experience: 12
    },
    {
      id: '2',
      name: t('demo.doctors.doctor2.name'),
      specialty: t('demo.doctors.doctor2.specialty'),
      rating: 4.9,
      experience: 8
    },
    {
      id: '3',
      name: t('demo.doctors.doctor3.name'),
      specialty: t('demo.doctors.doctor3.specialty'),
      rating: 4.7,
      experience: 15
    }
  ];

  const getProgressPercentage = (stages: TrackingStage[]): number => {
    const completedStages = stages.filter(stage => stage.completed).length;
    const currentStage = stages.find(stage => stage.current);
    return ((completedStages + (currentStage ? 0.5 : 0)) / stages.length) * 100;
  };

  const generateDummyReport = () => {
    // Create a simple text-based report content
    const reportContent = `
MEDICAL REPORT
==============

Patient Information:
- Test Name: ${selectedBooking?.test_name}
- Lab: ${selectedBooking?.lab_name}
- Date: ${selectedBooking?.booking_date}
- Booking ID: ${selectedBooking?.booking_id}

Test Results:
- All parameters within normal limits
- No abnormalities detected
- Recommendations: Continue regular health monitoring

Report generated on: ${new Date().toLocaleDateString()}
    `;

    // Create and download as text file (simulating PDF)
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${selectedBooking?.booking_id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setReportDownloaded(true);
  };

  // Initialize with first booking selected
  if (!selectedBooking && demoBookings.length > 0) {
    setSelectedBooking(demoBookings[0]);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          className="mb-6 flex items-center space-x-2"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('common.backToHome')}</span>
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{t('tracking.title')}</h1>
            <p className="text-muted-foreground">{t('tracking.subtitle')}</p>
          </div>

          {/* Reminder Notifications */}
          <div className="mb-8">
            <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-800 mb-1">{t('tracking.reminder.title')}</h3>
                    <p className="text-sm text-yellow-700">{t('tracking.reminder.message')}</p>
                    <p className="text-xs text-yellow-600 mt-2">{t('tracking.reminder.time')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Booking Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {demoBookings.map((booking) => {
              const progress = getProgressPercentage(booking.stages);
              const isCompleted = booking.status === 'completed';
              
              return (
                <Card key={booking.booking_id} className="h-fit">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{booking.test_name}</CardTitle>
                      <Badge variant={isCompleted ? "default" : "secondary"}>
                        {isCompleted ? t('demo.status.completed') : t('demo.status.inProgress')}
                      </Badge>
                    </div>
                    <CardDescription>
                      {t('demo.trackingId')}: {booking.booking_id}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="font-medium">{t('demo.lab')}</div>
                          <div className="text-muted-foreground">{booking.lab_name}</div>
                        </div>
                        <div>
                          <div className="font-medium">{t('demo.date')}</div>
                          <div className="text-muted-foreground flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(booking.booking_date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{t('demo.progress')}</span>
                          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {/* Stages Timeline */}
                      <div className="space-y-3">
                        {booking.stages.map((stage, index) => {
                          const Icon = stage.icon;
                          return (
                            <div key={stage.id} className="flex items-center space-x-3">
                              <div className={`p-1.5 rounded-full flex-shrink-0 ${
                                stage.completed ? 'bg-primary text-primary-foreground' :
                                stage.current ? 'bg-primary/20 text-primary' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {stage.completed ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Icon className="w-4 h-4" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className={`text-sm font-medium ${
                                    stage.completed ? 'text-foreground' :
                                    stage.current ? 'text-primary' :
                                    'text-muted-foreground'
                                  }`}>
                                    {stage.title}
                                  </span>
                                  {stage.current && (
                                    <Badge variant="outline" className="text-xs px-1 py-0">
                                      {t('demo.current')}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {isCompleted && (
                        <Button 
                          className="w-full" 
                          onClick={generateDummyReport}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {t('demo.downloadReport')}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Doctor Recommendations Section */}
          {reportDownloaded && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{t('demo.doctorRecommendations.title')}</span>
                </CardTitle>
                <CardDescription>
                  {t('demo.doctorRecommendations.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dummyDoctors.map((doctor) => (
                    <Card key={doctor.id} className="h-fit">
                      <CardContent className="p-4">
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <User className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{doctor.name}</h3>
                            <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                          </div>
                          <div className="flex items-center justify-center space-x-2 text-xs">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{doctor.rating}</span>
                            </div>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">
                              {doctor.experience} {t('demo.doctorRecommendations.years')}
                            </span>
                          </div>
                          <Button size="sm" className="w-full text-xs">
                            {t('demo.doctorRecommendations.bookConsultation')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackReportsPage;
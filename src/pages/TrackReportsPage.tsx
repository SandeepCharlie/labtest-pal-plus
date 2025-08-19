import { useState, useEffect } from 'react';
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
  Circle,
  Truck,
  FlaskConical,
  FileCheck
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';

interface TrackingStage {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  completed: boolean;
  current: boolean;
}

interface BookingInfo {
  booking_id: string;
  test_name: string;
  lab_name: string;
  booking_date: string;
  booking_time: string;
  booking_status: string;
}

const TrackReportsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingInfo | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('booking_id, test_name, lab_name, booking_date, booking_time, booking_status')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
      if (data && data.length > 0) {
        setSelectedBooking(data[0]); // Select most recent booking
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const getTrackingStages = (booking: BookingInfo): TrackingStage[] => {
    const currentDate = new Date();
    const bookingDate = new Date(booking.booking_date);
    const daysSinceBooking = Math.floor((currentDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Simulate different stages based on days since booking
    let currentStage = 0;
    if (daysSinceBooking >= 1) currentStage = 1;
    if (daysSinceBooking >= 2) currentStage = 2;
    if (daysSinceBooking >= 3) currentStage = 3;

    return [
      {
        id: 'scheduled',
        title: t('tracking.stages.scheduled'),
        description: t('tracking.stages.scheduledDesc'),
        icon: Calendar,
        completed: currentStage > 0,
        current: currentStage === 0
      },
      {
        id: 'collected',
        title: t('tracking.stages.collected'),
        description: t('tracking.stages.collectedDesc'),
        icon: Truck,
        completed: currentStage > 1,
        current: currentStage === 1
      },
      {
        id: 'testing',
        title: t('tracking.stages.testing'),
        description: t('tracking.stages.testingDesc'),
        icon: FlaskConical,
        completed: currentStage > 2,
        current: currentStage === 2
      },
      {
        id: 'ready',
        title: t('tracking.stages.ready'),
        description: t('tracking.stages.readyDesc'),
        icon: FileCheck,
        completed: currentStage > 3,
        current: currentStage === 3
      }
    ];
  };

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
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            className="mb-6 flex items-center space-x-2"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>

          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardContent>
              <TestTube2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <CardTitle className="mb-2">No Active Bookings</CardTitle>
              <CardDescription className="mb-6">
                Book a test to track your reports and sample collection progress.
              </CardDescription>
              <Button onClick={() => navigate('/')}>
                Book a Test Now
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const stages = selectedBooking ? getTrackingStages(selectedBooking) : [];
  const progress = selectedBooking ? getProgressPercentage(stages) : 0;
  const isReportReady = stages[3]?.completed;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center space-x-2"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Your Bookings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.booking_id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedBooking?.booking_id === booking.booking_id
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="font-medium text-sm truncate">{booking.test_name}</div>
                  <div className="text-xs text-muted-foreground">{booking.booking_id}</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {booking.booking_status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Main Tracking Content */}
          <div className="lg:col-span-2 space-y-6">
            {selectedBooking && (
              <>
                {/* Booking Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Sample Progress</span>
                      <Badge variant={isReportReady ? "default" : "secondary"}>
                        {isReportReady ? "Report Ready" : "In Progress"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Tracking ID: {selectedBooking.booking_id}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm font-medium">Test Name</div>
                        <div className="text-sm text-muted-foreground">{selectedBooking.test_name}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Lab</div>
                        <div className="text-sm text-muted-foreground">{selectedBooking.lab_name}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Date</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(selectedBooking.booking_date).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Time</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {selectedBooking.booking_time}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                    </div>

                    {isReportReady && (
                      <Button 
                        className="w-full mb-4" 
                        onClick={generateDummyReport}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Timeline</CardTitle>
                    <CardDescription>Track your sample journey from collection to report</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {stages.map((stage, index) => {
                        const Icon = stage.icon;
                        return (
                          <div key={stage.id} className="flex items-start space-x-4">
                            <div className="flex flex-col items-center">
                              <div className={`p-2 rounded-full ${
                                stage.completed ? 'bg-primary text-primary-foreground' :
                                stage.current ? 'bg-primary/20 text-primary' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {stage.completed ? (
                                  <CheckCircle className="w-5 h-5" />
                                ) : (
                                  <Icon className="w-5 h-5" />
                                )}
                              </div>
                              {index < stages.length - 1 && (
                                <div className={`w-0.5 h-12 mt-2 ${
                                  stage.completed ? 'bg-primary' : 'bg-muted'
                                }`} />
                              )}
                            </div>
                            <div className="flex-1 pb-6">
                              <div className="flex items-center space-x-2">
                                <h3 className={`font-medium ${
                                  stage.completed ? 'text-foreground' :
                                  stage.current ? 'text-primary' :
                                  'text-muted-foreground'
                                }`}>
                                  {stage.title}
                                </h3>
                                {stage.current && (
                                  <Badge variant="outline" className="text-xs">Current</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {stage.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackReportsPage;
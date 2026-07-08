import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X, Calendar, Volume2, Mic, MicOff } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { symptomTestMappings, availableSymptoms } from '@/data/symptomTestMapping';

interface SymptomTestRecommendationProps {
  isOpen: boolean;
  onClose: () => void;
}

// Minimal shape of the Web Speech API's SpeechRecognition -- not part of the standard
// DOM lib typings, so we declare just what this component actually uses.
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: (() => void) | null;
  onresult: ((event: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechWindow extends Window {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
}

// Maps the app's language codes to BCP-47 tags understood by the Web Speech APIs.
const SPEECH_LANG: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
  te: 'te-IN',
};

export const SymptomTestRecommendation: React.FC<SymptomTestRecommendationProps> = ({
  isOpen,
  onClose
}) => {
  const { t } = useTranslation();
  const { selectedLanguage } = useLanguage();
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [heardText, setHeardText] = useState('');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const speechLang = SPEECH_LANG[selectedLanguage.code] || 'en-IN';
  const speechWindow = window as unknown as SpeechWindow;
  const speechSupported =
    typeof window !== 'undefined' &&
    !!(speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition);
  const ttsSupported = typeof window !== 'undefined' && !!window.speechSynthesis;

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    }
  };

  // Reads every symptom option aloud in the currently selected language, for users who
  // find it easier to listen than to read a grid of medical-ish terms.
  const handleListenAloud = () => {
    if (!ttsSupported) return;
    window.speechSynthesis.cancel();
    const names = availableSymptoms.map((s) => t(`symptoms.${s}` as any)).join(', ');
    const utterance = new SpeechSynthesisUtterance(names);
    utterance.lang = speechLang;
    window.speechSynthesis.speak(utterance);
  };

  // Lets a user speak their symptoms instead of tapping checkboxes, then auto-selects
  // any symptom whose translated label matches (in either direction) what was heard.
  const handleVoiceInput = () => {
    if (!speechSupported) return;

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const RecognitionCtor = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!RecognitionCtor) return;
    const recognition = new RecognitionCtor();
    recognition.lang = speechLang;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setHeardText('');
    };

    recognition.onresult = (event) => {
      const transcript: string = event.results?.[0]?.[0]?.transcript || '';
      setHeardText(transcript);

      const lowerTranscript = transcript.toLowerCase();
      const matched = availableSymptoms.filter((symptom) => {
        const label = t(`symptoms.${symptom}` as any).toLowerCase();
        return lowerTranscript.includes(label) || label.includes(lowerTranscript);
      });

      if (matched.length > 0) {
        setSelectedSymptoms((prev) => Array.from(new Set([...prev, ...matched])));
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
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
    setHeardText('');
  };

  const handleClose = () => {
    window.speechSynthesis?.cancel();
    recognitionRef.current?.stop();
    resetForm();
    onClose();
  };

  // Takes the recommended test straight into the lab-selection funnel, the same place
  // TestDetail's "Book Now" sends people -- this button used to do nothing at all.
  const handleBookNow = (test: any) => {
    window.speechSynthesis?.cancel();
    onClose();
    const params = new URLSearchParams({
      testId: test.id,
      testName: test.name,
      testPrice: test.price.toString()
    });
    navigate(`/lab-selection?${params.toString()}`);
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
            <div className="flex flex-wrap gap-2">
              {ttsSupported && (
                <Button variant="outline" size="sm" onClick={handleListenAloud} type="button">
                  <Volume2 className="w-4 h-4 mr-2" />
                  {t('symptomRecommendation.listenAloud')}
                </Button>
              )}
              {speechSupported && (
                <Button
                  variant={isListening ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleVoiceInput}
                  type="button"
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 mr-2" />
                  ) : (
                    <Mic className="w-4 h-4 mr-2" />
                  )}
                  {isListening
                    ? t('symptomRecommendation.listening')
                    : t('symptomRecommendation.speakSymptoms')}
                </Button>
              )}
            </div>

            {heardText && (
              <p className="text-sm text-muted-foreground">
                {t('symptomRecommendation.heardYou')}: "{heardText}"
              </p>
            )}

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
                        <Button
                          className="bg-medical-primary hover:bg-medical-dark text-white"
                          onClick={() => handleBookNow(test)}
                        >
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

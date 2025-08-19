
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="text-2xl font-bold text-medical-primary">
                LabTest<span className="text-medical-secondary">+</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              {t('footer.company')}
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-medical-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-medical-primary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-medical-primary cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-medical-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-medical-primary transition-colors">{t('nav.labTests')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-primary transition-colors">{t('packages.title')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-primary transition-colors">{t('nav.homeCollection')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-primary transition-colors">{t('nav.healthArticles')}</a></li>
              <li><a href="/track-reports" className="text-gray-300 hover:text-medical-primary transition-colors">Track Sample & Reports</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-primary transition-colors">Book Appointment</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-medical-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-primary transition-colors">Track Order</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-primary transition-colors">Cancellation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-primary transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-medical-primary transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contactInfo')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-medical-primary" />
                <span className="text-gray-300">1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-medical-primary" />
                <span className="text-gray-300">support@labtest.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-medical-primary mt-1" />
                <span className="text-gray-300">
                  123 Healthcare Street,<br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-medical-primary transition-colors">{t('footer.privacyPolicy')}</a>
            <a href="#" className="text-gray-400 hover:text-medical-primary transition-colors">{t('footer.termsOfService')}</a>
            <a href="#" className="text-gray-400 hover:text-medical-primary transition-colors">{t('footer.cookiePolicy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

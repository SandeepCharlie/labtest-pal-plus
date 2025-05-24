
import { Search, MapPin, User, Heart, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Get medicines & health products delivered</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">24/7 Support</span>
            <span className="text-medical-primary">📞 1800-123-4567</span>
          </div>
        </div>
        
        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-medical-primary">
              LabTest<span className="text-medical-secondary">+</span>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Deliver to</span>
            <span className="font-medium text-gray-900">Mumbai 400001</span>
          </div>
          
          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search for lab tests, health checkups" 
                className="pl-10 w-full"
              />
            </div>
          </div>
          
          {/* User actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="border-t pt-3 pb-4">
          <ul className="flex space-x-8">
            <li><a href="#" className="text-medical-primary font-medium hover:text-medical-dark">Lab Tests</a></li>
            <li><a href="#" className="text-gray-600 hover:text-medical-primary">Health Checkups</a></li>
            <li><a href="#" className="text-gray-600 hover:text-medical-primary">Popular Packages</a></li>
            <li><a href="#" className="text-gray-600 hover:text-medical-primary">Home Collection</a></li>
            <li><a href="#" className="text-gray-600 hover:text-medical-primary">Reports</a></li>
            <li><a href="#" className="text-gray-600 hover:text-medical-primary">Health Articles</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

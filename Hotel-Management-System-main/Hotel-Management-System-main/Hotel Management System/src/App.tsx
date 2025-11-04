import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { RoomsManagement } from './components/RoomsManagement';
import { BookingsManagement } from './components/BookingsManagement';
import { GuestManagement } from './components/GuestManagement';
import { AIConcierge } from './components/AIConcierge';
import { RoomInspection } from './components/RoomInspection';
import { Analytics } from './components/Analytics';
import { ReviewAnalysis } from './components/ReviewAnalysis';
import { StaffManagement } from './components/StaffManagement';
import { SmartBookingBot } from './components/SmartBookingBot';
import { VirtualTour } from './components/VirtualTour';
import { AIRecommendations } from './components/AIRecommendations';
import { HomePage } from './components/HomePage';
import { HotelList } from './components/HotelList';
import { HotelDetails } from './components/HotelDetails';
import { CustomerBooking } from './components/CustomerBooking';
import { AdminHotelManagement } from './components/AdminHotelManagement';
import { AuthModal } from './components/AuthModal';
import { 
  LayoutDashboard, 
  BedDouble, 
  Calendar, 
  Users, 
  MessageSquare, 
  Camera, 
  BarChart3, 
  Star,
  UserCog,
  Settings,
  Menu,
  X,
  Bot,
  Video,
  Sparkles,
  Home,
  List,
  Info,
  ShoppingCart,
  Building,
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { Badge } from './components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';

interface User {
  name: string;
  email: string;
  location: { lat: number; lng: number };
}

type TabType = 'dashboard' | 'rooms' | 'bookings' | 'guests' | 'ai-concierge' | 'smart-bot' | 'virtual-tour' | 'ai-recommendations' | 'inspection' | 'analytics' | 'reviews' | 'staff' | 'home' | 'hotel-list' | 'hotel-details' | 'customer-booking' | 'admin-hotels';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer');
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const customerNavigation = [
    { id: 'home' as TabType, name: 'Home', icon: Home },
    { id: 'hotel-list' as TabType, name: 'Browse Hotels', icon: List },
    { id: 'hotel-details' as TabType, name: 'Hotel Details', icon: Info },
    { id: 'customer-booking' as TabType, name: 'Book Now', icon: ShoppingCart },
    { id: 'smart-bot' as TabType, name: 'Smart Booking Bot', icon: Bot },
    { id: 'virtual-tour' as TabType, name: 'Virtual Tour', icon: Video },
    { id: 'ai-recommendations' as TabType, name: 'AI Recommendations', icon: Sparkles },
  ];

  const adminNavigation = [
    { id: 'dashboard' as TabType, name: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin-hotels' as TabType, name: 'Hotel Management', icon: Building },
    { id: 'rooms' as TabType, name: 'Rooms', icon: BedDouble },
    { id: 'bookings' as TabType, name: 'Bookings', icon: Calendar },
    { id: 'guests' as TabType, name: 'Guests', icon: Users },
    { id: 'ai-concierge' as TabType, name: 'AI Concierge', icon: MessageSquare },
    { id: 'inspection' as TabType, name: 'Room Inspection', icon: Camera },
    { id: 'analytics' as TabType, name: 'Analytics', icon: BarChart3 },
    { id: 'reviews' as TabType, name: 'Review Analysis', icon: Star },
    { id: 'staff' as TabType, name: 'Staff', icon: UserCog },
  ];

  const navigation = viewMode === 'customer' ? customerNavigation : adminNavigation;

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderContent = () => {
    const contentProps = { user };
    
    switch (activeTab) {
      case 'home':
        return <HomePage {...contentProps} />;
      case 'hotel-list':
        return <HotelList {...contentProps} />;
      case 'hotel-details':
        return <HotelDetails />;
      case 'customer-booking':
        return <CustomerBooking />;
      case 'dashboard':
        return <Dashboard />;
      case 'admin-hotels':
        return <AdminHotelManagement />;
      case 'smart-bot':
        return <SmartBookingBot />;
      case 'virtual-tour':
        return <VirtualTour />;
      case 'ai-recommendations':
        return <AIRecommendations />;
      case 'rooms':
        return <RoomsManagement />;
      case 'bookings':
        return <BookingsManagement />;
      case 'guests':
        return <GuestManagement />;
      case 'ai-concierge':
        return <AIConcierge />;
      case 'inspection':
        return <RoomInspection />;
      case 'analytics':
        return <Analytics />;
      case 'reviews':
        return <ReviewAnalysis />;
      case 'staff':
        return <StaffManagement />;
      default:
        return <HomePage {...contentProps} />;
    }
  };

  return (
    <>
      <Toaster />
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLogin={handleLogin}
      />
      <div className="flex h-screen bg-slate-50">
        {/* Sidebar */}
        <aside
        className={`bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col shadow-2xl`}
      >
        <div className="p-4 border-b border-white/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl">GrandStay AI</h1>
                <p className="text-xs text-blue-100">Smart Hotel Management</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-white/20"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          {sidebarOpen && (
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'customer' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setViewMode('customer');
                  setActiveTab('home');
                }}
                className={viewMode === 'customer' ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
              >
                Customer
              </Button>
              <Button
                variant={viewMode === 'admin' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setViewMode('admin');
                  setActiveTab('dashboard');
                }}
                className={viewMode === 'admin' ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
              >
                Admin
              </Button>
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-lg transform scale-105'
                    : 'text-white hover:bg-white/20 hover:shadow-md'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.name}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/20 space-y-2">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white hover:bg-white/20 transition-all">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-white/20 text-white">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {sidebarOpen && (
                      <div className="flex-1 text-left">
                        <div className="text-sm">{user.name}</div>
                        <div className="text-xs text-blue-100 truncate">{user.email}</div>
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserIcon className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={() => setAuthModalOpen(true)}
              className="w-full bg-white text-indigo-600 hover:bg-white/90"
            >
              <LogIn className="h-5 w-5 mr-2 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm">Sign In</span>}
            </Button>
          )}
        </div>
      </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </>
  );
}

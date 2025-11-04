import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  MapPin, 
  Calendar as CalendarIcon, 
  Users,
  Star,
  TrendingUp,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Navigation
} from 'lucide-react';
import { format } from 'date-fns@3.0.0';

interface User {
  name: string;
  email: string;
  location: { lat: number; lng: number };
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviews: number;
  pricePerNight: number;
  image: string;
  hygieneScore: number;
  topRated: boolean;
  distance?: number;
}

interface HomePageProps {
  user?: User | null;
}

// Helper function to calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance * 10) / 10;
};

const topRatedHotelsBase: Hotel[] = [
  {
    id: '1',
    name: 'Grand Luxury Resort',
    location: 'Miami Beach, FL',
    coordinates: { lat: 25.7907, lng: -80.1300 },
    rating: 4.9,
    reviews: 1234,
    pricePerNight: 350,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    hygieneScore: 9.8,
    topRated: true
  },
  {
    id: '2',
    name: 'Skyline Plaza Hotel',
    location: 'New York, NY',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    rating: 4.8,
    reviews: 892,
    pricePerNight: 420,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    hygieneScore: 9.5,
    topRated: true
  },
  {
    id: '3',
    name: 'Ocean View Paradise',
    location: 'Los Angeles, CA',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    rating: 4.9,
    reviews: 1567,
    pricePerNight: 380,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    hygieneScore: 9.9,
    topRated: true
  },
  {
    id: '4',
    name: 'Mountain Peak Lodge',
    location: 'Denver, CO',
    coordinates: { lat: 39.7392, lng: -104.9903 },
    rating: 4.7,
    reviews: 678,
    pricePerNight: 280,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    hygieneScore: 9.4,
    topRated: true
  },
  {
    id: '5',
    name: 'Urban Boutique Suites',
    location: 'San Francisco, CA',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    rating: 4.8,
    reviews: 945,
    pricePerNight: 395,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    hygieneScore: 9.6,
    topRated: true
  }
];

export function HomePage({ user }: HomePageProps) {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState('2');
  const [topRatedHotels, setTopRatedHotels] = useState<Hotel[]>(topRatedHotelsBase);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Calculate distances when user location changes
  useEffect(() => {
    if (user?.location) {
      const hotelsWithDistance = topRatedHotelsBase.map(hotel => ({
        ...hotel,
        distance: calculateDistance(
          user.location.lat,
          user.location.lng,
          hotel.coordinates.lat,
          hotel.coordinates.lng
        )
      }));
      
      // Sort by distance
      hotelsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      setTopRatedHotels(hotelsWithDistance);
    } else {
      setTopRatedHotels(topRatedHotelsBase);
    }
  }, [user]);

  const handleSearch = () => {
    console.log('Search:', { location, checkInDate, checkOutDate, guests });
    // Navigate to hotel list page
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(topRatedHotels.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(topRatedHotels.length / 3)) % Math.ceil(topRatedHotels.length / 3));
  };

  const visibleHotels = topRatedHotels.slice(currentSlide * 3, currentSlide * 3 + 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10 px-4 max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Shield className="h-3 w-3 mr-1" />
              Book in USDC via Arc
            </Badge>
            <h1 className="text-5xl mb-4">Find Your Perfect Stay</h1>
            <p className="text-xl text-blue-100 mb-8">
              {user 
                ? `Welcome back, ${user.name.split(' ')[0]}! Discover hotels near you with AI-powered recommendations` 
                : 'AI-powered hotel booking with blockchain payments & hygiene verification'
              }
            </p>

            {/* Search Bar */}
            <Card className="bg-white shadow-2xl max-w-4xl mx-auto">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-sm text-slate-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Location
                    </label>
                    <Input
                      placeholder="Where to?"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="border-slate-200"
                    />
                  </div>

                  {/* Check-in Date */}
                  <div className="space-y-2">
                    <label className="text-sm text-slate-600 flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      Check-in
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          {checkInDate ? format(checkInDate, 'MMM dd, yyyy') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out Date */}
                  <div className="space-y-2">
                    <label className="text-sm text-slate-600 flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      Check-out
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          {checkOutDate ? format(checkOutDate, 'MMM dd, yyyy') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <label className="text-sm text-slate-600 flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Guests
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="border-slate-200"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSearch}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  size="lg"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Hotels
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg mb-2">USDC Payments via Arc</h3>
              <p className="text-sm text-slate-600">
                Secure blockchain payments with instant confirmation
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg mb-2">AI-Powered Matching</h3>
              <p className="text-sm text-slate-600">
                Smart recommendations based on your preferences
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg mb-2">Hygiene Verified</h3>
              <p className="text-sm text-slate-600">
                CNN-powered visual inspection & hygiene scoring
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top-Rated Hotels Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl mb-2">
                {user ? 'Hotels Near You' : 'Top-Rated Hotels'}
              </h2>
              <p className="text-slate-600">
                {user 
                  ? 'Sorted by distance from your location' 
                  : 'Handpicked stays with verified hygiene scores'
                }
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleHotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
                <div className="relative h-56">
                  <ImageWithFallback
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-white text-slate-900 border-0 shadow-lg">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {hotel.rating}
                  </Badge>
                  <Badge className="absolute top-3 left-3 bg-green-500 text-white border-0">
                    <Shield className="h-3 w-3 mr-1" />
                    {hotel.hygieneScore}/10
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl mb-2">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-slate-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    {hotel.location}
                  </div>
                  {hotel.distance && user && (
                    <div className="flex items-center gap-1 text-sm text-blue-600 mb-3">
                      <Navigation className="h-4 w-4" />
                      <span>{hotel.distance} km away from you</span>
                    </div>
                  )}
                  {!hotel.distance && (
                    <div className="mb-3"></div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      {hotel.reviews.toLocaleString()} reviews
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-slate-600" />
                      <span className="text-2xl text-blue-600">{hotel.pricePerNight}</span>
                      <span className="text-sm text-slate-600">/night</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

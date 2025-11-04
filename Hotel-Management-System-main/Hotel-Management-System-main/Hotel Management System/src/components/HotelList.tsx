import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Star, 
  Shield,
  Wifi,
  Coffee,
  Car,
  Dumbbell,
  Wind,
  Waves,
  DollarSign,
  SlidersHorizontal,
  Navigation
} from 'lucide-react';

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
  distance: number;
  facilities: string[];
}

interface HotelListProps {
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

const allHotelsBase: Hotel[] = [
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
    distance: 2.3,
    facilities: ['wifi', 'pool', 'gym', 'parking', 'spa']
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
    distance: 1.5,
    facilities: ['wifi', 'gym', 'parking', 'restaurant']
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
    distance: 3.8,
    facilities: ['wifi', 'pool', 'spa', 'restaurant']
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
    distance: 5.2,
    facilities: ['wifi', 'parking', 'restaurant', 'gym']
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
    distance: 0.8,
    facilities: ['wifi', 'gym', 'restaurant']
  },
  {
    id: '6',
    name: 'Coastal Breeze Hotel',
    location: 'Seattle, WA',
    coordinates: { lat: 47.6062, lng: -122.3321 },
    rating: 4.6,
    reviews: 523,
    pricePerNight: 310,
    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800',
    hygieneScore: 9.3,
    distance: 4.1,
    facilities: ['wifi', 'pool', 'parking', 'spa']
  },
  {
    id: '7',
    name: 'Downtown Executive Inn',
    location: 'Chicago, IL',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    rating: 4.5,
    reviews: 412,
    pricePerNight: 265,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    hygieneScore: 9.1,
    distance: 2.7,
    facilities: ['wifi', 'gym', 'parking']
  },
  {
    id: '8',
    name: 'Sunset Resort & Spa',
    location: 'San Diego, CA',
    coordinates: { lat: 32.7157, lng: -117.1611 },
    rating: 4.9,
    reviews: 1823,
    pricePerNight: 445,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    hygieneScore: 9.7,
    distance: 6.5,
    facilities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'parking']
  }
];

const facilityIcons: { [key: string]: any } = {
  wifi: Wifi,
  pool: Waves,
  gym: Dumbbell,
  parking: Car,
  spa: Wind,
  restaurant: Coffee
};

export function HotelList({ user }: HotelListProps) {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [minHygieneScore, setMinHygieneScore] = useState(0);
  const [allHotels, setAllHotels] = useState<Hotel[]>(allHotelsBase);
  const [filteredHotels, setFilteredHotels] = useState(allHotelsBase);

  const facilities = ['wifi', 'pool', 'gym', 'parking', 'spa', 'restaurant'];

  // Calculate distances when user location changes
  useEffect(() => {
    if (user?.location) {
      const hotelsWithDistance = allHotelsBase.map(hotel => ({
        ...hotel,
        distance: calculateDistance(
          user.location.lat,
          user.location.lng,
          hotel.coordinates.lat,
          hotel.coordinates.lng
        )
      }));
      
      // Sort by distance
      hotelsWithDistance.sort((a, b) => a.distance - b.distance);
      setAllHotels(hotelsWithDistance);
      setFilteredHotels(hotelsWithDistance);
    } else {
      setAllHotels(allHotelsBase);
      setFilteredHotels(allHotelsBase);
    }
  }, [user]);

  const handleFacilityToggle = (facility: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facility) 
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const applyFilters = () => {
    let filtered = allHotels.filter(hotel => {
      const priceMatch = hotel.pricePerNight >= priceRange[0] && hotel.pricePerNight <= priceRange[1];
      const hygieneMatch = hotel.hygieneScore >= minHygieneScore;
      const facilitiesMatch = selectedFacilities.length === 0 || 
        selectedFacilities.every(f => hotel.facilities.includes(f));
      
      return priceMatch && hygieneMatch && facilitiesMatch;
    });
    setFilteredHotels(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl mb-2">
            {user ? 'Hotels Near You' : 'Available Hotels'}
          </h1>
          <p className="text-slate-600">
            {filteredHotels.length} properties found
            {user && ' • Sorted by distance from your location'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="h-5 w-5" />
                  <h2 className="text-xl">Filters</h2>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label>Price per Night</Label>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="py-4"
                  />
                </div>

                {/* Hygiene Score */}
                <div className="space-y-3">
                  <Label>Minimum Hygiene Score</Label>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{minHygieneScore}/10</span>
                  </div>
                  <Slider
                    value={[minHygieneScore]}
                    onValueChange={(value) => setMinHygieneScore(value[0])}
                    max={10}
                    step={0.1}
                    className="py-4"
                  />
                </div>

                {/* Facilities */}
                <div className="space-y-3">
                  <Label>Facilities</Label>
                  {facilities.map((facility) => {
                    const Icon = facilityIcons[facility];
                    return (
                      <div key={facility} className="flex items-center space-x-2">
                        <Checkbox
                          id={facility}
                          checked={selectedFacilities.includes(facility)}
                          onCheckedChange={() => handleFacilityToggle(facility)}
                        />
                        <label
                          htmlFor={facility}
                          className="text-sm capitalize flex items-center gap-2 cursor-pointer"
                        >
                          <Icon className="h-4 w-4" />
                          {facility}
                        </label>
                      </div>
                    );
                  })}
                </div>

                <Button 
                  onClick={applyFilters}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Hotel Cards */}
          <div className="lg:col-span-3 space-y-4">
            {filteredHotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="relative h-64 md:h-auto">
                    <ImageWithFallback
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-green-500 text-white border-0">
                      <Shield className="h-3 w-3 mr-1" />
                      Hygiene: {hotel.hygieneScore}/10
                    </Badge>
                  </div>
                  
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl mb-2">{hotel.name}</h3>
                        <div className="flex items-center gap-2 text-slate-600 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{hotel.location}</span>
                        </div>
                        {user && (
                          <div className="flex items-center gap-1 text-sm text-blue-600">
                            <Navigation className="h-4 w-4" />
                            <span>{hotel.distance} km away from you</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg">{hotel.rating}</span>
                        </div>
                        <div className="text-xs text-slate-600">{hotel.reviews} reviews</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.facilities.map((facility) => {
                        const Icon = facilityIcons[facility];
                        return (
                          <Badge key={facility} variant="outline" className="gap-1">
                            <Icon className="h-3 w-3" />
                            <span className="capitalize">{facility}</span>
                          </Badge>
                        );
                      })}
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      <div className="text-sm text-slate-600">
                        <div className="mb-1">Estimated travel time:</div>
                        <div>{Math.round(hotel.distance * 3)} minutes by car</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <DollarSign className="h-5 w-5 text-slate-600" />
                          <span className="text-3xl text-blue-600">{hotel.pricePerNight}</span>
                          <span className="text-slate-600">/night</span>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

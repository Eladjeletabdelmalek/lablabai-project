import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  Clock,
  Check,
  Navigation,
  Phone,
  Mail,
  CheckCircle
} from 'lucide-react';

export function HotelDetails() {
  const [selectedImage, setSelectedImage] = useState(0);

  const hotel = {
    name: 'Grand Luxury Resort',
    location: 'Miami Beach, FL',
    address: '123 Ocean Drive, Miami Beach, FL 33139',
    rating: 4.9,
    reviews: 1234,
    pricePerNight: 350,
    description: 'Experience luxury at its finest in our oceanfront resort. With breathtaking views, world-class amenities, and exceptional service, your stay will be unforgettable. Our resort features spacious rooms, multiple dining options, a full-service spa, and direct beach access.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800'
    ],
    hygieneScore: 9.8,
    hygieneDetails: {
      roomCleanliness: 9.9,
      bathroomCleanliness: 9.8,
      commonAreas: 9.7,
      kitchenStandards: 9.8,
      airQuality: 9.9
    },
    facilities: [
      { icon: Wifi, name: 'Free WiFi', available: true },
      { icon: Waves, name: 'Swimming Pool', available: true },
      { icon: Dumbbell, name: 'Fitness Center', available: true },
      { icon: Car, name: 'Free Parking', available: true },
      { icon: Wind, name: 'Spa & Wellness', available: true },
      { icon: Coffee, name: 'Restaurant', available: true }
    ],
    distance: 2.3,
    travelTime: 7
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-3">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <ImageWithFallback
                src={hotel.images[selectedImage]}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            {hotel.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-28 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  selectedImage === index ? 'border-blue-600' : 'border-transparent'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${hotel.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl mb-2">{hotel.name}</h1>
                    <div className="flex items-center gap-2 text-slate-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="text-sm text-slate-600">{hotel.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl">{hotel.rating}</span>
                    </div>
                    <div className="text-sm text-slate-600">{hotel.reviews} reviews</div>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed">{hotel.description}</p>
              </CardContent>
            </Card>

            {/* Hygiene Index */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Hygiene Index Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl text-green-600 mb-2">{hotel.hygieneScore}</div>
                    <div className="text-sm text-slate-600">out of 10 • Excellent</div>
                  </div>
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="#e2e8f0"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="#10b981"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(hotel.hygieneScore / 10) * 364} 364`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  {Object.entries(hotel.hygieneDetails).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm">{value}/10</span>
                      </div>
                      <Progress value={value * 10} className="h-2" />
                    </div>
                  ))}
                </div>

                <Badge className="bg-green-100 text-green-700 border-0">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  CNN-Verified Inspection
                </Badge>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>Facilities & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.facilities.map((facility, index) => {
                    const Icon = facility.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="text-sm">{facility.name}</div>
                          {facility.available && (
                            <div className="text-xs text-green-600 flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              Available
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Location & Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location & Distance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-slate-200 rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600">Interactive Map</p>
                      <p className="text-sm text-slate-500">{hotel.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Distance</span>
                    </div>
                    <div className="text-2xl">{hotel.distance} km</div>
                    <div className="text-xs text-slate-600">from city center</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Travel Time</span>
                    </div>
                    <div className="text-2xl">{hotel.travelTime} min</div>
                    <div className="text-xs text-slate-600">by car</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="text-sm text-slate-600 mb-1">Price per night</div>
                  <div className="text-4xl text-blue-600 mb-1">${hotel.pricePerNight}</div>
                  <div className="text-sm text-slate-600">+ taxes & fees</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm mb-1">Pay with USDC via Arc</div>
                        <div className="text-xs text-slate-600">
                          Secure blockchain payment with instant confirmation
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Free cancellation up to 24h</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Instant booking confirmation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>No hidden fees</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 mb-3" size="lg">
                  Book Now
                </Button>

                <div className="text-center space-y-2 pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                    <Phone className="h-4 w-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4" />
                    <span>info@grandluxury.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

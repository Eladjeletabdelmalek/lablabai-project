import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Camera, 
  Video, 
  Maximize2, 
  Eye,
  MapPin,
  Navigation,
  Play,
  Pause,
  RotateCw,
  Glasses,
  Smartphone,
  Monitor,
  Sparkles,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  BedDouble
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TourSpot {
  id: string;
  name: string;
  type: 'room' | 'facility' | 'exterior';
  image: string;
  description: string;
  features: string[];
  virtualTourUrl?: string;
}

const tourSpots: TourSpot[] = [
  {
    id: 'lobby',
    name: 'Grand Lobby',
    type: 'facility',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc2MjAxMTI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Welcome to our stunning grand lobby featuring marble floors, crystal chandeliers, and 24/7 concierge service.',
    features: ['Crystal Chandeliers', 'Marble Floors', 'Concierge Desk', 'Seating Lounge'],
  },
  {
    id: 'deluxe-room',
    name: 'Deluxe Room',
    type: 'room',
    image: 'https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMDE0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Experience luxury in our spacious deluxe rooms with king-size beds, smart controls, and stunning city views.',
    features: ['King Bed', 'Smart TV', 'Mini Bar', 'City View', 'Work Desk'],
  },
  {
    id: 'suite',
    name: 'Presidential Suite',
    type: 'room',
    image: 'https://images.unsplash.com/photo-1744000311897-510b64f9a2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjE5ODU4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Ultimate luxury with separate living areas, panoramic views, jacuzzi, and personalized service.',
    features: ['Separate Living Room', 'Jacuzzi', 'Panoramic Views', 'Private Balcony', 'Butler Service'],
  },
  {
    id: 'spa',
    name: 'Luxury Spa',
    type: 'facility',
    image: 'https://images.unsplash.com/photo-1604161926875-bb58f9a0d81b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHNwYSUyMHdlbGxuZXNzfGVufDF8fHx8MTc2MjAwNzEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rejuvenate in our world-class spa featuring massage therapy, sauna, and wellness treatments.',
    features: ['Massage Rooms', 'Sauna', 'Steam Room', 'Relaxation Lounge', 'Beauty Treatments'],
  },
  {
    id: 'reception',
    name: 'Reception Area',
    type: 'facility',
    image: 'https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlY2VwdGlvbiUyMGRlc2t8ZW58MXx8fHwxNzYxOTg5ODgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Modern reception with digital check-in kiosks and multilingual staff ready to assist you.',
    features: ['Digital Kiosks', '24/7 Staff', 'Luggage Storage', 'Express Check-in'],
  },
  {
    id: 'penthouse',
    name: 'Penthouse View',
    type: 'room',
    image: 'https://images.unsplash.com/photo-1705328223284-5a6cd4456a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBlbnRob3VzZXxlbnwxfHx8fDE3NjIwNzE0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Exclusive top-floor penthouse with 360° city views, private terrace, and premium amenities.',
    features: ['360° Views', 'Private Terrace', 'Full Kitchen', 'Home Theater', 'Wine Cellar'],
  },
];

export function VirtualTour() {
  const [selectedSpot, setSelectedSpot] = useState<TourSpot>(tourSpots[0]);
  const [viewMode, setViewMode] = useState<'2d' | '3d' | 'vr'>('2d');
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleStartTour = (spot: TourSpot) => {
    setSelectedSpot(spot);
    setIsPlaying(true);
    toast.success(`Starting virtual tour of ${spot.name}`);
  };

  const handleVRMode = () => {
    setViewMode('vr');
    toast.success('VR mode activated! Put on your VR headset for immersive experience');
  };

  const handle360Rotation = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const currentIndex = tourSpots.findIndex(spot => spot.id === selectedSpot.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % tourSpots.length;
    setSelectedSpot(tourSpots[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + tourSpots.length) % tourSpots.length;
    setSelectedSpot(tourSpots[prevIndex]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Virtual Tour & 3D Experience</h1>
        <p className="text-slate-600">Explore our hotel with AI-powered virtual reality and 360° views</p>
      </div>

      {/* View Mode Selection */}
      <Card className="bg-gradient-to-br from-purple-500 to-blue-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl mb-2">Choose Your Experience</h3>
              <p className="text-sm opacity-90">Select how you'd like to explore our hotel</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant={viewMode === '2d' ? 'secondary' : 'outline'}
                onClick={() => setViewMode('2d')}
                className={viewMode === '2d' ? '' : 'text-white border-white hover:bg-white/20'}
              >
                <Monitor className="h-4 w-4 mr-2" />
                2D View
              </Button>
              <Button
                variant={viewMode === '3d' ? 'secondary' : 'outline'}
                onClick={() => setViewMode('3d')}
                className={viewMode === '3d' ? '' : 'text-white border-white hover:bg-white/20'}
              >
                <Camera className="h-4 w-4 mr-2" />
                360° View
              </Button>
              <Button
                variant={viewMode === 'vr' ? 'secondary' : 'outline'}
                onClick={handleVRMode}
                className={viewMode === 'vr' ? '' : 'text-white border-white hover:bg-white/20'}
              >
                <Glasses className="h-4 w-4 mr-2" />
                VR Mode
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="bg-slate-900 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {selectedSpot.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {viewMode.toUpperCase()}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Enhanced
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-slate-900">
                <ImageWithFallback
                  src={selectedSpot.image}
                  alt={selectedSpot.name}
                  className="w-full h-full object-cover"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
                
                {/* VR Overlay */}
                {viewMode === 'vr' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Glasses className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                      <p className="text-xl">VR Mode Active</p>
                      <p className="text-sm opacity-80">Connect your VR headset to experience</p>
                    </div>
                  </div>
                )}

                {/* 360° Markers */}
                {viewMode === '3d' && (
                  <>
                    <button className="absolute top-1/2 left-1/4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="absolute top-1/3 right-1/3 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                      <Eye className="h-4 w-4" />
                    </button>
                  </>
                )}

                {/* Navigation Arrows */}
                <button 
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      {viewMode === '3d' && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={handle360Rotation}
                        >
                          <RotateCw className="h-4 w-4 mr-1" />
                          Rotate
                        </Button>
                      )}
                      <Button size="sm" variant="secondary">
                        <Maximize2 className="h-4 w-4 mr-1" />
                        Fullscreen
                      </Button>
                    </div>
                    <div className="text-white text-sm">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      {currentIndex + 1} / {tourSpots.length}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Space</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">{selectedSpot.description}</p>
              <div>
                <div className="text-sm mb-2">Features:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedSpot.features.map((feature, index) => (
                    <Badge key={index} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tour Spots List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tour Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Tabs defaultValue="all">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="rooms" className="flex-1">Rooms</TabsTrigger>
                  <TabsTrigger value="facilities" className="flex-1">Facilities</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-2 mt-4">
                  {tourSpots.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => handleStartTour(spot)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedSpot.id === spot.id
                          ? 'bg-blue-50 border-blue-300'
                          : 'hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={spot.image}
                            alt={spot.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm mb-1 truncate">{spot.name}</div>
                          <Badge variant="outline" className="text-xs">
                            {spot.type === 'room' ? <BedDouble className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
                            {spot.type}
                          </Badge>
                        </div>
                        {selectedSpot.id === spot.id && (
                          <Eye className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </TabsContent>

                <TabsContent value="rooms" className="space-y-2 mt-4">
                  {tourSpots.filter(spot => spot.type === 'room').map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => handleStartTour(spot)}
                      className="w-full text-left p-3 rounded-lg border hover:bg-slate-50 transition-all"
                    >
                      <div className="text-sm mb-1">{spot.name}</div>
                      <div className="text-xs text-slate-600">{spot.features.length} features</div>
                    </button>
                  ))}
                </TabsContent>

                <TabsContent value="facilities" className="space-y-2 mt-4">
                  {tourSpots.filter(spot => spot.type === 'facility').map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => handleStartTour(spot)}
                      className="w-full text-left p-3 rounded-lg border hover:bg-slate-50 transition-all"
                    >
                      <div className="text-sm mb-1">{spot.name}</div>
                      <div className="text-xs text-slate-600">{spot.features.length} features</div>
                    </button>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span>AI Features</span>
              </div>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></div>
                  <span>AI-enhanced image quality</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></div>
                  <span>Smart navigation assistance</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></div>
                  <span>Real-time availability overlay</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></div>
                  <span>VR/AR compatibility</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Video className="h-4 w-4 mr-2" />
            Start Guided Tour
          </Button>
          <Button variant="outline" className="w-full">
            <Smartphone className="h-4 w-4 mr-2" />
            Send to Mobile
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Upload,
  Image as ImageIcon,
  Plus,
  X,
  Save,
  MapPin,
  DollarSign,
  Shield,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Camera,
  Building
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface HotelPhoto {
  id: string;
  url: string;
  type: 'room' | 'exterior' | 'facility';
}

export function AdminHotelManagement() {
  const [hotelName, setHotelName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [photos, setPhotos] = useState<HotelPhoto[]>([]);
  const [hygieneScores, setHygieneScores] = useState({
    roomCleanliness: 9.0,
    bathroomCleanliness: 9.0,
    commonAreas: 9.0,
    kitchenStandards: 9.0,
    airQuality: 9.0
  });

  const existingHotels = [
    {
      id: '1',
      name: 'Grand Luxury Resort',
      location: 'Miami Beach, FL',
      hygieneScore: 9.8,
      lastUpdated: '2025-11-01',
      status: 'active'
    },
    {
      id: '2',
      name: 'Skyline Plaza Hotel',
      location: 'New York, NY',
      hygieneScore: 9.5,
      lastUpdated: '2025-10-28',
      status: 'active'
    },
    {
      id: '3',
      name: 'Ocean View Paradise',
      location: 'Los Angeles, CA',
      hygieneScore: 9.9,
      lastUpdated: '2025-11-02',
      status: 'active'
    }
  ];

  const handlePhotoUpload = (type: 'room' | 'exterior' | 'facility') => {
    // Simulate photo upload
    const newPhoto: HotelPhoto = {
      id: Date.now().toString(),
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      type
    };
    setPhotos([...photos, newPhoto]);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} photo uploaded successfully`);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
    toast.success('Photo removed');
  };

  const handleSaveHotel = () => {
    if (!hotelName || !location || !description || !pricePerNight) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Hotel details saved successfully!');
  };

  const handleUpdateHygieneScore = () => {
    toast.success('Hygiene scores updated successfully!');
  };

  const averageHygieneScore = 
    (hygieneScores.roomCleanliness + 
     hygieneScores.bathroomCleanliness + 
     hygieneScores.commonAreas + 
     hygieneScores.kitchenStandards + 
     hygieneScores.airQuality) / 5;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Hotel Management</h1>
        <p className="text-slate-600">Upload and manage hotel details, photos, and hygiene scores</p>
      </div>

      <Tabs defaultValue="add-hotel" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="add-hotel">Add Hotel</TabsTrigger>
          <TabsTrigger value="manage-photos">Photos</TabsTrigger>
          <TabsTrigger value="hygiene-scores">Hygiene Scores</TabsTrigger>
        </TabsList>

        {/* Add Hotel Tab */}
        <TabsContent value="add-hotel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Hotel Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hotelName">Hotel Name *</Label>
                  <Input
                    id="hotelName"
                    placeholder="Grand Luxury Resort"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="location"
                      placeholder="Miami Beach, FL"
                      className="pl-10"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your hotel, amenities, and what makes it special..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Night (USD) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="350"
                    className="pl-10"
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={handleSaveHotel}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Hotel Details
              </Button>
            </CardContent>
          </Card>

          {/* Existing Hotels */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Hotels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {existingHotels.map((hotel) => (
                  <div key={hotel.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div>
                      <h3 className="mb-1">{hotel.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-3 w-3" />
                        {hotel.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <Badge className="bg-green-100 text-green-700 border-0 mb-1">
                          <Shield className="h-3 w-3 mr-1" />
                          {hotel.hygieneScore}/10
                        </Badge>
                        <div className="text-xs text-slate-500">
                          Updated {hotel.lastUpdated}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Photos Tab */}
        <TabsContent value="manage-photos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Room Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Room Photos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => handlePhotoUpload('room')}
                  variant="outline"
                  className="w-full h-32 border-dashed border-2"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                    <div className="text-sm text-slate-600">Upload Room Photo</div>
                  </div>
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  {photos.filter(p => p.type === 'room').map((photo) => (
                    <div key={photo.id} className="relative group">
                      <ImageWithFallback
                        src={photo.url}
                        alt="Room"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Exterior Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exterior Photos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => handlePhotoUpload('exterior')}
                  variant="outline"
                  className="w-full h-32 border-dashed border-2"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                    <div className="text-sm text-slate-600">Upload Exterior Photo</div>
                  </div>
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  {photos.filter(p => p.type === 'exterior').map((photo) => (
                    <div key={photo.id} className="relative group">
                      <ImageWithFallback
                        src={photo.url}
                        alt="Exterior"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Facility Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Facility Photos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => handlePhotoUpload('facility')}
                  variant="outline"
                  className="w-full h-32 border-dashed border-2"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                    <div className="text-sm text-slate-600">Upload Facility Photo</div>
                  </div>
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  {photos.filter(p => p.type === 'facility').map((photo) => (
                    <div key={photo.id} className="relative group">
                      <ImageWithFallback
                        src={photo.url}
                        alt="Facility"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="mb-2">Photo Guidelines</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Upload high-quality images (minimum 1920x1080)</li>
                    <li>• Use natural lighting and clear angles</li>
                    <li>• Photos will be automatically processed by CNN for quality verification</li>
                    <li>• Remove any photos with personal information</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hygiene Scores Tab */}
        <TabsContent value="hygiene-scores" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Update Hygiene Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Score Display */}
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                <div className="text-6xl text-green-600 mb-2">
                  {averageHygieneScore.toFixed(1)}
                </div>
                <div className="text-slate-600">Overall Hygiene Score</div>
                <Badge className={`mt-2 ${
                  averageHygieneScore >= 9 ? 'bg-green-500' :
                  averageHygieneScore >= 8 ? 'bg-yellow-500' : 'bg-red-500'
                } text-white border-0`}>
                  {averageHygieneScore >= 9 ? 'Excellent' :
                   averageHygieneScore >= 8 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>

              {/* Individual Score Sliders */}
              <div className="space-y-6">
                {Object.entries(hygieneScores).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <span className="text-lg">{value.toFixed(1)}/10</span>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={(newValue) => 
                        setHygieneScores({ ...hygieneScores, [key]: newValue[0] })
                      }
                      max={10}
                      step={0.1}
                      className="py-4"
                    />
                    <Progress value={value * 10} className="h-2" />
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleUpdateHygieneScore}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Update Hygiene Scores
              </Button>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-700">
                    <div className="mb-1">CNN-Powered Verification</div>
                    <p className="text-slate-600">
                      Scores are automatically verified through computer vision analysis of uploaded photos.
                      Manual adjustments should only be made after physical inspections.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Score Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: '2025-11-02', score: 9.8, inspector: 'AI System', type: 'Automated' },
                  { date: '2025-10-28', score: 9.6, inspector: 'John Admin', type: 'Manual' },
                  { date: '2025-10-15', score: 9.7, inspector: 'AI System', type: 'Automated' }
                ].map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span>{entry.date}</span>
                        <Badge variant="outline" className="text-xs">
                          {entry.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-600">
                        Updated by {entry.inspector}
                      </div>
                    </div>
                    <div className="text-2xl text-green-600">{entry.score}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

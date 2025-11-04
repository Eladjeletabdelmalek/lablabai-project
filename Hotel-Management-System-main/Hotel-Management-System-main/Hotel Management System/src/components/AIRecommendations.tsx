import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Sparkles, 
  TrendingUp, 
  Heart,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Star,
  ThumbsUp,
  Target,
  Zap,
  Brain,
  Award,
  Gift
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'room' | 'package' | 'upgrade' | 'experience';
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  matchScore: number;
  reasons: string[];
  image: string;
  tags: string[];
  popularity: number;
}

const recommendations: Recommendation[] = [
  {
    id: 'rec1',
    type: 'room',
    title: 'Deluxe Room with City View',
    description: 'Perfect for your 3-night business trip based on your preferences and travel history.',
    price: 170,
    originalPrice: 200,
    matchScore: 98,
    reasons: [
      'Matches your preferred price range',
      'High-speed WiFi for business needs',
      'Previous guests with similar profiles rated 4.9/5',
      '15% discount available for your dates'
    ],
    image: 'https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMDE0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Business Friendly', 'WiFi', 'City View'],
    popularity: 92,
  },
  {
    id: 'rec2',
    type: 'package',
    title: 'Romantic Weekend Package',
    description: 'Suite + Spa + Champagne dinner - AI detected this matches your upcoming anniversary.',
    price: 599,
    originalPrice: 750,
    matchScore: 95,
    reasons: [
      'Anniversary date detected in booking',
      '20% off couples packages this month',
      'Includes complimentary spa treatments',
      'Champagne dinner at rooftop restaurant'
    ],
    image: 'https://images.unsplash.com/photo-1744000311897-510b64f9a2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjE5ODU4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Romantic', 'Spa', 'Dining'],
    popularity: 88,
  },
  {
    id: 'rec3',
    type: 'upgrade',
    title: 'Penthouse Upgrade',
    description: 'Upgrade to our presidential penthouse for just $150 more per night.',
    price: 150,
    matchScore: 87,
    reasons: [
      'Only 1 unit left for your dates',
      'Special upgrade rate (normally $300 more)',
      'Includes butler service',
      'VIP lounge access'
    ],
    image: 'https://images.unsplash.com/photo-1705328223284-5a6cd4456a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBlbnRob3VzZXxlbnwxfHx8fDE3NjIwNzE0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Luxury', 'Limited', 'VIP'],
    popularity: 95,
  },
  {
    id: 'rec4',
    type: 'experience',
    title: 'Local Food Tour Experience',
    description: 'Guided culinary tour of the city\'s best restaurants - perfect for food enthusiasts.',
    price: 89,
    matchScore: 82,
    reasons: [
      'Based on your dining preferences',
      'Highly rated by guests from your city',
      'Available during your stay dates',
      'Small group experience'
    ],
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc2MjAxMTI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Experience', 'Food', 'Local'],
    popularity: 78,
  },
];

export function AIRecommendations() {
  const [budget, setBudget] = useState([0, 1000]);
  const [preferences, setPreferences] = useState({
    luxury: true,
    business: false,
    family: false,
    romantic: true,
    adventure: false,
  });
  const [sortBy, setSortBy] = useState<'match' | 'price' | 'popularity'>('match');

  const filteredRecommendations = recommendations
    .filter(rec => rec.price >= budget[0] && rec.price <= budget[1])
    .sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'price':
          return a.price - b.price;
        case 'popularity':
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    return 'text-orange-600';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'room':
        return MapPin;
      case 'package':
        return Gift;
      case 'upgrade':
        return TrendingUp;
      case 'experience':
        return Award;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">AI Recommendations</h1>
        <p className="text-slate-600">Personalized suggestions powered by machine learning algorithms</p>
      </div>

      {/* AI Insights Banner */}
      <Card className="bg-gradient-to-br from-purple-500 to-blue-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Brain className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl mb-2">Your AI Profile Score: 94%</h3>
              <p className="text-sm opacity-90 mb-3">
                Our AI has analyzed your preferences, booking history, and behavior patterns to create these personalized recommendations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4" />
                    <span>Match Accuracy</span>
                  </div>
                  <div className="text-lg">96.5%</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-4 w-4" />
                    <span>Predictions Made</span>
                  </div>
                  <div className="text-lg">1,247</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Satisfaction Rate</span>
                  </div>
                  <div className="text-lg">98.2%</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-3 block">Budget Range</Label>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  max={1000}
                  step={50}
                  className="mb-2"
                />
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>${budget[0]}</span>
                  <span>${budget[1]}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Travel Style</Label>
                {Object.entries(preferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={key} className="capitalize cursor-pointer">
                      {key}
                    </Label>
                    <Switch
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, [key]: checked })
                      }
                    />
                  </div>
                ))}
              </div>

              <div>
                <Label className="mb-2 block">Sort By</Label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSortBy('match')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      sortBy === 'match' ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100'
                    }`}
                  >
                    <Target className="h-4 w-4 inline mr-2" />
                    Best Match
                  </button>
                  <button
                    onClick={() => setSortBy('price')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      sortBy === 'price' ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100'
                    }`}
                  >
                    <DollarSign className="h-4 w-4 inline mr-2" />
                    Price
                  </button>
                  <button
                    onClick={() => setSortBy('popularity')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      sortBy === 'popularity' ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100'
                    }`}
                  >
                    <Star className="h-4 w-4 inline mr-2" />
                    Popularity
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2 text-green-700">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm">AI Learning</span>
              </div>
              <p className="text-xs text-slate-600">
                The more you interact, the better our recommendations become!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Grid */}
        <div className="lg:col-span-3 space-y-4">
          {filteredRecommendations.map((rec) => {
            const TypeIcon = getTypeIcon(rec.type);
            return (
              <Card key={rec.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="relative h-48 md:h-auto">
                    <ImageWithFallback
                      src={rec.image}
                      alt={rec.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-purple-600 text-white border-0">
                        <TypeIcon className="h-3 w-3 mr-1" />
                        {rec.type}
                      </Badge>
                    </div>
                    {rec.originalPrice && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-red-500 text-white border-0">
                          Save ${rec.originalPrice - rec.price}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl mb-1">{rec.title}</h3>
                        <p className="text-sm text-slate-600">{rec.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        {rec.originalPrice && (
                          <div className="text-sm line-through text-slate-400">
                            ${rec.originalPrice}
                          </div>
                        )}
                        <div className="text-2xl text-blue-600">${rec.price}</div>
                      </div>
                    </div>

                    {/* AI Match Score */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">AI Match Score</span>
                        </div>
                        <span className={`text-sm ${getMatchColor(rec.matchScore)}`}>
                          {rec.matchScore}%
                        </span>
                      </div>
                      <Progress value={rec.matchScore} className="h-2" />
                    </div>

                    {/* Reasons */}
                    <div className="mb-4">
                      <div className="text-sm mb-2">Why we recommend this:</div>
                      <div className="space-y-1">
                        {rec.reasons.map((reason, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags and Action */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex flex-wrap gap-2">
                        {rec.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredRecommendations.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Sparkles className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">No recommendations match your filters</p>
                <p className="text-sm text-slate-500">Try adjusting your budget range or preferences</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

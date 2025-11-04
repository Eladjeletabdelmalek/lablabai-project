import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Star, 
  TrendingUp, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Smile,
  Meh,
  Frown,
  Sparkles,
  Calendar
} from 'lucide-react';

interface Review {
  id: string;
  guestName: string;
  rating: number;
  date: string;
  comment: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  categories: {
    service: number;
    cleanliness: number;
    location: number;
    value: number;
  };
  aiInsights: string[];
}

const reviews: Review[] = [
  {
    id: 'R001',
    guestName: 'Sarah Johnson',
    rating: 5,
    date: '2025-11-01',
    comment: 'Absolutely amazing experience! The staff was incredibly helpful and friendly. The room was spotless and the amenities were top-notch. The AI concierge was particularly impressive - it knew exactly what I needed before I even asked!',
    sentiment: 'positive',
    sentimentScore: 96,
    categories: { service: 95, cleanliness: 98, location: 90, value: 92 },
    aiInsights: ['Mentions staff quality', 'Praises AI concierge', 'Highlights cleanliness'],
  },
  {
    id: 'R002',
    guestName: 'Michael Chen',
    rating: 4,
    date: '2025-10-30',
    comment: 'Great hotel overall. The room was comfortable and the location is perfect. Only minor issue was the WiFi speed could be better in the evenings. Otherwise, highly recommend!',
    sentiment: 'positive',
    sentimentScore: 82,
    categories: { service: 85, cleanliness: 90, location: 95, value: 80 },
    aiInsights: ['Notes WiFi issue', 'Positive about location', 'Overall satisfied'],
  },
  {
    id: 'R003',
    guestName: 'Emma Williams',
    rating: 5,
    date: '2025-10-28',
    comment: 'Exceptional service from check-in to check-out. The room inspection system gave me confidence in the cleanliness. Loved the spa facilities. Will definitely return!',
    sentiment: 'positive',
    sentimentScore: 94,
    categories: { service: 96, cleanliness: 98, location: 88, value: 90 },
    aiInsights: ['Praises room inspection', 'Mentions spa', 'Repeat guest potential'],
  },
  {
    id: 'R004',
    guestName: 'David Brown',
    rating: 3,
    date: '2025-10-25',
    comment: 'Decent stay but had some issues. The room was fine but breakfast options were limited. Staff tried to help but resolution took longer than expected.',
    sentiment: 'neutral',
    sentimentScore: 58,
    categories: { service: 65, cleanliness: 80, location: 70, value: 60 },
    aiInsights: ['Breakfast concerns', 'Service speed issue', 'Mixed feedback'],
  },
  {
    id: 'R005',
    guestName: 'Lisa Anderson',
    rating: 5,
    date: '2025-10-22',
    comment: 'Perfect stay! The AI-powered features made everything so convenient. Room was beautiful and modern. Great value for money. Highly recommend to anyone visiting the area.',
    sentiment: 'positive',
    sentimentScore: 98,
    categories: { service: 95, cleanliness: 96, location: 92, value: 98 },
    aiInsights: ['Values AI features', 'Highlights value', 'Strong recommendation'],
  },
];

export function ReviewAnalysis() {
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');

  const filteredReviews = reviews.filter(review => 
    selectedSentiment === 'all' || review.sentiment === selectedSentiment
  );

  const sentimentCounts = {
    positive: reviews.filter(r => r.sentiment === 'positive').length,
    neutral: reviews.filter(r => r.sentiment === 'neutral').length,
    negative: reviews.filter(r => r.sentiment === 'negative').length,
  };

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const averageSentiment = reviews.reduce((sum, r) => sum + r.sentimentScore, 0) / reviews.length;

  const categoryAverages = {
    service: reviews.reduce((sum, r) => sum + r.categories.service, 0) / reviews.length,
    cleanliness: reviews.reduce((sum, r) => sum + r.categories.cleanliness, 0) / reviews.length,
    location: reviews.reduce((sum, r) => sum + r.categories.location, 0) / reviews.length,
    value: reviews.reduce((sum, r) => sum + r.categories.value, 0) / reviews.length,
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="h-5 w-5 text-green-500" />;
      case 'neutral':
        return <Meh className="h-5 w-5 text-orange-500" />;
      case 'negative':
        return <Frown className="h-5 w-5 text-red-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500';
      case 'neutral':
        return 'bg-orange-500';
      case 'negative':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Review Analysis</h1>
        <p className="text-slate-600">AI-powered sentiment analysis and insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm opacity-90">Average Rating</div>
              <Star className="h-5 w-5 opacity-80" />
            </div>
            <div className="text-4xl mb-1">{averageRating.toFixed(1)}</div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.round(averageRating) ? 'fill-white' : 'opacity-30'}`} 
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm opacity-90">Positive Reviews</div>
              <ThumbsUp className="h-5 w-5 opacity-80" />
            </div>
            <div className="text-4xl mb-1">{sentimentCounts.positive}</div>
            <div className="text-sm opacity-90">
              {((sentimentCounts.positive / reviews.length) * 100).toFixed(0)}% of total
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm opacity-90">Sentiment Score</div>
              <Sparkles className="h-5 w-5 opacity-80" />
            </div>
            <div className="text-4xl mb-1">{averageSentiment.toFixed(0)}%</div>
            <div className="text-sm opacity-90">AI Analysis</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm opacity-90">Total Reviews</div>
              <MessageSquare className="h-5 w-5 opacity-80" />
            </div>
            <div className="text-4xl mb-1">{reviews.length}</div>
            <div className="flex items-center gap-1 text-sm opacity-90">
              <TrendingUp className="h-3 w-3" />
              <span>+12% this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Smile className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-900">Positive</span>
              </div>
              <div className="text-3xl text-green-600 mb-1">{sentimentCounts.positive}</div>
              <Progress value={(sentimentCounts.positive / reviews.length) * 100} className="h-2" />
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Meh className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-orange-900">Neutral</span>
              </div>
              <div className="text-3xl text-orange-600 mb-1">{sentimentCounts.neutral}</div>
              <Progress value={(sentimentCounts.neutral / reviews.length) * 100} className="h-2" />
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Frown className="h-5 w-5 text-red-600" />
                <span className="text-sm text-red-900">Negative</span>
              </div>
              <div className="text-3xl text-red-600 mb-1">{sentimentCounts.negative}</div>
              <Progress value={(sentimentCounts.negative / reviews.length) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(categoryAverages).map(([category, score]) => (
            <div key={category}>
              <div className="flex items-center justify-between mb-2">
                <span className="capitalize">{category}</span>
                <span className="text-sm">{score.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setSelectedSentiment('all')}>
            All Reviews
          </TabsTrigger>
          <TabsTrigger value="positive" onClick={() => setSelectedSentiment('positive')}>
            Positive
          </TabsTrigger>
          <TabsTrigger value="neutral" onClick={() => setSelectedSentiment('neutral')}>
            Neutral
          </TabsTrigger>
          <TabsTrigger value="negative" onClick={() => setSelectedSentiment('negative')}>
            Negative
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedSentiment} className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600">
                    <AvatarFallback className="text-white">
                      {review.guestName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="mb-1">{review.guestName}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-600">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getSentimentColor(review.sentiment)} text-white border-0`}>
                          {getSentimentIcon(review.sentiment)}
                          <span className="ml-1 capitalize">{review.sentiment}</span>
                        </Badge>
                        <Badge variant="outline">
                          AI: {review.sentimentScore}%
                        </Badge>
                      </div>
                    </div>

                    <p className="text-slate-700 mb-4">{review.comment}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {review.aiInsights.map((insight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          {insight}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-3 pt-3 border-t">
                      <div className="text-center">
                        <div className="text-xs text-slate-600 mb-1">Service</div>
                        <div className="text-sm">{review.categories.service}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-600 mb-1">Cleanliness</div>
                        <div className="text-sm">{review.categories.cleanliness}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-600 mb-1">Location</div>
                        <div className="text-sm">{review.categories.location}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-600 mb-1">Value</div>
                        <div className="text-sm">{review.categories.value}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

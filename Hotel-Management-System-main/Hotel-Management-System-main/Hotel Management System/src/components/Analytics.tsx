import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, BedDouble, Star, Sparkles } from 'lucide-react';

const monthlyRevenue = [
  { month: 'Jan', revenue: 85000, bookings: 142, occupancy: 65 },
  { month: 'Feb', revenue: 92000, bookings: 156, occupancy: 72 },
  { month: 'Mar', revenue: 105000, bookings: 178, occupancy: 78 },
  { month: 'Apr', revenue: 118000, bookings: 195, occupancy: 85 },
  { month: 'May', revenue: 135000, bookings: 218, occupancy: 90 },
  { month: 'Jun', revenue: 128000, bookings: 203, occupancy: 88 },
  { month: 'Jul', revenue: 145000, bookings: 235, occupancy: 92 },
  { month: 'Aug', revenue: 152000, bookings: 242, occupancy: 94 },
  { month: 'Sep', revenue: 138000, bookings: 215, occupancy: 87 },
  { month: 'Oct', revenue: 125000, bookings: 198, occupancy: 82 },
];

const roomTypePerformance = [
  { type: 'Standard', revenue: 285000, bookings: 1245, avgRate: 120 },
  { type: 'Deluxe', revenue: 420000, bookings: 985, avgRate: 200 },
  { type: 'Suite', revenue: 520000, bookings: 654, avgRate: 350 },
  { type: 'Penthouse', revenue: 390000, bookings: 285, avgRate: 650 },
];

const customerSatisfaction = [
  { category: 'Service', score: 92 },
  { category: 'Cleanliness', score: 95 },
  { category: 'Amenities', score: 88 },
  { category: 'Location', score: 90 },
  { category: 'Value', score: 85 },
  { category: 'Food', score: 89 },
];

const aiPredictions = [
  { week: 'Week 1', predicted: 85, actual: 82 },
  { week: 'Week 2', predicted: 88, actual: 90 },
  { week: 'Week 3', predicted: 92, actual: 91 },
  { week: 'Week 4', predicted: 90, actual: 88 },
  { week: 'Next Week', predicted: 93, actual: null },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export function Analytics() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Analytics & Insights</h1>
        <p className="text-slate-600">AI-powered business intelligence and predictions</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-600">Total Revenue</div>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-3xl mb-1">$1.62M</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+18.2% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-600">Avg Occupancy</div>
              <BedDouble className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-3xl mb-1">84.2%</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+5.8% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-600">Total Bookings</div>
              <Users className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-3xl mb-1">2,182</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+12.4% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-600">Satisfaction</div>
              <Star className="h-4 w-4 text-orange-600" />
            </div>
            <div className="text-3xl mb-1">4.8/5</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+0.3 vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="performance">Room Performance</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Occupancy Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    name="Revenue ($)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="occupancy" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Occupancy (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#8b5cf6" name="Bookings" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roomTypePerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="revenue"
                    >
                      {roomTypePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Room Type Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={roomTypePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
                  <Bar yAxisId="right" dataKey="bookings" fill="#8b5cf6" name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {roomTypePerformance.map((room, index) => (
              <Card key={room.type}>
                <CardContent className="p-6">
                  <div className="mb-3">
                    <Badge style={{ backgroundColor: COLORS[index] }} className="text-white border-0">
                      {room.type}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Revenue:</span>
                      <span>${(room.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Bookings:</span>
                      <span>{room.bookings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avg Rate:</span>
                      <span>${room.avgRate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={customerSatisfaction}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {customerSatisfaction.map((item, index) => (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">{item.category}</span>
                      <span className="text-sm">{item.score}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span>Overall Satisfaction</span>
                    <span className="text-2xl text-blue-600">
                      {(customerSatisfaction.reduce((sum, item) => sum + item.score, 0) / customerSatisfaction.length).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card className="bg-gradient-to-br from-purple-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-6 w-6" />
                <h3 className="text-xl">AI-Powered Predictions</h3>
              </div>
              <p className="text-sm opacity-90">
                Our machine learning models analyze historical data, seasonal patterns, and market trends to predict future occupancy rates with 94% accuracy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Occupancy Prediction vs Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={aiPredictions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Actual (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next Week Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl text-purple-600 mb-2">93%</div>
                <p className="text-sm text-slate-600">Expected occupancy rate</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+5% from current week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl text-blue-600 mb-2">$158K</div>
                <p className="text-sm text-slate-600">Projected next week</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+8.2% from current week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Model Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl text-green-600 mb-2">94.2%</div>
                <p className="text-sm text-slate-600">Prediction accuracy</p>
                <div className="mt-4 text-sm text-slate-600">
                  Based on 1,000+ data points
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

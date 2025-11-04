import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, BedDouble, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const occupancyData = [
  { month: 'Jan', occupancy: 65, revenue: 85000 },
  { month: 'Feb', occupancy: 72, revenue: 92000 },
  { month: 'Mar', occupancy: 78, revenue: 105000 },
  { month: 'Apr', occupancy: 85, revenue: 118000 },
  { month: 'May', occupancy: 90, revenue: 135000 },
  { month: 'Jun', occupancy: 88, revenue: 128000 },
];

const roomTypeData = [
  { name: 'Standard', value: 45, color: '#3b82f6' },
  { name: 'Deluxe', value: 30, color: '#8b5cf6' },
  { name: 'Suite', value: 15, color: '#ec4899' },
  { name: 'Penthouse', value: 10, color: '#f59e0b' },
];

const recentBookings = [
  { id: 'BK001', guest: 'John Smith', room: '301', checkIn: '2025-11-05', status: 'confirmed' },
  { id: 'BK002', guest: 'Emma Wilson', room: '205', checkIn: '2025-11-04', status: 'checked-in' },
  { id: 'BK003', guest: 'Michael Brown', room: '412', checkIn: '2025-11-06', status: 'pending' },
  { id: 'BK004', guest: 'Sophia Davis', room: '108', checkIn: '2025-11-03', status: 'checked-in' },
  { id: 'BK005', guest: 'James Johnson', room: '501', checkIn: '2025-11-07', status: 'confirmed' },
];

const aiInsights = [
  { type: 'success', message: 'Predicted 15% increase in bookings for next weekend', time: '2 hours ago' },
  { type: 'warning', message: 'Room 304 maintenance required based on image analysis', time: '4 hours ago' },
  { type: 'info', message: '8 positive reviews detected with 92% sentiment score', time: '6 hours ago' },
  { type: 'success', message: 'AI Concierge handled 45 guest queries today', time: '8 hours ago' },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Dashboard Overview</h1>
        <p className="text-slate-600">Real-time insights powered by AI analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">$663,000</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              <TrendingUp className="h-3 w-3" />
              <span>+12.5% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Occupancy Rate</CardTitle>
            <BedDouble className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">88%</div>
            <Progress value={88} className="h-2 bg-purple-300" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Active Guests</CardTitle>
            <Users className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">156</div>
            <div className="text-xs opacity-90">42 check-ins today</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">AI Insights</CardTitle>
            <TrendingUp className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">94.5%</div>
            <div className="text-xs opacity-90">Guest satisfaction score</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy & Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="#3b82f6" name="Occupancy %" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#8b5cf6" name="Revenue ($)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{booking.guest}</span>
                      <Badge variant="outline" className="text-xs">Room {booking.room}</Badge>
                    </div>
                    <div className="text-xs text-slate-500">Check-in: {booking.checkIn}</div>
                  </div>
                  <Badge
                    variant={
                      booking.status === 'checked-in'
                        ? 'default'
                        : booking.status === 'confirmed'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {booking.status === 'checked-in' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {booking.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Insights & Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                  {insight.type === 'success' && (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                  {insight.type === 'warning' && (
                    <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  )}
                  {insight.type === 'info' && (
                    <TrendingUp className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{insight.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{insight.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

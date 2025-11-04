import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Star,
  Calendar,
  TrendingUp,
  Heart,
  MessageSquare
} from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalStays: number;
  totalSpent: number;
  loyaltyPoints: number;
  status: 'vip' | 'regular' | 'new';
  rating: number;
  lastStay: string;
  preferences: string[];
}

const initialGuests: Guest[] = [
  {
    id: 'G001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 234-567-8900',
    location: 'New York, USA',
    totalStays: 12,
    totalSpent: 8500,
    loyaltyPoints: 2550,
    status: 'vip',
    rating: 4.9,
    lastStay: '2025-10-28',
    preferences: ['Ocean View', 'High Floor', 'Late Checkout'],
  },
  {
    id: 'G002',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+1 234-567-8901',
    location: 'London, UK',
    totalStays: 7,
    totalSpent: 4200,
    loyaltyPoints: 1260,
    status: 'regular',
    rating: 4.7,
    lastStay: '2025-11-01',
    preferences: ['Quiet Room', 'Mini Bar', 'Spa Access'],
  },
  {
    id: 'G003',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1 234-567-8902',
    location: 'Toronto, Canada',
    totalStays: 1,
    totalSpent: 360,
    loyaltyPoints: 108,
    status: 'new',
    rating: 5.0,
    lastStay: '2025-10-15',
    preferences: ['WiFi', 'Workspace'],
  },
  {
    id: 'G004',
    name: 'Sophia Davis',
    email: 'sophia.davis@email.com',
    phone: '+1 234-567-8903',
    location: 'Sydney, Australia',
    totalStays: 15,
    totalSpent: 12000,
    loyaltyPoints: 3600,
    status: 'vip',
    rating: 4.8,
    lastStay: '2025-11-02',
    preferences: ['Suite', 'Breakfast Included', 'Pool Access'],
  },
  {
    id: 'G005',
    name: 'James Johnson',
    email: 'james.johnson@email.com',
    phone: '+1 234-567-8904',
    location: 'Tokyo, Japan',
    totalStays: 5,
    totalSpent: 3800,
    loyaltyPoints: 1140,
    status: 'regular',
    rating: 4.6,
    lastStay: '2025-10-25',
    preferences: ['Non-Smoking', 'City View'],
  },
];

export function GuestManagement() {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || guest.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip':
        return 'bg-purple-500';
      case 'regular':
        return 'bg-blue-500';
      case 'new':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const stats = {
    totalGuests: guests.length,
    vipGuests: guests.filter(g => g.status === 'vip').length,
    averageRating: (guests.reduce((sum, g) => sum + g.rating, 0) / guests.length).toFixed(1),
    totalRevenue: guests.reduce((sum, g) => sum + g.totalSpent, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Guest Management</h1>
        <p className="text-slate-600">Manage guest profiles and preferences</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">Total Guests</div>
                <div className="text-3xl">{stats.totalGuests}</div>
              </div>
              <User className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">VIP Guests</div>
                <div className="text-3xl">{stats.vipGuests}</div>
              </div>
              <Heart className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">Avg Rating</div>
                <div className="text-3xl">{stats.averageRating}</div>
              </div>
              <Star className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">Total Revenue</div>
                <div className="text-2xl">${stats.totalRevenue.toLocaleString()}</div>
              </div>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setFilterStatus('all')}>All Guests</TabsTrigger>
          <TabsTrigger value="vip" onClick={() => setFilterStatus('vip')}>VIP</TabsTrigger>
          <TabsTrigger value="regular" onClick={() => setFilterStatus('regular')}>Regular</TabsTrigger>
          <TabsTrigger value="new" onClick={() => setFilterStatus('new')}>New</TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="pt-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <TabsContent value="all" className="space-y-3">
          {filteredGuests.map((guest) => (
            <Card key={guest.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Guest Info */}
                  <div className="lg:col-span-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600">
                        <AvatarFallback className="text-white text-xl">
                          {guest.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg truncate">{guest.name}</h3>
                          <Badge className={`${getStatusColor(guest.status)} text-white border-0 text-xs shrink-0`}>
                            {guest.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{guest.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone className="h-3 w-3" />
                            <span>{guest.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin className="h-3 w-3" />
                            <span>{guest.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="lg:col-span-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm">{guest.rating}/5.0</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Stays:</span>
                          <span>{guest.totalStays}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Spent:</span>
                          <span className="text-green-600">${guest.totalSpent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Loyalty Points:</span>
                          <span className="text-purple-600">{guest.loyaltyPoints}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="lg:col-span-3">
                    <div>
                      <div className="text-sm text-slate-600 mb-2">Preferences:</div>
                      <div className="flex flex-wrap gap-1">
                        {guest.preferences.map((pref, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3 text-sm text-slate-600">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        Last stay: {new Date(guest.lastStay).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-2 flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="vip">
          {filteredGuests.filter(g => g.status === 'vip').length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-slate-600">
                No VIP guests found
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredGuests.filter(g => g.status === 'vip').map(guest => (
                <Card key={guest.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-600">
                        <AvatarFallback className="text-white text-xl">
                          {guest.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg">{guest.name}</h3>
                          <Badge className="bg-purple-500 text-white border-0">VIP</Badge>
                        </div>
                        <p className="text-sm text-slate-600">{guest.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-purple-600">{guest.loyaltyPoints}</div>
                        <div className="text-xs text-slate-600">Loyalty Points</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="regular">
          {filteredGuests.filter(g => g.status === 'regular').map(guest => (
            <Card key={guest.id} className="mb-3">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="bg-blue-500">
                      <AvatarFallback className="text-white">
                        {guest.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{guest.name}</div>
                      <div className="text-sm text-slate-600">{guest.totalStays} stays</div>
                    </div>
                  </div>
                  <Badge variant="outline">Regular</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="new">
          {filteredGuests.filter(g => g.status === 'new').map(guest => (
            <Card key={guest.id} className="mb-3">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="bg-green-500">
                      <AvatarFallback className="text-white">
                        {guest.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{guest.name}</div>
                      <div className="text-sm text-slate-600">First stay: {new Date(guest.lastStay).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white border-0">New</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

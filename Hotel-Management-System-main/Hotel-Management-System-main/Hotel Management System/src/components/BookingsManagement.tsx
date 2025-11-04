import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Search, 
  Calendar as CalendarIcon, 
  User, 
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner@2.0.7';

interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  totalPrice: number;
  specialRequests?: string;
}

const initialBookings: Booking[] = [
  {
    id: 'BK001',
    guestName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 234-567-8900',
    roomNumber: '301',
    roomType: 'Suite',
    checkIn: '2025-11-05',
    checkOut: '2025-11-08',
    guests: 2,
    status: 'confirmed',
    totalPrice: 1050,
    specialRequests: 'Late check-in requested',
  },
  {
    id: 'BK002',
    guestName: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+1 234-567-8901',
    roomNumber: '205',
    roomType: 'Deluxe',
    checkIn: '2025-11-04',
    checkOut: '2025-11-07',
    guests: 1,
    status: 'checked-in',
    totalPrice: 600,
  },
  {
    id: 'BK003',
    guestName: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1 234-567-8902',
    roomNumber: '412',
    roomType: 'Standard',
    checkIn: '2025-11-06',
    checkOut: '2025-11-09',
    guests: 2,
    status: 'pending',
    totalPrice: 360,
  },
  {
    id: 'BK004',
    guestName: 'Sophia Davis',
    email: 'sophia.davis@email.com',
    phone: '+1 234-567-8903',
    roomNumber: '108',
    roomType: 'Deluxe',
    checkIn: '2025-11-03',
    checkOut: '2025-11-05',
    guests: 3,
    status: 'checked-in',
    totalPrice: 400,
    specialRequests: 'Extra bed required',
  },
  {
    id: 'BK005',
    guestName: 'James Johnson',
    email: 'james.johnson@email.com',
    phone: '+1 234-567-8904',
    roomNumber: '501',
    roomType: 'Penthouse',
    checkIn: '2025-10-28',
    checkOut: '2025-11-01',
    guests: 4,
    status: 'checked-out',
    totalPrice: 2600,
  },
];

export function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'checked-in':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'checked-in':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'checked-out':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus as Booking['status'] } : booking
    ));
    toast.success(`Booking ${bookingId} status updated to ${newStatus}`);
  };

  const stats = {
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    checkedIn: bookings.filter(b => b.status === 'checked-in').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalPrice, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Bookings Management</h1>
          <p className="text-slate-600">Manage reservations and guest check-ins</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Guest Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="+1 234-567-8900" />
              </div>
              <div className="space-y-2">
                <Label>Room Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Check-in Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Check-out Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Number of Guests</Label>
                <Input type="number" placeholder="2" />
              </div>
              <div className="space-y-2">
                <Label>Total Price ($)</Label>
                <Input type="number" placeholder="350" />
              </div>
              <div className="col-span-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Create Booking</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">Pending</div>
                <div className="text-3xl">{stats.pending}</div>
              </div>
              <Clock className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">Confirmed</div>
                <div className="text-3xl">{stats.confirmed}</div>
              </div>
              <CheckCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">Checked In</div>
                <div className="text-3xl">{stats.checkedIn}</div>
              </div>
              <User className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">Revenue</div>
                <div className="text-2xl">${stats.totalRevenue.toLocaleString()}</div>
              </div>
              <DollarSign className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by guest name, room, or booking ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="checked-out">Checked Out</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bookings List */}
          <div className="space-y-3">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                          <User className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="truncate">{booking.guestName}</h3>
                            <Badge variant="outline" className="text-xs shrink-0">{booking.id}</Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs text-slate-600">
                              <Mail className="h-3 w-3" />
                              <span className="truncate">{booking.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-600">
                              <Phone className="h-3 w-3" />
                              <span>{booking.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">Room {booking.roomNumber} - {booking.roomType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon className="h-4 w-4 text-slate-400" />
                          <span>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon className="h-4 w-4 text-slate-400" />
                          <span>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">${booking.totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-2">
                      <Badge variant={getStatusVariant(booking.status)} className="w-full justify-center">
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 capitalize">{booking.status}</span>
                      </Badge>
                      <Select 
                        value={booking.status}
                        onValueChange={(value) => handleStatusChange(booking.id, value)}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="checked-in">Checked In</SelectItem>
                          <SelectItem value="checked-out">Checked Out</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Special Requests:</span> {booking.specialRequests}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="mt-6">
                <h3 className="mb-3">Bookings for {selectedDate?.toLocaleDateString()}</h3>
                <div className="space-y-2">
                  {bookings
                    .filter(b => 
                      selectedDate && 
                      new Date(b.checkIn) <= selectedDate && 
                      new Date(b.checkOut) >= selectedDate
                    )
                    .map(booking => (
                      <div key={booking.id} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                        <div>
                          <div>{booking.guestName} - Room {booking.roomNumber}</div>
                          <div className="text-sm text-slate-600">{booking.roomType}</div>
                        </div>
                        <Badge variant={getStatusVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  {selectedDate && bookings.filter(b => 
                    new Date(b.checkIn) <= selectedDate && 
                    new Date(b.checkOut) >= selectedDate
                  ).length === 0 && (
                    <p className="text-sm text-slate-600 text-center py-4">No bookings for this date</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Plus, Search, Edit, Trash2, Wifi, Tv, Coffee, Wind, Star, MapPin } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Room {
  id: string;
  number: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  price: number;
  floor: number;
  capacity: number;
  amenities: string[];
  image: string;
  aiScore: number;
}

const initialRooms: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'Standard',
    status: 'available',
    price: 120,
    floor: 1,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'AC'],
    image: 'https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMDE0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiScore: 92,
  },
  {
    id: '2',
    number: '205',
    type: 'Deluxe',
    status: 'occupied',
    price: 200,
    floor: 2,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'],
    image: 'https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMDE0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiScore: 95,
  },
  {
    id: '3',
    number: '301',
    type: 'Suite',
    status: 'available',
    price: 350,
    floor: 3,
    capacity: 4,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi'],
    image: 'https://images.unsplash.com/photo-1744000311897-510b64f9a2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjE5ODU4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    aiScore: 98,
  },
  {
    id: '4',
    number: '501',
    type: 'Penthouse',
    status: 'maintenance',
    price: 650,
    floor: 5,
    capacity: 6,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi', 'Kitchen'],
    image: 'https://images.unsplash.com/photo-1705328223284-5a6cd4456a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBlbnRob3VzZXxlbnwxfHx8fDE3NjIwNzE0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    aiScore: 88,
  },
  {
    id: '5',
    number: '102',
    type: 'Standard',
    status: 'cleaning',
    price: 120,
    floor: 1,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'AC'],
    image: 'https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMDE0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiScore: 91,
  },
  {
    id: '6',
    number: '305',
    type: 'Deluxe',
    status: 'available',
    price: 200,
    floor: 3,
    capacity: 3,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Coffee Machine'],
    image: 'https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMDE0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiScore: 96,
  },
];

const amenityIcons: { [key: string]: any } = {
  WiFi: Wifi,
  TV: Tv,
  'Coffee Machine': Coffee,
  AC: Wind,
};

export function RoomsManagement() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    const matchesType = filterType === 'all' || room.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-blue-500';
      case 'maintenance':
        return 'bg-red-500';
      case 'cleaning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter((room) => room.id !== id));
    toast.success('Room deleted successfully');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Rooms Management</h1>
          <p className="text-slate-600">Manage your hotel rooms with AI-powered insights</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Room Number</Label>
                <Input placeholder="e.g., 101" />
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
                <Label>Price per Night ($)</Label>
                <Input type="number" placeholder="120" />
              </div>
              <div className="space-y-2">
                <Label>Capacity</Label>
                <Input type="number" placeholder="2" />
              </div>
              <div className="space-y-2">
                <Label>Floor</Label>
                <Input type="number" placeholder="1" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Room description..." rows={3} />
              </div>
              <div className="col-span-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Create Room</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by room number or type..."
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
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Deluxe">Deluxe</SelectItem>
                <SelectItem value="Suite">Suite</SelectItem>
                <SelectItem value="Penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <ImageWithFallback
                src={room.image}
                alt={`Room ${room.number}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className={`${getStatusColor(room.status)} text-white border-0`}>
                  {room.status}
                </Badge>
              </div>
              <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs">AI Score: {room.aiScore}%</span>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">Room {room.number}</CardTitle>
                  <p className="text-sm text-slate-600">{room.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-blue-600">${room.price}</div>
                  <div className="text-xs text-slate-500">per night</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Floor {room.floor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Capacity: {room.capacity}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {room.amenities.slice(0, 4).map((amenity) => {
                  const Icon = amenityIcons[amenity];
                  return (
                    <Badge key={amenity} variant="outline" className="text-xs">
                      {Icon && <Icon className="h-3 w-3 mr-1" />}
                      {amenity}
                    </Badge>
                  );
                })}
                {room.amenities.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{room.amenities.length - 4} more
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" size="sm">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-red-600 hover:text-red-700"
                  size="sm"
                  onClick={() => handleDeleteRoom(room.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

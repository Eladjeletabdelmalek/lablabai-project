import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar } from './ui/calendar';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Mic,
  Image as ImageIcon,
  Calendar as CalendarIcon,
  DollarSign,
  Users,
  BedDouble,
  CheckCircle,
  Globe,
  Zap,
  TrendingDown,
  Heart,
  MapPin,
  Coffee,
  Wifi,
  Wind,
  Star
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  data?: any;
  component?: 'room-cards' | 'date-picker' | 'price-filter' | 'booking-confirm' | 'payment' | 'recommendations';
}

interface Room {
  id: string;
  type: string;
  price: number;
  available: boolean;
  image: string;
  amenities: string[];
  capacity: number;
  size: string;
  discount?: number;
}

const availableRooms: Room[] = [
  {
    id: 'R1',
    type: 'Standard Room',
    price: 120,
    available: true,
    image: 'https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMDE0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['WiFi', 'TV', 'AC', 'Coffee Maker'],
    capacity: 2,
    size: '250 sq ft',
  },
  {
    id: 'R2',
    type: 'Deluxe Room',
    price: 200,
    available: true,
    image: 'https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMDE0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Room Service'],
    capacity: 2,
    size: '350 sq ft',
    discount: 15,
  },
  {
    id: 'R3',
    type: 'Suite',
    price: 350,
    available: true,
    image: 'https://images.unsplash.com/photo-1744000311897-510b64f9a2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjE5ODU4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi', 'Balcony'],
    capacity: 4,
    size: '600 sq ft',
  },
  {
    id: 'R4',
    type: 'Penthouse',
    price: 650,
    available: true,
    image: 'https://images.unsplash.com/photo-1705328223284-5a6cd4456a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBlbnRob3VzZXxlbnwxfHx8fDE3NjIwNzE0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi', 'Kitchen', 'City View'],
    capacity: 6,
    size: '1200 sq ft',
    discount: 20,
  },
];

const quickPrompts = [
  { icon: BedDouble, text: "Show available rooms", query: "show available rooms" },
  { icon: DollarSign, text: "What are your rates?", query: "room prices" },
  { icon: CalendarIcon, text: "Book for this weekend", query: "book room this weekend" },
  { icon: Star, text: "Best room recommendations", query: "recommend best room" },
  { icon: MapPin, text: "Hotel location & amenities", query: "hotel amenities and location" },
  { icon: Coffee, text: "Dining & services", query: "dining options" },
];

export function SmartBookingBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "👋 Hello! I'm your AI booking assistant powered by advanced LLM technology. I can help you find the perfect room, check availability in real-time, provide pricing, and complete your booking - all through this chat! What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ from?: Date; to?: Date }>({});
  const [priceRange, setPriceRange] = useState([0, 700]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getIntelligentResponse = (userMessage: string): { content: string; component?: any; data?: any } => {
    const lowerMessage = userMessage.toLowerCase();

    // Room availability and booking queries
    if (lowerMessage.includes('available') || lowerMessage.includes('rooms') || lowerMessage.includes('show')) {
      return {
        content: "🏨 Here are our available rooms! I've analyzed your preferences and current availability. Each room has been verified by our AI inspection system. You can filter by price, capacity, or amenities. Which one catches your eye?",
        component: 'room-cards',
        data: { rooms: availableRooms },
      };
    }

    // Pricing queries
    if (lowerMessage.includes('price') || lowerMessage.includes('rate') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return {
        content: "💰 Our smart pricing system offers competitive rates:\n\n📊 **Current Rates (per night)**\n• Standard Room: $120 (Best value!)\n• Deluxe Room: $200 (15% discount today!)\n• Suite: $350 (Perfect for families)\n• Penthouse: $650 (20% off - Limited time!)\n\n💡 **AI Tip**: Booking 3+ nights gets you an additional 10% off! Would you like to see detailed room features?",
        component: 'price-filter',
      };
    }

    // Booking/reservation queries
    if (lowerMessage.includes('book') || lowerMessage.includes('reserve') || lowerMessage.includes('reservation')) {
      return {
        content: "📅 Great! Let me help you book a room. I'll need a few details:\n\n1️⃣ Check-in and check-out dates\n2️⃣ Number of guests\n3️⃣ Room preference\n\n🤖 **Smart Feature**: I can automatically suggest the best dates based on pricing trends and availability. When would you like to stay?",
        component: 'date-picker',
      };
    }

    // Recommendation queries
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('best')) {
      return {
        content: "🎯 Based on AI analysis of 10,000+ guest reviews and current trends, here are my personalized recommendations:\n\n⭐ **Top Pick**: Deluxe Room - 15% off today! Perfect balance of luxury and value\n\n💎 **Luxury Choice**: Penthouse - 20% discount, amazing city views\n\n💰 **Budget Friendly**: Standard Room - Excellent amenities at $120/night\n\n🔍 Tell me more about your preferences (budget, group size, special needs) for better recommendations!",
        component: 'recommendations',
        data: { rooms: availableRooms.filter(r => r.discount) },
      };
    }

    // Amenities and facilities
    if (lowerMessage.includes('amenities') || lowerMessage.includes('facilities') || lowerMessage.includes('features')) {
      return {
        content: "🌟 **GrandStay AI Hotel Features**:\n\n🏊 **Recreation**\n• Rooftop pool & spa\n• 24/7 fitness center with AI trainer\n• Wellness center\n\n🍽️ **Dining**\n• 3 restaurants (French, Japanese, Steakhouse)\n• 24/7 room service\n• AI-powered dietary recommendations\n\n🤖 **Smart Technology**\n• AI concierge (that's me!)\n• Smart room controls\n• Voice-activated services\n• Virtual reality tours\n\n💼 **Business**\n• Conference rooms\n• High-speed WiFi\n• Business center\n\nWhat else would you like to know?",
      };
    }

    // Location queries
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('address')) {
      return {
        content: "📍 **Prime Location**:\n\n🏙️ Downtown Manhattan\n123 Grand Avenue, New York, NY 10001\n\n🚇 **Nearby**:\n• Times Square - 5 min walk\n• Central Park - 10 min drive\n• Airport - 30 min drive\n• Metro station - 2 min walk\n\n🎯 **Smart Navigation**: I can send directions to your phone or arrange airport pickup. Interested?",
      };
    }

    // Check-in/out queries
    if (lowerMessage.includes('check in') || lowerMessage.includes('check out') || lowerMessage.includes('check-in')) {
      return {
        content: "⏰ **Smart Check-in/out**:\n\n📱 **Digital Check-in**:\n• Available 24 hours before arrival\n• Skip the front desk!\n• Direct room access via mobile key\n\n🕐 Standard Times:\n• Check-in: 3:00 PM\n• Check-out: 11:00 AM\n\n⚡ **AI Flexibility**:\n• Early check-in available (based on AI prediction)\n• Late check-out: Up to 2 PM ($30)\n• Express checkout via app\n\nWant to pre-check-in now?",
      };
    }

    // Cancellation policy
    if (lowerMessage.includes('cancel') || lowerMessage.includes('refund') || lowerMessage.includes('policy')) {
      return {
        content: "✅ **Flexible Cancellation Policy**:\n\n💚 **Free Cancellation**\n• Up to 48 hours before check-in\n• Full refund guaranteed\n\n⚠️ **Late Cancellation**\n• 24-48 hours: 50% refund\n• Less than 24 hours: No refund\n\n🤖 **AI Insurance** (New!):\n• $15 per booking\n• Cancel anytime for full refund\n• Covers emergencies automatically\n\nWould you like to proceed with a booking?",
      };
    }

    // Dining queries
    if (lowerMessage.includes('food') || lowerMessage.includes('dining') || lowerMessage.includes('restaurant') || lowerMessage.includes('eat')) {
      return {
        content: "🍽️ **Culinary Excellence**:\n\n🥐 **Breakfast**\n• Buffet: 6:30 AM - 11:00 AM\n• AI-personalized menu based on preferences\n\n🍣 **Restaurants**:\n1. Le Jardin (French) - Fine dining\n2. Sakura (Japanese) - Sushi bar\n3. The Grill House - Steaks & BBQ\n\n🤖 **Smart Dining**:\n• AI dietary recommendations\n• Allergy tracking\n• Pre-order via chat\n• In-room dining 24/7\n\nShall I make a dinner reservation?",
      };
    }

    // Spa and wellness
    if (lowerMessage.includes('spa') || lowerMessage.includes('massage') || lowerMessage.includes('wellness')) {
      return {
        content: "💆 **Luxury Spa & Wellness**:\n\n🌿 **Treatments**:\n• Swedish massage - $120/hr\n• Deep tissue - $140/hr\n• Hot stone therapy - $160/hr\n• Facial treatments - $80-150\n\n🏋️ **Fitness**:\n• Personal AI trainer\n• Yoga classes (6 AM & 6 PM)\n• Pilates studio\n\n💡 **AI Wellness**:\n• Personalized fitness plans\n• Stress level monitoring\n• Sleep optimization tips\n\nBook a treatment: Hours 8 AM - 10 PM",
      };
    }

    // Default intelligent response
    return {
      content: "I understand you're asking about our hotel services. I'm powered by advanced AI and can help you with:\n\n✨ **I can assist with**:\n• 🏨 Real-time room availability\n• 💰 Dynamic pricing & discounts\n• 📅 Instant booking & modifications\n• 🎯 Personalized recommendations\n• 🍽️ Restaurant reservations\n• 🚗 Transportation arrangements\n• 🌍 Local attractions & tours\n• 💳 Secure payment processing\n\nCould you be more specific about what you'd like to know? Or choose from the quick options below!",
    };
  };

  const handleSendMessage = (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getIntelligentResponse(messageContent);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        component: response.component,
        data: response.data,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast.success('Voice recognition activated! Speak now...');
      setTimeout(() => {
        setIsListening(false);
        handleSendMessage('Show me available rooms for this weekend');
      }, 3000);
    }
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    const message = `I'm interested in the ${room.type}. Can you help me book it?`;
    handleSendMessage(message);
  };

  const handleBookRoom = () => {
    if (!selectedRoom) return;
    
    const bookingMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: `✅ Perfect choice! Let me process your booking for the ${selectedRoom.type}.\n\n📋 **Booking Summary**:\n• Room: ${selectedRoom.type}\n• Price: $${selectedRoom.price}/night\n• Dates: ${selectedDates.from?.toLocaleDateString()} - ${selectedDates.to?.toLocaleDateString()}\n${selectedRoom.discount ? `• Discount: ${selectedRoom.discount}% off\n` : ''}• Total: $${selectedRoom.price * 3 * (selectedRoom.discount ? (100 - selectedRoom.discount) / 100 : 1)}\n\n🔒 Your payment is secured with 256-bit encryption. Proceed to payment?`,
      timestamp: new Date(),
      component: 'booking-confirm',
      data: { room: selectedRoom, dates: selectedDates },
    };
    
    setMessages((prev) => [...prev, bookingMessage]);
  };

  const renderMessageComponent = (message: Message) => {
    if (!message.component) return null;

    switch (message.component) {
      case 'room-cards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {message.data?.rooms.map((room: Room) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer" onClick={() => handleRoomSelect(room)}>
                <div className="relative h-32">
                  <ImageWithFallback
                    src={room.image}
                    alt={room.type}
                    className="w-full h-full object-cover"
                  />
                  {room.discount && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white border-0">
                      {room.discount}% OFF
                    </Badge>
                  )}
                  <Badge className="absolute top-2 left-2 bg-green-500 text-white border-0">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Available
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm mb-1">{room.type}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Users className="h-3 w-3" />
                        <span>{room.capacity} guests</span>
                        <span>•</span>
                        <span>{room.size}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {room.discount && (
                        <div className="text-xs line-through text-slate-400">
                          ${room.price}
                        </div>
                      )}
                      <div className="text-lg text-blue-600">
                        ${room.discount ? room.price * (100 - room.discount) / 100 : room.price}
                      </div>
                      <div className="text-xs text-slate-600">per night</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'date-picker':
        return (
          <div className="mt-3 p-4 bg-slate-50 rounded-lg">
            <div className="text-sm mb-3">Select your dates:</div>
            <Calendar
              mode="range"
              selected={selectedDates}
              onSelect={(range: any) => setSelectedDates(range || {})}
              className="rounded-md border bg-white"
            />
            {selectedDates.from && selectedDates.to && (
              <Button className="w-full mt-3 bg-blue-600" onClick={handleBookRoom}>
                Continue Booking
              </Button>
            )}
          </div>
        );

      case 'price-filter':
        return (
          <div className="mt-3 p-4 bg-slate-50 rounded-lg">
            <div className="text-sm mb-2">Filter by price range:</div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={700}
              step={50}
              className="mb-3"
            />
            <div className="flex items-center justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <Button 
              className="w-full mt-3 bg-blue-600"
              onClick={() => handleSendMessage('Show available rooms')}
            >
              Show Rooms in Range
            </Button>
          </div>
        );

      case 'recommendations':
        return (
          <div className="mt-3 space-y-2">
            {message.data?.rooms.map((room: Room) => (
              <div key={room.id} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{room.type}</span>
                  </div>
                  <Badge className="bg-red-500 text-white border-0">
                    {room.discount}% OFF
                  </Badge>
                </div>
                <div className="text-xs text-slate-600">
                  Special price: ${room.price * (100 - (room.discount || 0)) / 100}/night
                </div>
              </div>
            ))}
          </div>
        );

      case 'booking-confirm':
        return (
          <div className="mt-3 space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => {
              toast.success('🎉 Booking confirmed! Check your email for details.');
              handleSendMessage('Thank you for booking!');
            }}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm & Pay
            </Button>
            <Button variant="outline" className="w-full">
              Modify Details
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Smart Booking Assistant</h1>
        <p className="text-slate-600">AI-powered booking with real-time availability & intelligent recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Chat Section */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>AI Booking Assistant</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs opacity-90">Online • Instant Response</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    LLM Powered
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 450px)' }}>
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className={message.type === 'bot' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-slate-700'}>
                    <AvatarFallback className="text-white">
                      {message.type === 'bot' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                    <div className={`inline-block max-w-2xl ${message.type === 'user' ? 'w-full' : ''}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white ml-auto'
                            : 'bg-slate-100 text-slate-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.type === 'bot' && renderMessageComponent(message)}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="bg-gradient-to-br from-blue-500 to-purple-600">
                    <AvatarFallback className="text-white">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            <div className="p-4 border-t bg-slate-50">
              <div className="flex gap-2 mb-3">
                <Button
                  variant={isListening ? 'default' : 'outline'}
                  size="icon"
                  onClick={handleVoiceInput}
                  className={isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : ''}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message or use voice input..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage()} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {isListening && (
                <div className="text-xs text-center text-slate-600 mb-2">
                  🎤 Listening... Speak now
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {quickPrompts.slice(0, 4).map((prompt, index) => {
                  const Icon = prompt.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(prompt.query)}
                      className="text-xs"
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {prompt.text}
                    </Button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Features & Stats Sidebar */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Real-time availability checking</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Intelligent price recommendations</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Voice & text input support</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Instant booking confirmation</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>24/7 multi-language support</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Personalized recommendations</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Available Rooms</span>
                  <span className="text-sm">{availableRooms.filter(r => r.available).length}/{availableRooms.length}</span>
                </div>
                <Progress value={(availableRooms.filter(r => r.available).length / availableRooms.length) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">AI Response Time</span>
                  <span className="text-sm text-green-600">0.8s</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Booking Success Rate</span>
                  <span className="text-sm text-blue-600">98.5%</span>
                </div>
                <Progress value={98.5} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-sm"
                    onClick={() => handleSendMessage(prompt.query)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {prompt.text}
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-green-600" />
                <span className="text-sm">Special Offers Active</span>
              </div>
              <div className="text-xs text-slate-600">
                {availableRooms.filter(r => r.discount).length} rooms have discounts up to 20% off!
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

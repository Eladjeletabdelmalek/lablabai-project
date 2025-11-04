import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Send, Bot, User, Sparkles, Calendar, MapPin, Utensils, Dumbbell } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const aiResponses: { [key: string]: string } = {
  booking: "I'd be happy to help you with a booking! We have several options available. When would you like to check in? I can show you our best rooms for your dates.",
  restaurant: "Our hotel features 3 exceptional dining options: 'Le Jardin' (French cuisine), 'Sakura' (Japanese), and 'The Grill House' (Steaks & BBQ). Would you like me to make a reservation?",
  spa: "Our luxury spa offers massage therapy, facials, body treatments, and wellness packages. We're open 8 AM - 10 PM daily. Would you like to book a treatment?",
  gym: "Our state-of-the-art fitness center is open 24/7 with personal trainers available 6 AM - 8 PM. We also offer yoga and pilates classes. Interested in our schedule?",
  checkout: "Standard checkout is at 11 AM, but I can arrange a late checkout for you until 2 PM for a small fee. What time works best for you?",
  amenities: "We offer complimentary WiFi, pool, fitness center, spa, concierge service, room service (24/7), valet parking, and business center. What would you like to know more about?",
  default: "I'm your AI concierge assistant, powered by advanced language models. I can help you with bookings, restaurant reservations, spa appointments, local recommendations, and any questions about hotel amenities. How can I assist you today?",
};

const quickSuggestions = [
  { icon: Calendar, text: "Book a room", keyword: "booking" },
  { icon: Utensils, text: "Restaurant reservation", keyword: "restaurant" },
  { icon: Sparkles, text: "Spa services", keyword: "spa" },
  { icon: Dumbbell, text: "Fitness center", keyword: "gym" },
];

export function AIConcierge() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI concierge assistant, powered by advanced LLM technology. I'm here to help make your stay exceptional. How can I assist you today?",
      timestamp: new Date(),
      suggestions: ["Book a room", "Dining options", "Spa services", "Local attractions"],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('book') || lowerMessage.includes('reservation') || lowerMessage.includes('room')) {
      return aiResponses.booking;
    } else if (lowerMessage.includes('restaurant') || lowerMessage.includes('dining') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      return aiResponses.restaurant;
    } else if (lowerMessage.includes('spa') || lowerMessage.includes('massage') || lowerMessage.includes('wellness')) {
      return aiResponses.spa;
    } else if (lowerMessage.includes('gym') || lowerMessage.includes('fitness') || lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
      return aiResponses.gym;
    } else if (lowerMessage.includes('checkout') || lowerMessage.includes('check out')) {
      return aiResponses.checkout;
    } else if (lowerMessage.includes('amenities') || lowerMessage.includes('facilities') || lowerMessage.includes('services')) {
      return aiResponses.amenities;
    } else {
      return aiResponses.default;
    }
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
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(messageContent),
        timestamp: new Date(),
        suggestions: ["Tell me more", "Show me options", "Book now", "Other services"],
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (keyword: string) => {
    handleSendMessage(keyword);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">AI Concierge</h1>
        <p className="text-slate-600">24/7 intelligent assistance powered by LLM technology</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Chat Section */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>AI Assistant</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-600">Online & Learning</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 400px)' }}>
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className={message.type === 'ai' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-slate-700'}>
                    <AvatarFallback className="text-white">
                      {message.type === 'ai' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                    <div
                      className={`inline-block p-3 rounded-lg max-w-md ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendMessage(suggestion)}
                            className="text-xs"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
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
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={() => handleSendMessage()} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickSuggestions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction(action.text)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {action.text}
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-lg">AI Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm opacity-90">Response Accuracy</span>
                  <span className="text-sm">96.5%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '96.5%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm opacity-90">Guest Satisfaction</span>
                  <span className="text-sm">94.2%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>
              <div className="pt-2 border-t border-white/20">
                <div className="text-sm opacity-90">Queries Handled Today</div>
                <div className="text-2xl mt-1">1,247</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span>Natural Language Processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span>Contextual Understanding</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-pink-600" />
                <span>Multi-language Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-orange-600" />
                <span>24/7 Availability</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

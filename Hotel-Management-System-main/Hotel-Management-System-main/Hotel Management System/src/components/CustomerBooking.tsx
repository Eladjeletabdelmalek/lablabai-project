import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Calendar,
  Users,
  DollarSign,
  Shield,
  CheckCircle,
  CreditCard,
  Wallet,
  Check,
  ArrowRight,
  Mail,
  Phone,
  User,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function CustomerBooking() {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [paymentMethod, setPaymentMethod] = useState('usdc');
  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const booking = {
    hotel: 'Grand Luxury Resort',
    location: 'Miami Beach, FL',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    roomType: 'Deluxe Ocean View Suite',
    checkIn: '2025-11-15',
    checkOut: '2025-11-18',
    guests: 2,
    nights: 3,
    pricePerNight: 350,
    taxes: 105,
    serviceFee: 45,
    hygieneScore: 9.8
  };

  const totalPrice = (booking.pricePerNight * booking.nights) + booking.taxes + booking.serviceFee;

  const handleConfirmBooking = () => {
    if (step === 'details') {
      if (!guestDetails.firstName || !guestDetails.lastName || !guestDetails.email || !guestDetails.phone) {
        toast.error('Please fill in all guest details');
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      setStep('confirmation');
      toast.success('Booking confirmed successfully!');
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 flex items-center justify-center">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8 text-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl mb-3">Booking Confirmed!</h1>
            <p className="text-slate-600 mb-6">
              Your reservation has been successfully confirmed. You'll receive a confirmation email shortly.
            </p>

            <div className="bg-slate-50 rounded-lg p-6 mb-6 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-600 mb-1">Booking ID</div>
                  <div className="font-mono">BK-{Date.now().toString().slice(-8)}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Payment Method</div>
                  <Badge className="bg-blue-100 text-blue-700 border-0">
                    <Wallet className="h-3 w-3 mr-1" />
                    USDC via Arc
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Hotel</div>
                  <div>{booking.hotel}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Check-in</div>
                  <div>{booking.checkIn}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Check-out</div>
                  <div>{booking.checkOut}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Total Paid</div>
                  <div className="text-xl text-green-600">${totalPrice}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Download Confirmation
              </Button>
              <Button variant="outline" className="w-full">
                View My Bookings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl mb-2">Complete Your Booking</h1>
          <p className="text-slate-600">Secure your stay with blockchain payment</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'details' ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step === 'details' ? 'bg-blue-600 text-white' : 'bg-slate-200'
              }`}>
                1
              </div>
              <span className="text-sm">Guest Details</span>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-300" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step === 'payment' ? 'bg-blue-600 text-white' : 'bg-slate-200'
              }`}>
                2
              </div>
              <span className="text-sm">Payment</span>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-300" />
            <div className="flex items-center gap-2 text-slate-400">
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-200">
                3
              </div>
              <span className="text-sm">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'details' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Guest Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={guestDetails.firstName}
                        onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Smith"
                        value={guestDetails.lastName}
                        onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.smith@email.com"
                        className="pl-10"
                        value={guestDetails.email}
                        onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234-567-8900"
                        className="pl-10"
                        value={guestDetails.phone}
                        onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                      <RadioGroupItem value="usdc" id="usdc" />
                      <Label htmlFor="usdc" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                              <Shield className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span>Pay with USDC via Arc</span>
                                <Badge className="bg-green-500 text-white border-0">Recommended</Badge>
                              </div>
                              <p className="text-sm text-slate-600">
                                Instant, secure blockchain payment
                              </p>
                            </div>
                          </div>
                          <Sparkles className="h-5 w-5 text-blue-600" />
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 border rounded-lg p-4 opacity-50">
                      <RadioGroupItem value="card" id="card" disabled />
                      <Label htmlFor="card" className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-slate-600" />
                          </div>
                          <div>
                            <span>Credit/Debit Card</span>
                            <p className="text-sm text-slate-600">Coming soon</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="bg-blue-50 rounded-lg p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm mb-2">Why pay with USDC via Arc?</div>
                        <ul className="space-y-1 text-sm text-slate-600">
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-600" />
                            Instant confirmation
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-600" />
                            Lower transaction fees
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-600" />
                            Enhanced security with blockchain
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-600" />
                            No currency conversion fees
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={booking.image}
                    alt={booking.hotel}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0">
                    <Shield className="h-3 w-3 mr-1" />
                    {booking.hygieneScore}/10
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg mb-1">{booking.hotel}</h3>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    {booking.location}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-600">Check-in:</span>
                    <span>{booking.checkIn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-600">Check-out:</span>
                    <span>{booking.checkOut}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-600">Duration:</span>
                    <span>{booking.nights} nights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-600" />
                    <span className="text-slate-600">Guests:</span>
                    <span>{booking.guests} adults</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">
                      ${booking.pricePerNight} × {booking.nights} nights
                    </span>
                    <span>${booking.pricePerNight * booking.nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Taxes & fees</span>
                    <span>${booking.taxes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Service fee</span>
                    <span>${booking.serviceFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">${totalPrice}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleConfirmBooking}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  size="lg"
                >
                  {step === 'details' ? 'Continue to Payment' : 'Confirm & Pay'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

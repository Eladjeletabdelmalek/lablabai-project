import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Camera, 
  Upload, 
  Check, 
  AlertTriangle, 
  X, 
  Sparkles,
  Image as ImageIcon,
  Zap,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface InspectionResult {
  category: string;
  status: 'pass' | 'warning' | 'fail';
  confidence: number;
  details: string;
}

interface RoomInspectionData {
  roomNumber: string;
  inspectionDate: string;
  overallScore: number;
  status: 'excellent' | 'good' | 'needs-attention' | 'urgent';
  image: string;
  results: InspectionResult[];
}

const mockInspections: RoomInspectionData[] = [
  {
    roomNumber: '301',
    inspectionDate: '2025-11-02',
    overallScore: 95,
    status: 'excellent',
    image: 'https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMDE0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    results: [
      { category: 'Cleanliness', status: 'pass', confidence: 98, details: 'Room appears pristine and well-maintained' },
      { category: 'Furniture Condition', status: 'pass', confidence: 96, details: 'All furniture in excellent condition' },
      { category: 'Lighting', status: 'pass', confidence: 94, details: 'Adequate lighting detected' },
      { category: 'Amenities', status: 'pass', confidence: 92, details: 'All amenities present and functional' },
    ],
  },
  {
    roomNumber: '205',
    inspectionDate: '2025-11-01',
    overallScore: 78,
    status: 'needs-attention',
    image: 'https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMDE0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    results: [
      { category: 'Cleanliness', status: 'warning', confidence: 75, details: 'Minor dust detected on surfaces' },
      { category: 'Furniture Condition', status: 'pass', confidence: 88, details: 'Furniture in good condition' },
      { category: 'Lighting', status: 'warning', confidence: 72, details: 'One bulb appears dim' },
      { category: 'Amenities', status: 'pass', confidence: 85, details: 'Most amenities present' },
    ],
  },
];

export function RoomInspection() {
  const [inspections, setInspections] = useState<RoomInspectionData[]>(mockInspections);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAnalyzing(false);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'needs-attention':
        return 'bg-orange-500';
      case 'urgent':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getResultIcon = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Room Inspection</h1>
        <p className="text-slate-600">AI-powered visual inspection using CNN models</p>
      </div>

      {/* Upload Section */}
      <Card className="bg-gradient-to-br from-purple-500 to-blue-600 text-white border-0">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Camera className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl mb-2">AI Visual Inspection</h3>
              <p className="text-sm opacity-90">
                Upload room images for instant AI-powered analysis using our CNN models
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="room-image-upload"
              />
              <label htmlFor="room-image-upload">
                <Button asChild variant="secondary" size="lg">
                  <span className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </span>
                </Button>
              </label>
              <Button variant="secondary" size="lg" className="bg-white/20 hover:bg-white/30">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
            </div>
            {analyzing && (
              <div className="space-y-2 max-w-md mx-auto">
                <div className="flex items-center justify-between text-sm">
                  <span>Analyzing image...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2 bg-white/20" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Inspection Results */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Inspections</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="model">CNN Model Info</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          {inspections.map((inspection, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Room {inspection.roomNumber}</CardTitle>
                    <p className="text-sm text-slate-600 mt-1">
                      Inspected on {new Date(inspection.inspectionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${getStatusColor(inspection.status)} text-white border-0`}>
                        {inspection.status}
                      </Badge>
                    </div>
                    <div className="text-2xl">{inspection.overallScore}%</div>
                    <div className="text-xs text-slate-500">Overall Score</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={inspection.image}
                      alt={`Room ${inspection.roomNumber}`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm">CNN Analysis</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {inspection.results.map((result, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getResultIcon(result.status)}
                            <span>{result.category}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {result.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{result.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Inspections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl">127</div>
                <p className="text-sm text-slate-600 mt-1">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl">91.2%</div>
                <p className="text-sm text-slate-600 mt-1">Across all rooms</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Issues Detected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl">8</div>
                <p className="text-sm text-slate-600 mt-1">Requiring attention</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="model" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CNN Model Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Model Architecture</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">ResNet-50</Badge>
                      <Badge variant="outline">Transfer Learning</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Training Dataset</div>
                    <div>50,000+ hotel room images</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Model Accuracy</div>
                    <div className="flex items-center gap-2">
                      <Progress value={96} className="flex-1" />
                      <span>96.2%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Detection Categories</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Cleanliness</Badge>
                      <Badge>Furniture</Badge>
                      <Badge>Lighting</Badge>
                      <Badge>Amenities</Badge>
                      <Badge>Damage</Badge>
                      <Badge>Safety</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Processing Time</div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span>~2.3 seconds per image</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Last Model Update</div>
                    <div>October 15, 2025</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h4 className="mb-3">Capabilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Object Detection & Classification</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Damage Assessment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Cleanliness Scoring</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Amenity Verification</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Lighting Quality Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Safety Hazard Detection</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

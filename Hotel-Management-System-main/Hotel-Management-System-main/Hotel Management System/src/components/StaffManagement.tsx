import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Search, 
  Plus, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'on-leave' | 'off-duty';
  performance: number;
  tasksCompleted: number;
  shiftStart: string;
  shiftEnd: string;
  joinDate: string;
}

const initialStaff: StaffMember[] = [
  {
    id: 'S001',
    name: 'Alice Cooper',
    email: 'alice.cooper@hotel.com',
    phone: '+1 234-567-8910',
    role: 'Front Desk Manager',
    department: 'Reception',
    status: 'active',
    performance: 96,
    tasksCompleted: 245,
    shiftStart: '08:00',
    shiftEnd: '16:00',
    joinDate: '2023-01-15',
  },
  {
    id: 'S002',
    name: 'Bob Martinez',
    email: 'bob.martinez@hotel.com',
    phone: '+1 234-567-8911',
    role: 'Housekeeping Supervisor',
    department: 'Housekeeping',
    status: 'active',
    performance: 94,
    tasksCompleted: 312,
    shiftStart: '06:00',
    shiftEnd: '14:00',
    joinDate: '2022-06-20',
  },
  {
    id: 'S003',
    name: 'Carol White',
    email: 'carol.white@hotel.com',
    phone: '+1 234-567-8912',
    role: 'Concierge',
    department: 'Guest Services',
    status: 'active',
    performance: 98,
    tasksCompleted: 189,
    shiftStart: '12:00',
    shiftEnd: '20:00',
    joinDate: '2023-03-10',
  },
  {
    id: 'S004',
    name: 'David Chen',
    email: 'david.chen@hotel.com',
    phone: '+1 234-567-8913',
    role: 'Chef',
    department: 'Kitchen',
    status: 'active',
    performance: 92,
    tasksCompleted: 156,
    shiftStart: '10:00',
    shiftEnd: '18:00',
    joinDate: '2021-09-05',
  },
  {
    id: 'S005',
    name: 'Eva Thompson',
    email: 'eva.thompson@hotel.com',
    phone: '+1 234-567-8914',
    role: 'Maintenance Engineer',
    department: 'Maintenance',
    status: 'on-leave',
    performance: 89,
    tasksCompleted: 98,
    shiftStart: '08:00',
    shiftEnd: '16:00',
    joinDate: '2022-11-12',
  },
  {
    id: 'S006',
    name: 'Frank Wilson',
    email: 'frank.wilson@hotel.com',
    phone: '+1 234-567-8915',
    role: 'Receptionist',
    department: 'Reception',
    status: 'active',
    performance: 91,
    tasksCompleted: 203,
    shiftStart: '16:00',
    shiftEnd: '00:00',
    joinDate: '2023-07-18',
  },
];

export function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'on-leave':
        return 'bg-orange-500';
      case 'off-duty':
        return 'bg-slate-500';
      default:
        return 'bg-gray-500';
    }
  };

  const stats = {
    totalStaff: staff.length,
    activeStaff: staff.filter(s => s.status === 'active').length,
    averagePerformance: (staff.reduce((sum, s) => sum + s.performance, 0) / staff.length).toFixed(1),
    totalTasks: staff.reduce((sum, s) => sum + s.tasksCompleted, 0),
  };

  const departments = [...new Set(staff.map(s => s.department))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Staff Management</h1>
          <p className="text-slate-600">Manage your hotel team and track performance</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="john@hotel.com" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="+1 234-567-8900" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input placeholder="Receptionist" />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reception">Reception</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="guest-services">Guest Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Join Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Shift Start</Label>
                <Input type="time" />
              </div>
              <div className="space-y-2">
                <Label>Shift End</Label>
                <Input type="time" />
              </div>
              <div className="col-span-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Add Staff Member</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm opacity-90">Total Staff</div>
              <Users className="h-5 w-5 opacity-80" />
            </div>
            <div className="text-4xl mb-1">{stats.totalStaff}</div>
            <div className="text-sm opacity-90">Employees</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm opacity-90">Active Now</div>
              <CheckCircle className="h-5 w-5 opacity-80" />
            </div>
            <div className="text-4xl mb-1">{stats.activeStaff}</div>
            <div className="text-sm opacity-90">On duty</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm opacity-90">Avg Performance</div>
              <Star className="h-5 w-5 opacity-80" />
            </div>
            <div className="text-4xl mb-1">{stats.averagePerformance}%</div>
            <div className="text-sm opacity-90">Team score</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm opacity-90">Tasks Complete</div>
              <TrendingUp className="h-5 w-5 opacity-80" />
            </div>
            <div className="text-4xl mb-1">{stats.totalTasks}</div>
            <div className="text-sm opacity-90">This month</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name, email, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="off-duty">Off Duty</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Staff List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredStaff.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 bg-gradient-to-br from-blue-500 to-purple-600">
                  <AvatarFallback className="text-white text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg mb-1 truncate">{member.name}</h3>
                      <p className="text-sm text-slate-600 truncate">{member.role}</p>
                    </div>
                    <Badge className={`${getStatusColor(member.status)} text-white border-0 ml-2 shrink-0`}>
                      {member.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-3 w-3" />
                      <span>{member.phone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-2 bg-slate-50 rounded">
                      <div className="text-xs text-slate-600 mb-1">Department</div>
                      <div className="text-sm truncate">{member.department}</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded">
                      <div className="text-xs text-slate-600 mb-1">Shift</div>
                      <div className="text-sm flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {member.shiftStart} - {member.shiftEnd}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Performance</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{member.performance}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                        style={{ width: `${member.performance}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>{member.tasksCompleted} tasks completed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Since {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


import { mockStats } from "../../utils/mockData";
import {
  Users,
  Heart,
  Building2,
  AlertCircle,
  DollarSign,
  TrendingUp,
  
} from "lucide-react";

// Simple Card Component (no external UI library needed)
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="p-6 border-b border-gray-100">{children}</div>;
const CardTitle = ({ children }) => <h3 className="text-lg font-semibold text-gray-900">{children}</h3>;
const CardDescription = ({ children }) => <p className="text-sm text-gray-500 mt-1">{children}</p>;
const CardContent = ({ children }) => <div className="p-6">{children}</div>;

// Badge
const Badge = ({ children, variant = "default" }) => {
  const styles = {
    destructive: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    secondary: "bg-gray-100 text-gray-800",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[variant] || "bg-blue-100 text-blue-800"}`}>
      {children}
    </span>
  );
};

// SVG Bar Chart (Beautiful & Lightweight)
const BarChartSVG = () => (
  <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
    <svg viewBox="0 0 800 240" className="w-full h-full">
      {[20, 45, 35, 70, 90, 60, 80, 100, 75, 85, 95, 110].map((height, i) => (
        <g key={i}>
          <rect
            x={60 + i * 60}
            y={220 - height * 1.8}
            width="40"
            height={height * 1.8}
            fill="#3b82f6"
            rx="8"
            className="hover:fill-blue-700 transition"
          />
          <text x={80 + i * 60} y="235" textAnchor="middle" className="text-xs fill-gray-600">
            {["Jan", "Feb", "Mar", "Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]}
          </text>
        </g>
      ))}
    </svg>
  </div>
);

// SVG Pie Chart
const PieChartSVG = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-56 h-56">
      <circle cx="100" cy="100" r="80" fill="#e5e7eb" />
      <path d="M100,100 L100,20 A80,80 0 0,1 165,55 Z" fill="#10b981" />
      <path d="M100,100 L165,55 A80,80 0 0,1 145,145 Z" fill="#f59e0b" />
      <path d="M100,100 L145,145 A80,80 0 0,1 55,145 Z" fill="#ef4444" />
      <path d="M100,100 L55,145 A80,80 0 0,1 100,20 Z" fill="#dc2626" />
      <circle cx="100" cy="100" r="50" fill="white" />
      <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-800">210</text>
      <text x="100" y="115" textAnchor="middle" className="text-xs fill-gray-600">Total Incidents</text>
    </svg>
  </div>
);

export default function AdminDashboard() {
  const stats = mockStats.admin;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Welcome back, Administrator</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card className="hover:shadow-xl transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Citizens</p>
                <p className="text-3xl font-bold mt-2">{stats.totalCitizens}</p>
              </div>
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-4">+12% from last month</p>
          </div>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Volunteers</p>
                <p className="text-3xl font-bold mt-2">{stats.totalVolunteers}</p>
              </div>
              <Heart className="h-12 w-12 text-pink-600" />
            </div>
            <p className="text-xs text-green-600 mt-4">+18 active today</p>
          </div>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hospitals</p>
                <p className="text-3xl font-bold mt-2">{stats.totalHospitals}</p>
              </div>
              <Building2 className="h-12 w-12 text-purple-600" />
            </div>
            <p className="text-xs text-green-600 mt-4">+3 new this month</p>
          </div>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                <p className="text-3xl font-bold mt-2">{stats.activeIncidents}</p>
              </div>
              <AlertCircle className="h-12 w-12 text-red-600" />
            </div>
            <p className="text-xs text-red-600 mt-4">5 critical – Requires attention</p>
          </div>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-3xl font-bold mt-2">{stats.totalDonations}</p>
              </div>
              <DollarSign className="h-12 w-12 text-green-600" />
            </div>
            <p className="text-xs text-gray-600 mt-4">This month</p>
          </div>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Important system alerts and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Critical Incident – Flood in Lahore</p>
                <p className="text-sm text-gray-600 mt-1">15 volunteers dispatched • 3 hospitals on standby</p>
              </div>
              <Badge variant="destructive">Urgent</Badge>
            </div>
          </div>
          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Hospital Capacity Alert</p>
                <p className="text-sm text-gray-600 mt-1">Jinnah Hospital at 92% capacity</p>
              </div>
              <Badge variant="warning">Monitor</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Incident Trends</CardTitle>
            <CardDescription>Last 12 months overview</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartSVG />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
            <CardDescription>Current active incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChartSVG />
          </CardContent>
        </Card>
      </div>

      {/* System Performance */}
      <Card>
        <CardHeader>
          <CardTitle>System Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <TrendingUp className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <p className="text-3xl font-bold">94%</p>
              <p className="text-sm text-gray-600">Response Rate</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <Users className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold">1.2K</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <AlertCircle className="h-10 w-10 text-orange-600 mx-auto mb-3" />
              <p className="text-3xl font-bold">18min</p>
              <p className="text-sm text-gray-600">Avg. Response</p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-xl">
              <Heart className="h-10 w-10 text-pink-600 mx-auto mb-3" />
              <p className="text-3xl font-bold">156</p>
              <p className="text-sm text-gray-600">Active Volunteers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl p-10 text-white text-center">
        <h2 className="text-4xl font-bold">Relief360 Admin Panel</h2>
        <p className="text-xl mt-4 opacity-90">Managing Pakistan's National Emergency Response System</p>
        <p className="mt-2 text-lg">Real-time • Nationwide • Life-saving</p>
      </div>
    </div>
  );
}
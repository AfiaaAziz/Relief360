import React from "react";
//import DashboardLayout from "../../layouts/DashboardLayout";
import { mockChartData } from "../../utils/mockData";
import { TrendingUp, TrendingDown } from "lucide-react";

// Reusable Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md border border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="p-6 border-b border-gray-100">{children}</div>;
const CardTitle = ({ children }) => <h3 className="text-lg font-semibold text-gray-900">{children}</h3>;
const CardDescription = ({ children }) => <p className="text-sm text-gray-500 mt-1">{children}</p>;
const CardContent = ({ children }) => <div className="p-6">{children}</div>;

// Simple Select Component (dropdown)
const Select = ({ children, defaultValue }) => {
  const [value, setValue] = React.useState(defaultValue || "30days");
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-48 appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0l-4.24-4.24a.75.75 0 01.02-1.08z" />
        </svg>
      </div>
    </div>
  );
};

const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;

// Beautiful SVG Charts (no recharts needed)
const LineChartSVG = ({ data }) => (
  <div className="w-full h-64 bg-gradient-to-b from-blue-50 to-white rounded-lg p-6">
    <svg viewBox="0 0 800 240" className="w-full h-full">
      <path
        d={`M 50,200 ${data.map((d, i) => `${50 + i * 60},${200 - d.incidents * 4}`).join(" L ")} L 750,200`}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="4"
        className="drop-shadow-md"
      />
      {data.map((d, i) => (
        <circle key={i} cx={50 + i * 60} cy={200 - d.incidents * 4} r="6" fill="#3b82f6" />
      ))}
      {data.map((d, i) => (
        <text key={i} x={50 + i * 60} y={220} textAnchor="middle" className="text-xs fill-gray-600">
          {d.month}
        </text>
      ))}
    </svg>
  </div>
);

const BarChartSVG = ({ data }) => (
  <div className="w-full h-64 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 flex items-end justify-around gap-4">
    {data.map((item, i) => (
      <div key={i} className="flex flex-col items-center flex-1">
        <div
          className="w-full bg-green-600 rounded-t-md transition-all hover:bg-green-700"
          style={{ height: `${item.active * 3}px` }}
        />
        <span className="text-xs text-gray-600 mt-2">{item.month}</span>
      </div>
    ))}
  </div>
);

const PieChartSVG = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-48 h-48">
      <circle cx="100" cy="100" r="80" fill="#e5e7eb" />
      <path d="M100,100 L100,20 A80,80 0 0,1 170,60 Z" fill="#10b981" />
      <path d="M100,100 L170,60 A80,80 0 0,1 140,160 Z" fill="#f59e0b" />
      <path d="M100,100 L140,160 A80,80 0 0,1 60,160 Z" fill="#ef4444" />
      <path d="M100,100 L60,160 A80,80 0 0,1 100,20 Z" fill="#dc2626" />
      <circle cx="100" cy="100" r="50" fill="white" />
      <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-800">100%</text>
      <text x="100" y="115" textAnchor="middle" className="text-xs fill-gray-600">Total</text>
    </svg>
  </div>
);

export default function Analytics() {
  return (
    //<DashboardLayout role="admin">
      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* Header + Dropdown */}
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-lg text-gray-600 mt-2">Comprehensive system insights</p>
          </div>
          <Select defaultValue="30days">
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Avg Response Time</CardTitle>
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18 min</div>
              <p className="text-sm text-green-600 mt-2">↓ 12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Resolution Rate</CardTitle>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">94%</div>
              <p className="text-sm text-green-600 mt-2">↑ 5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Volunteer Engagement</CardTitle>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">87%</div>
              <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Citizen Satisfaction</CardTitle>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.6/5</div>
              <p className="text-sm text-green-600 mt-2">↑ 0.3 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Incident Trends</CardTitle>
              <CardDescription>Monthly incident reports</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChartSVG data={mockChartData.incidentTrends} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Severity Distribution</CardTitle>
              <CardDescription>Current incident breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChartSVG />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Activity</CardTitle>
              <CardDescription>Active volunteers over time</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChartSVG data={mockChartData.volunteerActivity} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hospital Resource Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Beds", available: 168, total: 200 },
                  { name: "Doctors", available: 42, total: 50 },
                  { name: "Ambulances", available: 18, total: 20 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>{item.available}/{item.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6 mt-1">
                      <div
                        className="bg-green-600 h-6 rounded-full transition-all"
                        style={{ width: `${(item.available / item.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Donation Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Donation Trends</CardTitle>
            <CardDescription>Money & supplies over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 flex items-center justify-center">
              <p className="text-2xl font-bold text-gray-700">Beautiful Dual-Line Chart Here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    //</DashboardLayout>
  );
}
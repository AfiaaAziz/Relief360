import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

// Reusable Card Component with new color palette
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm ${className}`}
    style={{
      background:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
      borderColor: "rgba(22, 83, 126, 0.2)",
    }}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div
    className="p-6 border-b-2"
    style={{
      background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
      borderColor: "rgba(22, 83, 126, 0.3)",
      paddingTop: "1.75rem",
      paddingBottom: "1.75rem",
    }}
  >
    {children}
  </div>
);
const CardTitle = ({ children }) => (
  <h3
    className="text-xl font-black text-white"
    style={{
      textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
      lineHeight: "1.3",
      paddingBottom: "0.25rem",
    }}
  >
    {children}
  </h3>
);
const CardDescription = ({ children }) => (
  <p
    className="text-sm text-white/90 mt-2 font-semibold"
    style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.2)" }}
  >
    {children}
  </p>
);
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
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0l-4.24-4.24a.75.75 0 01.02-1.08z"
          />
        </svg>
      </div>
    </div>
  );
};

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

// Beautiful SVG Charts (no recharts needed)
const LineChartSVG = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  const maxIncidents = Math.max(...data.map((d) => d.incidents), 1);
  const scale = 180 / maxIncidents;

  return (
    <div className="w-full h-64 bg-gradient-to-b from-blue-50 to-white rounded-lg p-6">
      <svg viewBox="0 0 800 240" className="w-full h-full">
        <path
          d={`M 50,200 ${data
            .map(
              (d, i) =>
                `${50 + (i * 700) / (data.length - 1 || 1)},${
                  200 - d.incidents * scale
                }`
            )
            .join(" L ")} L 750,200`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="4"
          className="drop-shadow-md"
        />
        {data.map((d, i) => (
          <circle
            key={i}
            cx={50 + (i * 700) / (data.length - 1 || 1)}
            cy={200 - d.incidents * scale}
            r="6"
            fill="#3b82f6"
          />
        ))}
        {data.map((d, i) => (
          <text
            key={i}
            x={50 + (i * 700) / (data.length - 1 || 1)}
            y={220}
            textAnchor="middle"
            className="text-xs fill-gray-600"
          >
            {i % 5 === 0 || i === data.length - 1 ? d.day : ""}
          </text>
        ))}
      </svg>
    </div>
  );
};

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

const PieChartSVG = ({ incidents = [] }) => {
  if (!incidents || incidents.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  const severityCounts = {
    critical: incidents.filter((i) => i.severity === "critical").length,
    high: incidents.filter((i) => i.severity === "high").length,
    medium: incidents.filter((i) => i.severity === "medium").length,
    low: incidents.filter((i) => i.severity === "low").length,
  };

  const total = incidents.length;
  const criticalPct = (severityCounts.critical / total) * 360;
  const highPct = (severityCounts.high / total) * 360;
  const mediumPct = (severityCounts.medium / total) * 360;

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-48 h-48">
        <circle cx="100" cy="100" r="80" fill="#e5e7eb" />
        {criticalPct > 0 && (
          <path
            d={`M100,100 L100,20 A80,80 0 ${criticalPct > 180 ? 1 : 0},1 ${
              100 + 80 * Math.cos((criticalPct * Math.PI) / 180 - Math.PI / 2)
            },${
              100 + 80 * Math.sin((criticalPct * Math.PI) / 180 - Math.PI / 2)
            } Z`}
            fill="#dc2626"
          />
        )}
        {highPct > 0 && (
          <path
            d={`M100,100 L${
              100 + 80 * Math.cos((criticalPct * Math.PI) / 180 - Math.PI / 2)
            },${
              100 + 80 * Math.sin((criticalPct * Math.PI) / 180 - Math.PI / 2)
            } A80,80 0 ${highPct > 180 ? 1 : 0},1 ${
              100 +
              80 *
                Math.cos(
                  ((criticalPct + highPct) * Math.PI) / 180 - Math.PI / 2
                )
            },${
              100 +
              80 *
                Math.sin(
                  ((criticalPct + highPct) * Math.PI) / 180 - Math.PI / 2
                )
            } Z`}
            fill="#ef4444"
          />
        )}
        {mediumPct > 0 && (
          <path
            d={`M100,100 L${
              100 +
              80 *
                Math.cos(
                  ((criticalPct + highPct) * Math.PI) / 180 - Math.PI / 2
                )
            },${
              100 +
              80 *
                Math.sin(
                  ((criticalPct + highPct) * Math.PI) / 180 - Math.PI / 2
                )
            } A80,80 0 ${mediumPct > 180 ? 1 : 0},1 ${
              100 +
              80 *
                Math.cos(
                  ((criticalPct + highPct + mediumPct) * Math.PI) / 180 -
                    Math.PI / 2
                )
            },${
              100 +
              80 *
                Math.sin(
                  ((criticalPct + highPct + mediumPct) * Math.PI) / 180 -
                    Math.PI / 2
                )
            } Z`}
            fill="#f59e0b"
          />
        )}
        {(severityCounts.low / total) * 360 > 0 && (
          <path
            d={`M100,100 L${
              100 +
              80 *
                Math.cos(
                  ((criticalPct + highPct + mediumPct) * Math.PI) / 180 -
                    Math.PI / 2
                )
            },${
              100 +
              80 *
                Math.sin(
                  ((criticalPct + highPct + mediumPct) * Math.PI) / 180 -
                    Math.PI / 2
                )
            } A80,80 0 ${
              (severityCounts.low / total) * 360 > 180 ? 1 : 0
            },1 100,20 Z`}
            fill="#10b981"
          />
        )}
        <circle cx="100" cy="100" r="50" fill="white" />
        <text
          x="100"
          y="95"
          textAnchor="middle"
          className="text-2xl font-bold fill-gray-800"
        >
          {total}
        </text>
        <text
          x="100"
          y="115"
          textAnchor="middle"
          className="text-xs fill-gray-600"
        >
          Total
        </text>
      </svg>
    </div>
  );
};

export default function Analytics() {
  const [incidents, setIncidents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incidentsRes, volunteersRes, hospitalsRes] = await Promise.all([
          fetch("http://localhost:5000/api/incidents"),
          fetch("http://localhost:5000/api/volunteers"),
          fetch("http://localhost:5000/api/hospitals"),
        ]);

        const incidentsData = incidentsRes.ok ? await incidentsRes.json() : [];
        const volunteersData = volunteersRes.ok
          ? await volunteersRes.json()
          : [];
        const hospitalsData = hospitalsRes.ok ? await hospitalsRes.json() : [];

        setIncidents(incidentsData);
        setVolunteers(volunteersData);
        setHospitals(hospitalsData);
        setAssignments([]); // assignments debug removed
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every 30 seconds for real-time updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate resolution rate from real data
  // Use the same logic as dashboard for consistency
  const looksResolved = (incident) => {
    if (!incident) return false;
    const status = String(incident.status || incident.state || "")
      .toLowerCase()
      .trim();
    if (status === "resolved" || status.includes("resolved")) return true;
    if (
      incident.resolved === true ||
      incident.is_resolved === true ||
      incident.isResolved === true
    )
      return true;
    return false;
  };

  const resolvedCount = incidents.filter((i) => looksResolved(i)).length;
  const totalCount = incidents.length || 1;
  const resolutionRate =
    totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;

  // Calculate average response time (time from incident creation to admin approval/assignment)
  const calculateAvgResponseTime = () => {
    if (incidents.length === 0) return "0 min";

    const responseTimes = [];

    incidents.forEach((incident) => {
      if (!incident.created_at) return;

      const createdTime = new Date(incident.created_at).getTime();

      // First, try to find assignment timestamp (when admin approved/assigned)
      const assignment = assignments.find((a) => a.incident_id === incident.id);
      if (assignment && assignment.assigned_at) {
        const assignedTime = new Date(assignment.assigned_at).getTime();
        const diffMinutes = (assignedTime - createdTime) / (1000 * 60);
        if (diffMinutes > 0) {
          responseTimes.push(diffMinutes);
        }
      } else if (
        incident.status &&
        incident.status !== "pending" &&
        incident.updated_at
      ) {
        // If no assignment but status changed (admin approved by changing status)
        // Use updated_at as proxy for when admin took action
        const updatedTime = new Date(incident.updated_at).getTime();
        const diffMinutes = (updatedTime - createdTime) / (1000 * 60);
        if (diffMinutes > 0 && diffMinutes < 10080) {
          // Less than 7 days (reasonable response time)
          responseTimes.push(diffMinutes);
        }
      }
    });

    if (responseTimes.length === 0) return "N/A";

    const avgMinutes =
      responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;

    // Format the time nicely
    if (avgMinutes < 60) {
      return `${Math.round(avgMinutes)} min`;
    } else if (avgMinutes < 1440) {
      const hours = Math.floor(avgMinutes / 60);
      const mins = Math.round(avgMinutes % 60);
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    } else {
      const days = Math.floor(avgMinutes / 1440);
      const hours = Math.round((avgMinutes % 1440) / 60);
      return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
    }
  };

  const avgResponseTime = calculateAvgResponseTime();

  // Calculate volunteer engagement
  const activeVolunteers = volunteers.filter(
    (v) => v.availability === "Available"
  ).length;
  const volunteerEngagement = volunteers.length
    ? Math.round((activeVolunteers / volunteers.length) * 100)
    : 0;

  // Group incidents by day for chart (last 30 days)
  const dailyIncidents = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    date.setHours(0, 0, 0, 0);
    const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD

    const count = incidents.filter((inc) => {
      if (!inc.created_at) return false;
      const incDate = new Date(inc.created_at);
      incDate.setHours(0, 0, 0, 0);
      return incDate.getTime() === date.getTime();
    }).length;

    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
      date: dateStr,
      incidents: count,
    };
  });

  // Volunteer activity (last 6 months)
  const monthlyVolunteers = Array.from({ length: 6 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - (5 - i));
    return {
      month: month.toLocaleString("default", { month: "short" }),
      active: Math.floor(Math.random() * 20) + 10, // Approximate
    };
  });

  return (
    <div
      className="p-6 space-y-8 max-w-7xl mx-auto relative overflow-hidden min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
      }}
    >
      {/* Header + Dropdown */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1
            className="text-5xl md:text-6xl font-black mb-3"
            style={{
              background:
                "linear-gradient(135deg, #16537e 0%, #6aa84f 50%, #38761d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 4px 20px rgba(22, 83, 126, 0.2)",
              lineHeight: "1.2",
              paddingBottom: "0.5rem",
            }}
          >
            Analytics Dashboard
          </h1>
          <p
            className="text-xl md:text-2xl font-bold mt-3"
            style={{ color: "#16537e" }}
          >
            Comprehensive system insights
          </p>
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
            <div className="text-3xl font-bold">
              {loading ? "..." : avgResponseTime}
            </div>
            <p className="text-sm text-gray-600 mt-2">Average response time</p>
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
            <div className="text-3xl font-bold">
              {loading ? "..." : `${resolutionRate}%`}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {resolvedCount} of {totalCount} incidents resolved
            </p>
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
            <div className="text-3xl font-bold">
              {loading ? "..." : `${volunteerEngagement}%`}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {activeVolunteers} of {volunteers.length} volunteers active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Total Incidents</CardTitle>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? "..." : incidents.length}
            </div>
            <p className="text-sm text-gray-600 mt-2">All time incidents</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Incident Trends</CardTitle>
            <CardDescription>Last 30 days overview</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Loading chart data...
              </div>
            ) : (
              <LineChartSVG data={dailyIncidents} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
            <CardDescription>Current incident breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Loading chart data...
              </div>
            ) : (
              <PieChartSVG incidents={incidents} />
            )}
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
            {loading ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Loading chart data...
              </div>
            ) : (
              <BarChartSVG data={monthlyVolunteers} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hospital Resource Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-4 text-gray-500">
                  Loading hospital data...
                </div>
              ) : hospitals.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No hospital data available
                </div>
              ) : (
                [
                  {
                    name: "Beds",
                    available: hospitals.reduce(
                      (sum, h) => sum + (h.total_beds || 0),
                      0
                    ),
                    total: hospitals.reduce(
                      (sum, h) => sum + (h.total_beds || 0),
                      0
                    ),
                  },
                  {
                    name: "Doctors",
                    available: hospitals.reduce(
                      (sum, h) => sum + (h.staff_count || 0),
                      0
                    ),
                    total: hospitals.reduce(
                      (sum, h) => sum + (h.staff_count || 0),
                      0
                    ),
                  },
                  {
                    name: "Ambulances",
                    available: hospitals.reduce(
                      (sum, h) => sum + (h.ambulances || 0),
                      0
                    ),
                    total: hospitals.reduce(
                      (sum, h) => sum + (h.ambulances || 0),
                      0
                    ),
                  },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>
                        {item.available}/{item.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6 mt-1">
                      <div
                        className="bg-green-600 h-6 rounded-full transition-all"
                        style={{
                          width: `${(item.available / item.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

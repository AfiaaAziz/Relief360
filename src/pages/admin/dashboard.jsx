import { useState, useEffect } from "react";
import {
  Users,
  Heart,
  Building2,
  AlertCircle,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import "../../styles/theme.css";

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }
  
  .animate-slide-up {
    animation: slide-up 0.6s ease-out forwards;
    opacity: 0;
  }
`;
document.head.appendChild(style);

// Simple Card Component with gradient and animations
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);
const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Badge
const Badge = ({ children, variant = "default" }) => {
  const styles = {
    destructive: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    secondary: "bg-gray-100 text-gray-800",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[variant] || "bg-blue-100 text-blue-800"
      }`}
    >
      {children}
    </span>
  );
};

// SVG Bar Chart - Dynamic based on incidents by day
const BarChartSVG = ({ incidents = [] }) => {
  if (!incidents || incidents.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-500">
        No incident data available
      </div>
    );
  }

  // Group incidents by day (last 30 days)
  const dailyData = Array.from({ length: 30 }, (_, i) => {
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
      count,
    };
  });

  const maxCount = Math.max(...dailyData.map((d) => d.count), 1);
  const barWidth = 20;
  const spacing = 5;
  const totalWidth = (barWidth + spacing) * 30;
  const startX = (800 - totalWidth) / 2;

  return (
    <div className="w-full h-64 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 shadow-inner">
      <svg viewBox="0 0 800 240" className="w-full h-full">
        {dailyData.map((data, i) => {
          const height = maxCount > 0 ? (data.count / maxCount) * 180 : 0;
          const x = startX + i * (barWidth + spacing);
          return (
            <g key={i}>
              <rect
                x={x}
                y={220 - height}
                width={barWidth}
                height={height || 0}
                fill="url(#barGradient)"
                rx="4"
                className="hover:opacity-80 transition-all duration-300"
                style={{ animationDelay: `${i * 20}ms` }}
              />
              {/* Show day number, rotate every 5 days to avoid crowding */}
              {i % 5 === 0 || i === 29 ? (
                <text
                  x={x + barWidth / 2}
                  y="235"
                  textAnchor="middle"
                  className="text-xs fill-gray-700 font-semibold"
                >
                  {data.day}
                </text>
              ) : null}
            </g>
          );
        })}
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#6366f1", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// SVG Pie Chart - Dynamic based on incident severity
const PieChartSVG = ({ incidents = [] }) => {
  const severityCounts = {
    critical: incidents.filter((i) => i.severity === "critical").length,
    high: incidents.filter((i) => i.severity === "high").length,
    medium: incidents.filter((i) => i.severity === "medium").length,
    low: incidents.filter((i) => i.severity === "low").length,
  };
  const total = incidents.length || 1;
  const criticalPct = (severityCounts.critical / total) * 100;
  const highPct = (severityCounts.high / total) * 100;
  const mediumPct = (severityCounts.medium / total) * 100;
  const lowPct = (severityCounts.low / total) * 100;

  // Calculate angles for pie chart
  const criticalAngle = (criticalPct / 100) * 360;
  const highAngle = (highPct / 100) * 360;
  const mediumAngle = (mediumPct / 100) * 360;

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-56 h-56">
        <circle cx="100" cy="100" r="80" fill="#e5e7eb" />
        {criticalPct > 0 && (
          <path
            d={`M100,100 L100,20 A80,80 0 ${criticalAngle > 180 ? 1 : 0},1 ${
              100 + 80 * Math.cos((criticalAngle * Math.PI) / 180 - Math.PI / 2)
            },${
              100 + 80 * Math.sin((criticalAngle * Math.PI) / 180 - Math.PI / 2)
            } Z`}
            fill="#dc2626"
          />
        )}
        {highPct > 0 && (
          <path
            d={`M100,100 L${
              100 + 80 * Math.cos((criticalAngle * Math.PI) / 180 - Math.PI / 2)
            },${
              100 + 80 * Math.sin((criticalAngle * Math.PI) / 180 - Math.PI / 2)
            } A80,80 0 ${highAngle > 180 ? 1 : 0},1 ${
              100 +
              80 *
                Math.cos(
                  ((criticalAngle + highAngle) * Math.PI) / 180 - Math.PI / 2
                )
            },${
              100 +
              80 *
                Math.sin(
                  ((criticalAngle + highAngle) * Math.PI) / 180 - Math.PI / 2
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
                  ((criticalAngle + highAngle) * Math.PI) / 180 - Math.PI / 2
                )
            },${
              100 +
              80 *
                Math.sin(
                  ((criticalAngle + highAngle) * Math.PI) / 180 - Math.PI / 2
                )
            } A80,80 0 ${mediumAngle > 180 ? 1 : 0},1 ${
              100 +
              80 *
                Math.cos(
                  ((criticalAngle + highAngle + mediumAngle) * Math.PI) / 180 -
                    Math.PI / 2
                )
            },${
              100 +
              80 *
                Math.sin(
                  ((criticalAngle + highAngle + mediumAngle) * Math.PI) / 180 -
                    Math.PI / 2
                )
            } Z`}
            fill="#f59e0b"
          />
        )}
        {lowPct > 0 && (
          <path
            d={`M100,100 L${
              100 +
              80 *
                Math.cos(
                  ((criticalAngle + highAngle + mediumAngle) * Math.PI) / 180 -
                    Math.PI / 2
                )
            },${
              100 +
              80 *
                Math.sin(
                  ((criticalAngle + highAngle + mediumAngle) * Math.PI) / 180 -
                    Math.PI / 2
                )
            } A80,80 0 ${lowPct > 50 ? 1 : 0},1 100,20 Z`}
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
          Total Incidents
        </text>
      </svg>
    </div>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCitizens: 0,
    totalVolunteers: 0,
    totalHospitals: 0,
    activeIncidents: 0,
    totalDonations: "PKR 0",
  });
  const [allIncidents, setAllIncidents] = useState([]);
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [dismissedNotifications, setDismissedNotifications] = useState(
    new Set()
  );
  const [volunteers, setVolunteers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to detect resolved incidents robustly
  const looksResolved = (incident) => {
    if (!incident) return false;
    const status = String(incident.status || incident.state || "")
      .toLowerCase()
      .trim();
    if (status.includes("resolved") || status === "closed" || status === "done")
      return true;
    if (
      incident.resolved === true ||
      incident.is_resolved === true ||
      incident.isResolved === true
    )
      return true;
    for (const v of Object.values(incident)) {
      if (typeof v === "string" && v.toLowerCase().includes("resolved"))
        return true;
    }
    return false;
  };

  const resolutionRate =
    allIncidents.length > 0
      ? Math.round(
          (allIncidents.filter((i) => looksResolved(i)).length /
            allIncidents.length) *
            100
        )
      : 0;

  // Calculate average response time (time from incident creation to admin approval/assignment)
  const calculateAvgResponseTime = () => {
    if (allIncidents.length === 0) return "0 min";

    const responseTimes = [];

    allIncidents.forEach((incident) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel (assignments debug removed)
        const [incidentsRes, volunteersRes, hospitalsRes] = await Promise.all([
          fetch("http://localhost:5000/api/incidents"),
          fetch("http://localhost:5000/api/volunteers"),
          fetch("http://localhost:5000/api/hospitals"),
        ]);

        const incidents = incidentsRes.ok ? await incidentsRes.json() : [];
        const volunteersData = volunteersRes.ok
          ? await volunteersRes.json()
          : [];
        const hospitals = hospitalsRes.ok ? await hospitalsRes.json() : [];

        // Store all incidents for charts
        setAllIncidents(incidents);
        setVolunteers(volunteersData);
        setAssignments([]); // assignments debug removed

        // Calculate stats from real data
        const activeIncidents = incidents.filter(
          (i) => i.status === "pending" || i.status === "in_progress"
        ).length;

        // Get recent critical incidents for notifications (excluding dismissed ones)
        const critical = incidents
          .filter(
            (i) =>
              i.severity === "critical" &&
              i.status !== "resolved" &&
              !dismissedNotifications.has(i.id)
          )
          .slice(0, 5);

        setRecentIncidents(critical);

        // Count citizens (users with role 'citizen') - we'll approximate from incidents
        // Since there's no direct API, we'll count unique reporters
        const uniqueCitizens = new Set(
          incidents
            .map((i) => i.reported_by_user_id)
            .filter((id) => id !== null)
        ).size;

        // Try to fetch donations from backend API (fallback to localStorage)
        let totalDonations = 0;
        try {
          const r = await fetch("http://localhost:5000/api/donations");
          if (r.ok) {
            const donations = await r.json();
            totalDonations = (donations || [])
              .filter((d) => (d.type || "").toLowerCase() === "money")
              .reduce(
                (sum, d) =>
                  sum +
                  (parseFloat(
                    d.amount_value ||
                      String(d.amount || "").replace(/[^0-9.]/g, "")
                  ) || 0),
                0
              );
          } else {
            const storedDonations = localStorage.getItem("donations");
            if (storedDonations) {
              const donations = JSON.parse(storedDonations);
              totalDonations = donations
                .filter((d) => d.type === "Money" || d.type === "money")
                .reduce((sum, d) => {
                  const amount = parseFloat(
                    d.amount?.replace(/[^0-9.]/g, "") || 0
                  );
                  return sum + amount;
                }, 0);
            }
          }
        } catch (e) {
          console.error("Error fetching donations from API:", e);
          const storedDonations = localStorage.getItem("donations");
          if (storedDonations) {
            const donations = JSON.parse(storedDonations);
            totalDonations = donations
              .filter((d) => d.type === "Money" || d.type === "money")
              .reduce((sum, d) => {
                const amount = parseFloat(
                  d.amount?.replace(/[^0-9.]/g, "") || 0
                );
                return sum + amount;
              }, 0);
          }
        }

        setStats({
          totalCitizens: uniqueCitizens || incidents.length * 2, // Approximate
          totalVolunteers: volunteers.length,
          totalHospitals: hospitals.length,
          activeIncidents: activeIncidents,
          totalDonations: `PKR ${totalDonations.toLocaleString()}`,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [dismissedNotifications, volunteers.length]);

  return (
    <div
      className="min-h-screen p-6 space-y-8 max-w-7xl mx-auto"
      style={{
        background:
          "radial-gradient(circle at 0% 0%, rgba(22, 83, 126, 0.1) 0%, rgba(56, 118, 29, 0.1) 50%, rgba(106, 168, 79, 0.05) 100%)",
      }}
    >
      {/* Header */}
      <div className="animate-fade-in">
        <h1
          className="text-5xl font-extrabold"
          style={{
            background:
              "linear-gradient(135deg, #16537e 0%, #38761d 50%, #6aa84f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Admin Dashboard
        </h1>
        <p className="text-xl mt-3 font-semibold" style={{ color: "#16537e" }}>
          Welcome back, Administrator
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card className="relative overflow-hidden group">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at center, rgba(22, 83, 126, 0.1) 0%, rgba(56, 118, 29, 0.1) 100%)",
            }}
          ></div>
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "#16537e" }}
                >
                  Total Citizens
                </p>
                <p
                  className="text-5xl font-extrabold leading-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #16537e 0%, #38761d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {loading ? (
                    <span className="text-gray-400">...</span>
                  ) : (
                    stats.totalCitizens
                  )}
                </p>
              </div>
              <div
                className="p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #16537e 0%, #38761d 100%)",
                }}
              >
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>
            <div
              className="flex items-center gap-2 mt-4 pt-4 border-t"
              style={{ borderColor: "#16537e" }}
            >
              <div
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#6aa84f" }}
              ></div>
              <p
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#16537e" }}
              >
                Active users
              </p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden group">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at center, rgba(244, 67, 54, 0.1) 0%, rgba(244, 136, 54, 0.1) 100%)",
            }}
          ></div>
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "#f44336" }}
                >
                  Volunteers
                </p>
                <p
                  className="text-5xl font-extrabold leading-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #f44336 0%, #f48836 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {loading ? (
                    <span className="text-gray-400">...</span>
                  ) : (
                    stats.totalVolunteers
                  )}
                </p>
              </div>
              <div
                className="p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #f44336 0%, #f48836 100%)",
                }}
              >
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>
            <div
              className="flex items-center gap-2 mt-4 pt-4 border-t"
              style={{ borderColor: "#f44336" }}
            >
              <div
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#f44336" }}
              ></div>
              <p
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#16537e" }}
              >
                Registered volunteers
              </p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden group">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at center, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.1) 100%)",
            }}
          ></div>
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "#6aa84f" }}
                >
                  Hospitals
                </p>
                <p
                  className="text-5xl font-extrabold leading-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {loading ? (
                    <span className="text-gray-400">...</span>
                  ) : (
                    stats.totalHospitals
                  )}
                </p>
              </div>
              <div
                className="p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                }}
              >
                <Building2 className="h-12 w-12 text-white" />
              </div>
            </div>
            <div
              className="flex items-center gap-2 mt-4 pt-4 border-t"
              style={{ borderColor: "#6aa84f" }}
            >
              <div
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#6aa84f" }}
              ></div>
              <p
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#16537e" }}
              >
                Registered hospitals
              </p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden group">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255, 53, 53, 0.1) 0%, rgba(244, 67, 54, 0.1) 100%)",
            }}
          ></div>
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "#ff3535" }}
                >
                  Active Incidents
                </p>
                <p
                  className="text-5xl font-extrabold leading-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {loading ? (
                    <span className="text-gray-400">...</span>
                  ) : (
                    stats.activeIncidents
                  )}
                </p>
              </div>
              <div
                className="p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
                }}
              >
                <AlertCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <div
              className="flex items-center gap-2 mt-4 pt-4 border-t"
              style={{
                borderColor: recentIncidents.length > 0 ? "#ff3535" : "#6aa84f",
              }}
            >
              <div
                className={`h-2 w-2 rounded-full animate-pulse`}
                style={{
                  backgroundColor:
                    recentIncidents.length > 0 ? "#ff3535" : "#6aa84f",
                }}
              ></div>
              <p
                className="text-xs font-semibold uppercase tracking-wide"
                style={{
                  color: recentIncidents.length > 0 ? "#ff3535" : "#38761d",
                }}
              >
                {recentIncidents.length > 0
                  ? `${recentIncidents.length} critical – Requires attention`
                  : "All incidents under control"}
              </p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden group">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at center, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.1) 100%)",
            }}
          ></div>
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "#38761d" }}
                >
                  Total Donations
                </p>
                <p
                  className="text-4xl font-extrabold leading-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stats.totalDonations}
                </p>
              </div>
              <div
                className="p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                }}
              >
                <DollarSign className="h-12 w-12 text-white" />
              </div>
            </div>
            <div
              className="flex items-center gap-2 mt-4 pt-4 border-t"
              style={{ borderColor: "#38761d" }}
            >
              <div
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#6aa84f" }}
              ></div>
              <p
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#16537e" }}
              >
                This month
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card className="animate-slide-up">
        <CardHeader
          style={{
            background:
              "linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(56, 118, 29, 0.1) 100%)",
          }}
        >
          <CardTitle
            className="text-2xl font-extrabold"
            style={{
              background: "linear-gradient(135deg, #16537e 0%, #38761d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Recent Notifications
          </CardTitle>
          <CardDescription
            className="font-semibold mt-2"
            style={{ color: "#16537e" }}
          >
            Important system alerts and updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {loading ? (
            <div className="text-center py-12">
              <div
                className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 mb-4"
                style={{ borderColor: "#16537e" }}
              ></div>
              <p className="font-semibold" style={{ color: "#16537e" }}>
                Loading notifications...
              </p>
            </div>
          ) : recentIncidents.length > 0 ? (
            recentIncidents.map((incident, index) => (
              <div
                key={incident.id}
                className="p-6 border-l-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  borderColor: "#ff3535",
                  background:
                    "linear-gradient(135deg, rgba(255, 53, 53, 0.1) 0%, rgba(244, 67, 54, 0.1) 50%, rgba(244, 136, 54, 0.05) 100%)",
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="h-3 w-3 rounded-full animate-pulse"
                        style={{ backgroundColor: "#ff3535" }}
                      ></div>
                      <p
                        className="font-extrabold text-xl"
                        style={{ color: "#16537e" }}
                      >
                        Critical Incident – {incident.title}
                      </p>
                    </div>
                    <div className="space-y-2 ml-5">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#16537e" }}
                      >
                        📍 Location:{" "}
                        <span className="font-bold">{incident.location}</span>
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#16537e" }}
                      >
                        📊 Status:{" "}
                        <span className="font-bold capitalize">
                          {incident.status}
                        </span>
                      </p>
                      <p
                        className="text-xs mt-3 font-medium"
                        style={{ color: "#16537e" }}
                      >
                        ⏰ Reported:{" "}
                        {new Date(incident.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Badge
                      className="font-bold text-xs px-3 py-1 text-white"
                      style={{ backgroundColor: "#ff3535" }}
                    >
                      Urgent
                    </Badge>
                    <button
                      onClick={() => {
                        setDismissedNotifications((prev) => {
                          const newSet = new Set(prev);
                          newSet.add(incident.id);
                          return newSet;
                        });
                        setRecentIncidents((prev) =>
                          prev.filter((i) => i.id !== incident.id)
                        );
                      }}
                      className="px-5 py-2.5 text-sm font-bold text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                      }}
                    >
                      ✓ OK
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className="p-6 border-l-4 rounded-xl shadow-lg"
              style={{
                borderColor: "#6aa84f",
                background:
                  "linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.1) 100%)",
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: "#6aa84f" }}
                    ></div>
                    <p
                      className="font-extrabold text-xl"
                      style={{ color: "#16537e" }}
                    >
                      All Systems Operational
                    </p>
                  </div>
                  <p
                    className="text-sm mt-2 font-semibold ml-5"
                    style={{ color: "#16537e" }}
                  >
                    ✓ No critical incidents requiring immediate attention
                  </p>
                </div>
                <button
                  onClick={() => {
                    // Refresh to check for new notifications
                    window.location.reload();
                  }}
                  className="px-5 py-2.5 text-sm font-bold text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                  }}
                >
                  ✓ OK
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader
            style={{
              background:
                "linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(56, 118, 29, 0.1) 100%)",
            }}
          >
            <CardTitle
              className="text-xl font-extrabold"
              style={{
                background: "linear-gradient(135deg, #16537e 0%, #38761d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Incident Trends
            </CardTitle>
            <CardDescription
              className="font-semibold mt-2"
              style={{ color: "#16537e" }}
            >
              Last 30 days overview
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="h-64 flex items-center justify-center text-gray-500 font-medium">
                Loading chart data...
              </div>
            ) : (
              <BarChartSVG incidents={allIncidents} />
            )}
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader
            style={{
              background:
                "linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 136, 54, 0.1) 100%)",
            }}
          >
            <CardTitle
              className="text-xl font-extrabold"
              style={{
                background: "linear-gradient(135deg, #f44336 0%, #f48836 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Severity Distribution
            </CardTitle>
            <CardDescription
              className="font-semibold mt-2"
              style={{ color: "#16537e" }}
            >
              Current active incidents
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="h-64 flex items-center justify-center text-gray-500 font-medium">
                Loading chart data...
              </div>
            ) : (
              <PieChartSVG incidents={allIncidents} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* System Performance */}
      <Card className="animate-slide-up" style={{ animationDelay: "400ms" }}>
        <CardHeader
          style={{
            background:
              "linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(56, 118, 29, 0.1) 100%)",
          }}
        >
          <CardTitle
            className="text-2xl font-extrabold"
            style={{
              background:
                "linear-gradient(135deg, #16537e 0%, #38761d 50%, #6aa84f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            System Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div
              className="text-center p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.1) 100%)",
                borderColor: "#6aa84f",
              }}
            >
              <div
                className="p-4 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                style={{
                  background:
                    "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                }}
              >
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <p
                className="text-5xl font-extrabold mb-2 leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {loading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  `${resolutionRate}%`
                )}
              </p>
              <p
                className="text-xs font-bold uppercase tracking-wider mt-3"
                style={{ color: "#38761d" }}
              >
                Resolution Rate
              </p>
            </div>
            <div
              className="text-center p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(56, 118, 29, 0.1) 100%)",
                borderColor: "#16537e",
              }}
            >
              <div
                className="p-4 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                style={{
                  background:
                    "linear-gradient(135deg, #16537e 0%, #38761d 100%)",
                }}
              >
                <Users className="h-10 w-10 text-white" />
              </div>
              <p
                className="text-5xl font-extrabold mb-2 leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #16537e 0%, #38761d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {loading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  stats.totalCitizens + stats.totalVolunteers
                )}
              </p>
              <p
                className="text-xs font-bold uppercase tracking-wider mt-3"
                style={{ color: "#16537e" }}
              >
                Active Users
              </p>
            </div>
            <div
              className="text-center p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(244, 136, 54, 0.1) 0%, rgba(244, 67, 54, 0.1) 100%)",
                borderColor: "#f48836",
              }}
            >
              <div
                className="p-4 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                style={{
                  background:
                    "linear-gradient(135deg, #f48836 0%, #f44336 100%)",
                }}
              >
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
              <p
                className="text-4xl font-extrabold mb-2 leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #f48836 0%, #f44336 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {loading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  avgResponseTime
                )}
              </p>
              <p
                className="text-xs font-bold uppercase tracking-wider mt-3"
                style={{ color: "#f48836" }}
              >
                Avg. Response
              </p>
            </div>
            <div
              className="text-center p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(255, 53, 53, 0.1) 100%)",
                borderColor: "#f44336",
              }}
            >
              <div
                className="p-4 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                style={{
                  background:
                    "linear-gradient(135deg, #f44336 0%, #ff3535 100%)",
                }}
              >
                <Heart className="h-10 w-10 text-white" />
              </div>
              <p
                className="text-5xl font-extrabold mb-2 leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #f44336 0%, #ff3535 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {loading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  volunteers.filter((v) => v.availability === "Available")
                    .length
                )}
              </p>
              <p
                className="text-xs font-bold uppercase tracking-wider mt-3"
                style={{ color: "#f44336" }}
              >
                Active Volunteers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Banner */}
      <div
        className="rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden animate-slide-up"
        style={{
          animationDelay: "500ms",
          background:
            "linear-gradient(135deg, #16537e 0%, #38761d 50%, #6aa84f 100%)",
        }}
      >
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(244, 67, 54, 0.2) 0%, transparent 70%)",
          }}
        ></div>
        <div className="relative z-10">
          <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Relief360 Admin Panel
          </h2>
          <p className="text-xl mt-4 font-semibold opacity-95">
            Managing Pakistan's National Emergency Response System
          </p>
          <p className="mt-3 text-lg font-medium opacity-90">
            Real-time • Nationwide • Life-saving
          </p>
        </div>
      </div>
    </div>
  );
}

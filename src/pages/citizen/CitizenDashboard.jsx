import React from "react";
import {
  AlertCircle,
  Hospital,
  Shield,
  Phone,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockStats, mockIncidents } from "../../utils/mockData";
import { useAuth } from "../../context/AuthContext";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

// Reusable styled components matching admin portal
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

const CardHeader = ({ children, className = "" }) => (
  <div
    className={`p-6 border-b-2 ${className}`}
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

const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`text-xl font-black text-white ${className}`}
    style={{
      textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
      lineHeight: "1.3",
      paddingBottom: "0.25rem",
    }}
  >
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p
    className={`text-sm text-white/90 mt-2 font-semibold ${className}`}
    style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.2)" }}
  >
    {children}
  </p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CitizenDashboard = () => {
  const stats = mockStats.citizen;
  const { user } = useAuth();

  // Construct a human-friendly display name using any available fields
  const nameParts = [];
  if (user) {
    if (user.name) nameParts.push(user.name);
    const fn = user.firstName || user.first_name;
    const ln = user.lastName || user.last_name;
    if (fn) nameParts.push(fn);
    if (ln) nameParts.push(ln);
  }
  const displayName = nameParts.length
    ? nameParts.join(" ")
    : user?.email || "Citizen";

  return (
    <div
      className="p-6 space-y-6 relative overflow-hidden min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
      }}
    >
      <div className="animate-fade-in">
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
          {`Welcome, ${displayName}`}
        </h1>
        <p
          className="text-xl md:text-2xl font-bold mt-3"
          style={{ color: "#16537e" }}
        >
          Stay safe and informed with Relief360
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Incidents
            </CardTitle>
            <FileText
              className="h-5 w-5 text-white"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
            />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black" style={{ color: "#16537e" }}>
              {stats.totalIncidents}
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold">
              Reported incidents
            </p>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle
              className="h-5 w-5 text-white"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
            />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black" style={{ color: "#f48836" }}>
              {stats.pendingIncidents}
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold">
              Awaiting response
            </p>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <TrendingUp
              className="h-5 w-5 text-white"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
            />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black" style={{ color: "#6aa84f" }}>
              {stats.resolvedIncidents}
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold">
              Successfully resolved
            </p>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle
              className="h-5 w-5 text-white"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
            />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black" style={{ color: "#ff3535" }}>
              {stats.activeAlerts}
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold">
              Current alerts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Latest Alerts */}
      <Card className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
        <CardHeader>
          <CardTitle>Latest Emergency Alerts</CardTitle>
          <CardDescription>
            Stay informed about ongoing emergencies in your area
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="p-4 border-l-4 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-x-1"
            style={{
              borderLeftColor: "#ff3535",
              background:
                "linear-gradient(135deg, rgba(255, 53, 53, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-black text-lg" style={{ color: "#16537e" }}>
                  Flood Warning - Lahore
                </p>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "#666" }}
                >
                  Heavy rainfall expected. Stay alert and avoid low-lying areas.
                </p>
              </div>
              <Badge
                variant="destructive"
                style={{
                  background:
                    "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
                  color: "#ffffff",
                  borderColor: "#990000",
                }}
              >
                Critical
              </Badge>
            </div>
          </div>
          <div
            className="p-4 border-l-4 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-x-1"
            style={{
              borderLeftColor: "#f48836",
              background:
                "linear-gradient(135deg, rgba(244, 136, 54, 0.1) 0%, rgba(244, 136, 54, 0.05) 100%)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-black text-lg" style={{ color: "#16537e" }}>
                  Heatwave Alert - Multan
                </p>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "#666" }}
                >
                  High temperatures expected. Stay hydrated and avoid sun
                  exposure.
                </p>
              </div>
              <Badge
                style={{
                  background:
                    "linear-gradient(135deg, #f48836 0%, #f48836 100%)",
                  color: "#ffffff",
                  borderColor: "#f48836",
                }}
              >
                High
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
        <h2
          className="text-3xl font-black mb-4"
          style={{
            background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Quick Actions
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/citizen-dashboard/report">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
              <CardHeader>
                <AlertCircle
                  className="h-8 w-8 text-white mb-2"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                />
                <CardTitle className="text-lg">Report Incident</CardTitle>
                <CardDescription>Submit a new emergency report</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/citizen-dashboard/hospitals">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
              <CardHeader>
                <Hospital
                  className="h-8 w-8 text-white mb-2"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                />
                <CardTitle className="text-lg">Find Hospitals</CardTitle>
                <CardDescription>
                  Locate nearby medical facilities
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/citizen-dashboard/safety">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
              <CardHeader>
                <Shield
                  className="h-8 w-8 text-white mb-2"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                />
                <CardTitle className="text-lg">Safety Tips</CardTitle>
                <CardDescription>Learn emergency procedures</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/citizen-dashboard/contacts">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
              <CardHeader>
                <Phone
                  className="h-8 w-8 text-white mb-2"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                />
                <CardTitle className="text-lg">Emergency Contacts</CardTitle>
                <CardDescription>Quick access to hotlines</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Incidents */}
      <Card className="animate-slide-up" style={{ animationDelay: "0.7s" }}>
        <CardHeader>
          <CardTitle>Your Recent Incidents</CardTitle>
          <CardDescription>
            Track the status of your reported incidents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockIncidents.slice(0, 3).map((incident, idx) => (
              <div
                key={incident.id}
                className="flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                style={{
                  borderColor: "rgba(22, 83, 126, 0.2)",
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
                }}
              >
                <div>
                  <p
                    className="font-black text-lg"
                    style={{ color: "#16537e" }}
                  >
                    {incident.type}
                  </p>
                  <p
                    className="text-sm font-semibold mt-1"
                    style={{ color: "#666" }}
                  >
                    ID: {incident.id} • {incident.date}
                  </p>
                </div>
                <Badge
                  variant={
                    incident.status === "Resolved" ? "default" : "secondary"
                  }
                  style={
                    incident.status === "Resolved"
                      ? {
                          background:
                            "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                          color: "#ffffff",
                          borderColor: "#38761d",
                        }
                      : {
                          background:
                            "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
                          color: "#ffffff",
                          borderColor: "#16537e",
                        }
                  }
                >
                  {incident.status}
                </Badge>
              </div>
            ))}
          </div>
          <Link to="/citizen-dashboard/incidents">
            <Button
              variant="outline"
              className="w-full mt-4"
              style={{
                border: "2px solid #16537e",
                background: "transparent",
                color: "#16537e",
              }}
            >
              View All Incidents
            </Button>
          </Link>
        </CardContent>
      </Card>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
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
      `}</style>
    </div>
  );
};

export default CitizenDashboard;

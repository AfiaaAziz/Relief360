import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/use-toast";

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

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [incidents, setIncidents] = useState([]); // incidents assigned to the volunteer
  const [allIncidents, setAllIncidents] = useState([]); // global incidents for alerts
  const [loading, setLoading] = useState(false);

  const first = user?.firstName || user?.first_name || "";
  const last = user?.lastName || user?.last_name || "";
  const displayName = first || last ? `${first} ${last}`.trim() : "Volunteer";

  const extractError = (err, fallback) => {
    try {
      return (
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        fallback
      );
    } catch (e) {
      return fallback;
    }
  };

  const fetchMyAssignments = async () => {
    setLoading(true);
    const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("authToken");
    try {
      const axios = (await import("axios")).default;
      const resp = await axios.get(`${apiBase}/api/incidents/my-assignments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const assignmentData = resp.data || [];
      console.log("✅ Fetched assignments:", assignmentData);

      // Transform assignments data with proper status mapping
      const transformedIncidents = assignmentData.map((assignment) => {
        const incident = assignment.incident || {};

        // Map assignment status to consistent dashboard status
        let dashboardStatus = "Assigned";
        if (assignment.status === "assigned") {
          dashboardStatus = "In Progress";
        } else if (
          assignment.status === "resolved" ||
          incident.status === "Resolved"
        ) {
          dashboardStatus = "Completed";
        } else if (assignment.status === "completed") {
          dashboardStatus = "Completed";
        }

        return {
          id: assignment.id || incident.id,
          type: incident.type || incident.title || "Emergency",
          location: incident.location || "Unknown Location",
          status: dashboardStatus,
          severity: incident.severity || "Medium",
          created_at:
            incident.created_at || incident.date || new Date().toISOString(),
          assigned_volunteer_id: user?.id,
          assignment_status: assignment.status,
          incident_status: incident.status,
          notes: assignment.notes,
          assignment_id: assignment.id,
          incident_id: incident.id,
        };
      });

      console.log("🔄 Transformed assignments:", transformedIncidents);
      setIncidents(transformedIncidents);
    } catch (err) {
      console.error(
        "❌ Failed to load assigned incidents",
        err?.response?.data || err
      );

      // Enhanced fallback sample data with mixed statuses
      const sampleAssignments = [
        {
          id: 1,
          status: "assigned",
          notes: "Food distribution at community center",
          incident: {
            id: 101,
            title: "Food Distribution",
            location: "Downtown Community Center",
            severity: "Medium",
            status: "In Progress",
            created_at: new Date().toISOString(),
          },
        },
        {
          id: 2,
          status: "assigned",
          notes: "Emergency shelter setup completed",
          incident: {
            id: 102,
            title: "Emergency Shelter",
            location: "Northside Shelter",
            severity: "High",
            status: "Resolved",
            created_at: new Date(
              Date.now() - 5 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
        },
        {
          id: 3,
          status: "resolved",
          notes: "Medical assistance provided",
          incident: {
            id: 103,
            title: "Medical Assistance",
            location: "Eastside Clinic",
            severity: "Critical",
            status: "Resolved",
            created_at: new Date(
              Date.now() - 15 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
        },
        {
          id: 4,
          status: "assigned",
          notes: "Evacuation assistance needed",
          incident: {
            id: 104,
            title: "Evacuation Support",
            location: "Riverside District",
            severity: "High",
            status: "Assigned",
            created_at: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
        },
      ];

      const transformedFallback = sampleAssignments.map((assignment) => {
        const incident = assignment.incident;

        // Map status consistently
        let dashboardStatus = "Assigned";
        if (assignment.status === "assigned") {
          dashboardStatus =
            incident.status === "Resolved" ? "Completed" : "In Progress";
        } else if (
          assignment.status === "resolved" ||
          incident.status === "Resolved"
        ) {
          dashboardStatus = "Completed";
        } else if (assignment.status === "completed") {
          dashboardStatus = "Completed";
        }

        return {
          id: assignment.id,
          type: incident.title,
          location: incident.location,
          status: dashboardStatus,
          severity: incident.severity,
          created_at: incident.created_at,
          assigned_volunteer_id: user?.id,
          assignment_status: assignment.status,
          incident_status: incident.status,
          notes: assignment.notes,
          assignment_id: assignment.id,
          incident_id: incident.id,
        };
      });

      console.log(
        "🔄 Using enhanced fallback sample data:",
        transformedFallback
      );
      setIncidents(transformedFallback);
      toast({
        title: "Demo Mode",
        description: "Using sample data - connect to backend for live data.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchGlobalIncidents = async () => {
    const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
    try {
      const axios = (await import("axios")).default;
      const resp = await axios.get(`${apiBase}/api/incidents`);
      setAllIncidents(resp.data || []);
    } catch (err) {
      console.error("Failed to load global incidents", err);
    }
  };

  useEffect(() => {
    fetchMyAssignments();
    fetchGlobalIncidents();
  }, []);

  // Helper function to get current month date range
  const getCurrentMonthRange = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );
    return { startOfMonth, endOfMonth };
  };

  // Calculate dynamic stats
  const stats = {
    assignedIncidents: incidents.filter(
      (i) => i.status === "In Progress" || i.status === "Assigned"
    ).length,
    completedIncidents: incidents.filter(
      (i) => i.status === "Resolved" || i.status === "Completed"
    ).length,
    hoursVolunteered: user?.hours_volunteered || 75, // Default to 75 hours if not available
  };

  // Calculate monthly stats for "This Month's Impact" section
  const currentMonthIncidents = incidents.filter((incident) => {
    const incidentDate = new Date(incident.created_at);
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();
    return incidentDate >= startOfMonth && incidentDate <= endOfMonth;
  });

  const monthlyStats = {
    incidentsResolved: currentMonthIncidents.filter(
      (i) => i.status === "Resolved" || i.status === "Completed"
    ).length,
    hoursThisMonth: Math.floor((stats.hoursVolunteered || 75) * 0.3), // Estimate 30% of total hours for current month
    successRate:
      incidents.length > 0
        ? Math.round((stats.completedIncidents / incidents.length) * 100)
        : 95, // Default to 95% if no incidents
  };

  const alerts = allIncidents.filter(
    (i) => i.severity === "Critical" || i.severity === "High"
  );

  const markComplete = async (incidentId) => {
    const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("authToken");
    try {
      const axios = (await import("axios")).default;
      await axios.put(
        `${apiBase}/api/incidents/${incidentId}`,
        { status: "Resolved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: "Success", description: "Marked as completed." });
      await fetchMyAssignments();
      await fetchGlobalIncidents();
    } catch (err) {
      console.error("Failed to mark as complete", err?.response?.data || err);
      toast({
        title: "Error",
        description: extractError(err, "Could not mark as completed."),
      });
    }
  };

  return (
    <div
      className="p-6 space-y-6 relative overflow-hidden min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
      }}
    >
      {/* Welcome Section */}
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
          Welcome, {displayName}
        </h1>
        <p
          className="text-xl md:text-2xl font-bold mt-3"
          style={{ color: "#16537e" }}
        >
          Thank you for your service to the community
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Assignments
            </CardTitle>
            <AlertCircle
              className="h-5 w-5 text-white"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
            />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black" style={{ color: "#16537e" }}>
              {stats.assignedIncidents}
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle
              className="h-5 w-5 text-white"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
            />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black" style={{ color: "#6aa84f" }}>
              {stats.completedIncidents}
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold">
              Successfully resolved
            </p>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Hours Volunteered
            </CardTitle>
            <Clock
              className="h-5 w-5 text-white"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
            />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black" style={{ color: "#16537e" }}>
              {stats.hoursVolunteered}h
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold">
              Total contribution
            </p>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp
              className="h-5 w-5 text-white"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
            />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black" style={{ color: "#6aa84f" }}>
              {monthlyStats.successRate}%
            </div>
            <p className="text-xs text-gray-500 mt-1 font-semibold">
              Excellent performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Alerts */}
      <Card className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <CardHeader>
          <CardTitle>Recent Emergency Alerts</CardTitle>
          <CardDescription>
            Latest incidents requiring volunteer support
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.slice(0, 2).map((alert, idx) => (
            <div
              key={alert.id || idx}
              className="p-4 border-l-4 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-x-1"
              style={{
                borderLeftColor:
                  alert.severity === "Critical" ? "#ff3535" : "#f48836",
                background:
                  alert.severity === "Critical"
                    ? "linear-gradient(135deg, rgba(255, 53, 53, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)"
                    : "linear-gradient(135deg, rgba(244, 136, 54, 0.1) 0%, rgba(244, 136, 54, 0.05) 100%)",
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="font-black text-lg"
                    style={{ color: "#16537e" }}
                  >
                    {alert.severity}: {alert.type} - {alert.location}
                  </p>
                  <p
                    className="text-sm font-semibold mt-1"
                    style={{ color: "#666" }}
                  >
                    {alert.description || alert.notes || "No description"}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={alert.severity === "Critical" ? "" : "outline"}
                  style={
                    alert.severity === "Critical"
                      ? {
                          background:
                            "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
                          color: "#ffffff",
                          boxShadow: "0 4px 15px rgba(255, 53, 53, 0.4)",
                        }
                      : {
                          border: "2px solid #16537e",
                          background: "transparent",
                          color: "#16537e",
                        }
                  }
                >
                  {alert.severity === "Critical" ? "Respond" : "View Details"}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Current Assignments */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <CardHeader>
            <CardTitle>Current Assignments</CardTitle>
            <CardDescription>Active incidents assigned to you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {incidents
              .filter((i) => i.status === "In Progress")
              .map((incident, idx) => (
                <div
                  key={incident.id}
                  className="p-4 border-2 rounded-xl space-y-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  style={{
                    borderColor: "rgba(22, 83, 126, 0.2)",
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p
                      className="font-black text-lg"
                      style={{ color: "#16537e" }}
                    >
                      {incident.type}
                    </p>
                    <Badge
                      variant="secondary"
                      style={{
                        background:
                          "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
                        color: "#ffffff",
                        borderColor: "#16537e",
                      }}
                    >
                      {incident.severity}
                    </Badge>
                  </div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#666" }}
                  >
                    {incident.location}
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span style={{ color: "#16537e" }}>Progress</span>
                      <span style={{ color: "#6aa84f" }}>65%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 rounded-full"
                        style={{
                          width: "65%",
                          background:
                            "linear-gradient(90deg, #6aa84f 0%, #38761d 100%)",
                          boxShadow: "0 2px 8px rgba(106, 168, 79, 0.4)",
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => markComplete(incident.incident_id)}
                    style={{
                      border: "2px solid #16537e",
                      background: "transparent",
                      color: "#16537e",
                    }}
                  >
                    Mark as Completed
                  </Button>
                </div>
              ))}
            <Link to="/volunteer-dashboard/assignments">
              <Button
                variant="outline"
                className="w-full"
                style={{
                  border: "2px solid #16537e",
                  background: "transparent",
                  color: "#16537e",
                }}
              >
                View All Assignments
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.7s" }}>
          <CardHeader>
            <CardTitle>This Month's Impact</CardTitle>
            <CardDescription>Your contribution summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.05) 100%)",
                border: "2px solid rgba(106, 168, 79, 0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" style={{ color: "#6aa84f" }} />
                <span
                  className="text-sm font-bold"
                  style={{ color: "#16537e" }}
                >
                  Incidents Resolved
                </span>
              </div>
              <span className="font-black text-xl" style={{ color: "#6aa84f" }}>
                {monthlyStats.incidentsResolved}
              </span>
            </div>
            <div
              className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(22, 83, 126, 0.05) 100%)",
                border: "2px solid rgba(22, 83, 126, 0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" style={{ color: "#16537e" }} />
                <span
                  className="text-sm font-bold"
                  style={{ color: "#16537e" }}
                >
                  Hours This Month
                </span>
              </div>
              <span className="font-black text-xl" style={{ color: "#16537e" }}>
                {monthlyStats.hoursThisMonth}h
              </span>
            </div>
            <div
              className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.05) 100%)",
                border: "2px solid rgba(106, 168, 79, 0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" style={{ color: "#6aa84f" }} />
                <span
                  className="text-sm font-bold"
                  style={{ color: "#16537e" }}
                >
                  Success Rate
                </span>
              </div>
              <span className="font-black text-xl" style={{ color: "#6aa84f" }}>
                {monthlyStats.successRate}%
              </span>
            </div>
            <div
              className="p-4 rounded-xl text-center transition-all duration-300 hover:shadow-xl transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                border: "2px solid #38761d",
                boxShadow: "0 4px 15px rgba(106, 168, 79, 0.4)",
              }}
            >
              <p className="text-sm font-black text-white">
                Excellent Performance!
              </p>
              <p className="text-xs text-white/90 mt-1 font-semibold">
                Keep up the great work
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

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

export default VolunteerDashboard;

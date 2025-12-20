import React, { useState, useEffect } from "react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog";
import { useAuth } from "../../context/AuthContext";
import { Eye, Loader2 } from "lucide-react";

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

const TableStyled = ({ children }) => (
  <div className="w-full overflow-auto">
    <table className="w-full text-sm">{children}</table>
  </div>
);

const TableHeaderStyled = ({ children }) => <thead>{children}</thead>;
const TableBodyStyled = ({ children }) => <tbody>{children}</tbody>;
const TableRowStyled = ({ children }) => (
  <tr className="border-b transition-all duration-200 hover:bg-gray-50">
    {children}
  </tr>
);
const TableHeadStyled = ({ children }) => (
  <th
    className="h-14 px-4 text-left align-middle font-black text-base"
    style={{
      background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
      color: "#ffffff",
      textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    }}
  >
    {children}
  </th>
);
const TableCellStyled = ({ children, className = "" }) => (
  <td className={`p-4 align-middle text-gray-800 font-semibold ${className}`}>
    {children}
  </td>
);

const MyIncidents = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Debug helpers removed for production
  const { user, isAuthenticated } = useAuth();

  // API base URL
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchMyIncidents();
    } else {
      setLoading(false);
      setError("Please log in to view your incidents.");
    }
  }, [isAuthenticated, user]);

  const fetchMyIncidents = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication required. Please log in.");
        return;
      }

      console.log(
        "Fetching incidents with token:",
        token ? "present" : "missing"
      );

      const response = await fetch(`${API_BASE}/api/incidents/my-incidents`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status, response.statusText);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        let errorText = "";
        try {
          errorText = await response.text();
          console.error("API Error Response:", errorText);
        } catch (textError) {
          console.error("Failed to read error response:", textError);
          errorText = "Unknown server error";
        }
        throw new Error(
          `HTTP ${response.status}: ${errorText || "Failed to fetch incidents"}`
        );
      }

      // Handle the response more carefully
      const responseText = await response.text();
      console.log("Raw response text:", responseText);
      console.log("Response text length:", responseText.length);

      if (!responseText.trim()) {
        console.log("Empty response received");
        setIncidents([]);
        return;
      }

      // Check if response looks like HTML (error page) rather than JSON
      if (
        responseText.trim().startsWith("<") ||
        responseText.includes("<html>") ||
        responseText.includes("<!DOCTYPE")
      ) {
        console.error("Server returned HTML instead of JSON:", responseText);
        throw new Error(
          "Server returned an error page. Please check if the backend is running properly."
        );
      }

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed incidents data:", data);

        // Ensure data is always an array
        if (!Array.isArray(data)) {
          console.warn("Response data is not an array:", typeof data, data);
          // If it's an object with incidents property, use that
          if (
            data &&
            typeof data === "object" &&
            Array.isArray(data.incidents)
          ) {
            data = data.incidents;
          } else {
            data = [];
          }
        }
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        console.error("Response text was:", responseText);
        console.error(
          "First 100 chars of response:",
          responseText.substring(0, 100)
        );

        // For JSON parsing errors, return empty array instead of throwing
        console.log("Returning empty array due to JSON parse error");
        setIncidents([]);
        return;
      }

      setIncidents(data || []);
    } catch (err) {
      console.error("Error fetching incidents:", err);

      // More specific error messages
      let errorMessage = "Failed to load incidents. Please try again.";

      if (err.name === "TypeError" && err.message.includes("fetch")) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else if (err.message.includes("401")) {
        errorMessage = "Authentication failed. Please log in again.";
      } else if (err.message.includes("403")) {
        errorMessage = "Access denied. Please check your permissions.";
      } else if (err.message.includes("JSON")) {
        errorMessage = "Server returned invalid data. Please contact support.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setIncidents([]);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return {
          background: "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
          color: "#ffffff",
          borderColor: "#990000",
        };
      case "high":
        return {
          background: "linear-gradient(135deg, #f48836 0%, #f48836 100%)",
          color: "#ffffff",
          borderColor: "#f48836",
        };
      case "medium":
        return {
          background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
          color: "#ffffff",
          borderColor: "#16537e",
        };
      default:
        return {
          background: "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
          color: "#ffffff",
          borderColor: "#38761d",
        };
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return {
          background: "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
          color: "#ffffff",
          borderColor: "#38761d",
        };
      case "in progress":
        return {
          background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
          color: "#ffffff",
          borderColor: "#16537e",
        };
      default:
        return {
          background: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)",
          color: "#ffffff",
          borderColor: "#94a3b8",
        };
    }
  };

  const handleViewTimeline = (incident) => {
    setSelectedIncident(incident);
    setIsDialogOpen(true);
  };

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
          My Incidents
        </h1>
        <p
          className="text-xl md:text-2xl font-bold mt-3"
          style={{ color: "#16537e" }}
        >
          Track all your reported incidents
        </p>
      </div>

      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>Incident History</CardTitle>
          <CardDescription>
            View details and status of your reported incidents
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-gray-600 font-medium mt-2">
                  Loading incidents...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                  <span className="text-red-600 text-xl">⚠</span>
                </div>
                <p className="text-red-600 font-semibold text-center">
                  {error}
                </p>
                <Button
                  onClick={fetchMyIncidents}
                  variant="outline"
                  className="mt-3"
                  style={{ borderColor: "#16537e", color: "#16537e" }}
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : incidents.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <span className="text-gray-500 text-xl">📋</span>
                </div>
                <p className="text-gray-600 font-semibold text-center">
                  No incidents found
                </p>
                <p className="text-gray-500 text-sm text-center mt-1">
                  You haven't reported any incidents yet.
                </p>
              </div>
            </div>
          ) : (
            <TableStyled>
              <TableHeaderStyled>
                <TableRowStyled>
                  <TableHeadStyled>Tracking ID</TableHeadStyled>
                  <TableHeadStyled>Type</TableHeadStyled>
                  <TableHeadStyled>Severity</TableHeadStyled>
                  <TableHeadStyled>Date</TableHeadStyled>
                  <TableHeadStyled>Status</TableHeadStyled>
                  <TableHeadStyled>Actions</TableHeadStyled>
                </TableRowStyled>
              </TableHeaderStyled>
              <TableBodyStyled>
                {incidents.map((incident, idx) => (
                  <TableRowStyled
                    key={incident.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <TableCellStyled className="font-black">
                      #{incident.id}
                    </TableCellStyled>
                    <TableCellStyled className="font-bold">
                      {incident.title}
                    </TableCellStyled>
                    <TableCellStyled>
                      <Badge style={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </TableCellStyled>
                    <TableCellStyled>
                      {new Date(incident.created_at).toLocaleDateString()}
                    </TableCellStyled>
                    <TableCellStyled>
                      <Badge style={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </TableCellStyled>
                    <TableCellStyled>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewTimeline(incident)}
                        style={{
                          background: "transparent",
                          color: "#16537e",
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Timeline
                      </Button>
                    </TableCellStyled>
                  </TableRowStyled>
                ))}
              </TableBodyStyled>
            </TableStyled>
          )}
        </CardContent>
      </Card>

      {/* Debug section removed for production */}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle
              className="font-black text-2xl"
              style={{ color: "#16537e" }}
            >
              Incident Timeline - {selectedIncident?.id}
            </DialogTitle>
            <DialogDescription className="font-semibold">
              Track the progress of your incident report
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                  }}
                />
                <div
                  className="w-0.5 h-12"
                  style={{
                    background:
                      "linear-gradient(180deg, #6aa84f 0%, #38761d 100%)",
                  }}
                />
              </div>
              <div className="pb-4">
                <p className="font-black text-lg" style={{ color: "#16537e" }}>
                  Incident Reported
                </p>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "#666" }}
                >
                  {selectedIncident?.date} 10:30 AM
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                  }}
                />
                <div
                  className="w-0.5 h-12"
                  style={{
                    background:
                      "linear-gradient(180deg, #6aa84f 0%, #38761d 100%)",
                  }}
                />
              </div>
              <div className="pb-4">
                <p className="font-black text-lg" style={{ color: "#16537e" }}>
                  Volunteer Assigned
                </p>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "#666" }}
                >
                  {selectedIncident?.date} 11:15 AM
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
                  }}
                />
                <div className="w-0.5 h-12 bg-gray-300" />
              </div>
              <div className="pb-4">
                <p className="font-black text-lg" style={{ color: "#16537e" }}>
                  Response Team Dispatched
                </p>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "#666" }}
                >
                  {selectedIncident?.date} 12:00 PM
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-gray-300" />
              </div>
              <div>
                <p className="font-black text-lg" style={{ color: "#999" }}>
                  Awaiting Resolution
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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

export default MyIncidents;

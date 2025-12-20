import React, { useState, useEffect } from "react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import { Eye, CheckCircle, MapPin, Calendar } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { useAuth } from "../../context/AuthContext";

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

const Assignments = () => {
  const [dialogOpen, setDialogOpen] = useState({});
  const [assignments, setAssignments] = useState([]);
  const { toast } = useToast();
  const { user } = useAuth();

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
    const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("authToken");

    console.log(
      "🔍 Fetching assignments with token:",
      token ? "Token exists" : "No token found"
    );

    try {
      const axios = (await import("axios")).default;
      const resp = await axios.get(`${apiBase}/api/incidents/my-assignments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(" API Response for my-assignments:", resp.data);
      console.log(" Number of assignments:", resp.data?.length || 0);

      setAssignments(resp.data || []);

      // Show debug info if no assignments found
      if (!resp.data || resp.data.length === 0) {
        console.log("⚠️ No assignments found - this could mean:");
        console.log("1. User is not authenticated");
        console.log("2. User has no assignments");
        console.log("3. API endpoint is not working");
        toast({
          title: "Debug Info",
          description: `Found ${
            resp.data?.length || 0
          } assignments. Check console for details.`,
        });
      }
    } catch (err) {
      console.error(
        "❌ Failed to fetch assignments",
        err?.response?.data || err
      );
      console.error("Response status:", err?.response?.status);
      console.error("Response data:", err?.response?.data);

      toast({
        title: "Error",
        description: extractError(err, "Could not load assignments."),
      });

      // Set empty array on error to prevent infinite loading
      setAssignments([]);
    }
  };

  const [allIncidents, setAllIncidents] = useState([]);
  const [availableIncidents, setAvailableIncidents] = useState([]);

  const fetchAllIncidents = async () => {
    const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
    try {
      const axios = (await import("axios")).default;
      const resp = await axios.get(`${apiBase}/api/incidents`);
      setAllIncidents(resp.data || []);
    } catch (err) {
      console.error(
        "Failed to fetch all incidents",
        err?.response?.data || err
      );
    }
  };

  const fetchAvailableIncidents = async () => {
    const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("authToken");
    try {
      const axios = (await import("axios")).default;
      const resp = await axios.get(
        `${apiBase}/api/incidents/available-incidents`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAvailableIncidents(resp.data || []);
    } catch (err) {
      console.error(
        "Failed to fetch available incidents",
        err?.response?.data || err
      );
    }
  };

  useEffect(() => {
    fetchMyAssignments();
    fetchAllIncidents();
    fetchAvailableIncidents();
  }, []);

  const handleAccept = async (incidentId) => {
    const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("authToken");
    try {
      const axios = (await import("axios")).default;
      await axios.post(
        `${apiBase}/api/incidents/${incidentId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: "Assigned", description: "You accepted the assignment." });
      await fetchMyAssignments();
      await fetchAllIncidents();
    } catch (err) {
      console.error("Accept failed", err?.response?.data || err);
      toast({
        title: "Error",
        description: extractError(err, "Failed to accept assignment."),
      });
    }
  };

  const handleComplete = async (incidentId) => {
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
      await fetchAllIncidents();
    } catch (err) {
      console.error("Complete failed", err?.response?.data || err);
      toast({
        title: "Error",
        description: extractError(err, "Failed to mark as completed."),
      });
    }
  };

  const handleAcceptFromAvailable = async (incidentId) => {
    await handleAccept(incidentId);
    await fetchAvailableIncidents(); // Refresh available incidents list
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
          Incident Assignments
        </h1>
        <p
          className="text-xl md:text-2xl font-bold mt-3"
          style={{ color: "#16537e" }}
        >
          Manage your assigned emergency incidents
        </p>
      </div>

      {/* My Assignments Section */}
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>My Assignments</CardTitle>
          <CardDescription>
            View and manage incidents assigned to you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TableStyled>
            <TableHeaderStyled>
              <TableRowStyled>
                <TableHeadStyled>ID</TableHeadStyled>
                <TableHeadStyled>Type</TableHeadStyled>
                <TableHeadStyled>Severity</TableHeadStyled>
                <TableHeadStyled>Location</TableHeadStyled>
                <TableHeadStyled>Date</TableHeadStyled>
                <TableHeadStyled>Status</TableHeadStyled>
                <TableHeadStyled>Actions</TableHeadStyled>
              </TableRowStyled>
            </TableHeaderStyled>
            <TableBodyStyled>
              {assignments.map((assignment, idx) => {
                const incident = assignment.incident || {};
                return (
                  <TableRowStyled
                    key={assignment.id || incident.id || idx}
                    className="animate-slide-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <TableCellStyled className="font-black">
                      #{incident.id}
                    </TableCellStyled>
                    <TableCellStyled className="font-bold">
                      {incident.type}
                    </TableCellStyled>
                    <TableCellStyled>
                      <Badge
                        variant={
                          incident.severity === "Critical"
                            ? "destructive"
                            : "default"
                        }
                        style={
                          incident.severity === "Critical"
                            ? {
                                background:
                                  "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
                                color: "#ffffff",
                                borderColor: "#990000",
                              }
                            : {
                                background:
                                  "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                                color: "#ffffff",
                                borderColor: "#38761d",
                              }
                        }
                      >
                        {incident.severity}
                      </Badge>
                    </TableCellStyled>
                    <TableCellStyled>{incident.location}</TableCellStyled>
                    <TableCellStyled>
                      {incident.date ||
                        new Date(
                          incident.created_at || ""
                        ).toLocaleDateString()}
                    </TableCellStyled>
                    <TableCellStyled>
                      <Badge
                        variant={
                          incident.status === "Resolved"
                            ? "default"
                            : "secondary"
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
                    </TableCellStyled>
                    <TableCellStyled>
                      <div className="flex gap-2">
                        <Dialog
                          open={dialogOpen[incident.id]}
                          onOpenChange={(open) =>
                            setDialogOpen({
                              ...dialogOpen,
                              [incident.id]: open,
                            })
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              style={{
                                background: "transparent",
                                color: "#16537e",
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle
                                className="font-black text-2xl"
                                style={{ color: "#16537e" }}
                              >
                                Incident Details - {incident.id}
                              </DialogTitle>
                              <DialogDescription className="font-semibold">
                                Complete information about this incident
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div
                                  className="p-4 rounded-xl"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(22, 83, 126, 0.05) 100%)",
                                  }}
                                >
                                  <p
                                    className="text-sm font-bold mb-2"
                                    style={{ color: "#666" }}
                                  >
                                    Type
                                  </p>
                                  <p
                                    className="text-lg font-black"
                                    style={{ color: "#16537e" }}
                                  >
                                    {incident.type}
                                  </p>
                                </div>
                                <div
                                  className="p-4 rounded-xl"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(106, 168, 79, 0.05) 100%)",
                                  }}
                                >
                                  <p
                                    className="text-sm font-bold mb-2"
                                    style={{ color: "#666" }}
                                  >
                                    Severity
                                  </p>
                                  <Badge
                                    variant={
                                      incident.severity === "Critical"
                                        ? "destructive"
                                        : "default"
                                    }
                                    style={
                                      incident.severity === "Critical"
                                        ? {
                                            background:
                                              "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
                                            color: "#ffffff",
                                            borderColor: "#990000",
                                          }
                                        : {
                                            background:
                                              "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                                            color: "#ffffff",
                                            borderColor: "#38761d",
                                          }
                                    }
                                  >
                                    {incident.severity}
                                  </Badge>
                                </div>
                                <div className="col-span-2">
                                  <p
                                    className="text-sm font-bold mb-2"
                                    style={{ color: "#666" }}
                                  >
                                    Location
                                  </p>
                                  <div
                                    className="flex items-center gap-2 p-3 rounded-xl"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(22, 83, 126, 0.05) 100%)",
                                    }}
                                  >
                                    <MapPin
                                      className="h-4 w-4"
                                      style={{ color: "#16537e" }}
                                    />
                                    <span className="font-semibold">
                                      {incident.location}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <p
                                    className="text-sm font-bold mb-2"
                                    style={{ color: "#666" }}
                                  >
                                    Reported On
                                  </p>
                                  <div
                                    className="flex items-center gap-2 p-3 rounded-xl"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(106, 168, 79, 0.05) 100%)",
                                    }}
                                  >
                                    <Calendar
                                      className="h-4 w-4"
                                      style={{ color: "#6aa84f" }}
                                    />
                                    <span className="font-semibold">
                                      {incident.date}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <p
                                    className="text-sm font-bold mb-2"
                                    style={{ color: "#666" }}
                                  >
                                    Description
                                  </p>
                                  <p
                                    className="text-sm p-4 rounded-xl font-semibold"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.9) 100%)",
                                      color: "#333",
                                    }}
                                  >
                                    Emergency situation requiring immediate
                                    attention. Citizen safety is at risk. Please
                                    respond as soon as possible with necessary
                                    equipment and resources.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {incident.status === "Pending" && (
                          <Button
                            size="sm"
                            onClick={() => handleAccept(incident.id)}
                            style={{
                              background:
                                "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
                              color: "#ffffff",
                              boxShadow: "0 4px 15px rgba(22, 83, 126, 0.4)",
                            }}
                          >
                            Accept
                          </Button>
                        )}
                        {incident.status === "In Progress" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleComplete(incident.id)}
                            style={{
                              border: "2px solid #6aa84f",
                              background: "transparent",
                              color: "#6aa84f",
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </TableCellStyled>
                  </TableRowStyled>
                );
              })}
            </TableBodyStyled>
          </TableStyled>
        </CardContent>
      </Card>

      {/* Available Incidents Section */}
      {availableIncidents.length > 0 && (
        <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>Available Incidents</CardTitle>
            <CardDescription>
              Browse and accept unassigned emergency incidents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TableStyled>
              <TableHeaderStyled>
                <TableRowStyled>
                  <TableHeadStyled>ID</TableHeadStyled>
                  <TableHeadStyled>Type</TableHeadStyled>
                  <TableHeadStyled>Severity</TableHeadStyled>
                  <TableHeadStyled>Location</TableHeadStyled>
                  <TableHeadStyled>Date</TableHeadStyled>
                  <TableHeadStyled>Actions</TableHeadStyled>
                </TableRowStyled>
              </TableHeaderStyled>
              <TableBodyStyled>
                {availableIncidents.map((incident, idx) => (
                  <TableRowStyled
                    key={incident.id || idx}
                    className="animate-slide-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <TableCellStyled className="font-black">
                      #{incident.id}
                    </TableCellStyled>
                    <TableCellStyled className="font-bold">
                      {incident.type}
                    </TableCellStyled>
                    <TableCellStyled>
                      <Badge
                        variant={
                          incident.severity === "Critical"
                            ? "destructive"
                            : "default"
                        }
                        style={
                          incident.severity === "Critical"
                            ? {
                                background:
                                  "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
                                color: "#ffffff",
                                borderColor: "#990000",
                              }
                            : {
                                background:
                                  "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                                color: "#ffffff",
                                borderColor: "#38761d",
                              }
                        }
                      >
                        {incident.severity}
                      </Badge>
                    </TableCellStyled>
                    <TableCellStyled>{incident.location}</TableCellStyled>
                    <TableCellStyled>
                      {incident.date ||
                        new Date(
                          incident.created_at || ""
                        ).toLocaleDateString()}
                    </TableCellStyled>
                    <TableCellStyled>
                      <div className="flex gap-2">
                        <Dialog
                          open={dialogOpen[`available-${incident.id}`]}
                          onOpenChange={(open) =>
                            setDialogOpen({
                              ...dialogOpen,
                              [`available-${incident.id}`]: open,
                            })
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              style={{
                                background: "transparent",
                                color: "#16537e",
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle
                                className="font-black text-2xl"
                                style={{ color: "#16537e" }}
                              >
                                Incident Details - {incident.id}
                              </DialogTitle>
                              <DialogDescription className="font-semibold">
                                Complete information about this incident
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div
                                  className="p-4 rounded-xl"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(22, 83, 126, 0.05) 100%)",
                                  }}
                                >
                                  <p
                                    className="text-sm font-bold mb-2"
                                    style={{ color: "#666" }}
                                  >
                                    Type
                                  </p>
                                  <p
                                    className="text-lg font-black"
                                    style={{ color: "#16537e" }}
                                  >
                                    {incident.type}
                                  </p>
                                </div>
                                <div
                                  className="p-4 rounded-xl"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(106, 168, 79, 0.05) 100%)",
                                  }}
                                >
                                  <p
                                    className="text-sm font-bold mb-2"
                                    style={{ color: "#666" }}
                                  >
                                    Severity
                                  </p>
                                  <Badge
                                    variant={
                                      incident.severity === "Critical"
                                        ? "destructive"
                                        : "default"
                                    }
                                    style={
                                      incident.severity === "Critical"
                                        ? {
                                            background:
                                              "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
                                            color: "#ffffff",
                                            borderColor: "#990000",
                                          }
                                        : {
                                            background:
                                              "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                                            color: "#ffffff",
                                            borderColor: "#38761d",
                                          }
                                    }
                                  >
                                    {incident.severity}
                                  </Badge>
                                </div>
                                <div className="col-span-2">
                                  <p
                                    className="text-sm font-bold mb-2"
                                    style={{ color: "#666" }}
                                  >
                                    Location
                                  </p>
                                  <div
                                    className="flex items-center gap-2 p-3 rounded-xl"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(22, 83, 126, 0.05) 100%)",
                                    }}
                                  >
                                    <MapPin
                                      className="h-4 w-4"
                                      style={{ color: "#16537e" }}
                                    />
                                    <span className="font-semibold">
                                      {incident.location}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <p
                                    className="text-sm font-bold mb-2"
                                    style={{ color: "#666" }}
                                  >
                                    Reported On
                                  </p>
                                  <div
                                    className="flex items-center gap-2 p-3 rounded-xl"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(106, 168, 79, 0.05) 100%)",
                                    }}
                                  >
                                    <Calendar
                                      className="h-4 w-4"
                                      style={{ color: "#6aa84f" }}
                                    />
                                    <span className="font-semibold">
                                      {incident.date}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <p
                                    className="text-sm font-bold mb-2"
                                    style={{ color: "#666" }}
                                  >
                                    Description
                                  </p>
                                  <p
                                    className="text-sm p-4 rounded-xl font-semibold"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.9) 100%)",
                                      color: "#333",
                                    }}
                                  >
                                    Emergency situation requiring immediate
                                    attention. Citizen safety is at risk. Please
                                    respond as soon as possible with necessary
                                    equipment and resources.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          onClick={() => handleAcceptFromAvailable(incident.id)}
                          style={{
                            background:
                              "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
                            color: "#ffffff",
                            boxShadow: "0 4px 15px rgba(106, 168, 79, 0.4)",
                          }}
                        >
                          Accept Assignment
                        </Button>
                      </div>
                    </TableCellStyled>
                  </TableRowStyled>
                ))}
              </TableBodyStyled>
            </TableStyled>
          </CardContent>
        </Card>
      )}

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

export default Assignments;

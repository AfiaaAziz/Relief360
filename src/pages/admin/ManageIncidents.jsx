import React, { useState, useEffect } from "react";
import { Eye, UserPlus, CheckCircle, Search } from "lucide-react";

// API functions
const fetchIncidents = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/incidents");
    if (!response.ok) {
      throw new Error("Failed to fetch incidents");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return [];
  }
};

const updateIncidentStatus = async (id, status) => {
  try {
    const response = await fetch(`http://localhost:5000/api/incidents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error("Failed to update incident");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating incident:", error);
    throw error;
  }
};

const assignVolunteer = async (incidentId, volunteerId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/incidents/${incidentId}/assign`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ volunteer_id: volunteerId }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to assign volunteer");
    }
    return await response.json();
  } catch (error) {
    console.error("Error assigning volunteer:", error);
    throw error;
  }
};

const fetchVolunteers = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/incidents/volunteers"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch volunteers");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return [];
  }
};

// Create simple UI components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 border-b border-gray-100 ${className}`}>{children}</div>
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

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-green-100 text-green-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3 text-sm",
  };
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
    ghost: "hover:bg-gray-100",
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ placeholder, value, onChange, className = "" }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ${className}`}
  />
);

const Table = ({ children }) => (
  <div className="w-full overflow-auto">
    <table className="w-full text-sm">{children}</table>
  </div>
);

const TableHeader = ({ children }) => <thead>{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children }) => <tr className="border-b">{children}</tr>;
const TableHead = ({ children }) => (
  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
    {children}
  </th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle ${className}`}>{children}</td>
);

// Custom Select Component (better for dialogs)
const Select = ({ value, onValueChange, children, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const activeValue = value !== undefined ? value : internalValue;

  const handleSelect = (newValue) => {
    setInternalValue(newValue);
    if (onValueChange) onValueChange(newValue);
    setIsOpen(false);
  };

  // Extract options from Trigger children (matching your usage structure)
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => child.type.displayName === "SelectTrigger"
  );

  let options = [];
  if (trigger) {
    const triggerChildren = React.Children.toArray(trigger.props.children);
    options = triggerChildren.filter(
      (child) => child.type.displayName === "SelectItem"
    );
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".custom-select-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative custom-select-container">
      {trigger &&
        React.cloneElement(trigger, {
          onClick: () => setIsOpen(!isOpen),
          selectedValue: activeValue,
        })}

      {isOpen && (
        <div className="absolute z-[9999] mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="max-h-60 overflow-y-auto py-1">
            {options.length > 0 ? (
              options.map((option) => (
                <div
                  key={option.props.value}
                  className={`relative cursor-pointer select-none py-2 px-3 text-sm hover:bg-gray-100 ${
                    activeValue === option.props.value
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-900"
                  }`}
                  onClick={() => handleSelect(option.props.value)}
                >
                  {option.props.children}
                </div>
              ))
            ) : (
              <div className="py-2 px-3 text-sm text-gray-500">
                No options available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SelectTrigger = ({
  children,
  onClick,
  selectedValue,
  className = "",
}) => {
  const childrenArray = React.Children.toArray(children);

  // Logic to find display text: Check specific SelectItem or fallback to placeholder
  const selectedItem = childrenArray.find(
    (child) =>
      child.type.displayName === "SelectItem" &&
      child.props.value === selectedValue
  );
  const placeholderItem = childrenArray.find(
    (child) => child.type.displayName === "SelectValue"
  );

  const displayText = selectedItem
    ? selectedItem.props.children
    : placeholderItem
    ? placeholderItem.props.placeholder
    : "Select...";

  return (
    <div
      onClick={onClick}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm cursor-pointer hover:border-gray-400 transition-colors ${className}`}
    >
      <span className="block truncate">{displayText}</span>
      <span className="ml-2 opacity-50 text-xs">▼</span>
    </div>
  );
};
SelectTrigger.displayName = "SelectTrigger";

const SelectItem = ({ children }) => children;
SelectItem.displayName = "SelectItem";

const SelectValue = () => null;
SelectValue.displayName = "SelectValue";

// Dialog Component
const Dialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => child.type.displayName === "DialogTrigger"
  );
  const content = childrenArray.find(
    (child) => child.type.displayName === "DialogContent"
  );

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, { onClick: () => setIsOpen(true) })}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {content &&
            React.cloneElement(content, { onClose: () => setIsOpen(false) })}
        </div>
      )}
    </>
  );
};

const DialogTrigger = ({ children, onClick, ...props }) => (
  <div onClick={onClick} {...props}>
    {children}
  </div>
);
DialogTrigger.displayName = "DialogTrigger";

const DialogContent = ({ children, onClose, className = "" }) => {
  const childrenArray = React.Children.toArray(children);
  const header = childrenArray.find(
    (child) => child.type.displayName === "DialogHeader"
  );
  const otherChildren = childrenArray.filter(
    (child) => child.type.displayName !== "DialogHeader"
  );

  return (
    <div
      className={`bg-white rounded-lg shadow-lg w-full max-w-md overflow-visible ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
      {header}
      <div className="p-6">{otherChildren}</div>
    </div>
  );
};
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ children, className = "" }) => {
  const childrenArray = React.Children.toArray(children);
  const title = childrenArray.find(
    (child) => child.type.displayName === "DialogTitle"
  );
  const description = childrenArray.find(
    (child) => child.type.displayName === "DialogDescription"
  );

  return (
    <div className={`p-6 border-b border-gray-100 ${className}`}>
      {title}
      {description}
    </div>
  );
};
DialogHeader.displayName = "DialogHeader";

const DialogTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
);
DialogDescription.displayName = "DialogDescription";

// Simple toast function
const useToast = () => {
  const toast = (options) => {
    console.log("Toast:", options.title, options.description);
    alert(`${options.title}: ${options.description}`);
  };
  return { toast };
};

const ManageIncidents = () => {
  const { toast } = useToast();
  const [incidents, setIncidents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [incidentsData, volunteersData] = await Promise.all([
        fetchIncidents(),
        fetchVolunteers(),
      ]);
      setIncidents(incidentsData);
      setVolunteers(volunteersData);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredIncidents = incidents.filter((incident) => {
    const matchesStatus =
      statusFilter === "all" || incident.status === statusFilter;
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAssignVolunteer = async (incidentId, volunteerId) => {
    try {
      await assignVolunteer(incidentId, volunteerId);
      toast({
        title: "Volunteer Assigned",
        description: `Volunteer has been assigned to incident ${incidentId}`,
      });
      // Refresh incidents
      const data = await fetchIncidents();
      setIncidents(data);
      setSelectedVolunteer(""); // Reset selection
    } catch (error) {
      toast({
        title: "Assignment Failed",
        description: "Failed to assign volunteer to incident",
      });
    }
  };

  const handleResolve = async (incidentId) => {
    try {
      await updateIncidentStatus(incidentId, "resolved");
      toast({
        title: "Incident Resolved",
        description: `Incident ${incidentId} has been marked as resolved`,
      });
      // Refresh incidents
      const data = await fetchIncidents();
      setIncidents(data);
    } catch (error) {
      toast({
        title: "Resolution Failed",
        description: "Failed to resolve incident",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Incidents</h1>
        <p className="text-gray-500 mt-1">
          View and manage all reported incidents
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by type or location..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectTrigger>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Incidents</CardTitle>
          <CardDescription>Complete list of reported incidents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading incidents...
                  </TableCell>
                </TableRow>
              ) : filteredIncidents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No incidents found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">{incident.id}</TableCell>
                    <TableCell>{incident.title.split(":")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          incident.severity === "critical"
                            ? "destructive"
                            : "default"
                        }
                      >
                        {incident.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{incident.location}</TableCell>
                    <TableCell>
                      {new Date(incident.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          incident.status === "resolved"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {incident.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Incident Details</DialogTitle>
                              <DialogDescription>
                                Full incident information
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Type
                                  </p>
                                  <p className="text-lg font-semibold">
                                    {incident.type}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Severity
                                  </p>
                                  <Badge
                                    variant={
                                      incident.severity === "Critical"
                                        ? "destructive"
                                        : "default"
                                    }
                                  >
                                    {incident.severity}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Location
                                </p>
                                <p>{incident.location}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Description
                                </p>
                                <p className="text-sm text-gray-500">
                                  Emergency situation requiring immediate
                                  response. Rescue team has been notified.
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger>
                            <Button size="sm" variant="outline">
                              <UserPlus className="h-4 w-4 mr-1" />
                              Assign
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Assign Volunteer</DialogTitle>
                              <DialogDescription>
                                Select a volunteer for this incident
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <Select
                                value={selectedVolunteer}
                                onValueChange={setSelectedVolunteer}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select volunteer" />
                                  {volunteers.map((volunteer) => (
                                    <SelectItem
                                      key={volunteer.id}
                                      value={volunteer.id.toString()}
                                    >
                                      {volunteer.first_name}{" "}
                                      {volunteer.last_name} -{" "}
                                      {volunteer.skills.join(", ")}
                                    </SelectItem>
                                  ))}
                                </SelectTrigger>
                              </Select>
                              <Button
                                className="w-full"
                                onClick={() => {
                                  if (selectedVolunteer) {
                                    handleAssignVolunteer(
                                      incident.id,
                                      selectedVolunteer
                                    );
                                  }
                                }}
                              >
                                Confirm Assignment
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {incident.status !== "Resolved" && (
                          <Button
                            size="sm"
                            onClick={() => handleResolve(incident.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageIncidents;

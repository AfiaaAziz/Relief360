import React, { useState, useEffect } from "react";
import { Eye, UserPlus, CheckCircle, Search, Edit, Trash2, Plus } from "lucide-react";

// Add CSS animations
const style = document.createElement('style');
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
if (!document.head.querySelector('style[data-dashboard-animations]')) {
  style.setAttribute('data-dashboard-animations', 'true');
  document.head.appendChild(style);
}

// API functions
const fetchIncidents = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/incidents");
    if (!response.ok) {
      throw new Error("Failed to fetch incidents");
    }
    const data = await response.json();
    // Try to fetch assignment rows and merge assigned_volunteer_id into incidents
    try {
      const aresp = await fetch("http://localhost:5000/api/incidents/assignments/debug");
      if (aresp.ok) {
        const assignments = await aresp.json();
        if (Array.isArray(assignments) && assignments.length > 0) {
          const byIncident = {};
          for (const a of assignments) {
            if (a.incident_id) byIncident[a.incident_id] = a.volunteer_id;
          }
          for (const inc of data) {
            if (!inc.assigned_volunteer_id && byIncident[inc.id]) {
              inc.assigned_volunteer_id = byIncident[inc.id];
            }
          }
        }
      }
    } catch (err) {
      console.warn('Failed to fetch/merge assignments for incidents:', err);
    }

    return data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return [];
  }
};

const updateIncidentStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    const response = await fetch(`http://localhost:5000/api/incidents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

const updateIncident = async (id, data) => {
  try {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    const response = await fetch(`http://localhost:5000/api/incidents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
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

const deleteIncident = async (id) => {
  try {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    const response = await fetch(`http://localhost:5000/api/incidents/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete incident");
    }
    return true;
  } catch (error) {
    console.error("Error deleting incident:", error);
    throw error;
  }
};

const createIncident = async (data) => {
  try {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    const response = await fetch(`http://localhost:5000/api/incidents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        ...data,
        severity: data.severity?.toLowerCase() || "medium",
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create incident");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating incident:", error);
    throw error;
  }
};

const assignVolunteer = async (incidentId, volunteerId) => {
  try {
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    const vid = Number(volunteerId);
    const response = await fetch(
      `http://localhost:5000/api/incidents/${incidentId}/assign`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ volunteer_id: vid }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to assign volunteer");
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
      "http://localhost:5000/api/volunteers"
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

// Create simple UI components with enhanced styling using new color palette
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white/95 backdrop-blur-sm rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    style={{
      borderColor: 'rgba(22, 83, 126, 0.2)',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)'
    }}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div 
    className={`p-6 border-b-2 ${className}`}
    style={{
      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
      borderColor: 'rgba(22, 83, 126, 0.3)',
      paddingTop: '1.75rem',
      paddingBottom: '1.75rem'
    }}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-black text-white ${className}`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', lineHeight: '1.3', paddingBottom: '0.25rem' }}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-white/90 mt-2 font-semibold ${className}`} style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)' }}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: {
      background: 'linear-gradient(135deg, #6aa84f 0%, #38761d 100%)',
      color: '#ffffff',
      borderColor: '#38761d'
    },
    secondary: {
      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
      color: '#ffffff',
      borderColor: '#16537e'
    },
    destructive: {
      background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
      color: '#ffffff',
      borderColor: '#990000'
    },
    warning: {
      background: 'linear-gradient(135deg, #f48836 0%, #ff3535 100%)',
      color: '#ffffff',
      borderColor: '#f48836'
    },
  };
  return (
    <span
      className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold shadow-lg border-2"
      style={styles[variant]}
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
    "inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl";
  const sizes = {
    default: "h-12 px-6 py-3 rounded-xl text-base",
    sm: "h-10 rounded-lg px-4 text-sm",
  };
  const variants = {
    default: {
      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
    },
    destructive: {
      background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 15px rgba(255, 53, 53, 0.4)'
    },
    outline: {
      border: '2px solid #16537e',
      background: 'transparent',
      color: '#16537e',
    },
    ghost: {
      background: 'transparent',
      color: '#16537e',
    },
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${className}`}
      style={variants[variant]}
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
const TableHead = ({ children, className = "" }) => (
  <th 
    className={`h-14 px-4 text-left align-middle font-bold text-base ${className}`}
    style={{
      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
      color: '#ffffff',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
    }}
  >
    {children}
  </th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle text-gray-800 font-medium ${className}`}>{children}</td>
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

  // Extract options from Trigger children or SelectContent (matching your usage structure)
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => child.type.displayName === "SelectTrigger"
  );
  const content = childrenArray.find(
    (child) => child.type.displayName === "SelectContent"
  );

  let options = [];
  if (content) {
    // Extract SelectItems from SelectContent
    const contentChildren = React.Children.toArray(content.props.children);
    options = contentChildren.filter(
      (child) => child.type.displayName === "SelectItem"
    );
  } else if (trigger) {
    // Fallback: Extract SelectItems from SelectTrigger (old structure)
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
          <div className={`max-h-60 overflow-y-auto py-1 ${content?.props.className || ""}`}>
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

const SelectContent = ({ children, className = "" }) => {
  // SelectContent is just a wrapper, the actual rendering is handled by Select component
  return null;
};
SelectContent.displayName = "SelectContent";

// Dialog Component
const Dialog = ({ children, open: controlledOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

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
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto"
          style={{ paddingTop: '5vh' }}
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
      className={`rounded-2xl shadow-2xl w-full max-w-md overflow-visible relative backdrop-blur-sm ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
        border: '2px solid rgba(22, 83, 126, 0.2)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
          color: '#ffffff'
        }}
        aria-label="Close dialog"
      >
        <span className="text-2xl font-bold">×</span>
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
  <h2 className={`text-xl font-semibold ${className}`} style={{ lineHeight: '1.3', paddingBottom: '0.25rem' }}>{children}</h2>
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = ({ children, className = "" }) => (
  <div className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</div>
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
  const [editingIncident, setEditingIncident] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    location: "",
    severity: "medium",
    status: "pending",
    contact_person: "",
    contact_phone: "",
  });
  const [creatingIncident, setCreatingIncident] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    location: "",
    severity: "medium",
    contact_person: "",
    contact_phone: "",
  });
  const [assignDialogOpen, setAssignDialogOpen] = useState({});

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [incidentsData, volunteersData] = await Promise.all([
          fetchIncidents(),
          fetchVolunteers(),
        ]);
        setIncidents(incidentsData || []);
        setVolunteers(volunteersData || []);
        console.log("Loaded volunteers:", volunteersData?.length || 0);
      } catch (error) {
        console.error("Error loading data:", error);
        setIncidents([]);
        setVolunteers([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
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
      // Close the dialog
      setAssignDialogOpen((prev) => ({ ...prev, [incidentId]: false }));
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

  const handleEdit = (incident) => {
    setEditingIncident(incident);
    setEditForm({
      title: incident.title || "",
      description: incident.description || "",
      location: incident.location || "",
      severity: incident.severity || "medium",
      status: incident.status || "pending",
      contact_person: incident.contact_person || "",
      contact_phone: incident.contact_phone || "",
    });
  };

  const handleUpdate = async () => {
    if (!editingIncident) return;
    try {
      await updateIncident(editingIncident.id, editForm);
      toast({
        title: "Incident Updated",
        description: `Incident ${editingIncident.id} has been updated`,
      });
      const data = await fetchIncidents();
      setIncidents(data);
      setEditingIncident(null);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update incident",
      });
    }
  };

  const handleDelete = async (incidentId) => {
    if (!window.confirm("Are you sure you want to delete this incident? This action cannot be undone.")) {
      return;
    }
    try {
      await deleteIncident(incidentId);
      toast({
        title: "Incident Deleted",
        description: `Incident ${incidentId} has been deleted`,
      });
      const data = await fetchIncidents();
      setIncidents(data);
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete incident. Make sure you have proper permissions.",
      });
    }
  };

  const handleCreate = async () => {
    try {
      await createIncident(createForm);
      toast({
        title: "Incident Created",
        description: "New incident has been created successfully",
      });
      const data = await fetchIncidents();
      setIncidents(data);
      setCreatingIncident(false);
      setCreateForm({
        title: "",
        description: "",
        location: "",
        severity: "medium",
        contact_person: "",
        contact_phone: "",
      });
    } catch (error) {
      toast({
        title: "Create Failed",
        description: "Failed to create incident",
      });
    }
  };

  return (
    <div 
      className="min-h-screen p-6 space-y-6 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
      }}
    >
      <div className="flex justify-between items-center animate-fade-in">
        <div>
          <h1 
            className="text-5xl md:text-6xl font-black mb-3"
            style={{
              background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 50%, #38761d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(22, 83, 126, 0.2)',
              lineHeight: '1.2',
              paddingBottom: '0.5rem'
            }}
          >
            Manage Incidents
          </h1>
          <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
            View and manage all reported incidents
          </p>
        </div>
        <Button
          onClick={() => setCreatingIncident(true)}
          className="flex items-center gap-2 shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Create Incident
        </Button>
      </div>

      {/* Filters */}
      <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by type or location..."
                className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg">
                <SelectValue placeholder="Filter by status" />
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectTrigger>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
        <CardHeader>
          <CardTitle>All Incidents</CardTitle>
          <CardDescription>Complete list of reported incidents</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow style={{ background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)' }}>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="font-bold text-gray-700">Status</TableHead>
                  <TableHead className="font-bold text-gray-700">Assigned Volunteer</TableHead>
                  <TableHead className="font-bold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-gray-600 font-medium">Loading incidents...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredIncidents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <p className="text-gray-500 font-medium">No incidents found.</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIncidents.map((incident, index) => (
                    <TableRow 
                      key={incident.id}
                      className="transition-all duration-300 border-b-2 hover:shadow-lg"
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        borderColor: 'rgba(22, 83, 126, 0.1)',
                        background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.8)' : 'rgba(248, 250, 252, 0.8)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(106, 168, 79, 0.1) 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = index % 2 === 0 ? 'rgba(255, 255, 255, 0.8)' : 'rgba(248, 250, 252, 0.8)';
                      }}
                    >
                      <TableCell className="font-bold text-base" style={{ color: '#16537e' }}>{incident.id}</TableCell>
                      <TableCell className="font-semibold text-base" style={{ color: '#16537e' }}>{incident.title.split(":")[0]}</TableCell>
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
                      <TableCell className="font-medium text-gray-700">{incident.location}</TableCell>
                      <TableCell className="text-gray-600">
                        {new Date(incident.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            incident.status === "resolved"
                              ? "default"
                              : incident.status === "in_progress"
                              ? "warning"
                              : "secondary"
                          }
                        >
                          {incident.status === "in_progress"
                            ? "In Progress"
                            : incident.status.charAt(0).toUpperCase() +
                              incident.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-gray-700">
                        {incident.assigned_volunteer_id ? (
                          (() => {
                            const av = volunteers.find((v) => Number(v.id) === Number(incident.assigned_volunteer_id));
                            return av ? `${av.first_name} ${av.last_name}` : `#${incident.assigned_volunteer_id}`;
                          })()
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>

                      <TableCell>
  <div className="flex gap-2">
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b">
          <DialogDescription className="mt-0">
            <div className="text-xl font-bold text-gray-900 mb-1">
              {incident.assigned_volunteer_id ? (
                (() => {
                  const av = volunteers.find((v) => Number(v.id) === Number(incident.assigned_volunteer_id));
                  return av ? `${av.first_name} ${av.last_name}` : `#${incident.assigned_volunteer_id}`;
                })()
              ) : (
                <span className="text-gray-400">Not Assigned</span>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4 px-6 pb-8">
          {/* Incident Details Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ lineHeight: '1.3', paddingBottom: '0.25rem' }}>
              Incident Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Type
                </label>
                <p className="text-lg text-gray-900">
                  {incident.title && incident.title.includes(":") 
                    ? incident.title.split(":")[0] 
                    : incident.title || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Severity
                </label>
                <div>
                  <Badge
                    variant={
                      incident.severity === "Critical" || incident.severity === "critical"
                        ? "destructive"
                        : "default"
                    }
                    className="text-sm px-3 py-1"
                  >
                    {incident.severity || "medium"}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Location
                </label>
                <p className="text-lg text-gray-900">
                  {incident.location || "N/A"}
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Description
              </label>
              {(() => {
                const desc = incident.description || "No description provided";
                const emailMatch = desc.match(/Reporter Email:\s*([^\s]+@[^\s]+)/i) || desc.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
                const email = emailMatch ? emailMatch[1] : null;
                const descriptionText = email ? desc.replace(/Reporter Email:\s*[^\s]+@[^\s]+/i, '').replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/, '').trim() : desc;
                
                return (
                  <>
                    <p className="text-base text-gray-700 leading-relaxed bg-white p-3 rounded border">
                      {descriptionText || "No description provided"}
                    </p>
                    {email && (
                      <div className="mt-4 bg-white p-3 rounded border">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">
                          Reporter Email
                        </label>
                        <p className="text-base text-gray-700">{email}</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          {/* Contact Information Section */}
          {(incident.contact_person || incident.contact_phone) && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ lineHeight: '1.3', paddingBottom: '0.25rem' }}>
                Contact Information
              </h3>
              <div className="space-y-4">
                {incident.contact_person && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Contact Person
                    </label>
                    <p className="text-lg text-gray-900">
                      {incident.contact_person}
                    </p>
                  </div>
                )}
                {incident.contact_phone && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <p className="text-lg text-gray-900">
                      {incident.contact_phone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>

    <Dialog
      open={assignDialogOpen[incident.id] || false}
      onOpenChange={(open) =>
        setAssignDialogOpen((prev) => ({
          ...prev,
          [incident.id]: open,
        }))
      }
    >
      <DialogTrigger>
        <Button 
          size="sm" 
          variant="outline"
          style={{
            borderColor: '#16537e',
            color: '#16537e'
          }}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Assign
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Volunteer</DialogTitle>
          <DialogDescription>
            Select a volunteer for this incident
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {volunteers.length === 0 ? (
            <div className="text-sm text-gray-500 py-2">
              Loading volunteers... (Found: {volunteers.length})
            </div>
          ) : (
            <Select
              value={selectedVolunteer}
              onValueChange={setSelectedVolunteer}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select volunteer" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {volunteers.map((volunteer) => (
                  <SelectItem
                    key={volunteer.id}
                    value={volunteer.id.toString()}
                  >
                    {volunteer.first_name}{" "}
                    {volunteer.last_name}
                    {volunteer.skills && volunteer.skills.length > 0 && (
                      <> - {volunteer.skills.join(", ")}</>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
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

    {incident.status !== "resolved" && (
      <Button
        size="sm"
        onClick={() => handleResolve(incident.id)}
        style={{
          background: 'linear-gradient(135deg, #6aa84f 0%, #38761d 100%)',
          boxShadow: '0 4px 15px rgba(106, 168, 79, 0.4)'
        }}
      >
        <CheckCircle className="h-4 w-4 mr-1" />
        Resolve
      </Button>
    )}
    <Button
      size="sm"
      variant="outline"
      onClick={() => handleEdit(incident)}
    >
      <Edit className="h-4 w-4 mr-1" />
      Edit
    </Button>
    <Button
      size="sm"
      variant="destructive"
      onClick={() => handleDelete(incident.id)}
    >
      <Trash2 className="h-4 w-4 mr-1" />
      Delete
    </Button>
  </div>
</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Incident Dialog */}
      {editingIncident && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
              border: '2px solid rgba(22, 83, 126, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold">Edit Incident #{editingIncident.id}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Title</label>
                <Input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  rows={4}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <Input
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm({ ...editForm, location: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Severity</label>
                  <Select
                    value={editForm.severity}
                    onValueChange={(value) =>
                      setEditForm({ ...editForm, severity: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectTrigger>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <Select
                    value={editForm.status}
                    onValueChange={(value) =>
                      setEditForm({ ...editForm, status: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectTrigger>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Contact Person</label>
                  <Input
                    value={editForm.contact_person}
                    onChange={(e) =>
                      setEditForm({ ...editForm, contact_person: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Contact Phone</label>
                <Input
                  value={editForm.contact_phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, contact_phone: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setEditingIncident(null)}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdate}>Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Incident Dialog */}
      {creatingIncident && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
              border: '2px solid rgba(22, 83, 126, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold">Create New Incident</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Title *</label>
                <Input
                  value={createForm.title}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, title: e.target.value })
                  }
                  className="mt-1"
                  placeholder="Enter incident title"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Description *</label>
                <textarea
                  value={createForm.description}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, description: e.target.value })
                  }
                  rows={4}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter incident description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Location *</label>
                  <Input
                    value={createForm.location}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, location: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Severity *</label>
                  <Select
                    value={createForm.severity}
                    onValueChange={(value) =>
                      setCreateForm({ ...createForm, severity: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectTrigger>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Contact Person</label>
                  <Input
                    value={createForm.contact_person}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, contact_person: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Contact Phone</label>
                  <Input
                    value={createForm.contact_phone}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, contact_phone: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCreatingIncident(false);
                    setCreateForm({
                      title: "",
                      description: "",
                      location: "",
                      severity: "medium",
                      contact_person: "",
                      contact_phone: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={
                    !createForm.title || !createForm.description || !createForm.location
                  }
                >
                  Create Incident
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageIncidents;


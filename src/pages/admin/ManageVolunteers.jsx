// ManageVolunteers.jsx

import React, { useState, useEffect } from "react";
import { Search, Edit, Trash2, Heart, UserCheck, X, Plus } from "lucide-react";

// Create simple UI components with new color palette
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

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: {
      background: "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
      color: "#ffffff",
      borderColor: "#38761d",
    },
    secondary: {
      background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
      color: "#ffffff",
      borderColor: "#16537e",
    },
    destructive: {
      background: "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
      color: "#ffffff",
      borderColor: "#990000",
    },
    outline: {
      border: "2px solid #16537e",
      background: "transparent",
      color: "#16537e",
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
      background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
      color: "#ffffff",
      boxShadow: "0 4px 15px rgba(22, 83, 126, 0.4)",
    },
    destructive: {
      background: "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
      color: "#ffffff",
      boxShadow: "0 4px 15px rgba(255, 53, 53, 0.4)",
    },
    outline: {
      border: "2px solid #16537e",
      background: "transparent",
      color: "#16537e",
    },
    ghost: {
      background: "transparent",
      color: "#16537e",
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
const TableHead = ({ children }) => (
  <th
    className="h-14 px-4 text-left align-middle font-bold text-base"
    style={{
      background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
      color: "#ffffff",
      textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    }}
  >
    {children}
  </th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle text-gray-800 font-medium ${className}`}>
    {children}
  </td>
);

// Simple Select Component
const Select = ({ onValueChange, children, defaultValue, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Handle both controlled (value) and uncontrolled (defaultValue) modes
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const activeValue = value !== undefined ? value : internalValue;

  const handleSelect = (newValue) => {
    setInternalValue(newValue);
    if (onValueChange) onValueChange(newValue);
    setIsOpen(false);
  };

  // Extract options and trigger from children
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => child.type.displayName === "SelectTrigger"
  );

  // In your usage, SelectItems are inside SelectTrigger. We need to extract them.
  let options = [];
  if (trigger) {
    const triggerChildren = React.Children.toArray(trigger.props.children);
    options = triggerChildren.filter(
      (child) => child.type && child.type.displayName === "SelectItem"
    );
  }

  return (
    <div className="relative">
      {trigger &&
        React.cloneElement(trigger, {
          onClick: () => setIsOpen(!isOpen),
          selectedValue: activeValue,
          isOpen,
          // Pass the handleSelect to the trigger so it can pass it to children if needed,
          // though we render options separately below for the custom dropdown.
        })}

      {isOpen && (
        <div className="absolute z-[9999] mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="max-h-60 overflow-y-auto p-1">
            {options.map((option) => (
              <div
                key={option.props.value}
                className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
                  activeValue === option.props.value
                    ? "bg-gray-100 font-medium"
                    : ""
                }`}
                onClick={() => handleSelect(option.props.value)}
              >
                {option.props.children}
              </div>
            ))}
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
  // Find the label for the selected value
  const childrenArray = React.Children.toArray(children);
  const selectedItem = childrenArray.find(
    (child) =>
      child.type.displayName === "SelectItem" &&
      child.props.value === selectedValue
  );
  const placeholder = childrenArray.find(
    (child) => child.type.displayName === "SelectValue"
  );

  return (
    <button
      type="button" // Important to prevent form submission
      onClick={onClick}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span className="block truncate">
        {selectedItem
          ? selectedItem.props.children
          : placeholder
          ? placeholder.props.placeholder
          : "Select..."}
      </span>
      <span className="ml-2 opacity-50">▼</span>
    </button>
  );
};
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = ({ children }) => null; // Not used in this structure but kept for compatibility
SelectContent.displayName = "SelectContent";

const SelectItem = ({ children }) => children; // Just a data holder
SelectItem.displayName = "SelectItem";

const SelectValue = ({ placeholder }) => null; // Just a data holder
SelectValue.displayName = "SelectValue";

// Dialog components removed - not used in this component

// Mock data removed - data now comes from database

// Simple toast function
const useToast = () => {
  const toast = (options) => {
    console.log("Toast:", options.title, options.description);
    alert(`${options.title}: ${options.description}`);
  };
  return { toast };
};

const ManageVolunteers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [volunteers, setVolunteers] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [assigningVolunteer, setAssigningVolunteer] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState("");
  const [assignmentNotes, setAssignmentNotes] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    age: "",
    availability: "Available",
    address: "",
    experience: "",
    motivation: "",
    skills: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch volunteers
        const volunteersResponse = await fetch(
          "http://localhost:5000/api/volunteers"
        );
        let volunteersData = [];
        if (volunteersResponse.ok) {
          volunteersData = await volunteersResponse.json();
        } else {
          console.error("Failed to fetch volunteers");
        }

        // Fetch incidents
        const incidentsResponse = await fetch(
          "http://localhost:5000/api/incidents"
        );
        let incidentsData = [];
        if (incidentsResponse.ok) {
          incidentsData = await incidentsResponse.json();
        } else {
          console.error("Failed to fetch incidents");
        }

        // Assignments debug removed — derive assignment info from incidents data if possible
        const assignmentsData = [];

        const volunteersWithAssignments = volunteersData.map((volunteer) => {
          // Prefer explicit fields on the volunteer first
          if (volunteer.assigned && volunteer.assignedToIncidentId) {
            return {
              ...volunteer,
              skills: volunteer.skills || [],
              assigned: true,
              assignedToIncidentId: volunteer.assignedToIncidentId,
              assignedToIncidentTitle:
                volunteer.assignedToIncidentTitle || null,
            };
          }

          // Otherwise try to find an incident that references this volunteer
          const assignedIncident = incidentsData.find(
            (i) => Number(i.assigned_volunteer_id) === Number(volunteer.id)
          );

          if (assignedIncident) {
            return {
              ...volunteer,
              skills: volunteer.skills || [],
              assigned: true,
              assignedToIncidentId: assignedIncident.id,
              assignedToIncidentTitle: assignedIncident.title,
            };
          }

          return {
            ...volunteer,
            skills: volunteer.skills || [],
            assigned: volunteer.assigned || false,
            assignedToIncidentId: null,
            assignedToIncidentTitle: null,
          };
        });

        setVolunteers(volunteersWithAssignments);
        setIncidents(incidentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const fullName =
      `${volunteer.first_name} ${volunteer.last_name}`.toLowerCase();
    const email = (volunteer.email || "").toLowerCase();
    const skills = (volunteer.skills || []).map((s) => (s || "").toLowerCase());
    const term = searchTerm.toLowerCase();
    return (
      fullName.includes(term) ||
      email.includes(term) ||
      skills.some((skill) => skill.includes(term))
    );
  });

  const handleAssign = (volunteer) => {
    setAssigningVolunteer(volunteer);
    setSelectedIncident("");
    setAssignmentNotes("");
    setIsAssignOpen(true);
  };

  const handleAssignSubmit = async () => {
    if (!assigningVolunteer || !selectedIncident) return;

    // Validate IDs are numbers
    const incidentId = Number(selectedIncident);
    const volunteerId = Number(assigningVolunteer.id);

    if (isNaN(incidentId) || isNaN(volunteerId)) {
      toast({
        title: "Assignment Failed",
        description: "Invalid incident or volunteer ID",
        variant: "destructive",
      });
      return;
    }

    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/incidents/${incidentId}/assign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            volunteer_id: volunteerId,
            notes: assignmentNotes,
          }),
        }
      );

      if (response.ok) {
        // Refresh data to get updated assignments
        const fetchData = async () => {
          const volunteersRes = await fetch(
            "http://localhost:5000/api/volunteers"
          );
          const incidentsRes = await fetch(
            "http://localhost:5000/api/incidents"
          );

          if (volunteersRes.ok && incidentsRes.ok) {
            const volunteersData = await volunteersRes.json();
            const incidentsData = await incidentsRes.json();

            // Derive assignments from incidents' assigned_volunteer_id field
            const volunteersWithAssignments = volunteersData.map(
              (volunteer) => {
                const assignedIncident = incidentsData.find(
                  (i) =>
                    Number(i.assigned_volunteer_id) === Number(volunteer.id)
                );

                if (assignedIncident) {
                  return {
                    ...volunteer,
                    skills: volunteer.skills || [],
                    assigned: true,
                    assignedToIncidentId: assignedIncident.id,
                    assignedToIncidentTitle: assignedIncident.title,
                  };
                }

                return {
                  ...volunteer,
                  skills: volunteer.skills || [],
                  assigned: volunteer.assigned || false,
                  assignedToIncidentId: null,
                  assignedToIncidentTitle: null,
                };
              }
            );

            setVolunteers(volunteersWithAssignments);
            setIncidents(incidentsData);
          }
        };

        await fetchData();
        setIsAssignOpen(false);
        setAssigningVolunteer(null);
        toast({
          title: "Volunteer Assigned",
          description: `Volunteer has been successfully assigned to the incident`,
        });
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unauthorized" }));
        toast({
          title: "Assignment Failed",
          description: errorData.message || "Failed to assign volunteer",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error assigning volunteer:", error);
      toast({
        title: "Assignment Failed",
        description: "An error occurred while assigning the volunteer",
        variant: "destructive",
      });
    }
  };

  const handleUnassign = async (volunteerId) => {
    if (!window.confirm("Are you sure you want to unassign this volunteer?")) {
      return;
    }

    // Validate volunteer ID
    const validVolunteerId = Number(volunteerId);
    if (isNaN(validVolunteerId)) {
      toast({
        title: "Unassignment Failed",
        description: "Invalid volunteer ID",
        variant: "destructive",
      });
      return;
    }

    try {
      // Determine incident ID by searching incidents for an assigned_volunteer_id matching this volunteer
      const incidentsResponse = await fetch(
        `http://localhost:5000/api/incidents`
      );
      if (!incidentsResponse.ok) {
        throw new Error("Failed to fetch incidents");
      }

      const incidentsData = await incidentsResponse.json();
      const assignment = incidentsData.find(
        (i) => Number(i.assigned_volunteer_id) === validVolunteerId
      );

      if (!assignment) {
        toast({
          title: "Unassignment Failed",
          description: "No active assignment found for this volunteer",
          variant: "destructive",
        });
        return;
      }

      const incidentId = Number(assignment.id);
      if (isNaN(incidentId)) {
        toast({
          title: "Unassignment Failed",
          description: "Invalid incident ID in assignment",
          variant: "destructive",
        });
        return;
      }

      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/incidents/${incidentId}/assign/${validVolunteerId}`,
        {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (response.ok) {
        // Refresh data to get updated assignments
        const fetchData = async () => {
          const volunteersRes = await fetch(
            "http://localhost:5000/api/volunteers"
          );
          const incidentsRes = await fetch(
            "http://localhost:5000/api/incidents"
          );
          const assignmentsRes = await fetch(
            "http://localhost:5000/api/incidents/assignments"
          );

          if (volunteersRes.ok && incidentsRes.ok && assignmentsRes.ok) {
            const volunteersData = await volunteersRes.json();
            const incidentsData = await incidentsRes.json();
            let assignmentsData = [];
            try {
              assignmentsData = await assignmentsRes.json();
            } catch (e) {
              console.warn(
                "Invalid JSON from assignments refresh, using empty array",
                e
              );
              assignmentsData = [];
            }

            const volunteersWithAssignments = volunteersData.map(
              (volunteer) => {
                const assignment = assignmentsData.find(
                  (a) => Number(a.volunteer_id) === Number(volunteer.id)
                );
                if (assignment) {
                  const incident = incidentsData.find(
                    (i) => Number(i.id) === Number(assignment.incident_id)
                  );
                  return {
                    ...volunteer,
                    skills: volunteer.skills || [],
                    assigned: true,
                    assignedToIncidentId: assignment.incident_id,
                    assignedToIncidentTitle: incident
                      ? incident.title
                      : `Incident #${assignment.incident_id}`,
                  };
                }
                return {
                  ...volunteer,
                  skills: volunteer.skills || [],
                  assigned: false,
                  assignedToIncidentId: null,
                  assignedToIncidentTitle: null,
                };
              }
            );

            setVolunteers(volunteersWithAssignments);
            setIncidents(incidentsData);
          }
        };

        await fetchData();
        toast({
          title: "Volunteer Unassigned",
          description:
            "Volunteer has been successfully unassigned from the incident",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Unassignment Failed",
          description: error.message || "Failed to unassign volunteer",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error unassigning volunteer:", error);
      toast({
        title: "Unassignment Failed",
        description: "An error occurred while unassigning the volunteer",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (volunteerId) => {
    if (!window.confirm("Are you sure you want to delete this volunteer?")) {
      return;
    }

    // Validate volunteer ID
    const validVolunteerId = Number(volunteerId);
    if (isNaN(validVolunteerId)) {
      toast({
        title: "Delete Failed",
        description: "Invalid volunteer ID",
        variant: "destructive",
      });
      return;
    }

    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/volunteers/${validVolunteerId}`,
        {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (response.ok) {
        setVolunteers(
          volunteers.filter((v) => Number(v.id) !== validVolunteerId)
        );
        toast({
          title: "Volunteer Deleted",
          description:
            "The volunteer has been successfully removed from the system",
          variant: "destructive",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Delete Failed",
          description: error.message || "Failed to delete volunteer",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      toast({
        title: "Delete Failed",
        description: "An error occurred while deleting the volunteer",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (volunteer) => {
    setEditingVolunteer({ ...volunteer });
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingVolunteer) return;

    // Validate volunteer ID
    const validVolunteerId = Number(editingVolunteer.id);
    if (isNaN(validVolunteerId)) {
      toast({
        title: "Update Failed",
        description: "Invalid volunteer ID",
        variant: "destructive",
      });
      return;
    }

    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken");

      // Only send allowed fields for update (exclude id, password_hash, assigned, created_at)
      const updateData = {
        first_name: editingVolunteer.first_name,
        last_name: editingVolunteer.last_name,
        email: editingVolunteer.email,
        phone: editingVolunteer.phone || "",
        age: String(editingVolunteer.age || ""), // Ensure age is a string
        availability: editingVolunteer.availability || "Available",
        address: editingVolunteer.address || "",
        experience: editingVolunteer.experience || "",
        motivation: editingVolunteer.motivation || "",
        selected_skills: editingVolunteer.skills || [], // Map skills to selected_skills
        terms_accepted: editingVolunteer.terms_accepted || false,
        background_check: editingVolunteer.background_check || false,
      };

      const response = await fetch(
        `http://localhost:5000/api/volunteers/${validVolunteerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setVolunteers(
          volunteers.map((v) =>
            Number(v.id) === validVolunteerId ? updated : v
          )
        );
        setIsEditOpen(false);
        setEditingVolunteer(null);
        toast({
          title: "Volunteer Updated",
          description:
            "The volunteer information has been successfully updated",
        });
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Internal server error" }));
        toast({
          title: "Update Failed",
          description: errorData.message || "Failed to update volunteer",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating volunteer:", error);
      toast({
        title: "Update Failed",
        description:
          error.message || "An error occurred while updating the volunteer",
        variant: "destructive",
      });
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: newVolunteer.first_name,
          last_name: newVolunteer.last_name,
          email: newVolunteer.email,
          phone: newVolunteer.phone || "",
          age: newVolunteer.age || "",
          availability: newVolunteer.availability || "Available",
          address: newVolunteer.address || "",
          experience: newVolunteer.experience || "",
          motivation: newVolunteer.motivation || "",
          selected_skills: newVolunteer.skills || [],
          password: "defaultPassword123", // Temporary password, should be changed
        }),
      });

      if (response.ok) {
        const created = await response.json();
        setVolunteers([...volunteers, created]);
        setIsCreateOpen(false);
        setNewVolunteer({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          age: "",
          availability: "Available",
          address: "",
          experience: "",
          motivation: "",
          skills: [],
        });
        toast({
          title: "Volunteer Created",
          description: "New volunteer has been created successfully",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Create Failed",
          description: error.message || "Failed to create volunteer",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating volunteer:", error);
      toast({
        title: "Create Failed",
        description: "An error occurred while creating the volunteer",
        variant: "destructive",
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
      <div className="flex justify-between items-center">
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
            Manage Volunteers
          </h1>
          <p
            className="text-xl md:text-2xl font-bold mt-3"
            style={{ color: "#16537e" }}
          >
            View and manage registered volunteers
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Volunteer
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Volunteers
            </CardTitle>
            <Heart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.length}</div>
            <p className="text-xs text-gray-500">Registered volunteers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Now</CardTitle>
            <Heart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.length}</div>
            <p className="text-xs text-gray-500">Ready for assignments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Assignments
            </CardTitle>
            <Heart className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {volunteers.filter((v) => v.assigned).length}
            </div>
            <p className="text-xs text-gray-500">Total active</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Volunteers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or skills..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Volunteers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Volunteers</CardTitle>
          <CardDescription>
            Complete list of registered volunteers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading volunteers...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVolunteers.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell className="font-medium">
                      #{volunteer.id}
                    </TableCell>
                    <TableCell>{`${volunteer.first_name} ${volunteer.last_name}`}</TableCell>
                    <TableCell>{volunteer.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {volunteer.skills &&
                          volunteer.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          volunteer.availability === "Available"
                            ? "default"
                            : "outline"
                        }
                      >
                        {volunteer.availability}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {volunteer.assigned &&
                      volunteer.assignedToIncidentTitle ? (
                        <Badge variant="default" className="text-xs">
                          {volunteer.assignedToIncidentTitle}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            console.log(
                              "Assign clicked for volunteer:",
                              volunteer
                            );
                            handleAssign(volunteer);
                          }}
                          disabled={volunteer.assigned}
                          title={
                            volunteer.assigned
                              ? "Already assigned"
                              : "Assign to incident"
                          }
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUnassign(volunteer.id)}
                          disabled={!volunteer.assigned}
                        >
                          <X className="h-4 w-4 text-orange-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(volunteer)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(volunteer.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {isEditOpen && editingVolunteer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            // UPDATED LINE: Added max-h-[90vh], flex, and flex-col
            className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Added flex-shrink-0 so it doesn't shrink */}
            <div className="p-6 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-xl font-semibold">Edit Volunteer</h2>
              <p className="text-sm text-gray-500 mt-1">
                Update volunteer information
              </p>
            </div>

            {/* Body - UPDATED LINE: Added overflow-y-auto for scrolling */}
            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    value={editingVolunteer.first_name}
                    onChange={(e) =>
                      setEditingVolunteer({
                        ...editingVolunteer,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    value={editingVolunteer.last_name}
                    onChange={(e) =>
                      setEditingVolunteer({
                        ...editingVolunteer,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={editingVolunteer.email}
                  onChange={(e) =>
                    setEditingVolunteer({
                      ...editingVolunteer,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={editingVolunteer.phone}
                  onChange={(e) =>
                    setEditingVolunteer({
                      ...editingVolunteer,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Age</label>
                  <Input
                    value={editingVolunteer.age || ""}
                    onChange={(e) =>
                      setEditingVolunteer({
                        ...editingVolunteer,
                        age: e.target.value, // Keep as string
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Availability</label>
                  <Select
                    onValueChange={(value) =>
                      setEditingVolunteer({
                        ...editingVolunteer,
                        availability: value,
                      })
                    }
                    defaultValue={editingVolunteer.availability}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Unavailable">Unavailable</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                    </SelectTrigger>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <Input
                  value={editingVolunteer.address}
                  onChange={(e) =>
                    setEditingVolunteer({
                      ...editingVolunteer,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Experience</label>
                <Input
                  value={editingVolunteer.experience || ""}
                  onChange={(e) =>
                    setEditingVolunteer({
                      ...editingVolunteer,
                      experience: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Motivation</label>
                <Input
                  value={editingVolunteer.motivation}
                  onChange={(e) =>
                    setEditingVolunteer({
                      ...editingVolunteer,
                      motivation: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Skills (comma-separated)
                </label>
                <Input
                  value={
                    editingVolunteer.skills
                      ? editingVolunteer.skills.join(", ")
                      : ""
                  }
                  onChange={(e) =>
                    setEditingVolunteer({
                      ...editingVolunteer,
                      skills: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => s),
                    })
                  }
                />
              </div>

              {/* Buttons - Added padding bottom to ensure visibility */}
              <div className="flex gap-2 pt-4 pb-2">
                <Button onClick={handleUpdate} className="flex-1">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditOpen(false);
                    setEditingVolunteer(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Dialog */}
      {isAssignOpen && assigningVolunteer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold">Assign Volunteer</h2>
              <p className="text-sm text-gray-500 mt-1">
                Assign {assigningVolunteer.first_name}{" "}
                {assigningVolunteer.last_name} to an incident
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium">Select Incident</label>
                <Select
                  onValueChange={setSelectedIncident}
                  defaultValue={selectedIncident}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an incident" />
                    {incidents.map((incident) => (
                      <SelectItem
                        key={incident.id}
                        value={incident.id.toString()}
                      >
                        {incident.title} - {incident.location}
                      </SelectItem>
                    ))}
                  </SelectTrigger>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Assignment Notes</label>
                <Input
                  placeholder="Optional notes for this assignment"
                  value={assignmentNotes}
                  onChange={(e) => setAssignmentNotes(e.target.value)}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAssignSubmit} className="flex-1">
                  Assign Volunteer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAssignOpen(false);
                    setAssigningVolunteer(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Volunteer Dialog */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-xl font-semibold">Create New Volunteer</h2>
              <p className="text-sm text-gray-500 mt-1">
                Add a new volunteer to the system
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name *</label>
                  <Input
                    value={newVolunteer.first_name}
                    onChange={(e) =>
                      setNewVolunteer({
                        ...newVolunteer,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name *</label>
                  <Input
                    value={newVolunteer.last_name}
                    onChange={(e) =>
                      setNewVolunteer({
                        ...newVolunteer,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  value={newVolunteer.email}
                  onChange={(e) =>
                    setNewVolunteer({ ...newVolunteer, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={newVolunteer.phone}
                  onChange={(e) =>
                    setNewVolunteer({ ...newVolunteer, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Age</label>
                  <Input
                    type="number"
                    value={newVolunteer.age}
                    onChange={(e) =>
                      setNewVolunteer({
                        ...newVolunteer,
                        age: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Availability</label>
                  <Select
                    onValueChange={(value) =>
                      setNewVolunteer({ ...newVolunteer, availability: value })
                    }
                    defaultValue={newVolunteer.availability}
                  >
                    <SelectTrigger>
                      <SelectValue />
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Unavailable">Unavailable</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                    </SelectTrigger>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <Input
                  value={newVolunteer.address}
                  onChange={(e) =>
                    setNewVolunteer({
                      ...newVolunteer,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Experience</label>
                <Input
                  value={newVolunteer.experience}
                  onChange={(e) =>
                    setNewVolunteer({
                      ...newVolunteer,
                      experience: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Motivation</label>
                <Input
                  value={newVolunteer.motivation}
                  onChange={(e) =>
                    setNewVolunteer({
                      ...newVolunteer,
                      motivation: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Skills (comma-separated)
                </label>
                <Input
                  value={newVolunteer.skills.join(", ")}
                  onChange={(e) =>
                    setNewVolunteer({
                      ...newVolunteer,
                      skills: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => s),
                    })
                  }
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleCreate}
                  className="flex-1"
                  disabled={
                    !newVolunteer.first_name ||
                    !newVolunteer.last_name ||
                    !newVolunteer.email
                  }
                >
                  Create Volunteer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateOpen(false);
                    setNewVolunteer({
                      first_name: "",
                      last_name: "",
                      email: "",
                      phone: "",
                      age: "",
                      availability: "Available",
                      address: "",
                      experience: "",
                      motivation: "",
                      skills: [],
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVolunteers;

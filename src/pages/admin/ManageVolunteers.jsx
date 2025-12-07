// ManageVolunteers.jsx

import React, { useState, useEffect } from "react";
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  Heart,
  UserCheck,
  X,
} from "lucide-react";

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
    outline: "border border-gray-300 text-gray-700",
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
  const trigger = childrenArray.find(child => child.type.displayName === "SelectTrigger");
  
  // In your usage, SelectItems are inside SelectTrigger. We need to extract them.
  let options = [];
  if (trigger) {
    const triggerChildren = React.Children.toArray(trigger.props.children);
    options = triggerChildren.filter(child => child.type && child.type.displayName === "SelectItem");
  }

  return (
    <div className="relative">
      {trigger && React.cloneElement(trigger, { 
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
                  activeValue === option.props.value ? "bg-gray-100 font-medium" : ""
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

const SelectTrigger = ({ children, onClick, selectedValue, className = "" }) => {
  // Find the label for the selected value
  const childrenArray = React.Children.toArray(children);
  const selectedItem = childrenArray.find(
    (child) => child.type.displayName === "SelectItem" && child.props.value === selectedValue
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
        {selectedItem ? selectedItem.props.children : (placeholder ? placeholder.props.placeholder : "Select...")}
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

// 1. FIXED DIALOG CONTENT (Uses X icon)
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
      className={`bg-white rounded-lg shadow-lg w-full max-w-lg overflow-visible relative flex flex-col ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
      >
        {/* Using the proper X icon here */}
        <X className="h-5 w-5" />
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch volunteers
        const volunteersResponse = await fetch(
          "http://localhost:5000/api/volunteers"
        );
        if (volunteersResponse.ok) {
          const volunteersData = await volunteersResponse.json();
          setVolunteers(volunteersData);
        } else {
          console.error("Failed to fetch volunteers");
        }

        // Fetch incidents
        const incidentsResponse = await fetch(
          "http://localhost:5000/api/incidents"
        );
        if (incidentsResponse.ok) {
          const incidentsData = await incidentsResponse.json();
          setIncidents(incidentsData);
        } else {
          console.error("Failed to fetch incidents");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredVolunteers = volunteers.filter(
    (volunteer) =>
      `${volunteer.first_name} ${volunteer.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleAssign = (volunteer) => {
    setAssigningVolunteer(volunteer);
    setSelectedIncident("");
    setAssignmentNotes("");
    setIsAssignOpen(true);
  };

  const handleAssignSubmit = async () => {
    if (!assigningVolunteer || !selectedIncident) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/incidents/${selectedIncident}/assign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            volunteerId: assigningVolunteer.id,
            notes: assignmentNotes,
          }),
        }
      );

      if (response.ok) {
        // Update volunteer status to assigned
        setVolunteers(
          volunteers.map((v) =>
            v.id === assigningVolunteer.id ? { ...v, assigned: true } : v
          )
        );
        setIsAssignOpen(false);
        setAssigningVolunteer(null);
        toast({
          title: "Volunteer Assigned",
          description: `Volunteer has been successfully assigned to the incident`,
        });
      } else {
        const error = await response.json();
        toast({
          title: "Assignment Failed",
          description: error.message || "Failed to assign volunteer",
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

    try {
      // First, get the assignment to find the incident ID
      const assignmentsResponse = await fetch(
        `http://localhost:5000/api/incidents/assignments`
      );
      if (!assignmentsResponse.ok) {
        throw new Error("Failed to fetch assignments");
      }

      const assignments = await assignmentsResponse.json();
      const assignment = assignments.find(
        (a) => a.volunteer_id === volunteerId
      );

      if (!assignment) {
        toast({
          title: "Unassignment Failed",
          description: "No active assignment found for this volunteer",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/incidents/${assignment.incident_id}/assign/${volunteerId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update volunteer status to unassigned
        setVolunteers(
          volunteers.map((v) =>
            v.id === volunteerId ? { ...v, assigned: false } : v
          )
        );
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

    try {
      const response = await fetch(
        `http://localhost:5000/api/volunteers/${volunteerId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setVolunteers(volunteers.filter((v) => v.id !== volunteerId));
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

    try {
      const response = await fetch(
        `http://localhost:5000/api/volunteers/${editingVolunteer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingVolunteer),
        }
      );

      if (response.ok) {
        setVolunteers(
          volunteers.map((v) =>
            v.id === editingVolunteer.id ? editingVolunteer : v
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
        const error = await response.json();
        toast({
          title: "Update Failed",
          description: error.message || "Failed to update volunteer",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating volunteer:", error);
      toast({
        title: "Update Failed",
        description: "An error occurred while updating the volunteer",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Volunteers</h1>
        <p className="text-gray-500 mt-1">
          View and manage registered volunteers
        </p>
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
            <div className="text-2xl font-bold">{0}</div>
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
                      <Badge variant="secondary">{volunteer.assigned}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAssign(volunteer)}
                          disabled={volunteer.assigned}
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
            className="bg-white rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold">Edit Volunteer</h2>
              <p className="text-sm text-gray-500 mt-1">
                Update volunteer information
              </p>
            </div>
            <div className="p-6 space-y-4">
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
                    type="number"
                    value={editingVolunteer.age}
                    onChange={(e) =>
                      setEditingVolunteer({
                        ...editingVolunteer,
                        age: parseInt(e.target.value) || 0,
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
              <div className="flex gap-2 pt-4">
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
    </div>
  );
};

export default ManageVolunteers;

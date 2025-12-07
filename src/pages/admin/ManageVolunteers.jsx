import React, { useState, useEffect } from "react";
import { Search, UserPlus, Edit, Trash2, Heart } from "lucide-react";

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
const Select = ({ onValueChange, children, defaultValue }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => child.type.displayName === "SelectTrigger"
  );
  const content = childrenArray.find(
    (child) => child.type.displayName === "SelectContent"
  );

  return (
    <div className="relative">
      {trigger &&
        React.cloneElement(trigger, {
          value: selectedValue,
          onChange: handleChange,
        })}
      {content}
    </div>
  );
};

const SelectTrigger = ({
  value,
  onChange,
  children,
  className = "",
  ...props
}) => (
  <select
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ${className}`}
    {...props}
  >
    {children}
  </select>
);
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = ({ children, className = "" }) => (
  <div className={`absolute z-50 mt-1 w-full ${className}`}>{children}</div>
);
SelectContent.displayName = "SelectContent";

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);
SelectItem.displayName = "SelectItem";

const SelectValue = ({ placeholder }) => (
  <option value="" disabled>
    {placeholder}
  </option>
);
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
      className={`bg-white rounded-lg shadow-lg w-full max-w-md ${className}`}
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
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/volunteers");
        if (response.ok) {
          const data = await response.json();
          setVolunteers(data);
        } else {
          console.error("Failed to fetch volunteers");
        }
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
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

  const handleAssignIncident = (volunteerId, incidentId) => {
    toast({
      title: "Incident Assigned",
      description: `Incident ${incidentId} has been assigned to the volunteer`,
    });
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
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Unavailable">Unavailable</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                    </SelectContent>
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
    </div>
  );
};

export default ManageVolunteers;

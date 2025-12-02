import React, { useState } from "react";
import { Eye, UserPlus, CheckCircle, Search } from "lucide-react";

// Create simple UI components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 border-b border-gray-100 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
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
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
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
  return <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>{children}</button>;
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
  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">{children}</th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle ${className}`}>{children}</td>
);

// Simple Select Component
const Select = ({ value, onValueChange, children, defaultValue }) => {
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || "");
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };
  
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(child => child.type.displayName === "SelectTrigger");
  const content = childrenArray.find(child => child.type.displayName === "SelectContent");
  
  return (
    <div className="relative">
      {trigger && React.cloneElement(trigger, { value: selectedValue, onChange: handleChange })}
      {content}
    </div>
  );
};

const SelectTrigger = ({ value, onChange, children, className = "", ...props }) => (
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
  <div className={`absolute z-50 mt-1 w-full ${className}`}>
    {children}
  </div>
);
SelectContent.displayName = "SelectContent";

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);
SelectItem.displayName = "SelectItem";

const SelectValue = ({ placeholder }) => (
  <option value="" disabled>{placeholder}</option>
);
SelectValue.displayName = "SelectValue";

// Dialog Component
const Dialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(child => child.type.displayName === "DialogTrigger");
  const content = childrenArray.find(child => child.type.displayName === "DialogContent");
  
  return (
    <>
      {trigger && React.cloneElement(trigger, { onClick: () => setIsOpen(true) })}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          {content && React.cloneElement(content, { onClose: () => setIsOpen(false) })}
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
  const header = childrenArray.find(child => child.type.displayName === "DialogHeader");
  const otherChildren = childrenArray.filter(child => child.type.displayName !== "DialogHeader");
  
  return (
    <div className={`bg-white rounded-lg shadow-lg w-full max-w-md ${className}`} onClick={(e) => e.stopPropagation()}>
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
      {header}
      <div className="p-6">
        {otherChildren}
      </div>
    </div>
  );
};
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ children, className = "" }) => {
  const childrenArray = React.Children.toArray(children);
  const title = childrenArray.find(child => child.type.displayName === "DialogTitle");
  const description = childrenArray.find(child => child.type.displayName === "DialogDescription");
  
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

// Mock data
const mockIncidents = [
  { id: "INC-001", type: "Flood", severity: "Critical", location: "Downtown Area", date: "2024-01-15", status: "Pending" },
  { id: "INC-002", type: "Fire", severity: "High", location: "Industrial Zone", date: "2024-01-16", status: "In Progress" },
  { id: "INC-003", type: "Earthquake", severity: "Critical", location: "North District", date: "2024-01-17", status: "Pending" },
  { id: "INC-004", type: "Medical Emergency", severity: "Medium", location: "Residential Area", date: "2024-01-18", status: "Resolved" },
  { id: "INC-005", type: "Building Collapse", severity: "Critical", location: "Construction Site", date: "2024-01-19", status: "In Progress" },
];

const mockVolunteers = [
  { id: "1", name: "Ali Khan", skills: "First Aid", available: true },
  { id: "2", name: "Sara Ahmed", skills: "Rescue Operations", available: true },
  { id: "3", name: "Ahmed Raza", skills: "Fire Safety", available: false },
  { id: "4", name: "Fatima Noor", skills: "Medical", available: true },
  { id: "5", name: "Bilal Malik", skills: "Search & Rescue", available: true },
];

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
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
   const [selectedVolunteer] = useState("");
//   const [selectedVolunteer, setSelectedVolunteer] = useState("");

  const filteredIncidents = mockIncidents.filter(incident => {
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesSearch = incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAssignVolunteer = (incidentId, volunteerId) => {
    toast({
      title: "Volunteer Assigned",
      description: `Volunteer has been assigned to incident ${incidentId}`,
    });
  };

  const handleResolve = (incidentId) => {
    toast({
      title: "Incident Resolved",
      description: `Incident ${incidentId} has been marked as resolved`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Incidents</h1>
        <p className="text-gray-500 mt-1">View and manage all reported incidents</p>
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
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
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
              {filteredIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>{incident.type}</TableCell>
                  <TableCell>
                    <Badge variant={incident.severity === "Critical" ? "destructive" : "default"}>
                      {incident.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>{incident.date}</TableCell>
                  <TableCell>
                    <Badge variant={incident.status === "Resolved" ? "default" : "secondary"}>
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
                            <DialogDescription>Full incident information</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Type</p>
                                <p className="text-lg font-semibold">{incident.type}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Severity</p>
                                <Badge variant={incident.severity === "Critical" ? "destructive" : "default"}>
                                  {incident.severity}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Location</p>
                              <p>{incident.location}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Description</p>
                              <p className="text-sm text-gray-500">
                                Emergency situation requiring immediate response. Rescue team has been notified.
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
                            <DialogDescription>Select a volunteer for this incident</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <Select onValueChange={(value) => handleAssignVolunteer(incident.id, value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select volunteer" />
                                <SelectContent>
                                  {mockVolunteers.filter(v => v.available).map((volunteer) => (
                                    <SelectItem key={volunteer.id} value={volunteer.id.toString()}>
                                      {volunteer.name} - {volunteer.skills}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </SelectTrigger>
                            </Select>
                            <Button className="w-full" onClick={() => {
                              if (selectedVolunteer) {
                                handleAssignVolunteer(incident.id, selectedVolunteer);
                              }
                            }}>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageIncidents;
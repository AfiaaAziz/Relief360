import React, { useState, useEffect } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Building2,
} from "lucide-react";

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

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  defaultValue,
  id,
  className = "",
}) => (
  <input
    type={type}
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    defaultValue={defaultValue}
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

const Label = ({ children, htmlFor, className = "" }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium ${className}`}>
    {children}
  </label>
);

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

// Simple toast function
const useToast = () => {
  const toast = (options) => {
    console.log("Toast:", options.title, options.description);
    alert(`${options.title}: ${options.description}`);
  };
  return { toast };
};

const ManageHospitals = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hospitals");
        if (response.ok) {
          const data = await response.json();
          setHospitals(data);
        } else {
          console.error("Failed to fetch hospitals");
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (hospitalId) => {
    toast({
      title: "Hospital Approved",
      description: "The hospital has been approved and added to the network",
    });
  };

  const handleReject = (hospitalId) => {
    toast({
      title: "Hospital Rejected",
      description: "The hospital registration has been rejected",
      variant: "destructive",
    });
  };

  const handleDelete = async (hospitalId) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/hospitals/${hospitalId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setHospitals(hospitals.filter((h) => h.id !== hospitalId));
        toast({
          title: "Hospital Deleted",
          description:
            "The hospital has been successfully removed from the system",
          variant: "destructive",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Delete Failed",
          description: error.message || "Failed to delete hospital",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting hospital:", error);
      toast({
        title: "Delete Failed",
        description: "An error occurred while deleting the hospital",
        variant: "destructive",
      });
    }
  };

  const handleUpdateAvailability = async (hospitalId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hospitals/${hospitalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        // Refresh the hospitals list
        const fetchResponse = await fetch(
          "http://localhost:5000/api/hospitals"
        );
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          setHospitals(data);
        }

        toast({
          title: "Hospital Updated",
          description: "Hospital information has been updated successfully",
        });
      } else {
        throw new Error("Failed to update hospital");
      }
    } catch (error) {
      console.error("Error updating hospital:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update hospital information",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Hospitals</h1>
        <p className="text-gray-500 mt-1">
          Manage hospital registrations and availability
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Hospitals
            </CardTitle>
            <Building2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospitals.length}</div>
            <p className="text-xs text-gray-500">Active hospitals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
            <Building2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hospitals.reduce((sum, h) => sum + (h.total_beds || 0), 0)}
            </div>
            <p className="text-xs text-gray-500">Available beds</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approval
            </CardTitle>
            <Building2 className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Hospitals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or location..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Hospitals Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Hospitals</CardTitle>
          <CardDescription>
            Manage hospital registrations and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Total Beds</TableHead>
                <TableHead>ICU Beds</TableHead>
                <TableHead>Emergency Beds</TableHead>
                <TableHead>Doctors</TableHead>
                <TableHead>Ambulances</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHospitals.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell className="font-medium">#{hospital.id}</TableCell>
                  <TableCell>{hospital.hospital_name}</TableCell>
                  <TableCell>{hospital.address}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        hospital.total_beds > 40 ? "default" : "secondary"
                      }
                    >
                      {hospital.total_beds}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={hospital.icu_beds > 10 ? "default" : "secondary"}
                    >
                      {hospital.icu_beds}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        hospital.emergency_beds > 5 ? "default" : "secondary"
                      }
                    >
                      {hospital.emergency_beds}
                    </Badge>
                  </TableCell>
                  <TableCell>{hospital.staff_count}</TableCell>
                  <TableCell>{hospital.ambulances}</TableCell>
                  <TableCell>{hospital.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Update Hospital Availability
                            </DialogTitle>
                            <DialogDescription>
                              Update resource availability for{" "}
                              {hospital.hospital_name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="beds">Total Beds</Label>
                              <Input
                                id="beds"
                                type="number"
                                defaultValue={hospital.total_beds}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="icu_beds">ICU Beds</Label>
                              <Input
                                id="icu_beds"
                                type="number"
                                defaultValue={hospital.icu_beds}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="emergency_beds">
                                Emergency Beds
                              </Label>
                              <Input
                                id="emergency_beds"
                                type="number"
                                defaultValue={hospital.emergency_beds}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="doctors">On-duty Doctors</Label>
                              <Input
                                id="doctors"
                                type="number"
                                defaultValue={hospital.staff_count}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="ambulances">
                                Available Ambulances
                              </Label>
                              <Input
                                id="ambulances"
                                type="number"
                                defaultValue={hospital.ambulances}
                              />
                            </div>
                            <Button
                              onClick={() => {
                                const beds =
                                  document.getElementById("beds").value;
                                const icuBeds =
                                  document.getElementById("icu_beds").value;
                                const emergencyBeds =
                                  document.getElementById(
                                    "emergency_beds"
                                  ).value;
                                const doctors =
                                  document.getElementById("doctors").value;
                                const ambulances =
                                  document.getElementById("ambulances").value;
                                handleUpdateAvailability(hospital.id, {
                                  total_beds: parseInt(beds) || 0,
                                  icu_beds: parseInt(icuBeds) || 0,
                                  emergency_beds: parseInt(emergencyBeds) || 0,
                                  staff_count: parseInt(doctors) || 0,
                                  ambulances: parseInt(ambulances) || 0,
                                });
                              }}
                              className="w-full"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(hospital.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pending Approvals */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>
            Review and approve new hospital registrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">
                    New Hospital Registration #{i}
                  </p>
                  <p className="text-sm text-gray-500">Submitted 2 days ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleApprove(i)}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(i)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageHospitals;

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
    className={`rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
      borderColor: 'rgba(22, 83, 126, 0.2)'
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
  <h3 className={`text-xl font-black text-white ${className}`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', lineHeight: '1.3', paddingBottom: '0.25rem' }}>
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
  <th 
    className="h-14 px-4 text-left align-middle font-bold text-base"
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

const Label = ({ children, htmlFor, className = "" }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium ${className}`}>
    {children}
  </label>
);

const Dialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
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
      className={`bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col relative my-auto ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      >
        ✕
      </button>
      <div className="flex-shrink-0">
        {header}
      </div>
      <div className="p-6 overflow-y-auto flex-1 min-h-0">{otherChildren}</div>
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
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHospitals = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/hospitals");
      if (response.ok) {
        const data = await response.json();
        setHospitals(data.filter((h) => h.status !== "pending"));
      } else {
        console.error("Failed to fetch hospitals");
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const fetchPendingHospitals = async () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/hospitals/pending", {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPendingHospitals(data);
      } else {
        console.error("Failed to fetch pending hospitals");
      }
    } catch (error) {
      console.error("Error fetching pending hospitals:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchHospitals(), fetchPendingHospitals()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = async (hospitalId) => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/hospitals/${hospitalId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ status: "approved" }),
        }
      );

      if (response.ok) {
        setPendingHospitals((prev) =>
          prev.filter((h) => h.id !== hospitalId)
        );
        await fetchHospitals(); // Refresh approved hospitals
        toast({
          title: "Hospital Approved",
          description: "The hospital has been approved and added to the network",
        });
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to approve hospital");
      }
    } catch (error) {
      console.error("Error approving hospital:", error);
      toast({
        title: "Approval Failed",
        description: error.message || "Failed to approve hospital",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (hospitalId) => {
    if (!window.confirm("Are you sure you want to reject this hospital registration? This action cannot be undone.")) {
      return;
    }
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/hospitals/${hospitalId}`,
        {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (response.ok) {
        setPendingHospitals((prev) =>
          prev.filter((h) => h.id !== hospitalId)
        );
        toast({
          title: "Hospital Rejected",
          description: "The hospital registration has been permanently removed",
          variant: "destructive",
        });
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to reject hospital");
      }
    } catch (error) {
      console.error("Error rejecting hospital:", error);
      toast({
        title: "Rejection Failed",
        description: error.message || "Failed to reject hospital",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (hospitalId) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/hospitals/${hospitalId}`,
        {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
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
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/hospitals/${hospitalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        // Refresh the hospitals list
        await fetchHospitals();
        toast({
          title: "Hospital Updated",
          description: "Hospital information has been updated successfully",
        });
      } else {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to update hospital");
      }
    } catch (error) {
      console.error("Error updating hospital:", error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update hospital information",
        variant: "destructive",
      });
    }
  };

  return (
    <div 
      className="p-6 space-y-6 relative overflow-hidden min-h-screen"
      style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
      }}
    >
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
          Manage Hospitals
        </h1>
        <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
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
            <div className="text-2xl font-bold">{loading ? '...' : pendingHospitals.length}</div>
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
                              onClick={async () => {
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
                                await handleUpdateAvailability(hospital.id, {
                                  totalBeds: parseInt(beds) || 0,
                                  icuBeds: parseInt(icuBeds) || 0,
                                  emergencyBeds: parseInt(emergencyBeds) || 0,
                                  staffCount: parseInt(doctors) || 0,
                                  ambulances: parseInt(ambulances) || 0,
                                });
                                // Close dialog after update
                                const dialog = document.querySelector(
                                  ".fixed.inset-0.bg-black\\/50"
                                );
                                if (dialog) {
                                  dialog.click();
                                }
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
          {loading ? (
            <div className="text-center py-4 text-gray-500">
              Loading pending approvals...
            </div>
          ) : pendingHospitals.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No pending hospital registrations
            </div>
          ) : (
            <div className="space-y-4">
              {pendingHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-semibold">
                      {hospital.hospital_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {hospital.address} • {hospital.email}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Submitted:{" "}
                      {new Date(hospital.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(hospital.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(hospital.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageHospitals;

// import DashboardLayout from "../../layouts/DashboardLayout";
// import { Search, Ban, Trash2, UserCheck } from "lucide-react";
// import { useState } from "react";

// // Create simple versions of the UI components since you don't have them
// const Card = ({ children, className = "" }) => (
//   <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
// );

// const CardHeader = ({ children, className = "" }) => (
//   <div className={`p-6 border-b border-gray-100 ${className}`}>{children}</div>
// );

// const CardTitle = ({ children, className = "" }) => (
//   <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
// );

// const CardDescription = ({ children, className = "" }) => (
//   <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
// );

// const CardContent = ({ children, className = "" }) => (
//   <div className={`p-6 ${className}`}>{children}</div>
// );

// const Badge = ({ children, variant = "default" }) => {
//   const styles = {
//     default: "bg-blue-100 text-blue-800",
//     secondary: "bg-gray-100 text-gray-800",
//     destructive: "bg-red-100 text-red-800",
//   };
//   return (
//     <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}>
//       {children}
//     </span>
//   );
// };

// const Button = ({ children, size = "default", variant = "default", className = "", ...props }) => {
//   const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
//   const sizes = {
//     default: "h-10 px-4 py-2",
//     sm: "h-9 rounded-md px-3 text-sm",
//   };
//   const variants = {
//     default: "bg-blue-600 text-white hover:bg-blue-700",
//     destructive: "bg-red-600 text-white hover:bg-red-700",
//     outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
//   };
//   return <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>{children}</button>;
// };

// const Input = ({ placeholder, value, onChange, className = "" }) => (
//   <input
//     type="text"
//     placeholder={placeholder}
//     value={value}
//     onChange={onChange}
//     className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ${className}`}
//   />
// );

// // Simple Table components
// const Table = ({ children }) => (
//   <div className="w-full overflow-auto">
//     <table className="w-full text-sm">{children}</table>
//   </div>
// );
// const TableHeader = ({ children }) => <thead>{children}</thead>;
// const TableBody = ({ children }) => <tbody>{children}</tbody>;
// const TableRow = ({ children }) => <tr className="border-b">{children}</tr>;
// const TableHead = ({ children }) => (
//   <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">{children}</th>
// );
// const TableCell = ({ children, className = "" }) => (
//   <td className={`p-4 align-middle ${className}`}>{children}</td>
// );

// // Mock data (replace with your actual mockData if you have it)
// const mockCitizens = [
//   { id: 1, name: "John Doe", email: "john@example.com", incidents: 5, joinDate: "2024-01-15" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", incidents: 3, joinDate: "2024-02-20" },
//   { id: 3, name: "Robert Johnson", email: "robert@example.com", incidents: 8, joinDate: "2024-01-05" },
//   { id: 4, name: "Sarah Williams", email: "sarah@example.com", incidents: 2, joinDate: "2024-03-10" },
// ];

// // Simple toast function
// const useToast = () => {
//   const toast = (options) => {
//     console.log("Toast:", options.title, options.description);
//     // You can replace this with actual toast implementation
//     alert(`${options.title}: ${options.description}`);
//   };
//   return { toast };
// };

// const ManageCitizens = () => {
//   const { toast } = useToast();
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredCitizens = mockCitizens.filter(citizen =>
//     citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     citizen.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleBlock = (citizenId) => {
//     toast({
//       title: "Citizen Blocked",
//       description: "The citizen has been blocked from the system",
//       variant: "destructive",
//     });
//   };

//   const handleDelete = (citizenId) => {
//     toast({
//       title: "Citizen Deleted",
//       description: "The citizen account has been permanently deleted",
//       variant: "destructive",
//     });
//   };

//   return (
//     <DashboardLayout role="admin">
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold">Manage Citizens</h1>
//           <p className="text-gray-500 mt-1">View and manage registered citizens</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid gap-4 md:grid-cols-3">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">Total Citizens</CardTitle>
//               <UserCheck className="h-4 w-4 text-green-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{mockCitizens.length}</div>
//               <p className="text-xs text-gray-500">Active accounts</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">New This Month</CardTitle>
//               <UserCheck className="h-4 w-4 text-blue-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">48</div>
//               <p className="text-xs text-gray-500">+12% from last month</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
//               <UserCheck className="h-4 w-4 text-yellow-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">156</div>
//               <p className="text-xs text-gray-500">Total incidents reported</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Search Citizens</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search by name or email..."
//                 className="pl-9"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Citizens Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>All Citizens</CardTitle>
//             <CardDescription>Complete list of registered citizens</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>ID</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Incidents Reported</TableHead>
//                   <TableHead>Join Date</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredCitizens.map((citizen) => (
//                   <TableRow key={citizen.id}>
//                     <TableCell className="font-medium">#{citizen.id}</TableCell>
//                     <TableCell>{citizen.name}</TableCell>
//                     <TableCell>{citizen.email}</TableCell>
//                     <TableCell>
//                       <Badge variant="secondary">{citizen.incidents}</Badge>
//                     </TableCell>
//                     <TableCell>{citizen.joinDate}</TableCell>
//                     <TableCell>
//                       <div className="flex gap-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => handleBlock(citizen.id)}
//                         >
//                           <Ban className="h-4 w-4 mr-1" />
//                           Block
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => handleDelete(citizen.id)}
//                         >
//                           <Trash2 className="h-4 w-4 mr-1" />
//                           Delete
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default ManageCitizens;

import { Search, Ban, Trash2, UserCheck, Eye } from "lucide-react";
import { useState, useEffect } from "react";

// Create simple versions of the UI components with new color palette
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
  size = "default",
  variant = "default",
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

// Simple Table components
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

// Simple toast function
const useToast = () => {
  const toast = (options) => {
    console.log("Toast:", options.title, options.description);
    alert(`${options.title}: ${options.description}`);
  };
  return { toast };
};

const ManageCitizens = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [citizens, setCitizens] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [stats, setStats] = useState({
    total_citizens: 0,
    new_this_month: 0,
    active_reports: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch citizens with incident counts
        const citizensRes = await fetch("http://localhost:5000/api/citizens");
        if (citizensRes.ok) {
          const citizensData = await citizensRes.json();
          setCitizens(citizensData);
        }

        // Fetch stats
        const statsRes = await fetch(
          "http://localhost:5000/api/citizens/stats"
        );
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        // Also fetch incidents for detailed view
        const incidentsRes = await fetch("http://localhost:5000/api/incidents");
        if (incidentsRes.ok) {
          const incidentsData = await incidentsRes.json();
          setIncidents(incidentsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCitizens = citizens.filter(
    (citizen) =>
      (citizen.name &&
        citizen.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (citizen.email &&
        citizen.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const [viewingCitizen, setViewingCitizen] = useState(null);

  // Filter incidents reported by citizens only (those with reported_by_user_id set)
  const citizenReportedIncidents = incidents.filter(
    (incident) =>
      incident.reported_by_user_id && incident.reported_by_user_id > 0
  );

  const handleBlock = async (citizenId) => {
    if (!window.confirm("Are you sure you want to block this citizen?")) {
      return;
    }
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/citizens/${citizenId}/block`,
        {
          method: "PUT",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (response.ok) {
        // Update the citizens list to reflect the block
        setCitizens(citizens.filter((c) => c.id !== citizenId));
        toast({
          title: "Citizen Blocked",
          description: "The citizen has been blocked from the system",
          variant: "destructive",
        });
      } else {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to block citizen");
      }
    } catch (error) {
      console.error("Error blocking citizen:", error);
      toast({
        title: "Block Failed",
        description: error.message || "Failed to block citizen",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (citizenId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this citizen? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/citizens/${citizenId}`,
        {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (response.ok) {
        // Remove from the list
        setCitizens(citizens.filter((c) => c.id !== citizenId));
        toast({
          title: "Citizen Deleted",
          description: "The citizen account has been permanently deleted",
          variant: "destructive",
        });
      } else {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to delete citizen");
      }
    } catch (error) {
      console.error("Error deleting citizen:", error);
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete citizen",
        variant: "destructive",
      });
    }
  };

  const handleView = (citizen) => {
    const citizenIncidents = incidents.filter(
      (i) => i.reported_by_user_id === citizen.id
    );
    setViewingCitizen({ ...citizen, incidents: citizenIncidents });
  };

  return (
    <div
      className="p-6 space-y-6 relative overflow-hidden min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
      }}
    >
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
          Manage Citizens
        </h1>
        <p
          className="text-xl md:text-2xl font-bold mt-3"
          style={{ color: "#16537e" }}
        >
          View and manage registered citizens
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Citizens
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.total_citizens}
            </div>
            <p className="text-xs text-gray-500">Active accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              New This Month
            </CardTitle>
            <UserCheck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.new_this_month}
            </div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Reports
            </CardTitle>
            <UserCheck className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : citizenReportedIncidents.length}
            </div>
            <p className="text-xs text-gray-500">Citizen-reported incidents</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Citizens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Citizens Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Citizens</CardTitle>
          <CardDescription>
            Complete list of registered citizens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading citizens...
                  </TableCell>
                </TableRow>
              ) : filteredCitizens.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No citizens found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCitizens.map((citizen) => (
                  <TableRow key={citizen.id}>
                    <TableCell className="font-medium">#{citizen.id}</TableCell>
                    <TableCell>{citizen.name}</TableCell>
                    <TableCell>{citizen.email}</TableCell>
                    <TableCell>{citizen.phone}</TableCell>
                    <TableCell>{citizen.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(citizen)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBlock(citizen.id)}
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Block
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(citizen.id)}
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
        </CardContent>
      </Card>

      {/* View Citizen Details Dialog */}
      {viewingCitizen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Citizen Details - User #{viewingCitizen.id}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewingCitizen(null)}
              >
                Close
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p>{viewingCitizen.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{viewingCitizen.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Join Date</p>
                  <p>{viewingCitizen.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Incidents
                  </p>
                  <p className="text-lg font-semibold">
                    {viewingCitizen.incidents.length}
                  </p>
                </div>
              </div>
              {viewingCitizen.incidents &&
                viewingCitizen.incidents.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Reported Incidents
                    </p>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {viewingCitizen.incidents.map((incident) => (
                        <div
                          key={incident.id}
                          className="p-3 border rounded-lg bg-gray-50"
                        >
                          <p className="font-medium">{incident.title}</p>
                          <p className="text-sm text-gray-600">
                            {incident.location} • {incident.severity} •{" "}
                            {incident.status}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(incident.created_at).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCitizens;

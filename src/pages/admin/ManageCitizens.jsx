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

import { Search, Ban, Trash2, UserCheck } from "lucide-react";
import { useState } from "react";

// Create simple versions of the UI components
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
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
};

const Button = ({ children, size = "default", variant = "default", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3 text-sm",
  };
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
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
  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">{children}</th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle ${className}`}>{children}</td>
);

// Mock data
const mockCitizens = [
  { id: 1, name: "John Doe", email: "john@example.com", incidents: 5, joinDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", incidents: 3, joinDate: "2024-02-20" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", incidents: 8, joinDate: "2024-01-05" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", incidents: 2, joinDate: "2024-03-10" },
];

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

  const filteredCitizens = mockCitizens.filter(citizen =>
    citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    citizen.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBlock = (citizenId) => {
    toast({
      title: "Citizen Blocked",
      description: "The citizen has been blocked from the system",
      variant: "destructive",
    });
  };

  const handleDelete = (citizenId) => {
    toast({
      title: "Citizen Deleted",
      description: "The citizen account has been permanently deleted",
      variant: "destructive",
    });
  };

  return (
    // REMOVED DashboardLayout wrapper - App.js already provides it
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Citizens</h1>
        <p className="text-gray-500 mt-1">View and manage registered citizens</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Citizens</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCitizens.length}</div>
            <p className="text-xs text-gray-500">Active accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
            <UserCheck className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-500">Total incidents reported</p>
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
          <CardDescription>Complete list of registered citizens</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Incidents Reported</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCitizens.map((citizen) => (
                <TableRow key={citizen.id}>
                  <TableCell className="font-medium">#{citizen.id}</TableCell>
                  <TableCell>{citizen.name}</TableCell>
                  <TableCell>{citizen.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{citizen.incidents}</Badge>
                  </TableCell>
                  <TableCell>{citizen.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCitizens;
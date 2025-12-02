import React, { useState } from "react";  // ADD THIS
import { DollarSign, Package, Download } from "lucide-react";

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

const Button = ({ children, variant = "default", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

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

// Tabs Component - FIXED
const Tabs = ({ defaultValue, children, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  const childrenArray = React.Children.toArray(children);
  const tabsList = childrenArray.find(child => child.type.displayName === "TabsList");
  const tabsContent = childrenArray.filter(child => child.type.displayName === "TabsContent");
  
  return (
    <div className={className}>
      {tabsList && React.cloneElement(tabsList, { activeTab, setActiveTab })}
      {tabsContent.find(content => content.props.value === activeTab)}
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab, className = "" }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <div className={`inline-flex rounded-lg border border-gray-200 p-1 ${className}`}>
      {childrenArray.map(child => 
        React.cloneElement(child, { 
          isActive: child.props.value === activeTab,
          onClick: () => setActiveTab(child.props.value)
        })
      )}
    </div>
  );
};
TabsList.displayName = "TabsList";  // ADD THIS

const TabsTrigger = ({ children, isActive, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
      isActive 
        ? "bg-blue-600 text-white" 
        : "text-gray-600 hover:bg-gray-100"
    } ${className}`}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, className = "" }) => (
  <div className={`mt-4 ${className}`}>
    {children}
  </div>
);
TabsContent.displayName = "TabsContent";  // ADD THIS

// Mock data
const mockDonations = [
  { id: 1, type: "Money", donor: "Ali Khan", amount: "PKR 50,000", date: "2024-01-15" },
  { id: 2, type: "Money", donor: "Sara Ahmed", amount: "PKR 25,000", date: "2024-01-18" },
  { id: 3, type: "Supplies", donor: "Medical Corps", amount: "Medical Kits x 50", date: "2024-01-20" },
  { id: 4, type: "Money", donor: "Tech Solutions", amount: "PKR 100,000", date: "2024-01-22" },
  { id: 5, type: "Supplies", donor: "Food Bank", amount: "Food Packs x 200", date: "2024-01-25" },
  { id: 6, type: "Money", donor: "Anonymous", amount: "PKR 70,000", date: "2024-01-28" },
];

// Simple toast function
const useToast = () => {
  const toast = (options) => {
    console.log("Toast:", options.title, options.description);
    alert(`${options.title}: ${options.description}`);
  };
  return { toast };
};

const ManageDonations = () => {
  const { toast } = useToast();

  const moneyDonations = mockDonations.filter(d => d.type === "Money");
  const supplyDonations = mockDonations.filter(d => d.type === "Supplies");

  const handleExport = (type) => {
    toast({
      title: "Export Started",
      description: `Exporting ${type} donations to CSV...`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Donations</h1>
        <p className="text-gray-500 mt-1">Track and manage all donations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Money</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PKR 245,000</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Supply Items</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-gray-500">Items donated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-gray-500">Unique donors</p>
          </CardContent>
        </Card>
      </div>

      {/* Donations Tables */}
      <Tabs defaultValue="money" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="money">
            <DollarSign className="h-4 w-4 mr-2" />
            Money Donations
          </TabsTrigger>
          <TabsTrigger value="supplies">
            <Package className="h-4 w-4 mr-2" />
            Supply Donations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="money">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Money Donations</CardTitle>
                  <CardDescription>Track all monetary contributions</CardDescription>
                </div>
                <Button variant="outline" onClick={() => handleExport("money")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {moneyDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">#{donation.id}</TableCell>
                      <TableCell>{donation.donor}</TableCell>
                      <TableCell className="font-semibold text-green-600">{donation.amount}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>
                        <Badge variant="default">Completed</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplies">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Supply Donations</CardTitle>
                  <CardDescription>Track all supply contributions</CardDescription>
                </div>
                <Button variant="outline" onClick={() => handleExport("supply")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplyDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">#{donation.id}</TableCell>
                      <TableCell>{donation.donor}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{donation.amount}</Badge>
                      </TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>
                        <Badge variant="default">Collected</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageDonations;
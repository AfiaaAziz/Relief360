import React, { useState, useEffect } from "react";
import { DollarSign, Package, Download } from "lucide-react";

// Create simple UI components with new color palette
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
  <h3 className={`text-xl font-black text-white ${className}`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', lineHeight: '1.3', paddingBottom: '0.25rem' }}>{children}</h3>
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
    <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold shadow-lg border-2" style={styles[variant]}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "default", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl";
  const variants = {
    default: {
      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.75rem'
    },
    destructive: {
      background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 15px rgba(255, 53, 53, 0.4)',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.75rem'
    },
    outline: {
      border: '2px solid #16537e',
      background: 'transparent',
      color: '#16537e',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.75rem'
    },
  };
  return <button className={base} style={variants[variant]} {...props}>{children}</button>;
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
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Try to fetch from donations API (if it exists)
        const res = await fetch("http://localhost:5000/api/donations");
        if (res.ok) {
          const data = await res.json();
          setDonations(data || []);
        } else {
          // fallback to localStorage for older dev setups
          const storedDonations = localStorage.getItem("donations");
          setDonations(storedDonations ? JSON.parse(storedDonations) : []);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const moneyDonations = donations.filter((d) => d.type === "Money" || d.type === "money");
  const supplyDonations = donations.filter(
    (d) => d.type === "Supplies" || d.type === "supplies"
  );

  // Calculate totals
  const totalMoney = moneyDonations.reduce((sum, d) => {
    const amount = parseFloat(d.amount?.replace(/[^0-9.]/g, "") || 0);
    return sum + amount;
  }, 0);

  const totalSupplies = supplyDonations.reduce((sum, d) => {
    const quantity = parseInt(d.quantity || d.amount?.match(/\d+/)?.[0] || 0);
    return sum + quantity;
  }, 0);

  const uniqueDonors = new Set(donations.map((d) => d.donor || d.donor_name)).size;

  const handleExport = (type) => {
    toast({
      title: "Export Started",
      description: `Exporting ${type} donations to CSV...`,
    });
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
          Manage Donations
        </h1>
        <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
          Track and manage all donations
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Money</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading
                ? "..."
                : `PKR ${totalMoney.toLocaleString()}`}
            </div>
            <p className="text-xs text-gray-500">Total money donations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Supply Items</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : totalSupplies}
            </div>
            <p className="text-xs text-gray-500">Items donated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : uniqueDonors}
            </div>
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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Loading donations...
                      </TableCell>
                    </TableRow>
                  ) : moneyDonations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No money donations recorded yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    moneyDonations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">#{donation.id}</TableCell>
                        <TableCell>
                          {donation.donor || donation.donor_name || "Anonymous"}
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {donation.amount || `PKR ${donation.amount_value || 0}`}
                        </TableCell>
                        <TableCell>
                          {donation.date ||
                            (donation.created_at
                              ? new Date(donation.created_at).toLocaleDateString()
                              : "-")}
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">
                            {donation.status || "Completed"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Loading donations...
                      </TableCell>
                    </TableRow>
                  ) : supplyDonations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No supply donations recorded yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    supplyDonations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">#{donation.id}</TableCell>
                        <TableCell>
                          {donation.donor || donation.donor_name || "Anonymous"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {donation.amount ||
                              donation.item ||
                              `${donation.quantity || 0} items`}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {donation.date ||
                            (donation.created_at
                              ? new Date(donation.created_at).toLocaleDateString()
                              : "-")}
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">
                            {donation.status || "Collected"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
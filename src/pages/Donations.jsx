import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import { useToast } from "../hooks/use-toast";
import { DollarSign, Package, Heart, TrendingUp, Users, CheckCircle2, Loader2, X } from "lucide-react";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Global error suppression for network errors
if (typeof window !== 'undefined') {
  // Store original console methods
  const originalError = window.console.error.bind(console);
  const originalWarn = window.console.warn.bind(console);
  
  // Override console.error to filter network errors
  window.console.error = function(...args) {
    const errorString = args.map(arg => String(arg)).join(' ');
    if (
      errorString.includes('ERR_CONNECTION_REFUSED') ||
      errorString.includes('Failed to fetch') ||
      errorString.includes('net::ERR_CONNECTION_REFUSED') ||
      errorString.includes('localhost:5000/api/donations') ||
      errorString.includes('silentFetch')
    ) {
      return; // Suppress
    }
    originalError(...args);
  };
  
  // Override console.warn
  window.console.warn = function(...args) {
    const warnString = args.map(arg => String(arg)).join(' ');
    if (
      warnString.includes('ERR_CONNECTION_REFUSED') ||
      warnString.includes('Failed to fetch') ||
      warnString.includes('localhost:5000')
    ) {
      return; // Suppress
    }
    originalWarn(...args);
  };
  
  // Suppress unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message = reason?.message || String(reason || '');
    const stack = reason?.stack || '';
    
    if (
      message.includes('Failed to fetch') ||
      message.includes('ERR_CONNECTION_REFUSED') ||
      message.includes('NetworkError') ||
      stack.includes('silentFetch') ||
      stack.includes('localhost:5000')
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
}

// Silent fetch wrapper - completely suppresses errors
const silentFetch = async (url, options = {}) => {
  return new Promise((resolve) => {
    const controller = new AbortController();
    let timeoutId;
    
    // Set timeout
    if (options.signal) {
      // If signal already exists, don't create new timeout
      timeoutId = null;
    } else {
      timeoutId = setTimeout(() => {
        controller.abort();
        resolve(null);
      }, 5000);
    }
    
    const fetchOptions = {
      ...options,
      signal: controller.signal,
    };
    
    // Use a try-catch wrapper to prevent any errors from propagating
    (async () => {
      try {
        const response = await fetch(url, fetchOptions);
        if (timeoutId) clearTimeout(timeoutId);
        resolve(response);
      } catch (error) {
        if (timeoutId) clearTimeout(timeoutId);
        // Completely swallow the error
        resolve(null);
      }
    })();
  });
};

const Donations = () => {
  const { toast } = useToast();
  const [moneyData, setMoneyData] = useState({ 
    amount: "", 
    donor_name: "",
    method: "" 
  });
  const [supplyData, setSupplyData] = useState({ 
    item: "", 
    quantity: "",
    donor_name: "" 
  });
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalMoney: 0,
    totalSupplies: 0,
    totalDonors: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch donation statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await silentFetch(`${API_BASE}/api/donations`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (res && res.ok) {
          const donations = await res.json();
          
          const moneyDonations = donations.filter(
            (d) => d.type === "Money" || d.type === "money"
          );
          const supplyDonations = donations.filter(
            (d) => d.type === "Supplies" || d.type === "supplies" || d.type === "Supply"
          );

          const totalMoney = moneyDonations.reduce((sum, d) => {
            // Prioritize amount_value (numeric), fallback to parsing amount string
            let amount = 0;
            if (d.amount_value !== null && d.amount_value !== undefined) {
              amount = typeof d.amount_value === 'number' ? d.amount_value : parseFloat(d.amount_value) || 0;
            } else if (d.amount) {
              // Extract number from amount string like "PKR 1000" or "1000"
              const cleaned = String(d.amount).replace(/[^0-9.]/g, '');
              amount = parseFloat(cleaned) || 0;
            }
            return sum + (isNaN(amount) ? 0 : amount);
          }, 0);

          const totalSupplies = supplyDonations.reduce((sum, d) => {
            const quantity = parseInt(d.quantity || 0);
            return sum + quantity;
          }, 0);

          const uniqueDonors = new Set(
            donations.map((d) => d.donor || d.donor_name).filter(Boolean)
          ).size;

          setStats({
            totalMoney,
            totalSupplies,
            totalDonors: uniqueDonors,
          });
        } else {
          // Server not available - set default stats
          setStats({
            totalMoney: 0,
            totalSupplies: 0,
            totalDonors: 0,
          });
        }
      } catch (error) {
        // Silently handle all errors - server may not be running
        setStats({
          totalMoney: 0,
          totalSupplies: 0,
          totalDonors: 0,
        });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const handleMoneyDonation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const amountValue = parseFloat(moneyData.amount);
      const payload = {
        type: "Money",
        amount: `PKR ${moneyData.amount}`,
        donor_name: moneyData.donor_name || undefined,
      };
      
      // Only add amount_value if it's a valid number
      if (!isNaN(amountValue) && isFinite(amountValue)) {
        payload.amount_value = amountValue;
      }
      
      // Remove undefined values
      Object.keys(payload).forEach(key => {
        if (payload[key] === undefined) {
          delete payload[key];
        }
      });

      const res = await silentFetch(`${API_BASE}/api/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res && res.ok) {
        await res.json(); // Consume response but don't store
        const donorName = moneyData.donor_name ? `, ${moneyData.donor_name}` : '';
        const amountFormatted = parseFloat(moneyData.amount).toLocaleString();
        setToastMessage({
          type: "success",
          title: "🎉 Donation Successful!",
          description: `Thank you${donorName} for your generous donation of PKR ${amountFormatted}! Your kindness is making a real difference in people's lives. We truly appreciate your support! 🙏`,
        });
        // Auto-hide toast after 5 seconds
        setTimeout(() => setToastMessage(null), 5000);
        setMoneyData({ amount: "", donor_name: "", method: "" });
        
        // Refresh stats silently
        try {
          const statsRes = await silentFetch(`${API_BASE}/api/donations`);
          
          if (statsRes && statsRes.ok) {
            const donations = await statsRes.json();
            const moneyDonations = donations.filter(
              (d) => d.type === "Money" || d.type === "money"
            );
            const totalMoney = moneyDonations.reduce((sum, d) => {
              // Prioritize amount_value (numeric), fallback to parsing amount string
              let amount = 0;
              if (d.amount_value !== null && d.amount_value !== undefined) {
                amount = typeof d.amount_value === 'number' ? d.amount_value : parseFloat(d.amount_value) || 0;
              } else if (d.amount) {
                // Extract number from amount string like "PKR 1000" or "1000"
                const cleaned = String(d.amount).replace(/[^0-9.]/g, '');
                amount = parseFloat(cleaned) || 0;
              }
              return sum + (isNaN(amount) ? 0 : amount);
            }, 0);
            setStats((prev) => ({ ...prev, totalMoney }));
          }
        } catch (err) {
          // Silently handle stats refresh error
        }
      } else if (res) {
        // Server responded with error - show the actual error message
        const errorData = await res.json().catch(() => ({ message: `Bad Request (${res.status})` }));
        toast({
          title: "Donation Failed",
          description: errorData.message || `Server returned ${res.status}. Please check your input and try again.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Server Unavailable",
          description: "The donation server is currently unavailable. Please ensure the backend server is running on port 5000.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to the donation server. Please check that the backend server is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSupplyDonation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const quantityValue = parseInt(supplyData.quantity);
      const payload = {
        type: "Supplies",
        item: supplyData.item,
        quantity: isNaN(quantityValue) ? 0 : quantityValue,
        donor_name: supplyData.donor_name || undefined,
      };
      
      // Remove undefined values
      Object.keys(payload).forEach(key => {
        if (payload[key] === undefined) {
          delete payload[key];
        }
      });

      const res = await silentFetch(`${API_BASE}/api/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res && res.ok) {
        const donorName = supplyData.donor_name ? `, ${supplyData.donor_name}` : '';
        setToastMessage({
          type: "success",
          title: "🎉 Donation Recorded!",
          description: `Thank you${donorName} for donating ${supplyData.quantity} ${supplyData.item}! Your generosity is helping those in need. Our team will contact you within 24 hours to arrange pickup. We deeply appreciate your support! 🙏`,
        });
        // Auto-hide toast after 5 seconds
        setTimeout(() => setToastMessage(null), 5000);
        setSupplyData({ item: "", quantity: "", donor_name: "" });
        
        // Refresh stats silently
        try {
          const statsRes = await silentFetch(`${API_BASE}/api/donations`);
          
          if (statsRes && statsRes.ok) {
            const donations = await statsRes.json();
            const supplyDonations = donations.filter(
              (d) => d.type === "Supplies" || d.type === "supplies" || d.type === "Supply"
            );
            const totalSupplies = supplyDonations.reduce((sum, d) => {
              const quantity = parseInt(d.quantity || 0);
              return sum + quantity;
            }, 0);
            setStats((prev) => ({ ...prev, totalSupplies }));
          }
        } catch (err) {
          // Silently handle stats refresh error
        }
      } else {
        toast({
          title: "Server Unavailable",
          description: "The donation server is currently unavailable. Please ensure the backend server is running on port 5000.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to the donation server. Please check that the backend server is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{
      background: 'radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
    }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
      `}</style>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-fade-in-up">
          <div className={`rounded-xl shadow-2xl p-4 max-w-md backdrop-blur-sm border-2 ${
            toastMessage.type === "success" 
              ? "bg-gradient-to-br from-[#6aa84f]/90 to-[#38761d]/90 border-[#6aa84f] text-white" 
              : "bg-gradient-to-br from-[#f44336]/90 to-[#990000]/90 border-[#f44336] text-white"
          }`}>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4 className="font-black text-lg">{toastMessage.title}</h4>
                <p className="text-sm mt-1 font-medium">{toastMessage.description}</p>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="text-white/80 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="flex justify-center animate-float">
            <div className="p-5 rounded-full shadow-2xl" style={{
              background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
              boxShadow: '0 8px 25px rgba(106, 168, 79, 0.4)'
            }}>
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black" style={{
            background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 50%, #38761d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 20px rgba(22, 83, 126, 0.2)',
            lineHeight: '1.2',
            paddingBottom: '0.5rem'
          }}>
            Make a Donation
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed">
            Your generosity saves lives. Every contribution, big or small, makes a real difference 
            in our relief efforts. Join thousands of compassionate donors making an impact today.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-100" style={{
            borderColor: 'rgba(22, 83, 126, 0.3)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(22, 83, 126, 0.05) 100%)'
          }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-black" style={{ color: '#16537e' }}>Total Donations</CardTitle>
              <DollarSign className="h-6 w-6" style={{ color: '#16537e' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl md:text-4xl font-black" style={{ color: '#16537e' }}>
                {loadingStats ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  `PKR ${stats.totalMoney.toLocaleString()}`
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1 font-semibold">Money raised</p>
            </CardContent>
          </Card>

          <Card className="border-2 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-200" style={{
            borderColor: 'rgba(106, 168, 79, 0.3)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(106, 168, 79, 0.05) 100%)'
          }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-black" style={{ color: '#6aa84f' }}>Supplies Donated</CardTitle>
              <Package className="h-6 w-6" style={{ color: '#6aa84f' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl md:text-4xl font-black" style={{ color: '#6aa84f' }}>
                {loadingStats ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  `${stats.totalSupplies.toLocaleString()}`
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1 font-semibold">Items contributed</p>
            </CardContent>
          </Card>

          <Card className="border-2 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-300" style={{
            borderColor: 'rgba(244, 136, 54, 0.3)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(244, 136, 54, 0.05) 100%)'
          }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-black" style={{ color: '#f48836' }}>Generous Donors</CardTitle>
              <Users className="h-6 w-6" style={{ color: '#f48836' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl md:text-4xl font-black" style={{ color: '#f48836' }}>
                {loadingStats ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  `${stats.totalDonors}+`
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1 font-semibold">People helping</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Donation Form */}
        <Card className="shadow-2xl border-2 bg-white/90 backdrop-blur-sm animate-fade-in-up delay-400" style={{
          borderColor: 'rgba(106, 168, 79, 0.3)'
        }}>
          <CardHeader className="text-white rounded-t-xl" style={{
            background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
            boxShadow: '0 4px 15px rgba(22, 83, 126, 0.3)'
          }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-black">Your Generosity Saves Lives</CardTitle>
                <CardDescription className="text-white/90 font-medium">
                  Every contribution makes a difference in our relief operations
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 md:p-8" style={{ position: 'relative', overflow: 'visible' }}>
            <Tabs defaultValue="money" className="w-full" style={{ position: 'relative' }}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="money" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Donate Money
                </TabsTrigger>
                <TabsTrigger value="supplies" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Donate Supplies
                </TabsTrigger>
              </TabsList>

              <TabsContent value="money">
                <Card className="border-2 bg-white/90 backdrop-blur-sm shadow-xl" style={{
                  borderColor: 'rgba(22, 83, 126, 0.3)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(22, 83, 126, 0.05) 100%)'
                }}>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl md:text-3xl font-black" style={{
                      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      Money Donation
                    </CardTitle>
                    <CardDescription className="text-base md:text-lg text-gray-700 font-medium mt-2">
                      Make a financial contribution to support relief operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <form onSubmit={handleMoneyDonation} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="donor_name" className="text-base font-black text-gray-900">Your Name (Optional)</Label>
                        <Input
                          id="donor_name"
                          type="text"
                          placeholder="Enter your name"
                          value={moneyData.donor_name}
                          onChange={(e) =>
                            setMoneyData({ ...moneyData, donor_name: e.target.value })
                          }
                          className="h-12 border-2 rounded-xl focus:border-[#16537e] focus:ring-2 focus:ring-[#16537e]/20 transition-all duration-300 text-base"
                          style={{
                            borderColor: '#e5e7eb'
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-base font-black text-gray-900">Amount (PKR) *</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={moneyData.amount}
                          onChange={(e) =>
                            setMoneyData({ ...moneyData, amount: e.target.value })
                          }
                          required
                          min="1"
                          className="h-12 border-2 rounded-xl focus:border-[#16537e] focus:ring-2 focus:ring-[#16537e]/20 transition-all duration-300 text-base"
                          style={{
                            borderColor: '#e5e7eb'
                          }}
                        />
                        <div className="flex gap-2 flex-wrap mt-3">
                          {[500, 1000, 5000, 10000, 25000].map((amt) => (
                            <Button
                              key={amt}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setMoneyData({
                                  ...moneyData,
                                  amount: amt.toString(),
                                })
                              }
                              className="h-10 px-4 rounded-xl font-semibold border-2 transition-all duration-300 hover:scale-105"
                              style={{
                                borderColor: '#16537e',
                                color: '#16537e',
                                background: 'transparent'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(22, 83, 126, 0.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                              }}
                            >
                              PKR {amt.toLocaleString()}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 relative" style={{ zIndex: 1, marginBottom: '120px' }}>
                        <Label htmlFor="method" className="text-base font-black text-gray-900">Payment Method (Optional)</Label>
                        <div className="relative" style={{ zIndex: 10 }}>
                          <Select
                            value={moneyData.method}
                            onValueChange={(value) =>
                              setMoneyData({ ...moneyData, method: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jazzcash">JazzCash</SelectItem>
                              <SelectItem value="easypaisa">Easypaisa</SelectItem>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="card">Credit/Debit Card</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full text-white font-black rounded-xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl" 
                        size="lg"
                        disabled={loading}
                        style={{
                          background: loading ? 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)' : 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                          boxShadow: '0 8px 25px rgba(22, 83, 126, 0.4)',
                          opacity: loading ? 0.7 : 1
                        }}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Donate Now
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="supplies">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-xl">Supply Donation</CardTitle>
                    <CardDescription>
                      Contribute essential supplies for relief operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSupplyDonation} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="supply_donor_name">Your Name (Optional)</Label>
                        <Input
                          id="supply_donor_name"
                          type="text"
                          placeholder="Enter your name"
                          value={supplyData.donor_name}
                          onChange={(e) =>
                            setSupplyData({ ...supplyData, donor_name: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="item">Item Type *</Label>
                        <Select
                          value={supplyData.item}
                          onValueChange={(value) =>
                            setSupplyData({ ...supplyData, item: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select item type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Food Packages">Food Packages</SelectItem>
                            <SelectItem value="Water Bottles">Water Bottles</SelectItem>
                            <SelectItem value="Medical Kits">Medical Kits</SelectItem>
                            <SelectItem value="Blankets">Blankets</SelectItem>
                            <SelectItem value="Clothes">Clothes</SelectItem>
                            <SelectItem value="Tents">Tents</SelectItem>
                            <SelectItem value="Hygiene Kits">Hygiene Kits</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                          id="quantity"
                          type="number"
                          placeholder="Enter quantity"
                          value={supplyData.quantity}
                          onChange={(e) =>
                            setSupplyData({
                              ...supplyData,
                              quantity: e.target.value,
                            })
                          }
                          required
                          min="1"
                        />
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-blue-900">
                              Delivery Information
                            </p>
                            <p className="text-xs text-blue-700 mt-1">
                              Our team will contact you within 24 hours to arrange pickup
                              or delivery of your donated supplies. Thank you for your generosity!
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full text-white font-black rounded-xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl" 
                        size="lg"
                        disabled={loading}
                        style={{
                          background: loading ? 'linear-gradient(135deg, #6aa84f 0%, #38761d 100%)' : 'linear-gradient(135deg, #6aa84f 0%, #38761d 100%)',
                          boxShadow: '0 8px 25px rgba(106, 168, 79, 0.4)',
                          opacity: loading ? 0.7 : 1
                        }}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Package className="mr-2 h-4 w-4" />
                            Register Donation
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Additional Info Card */}
        <Card className="border-2 bg-white/90 backdrop-blur-sm shadow-xl animate-fade-in-up delay-500" style={{
          borderColor: 'rgba(22, 83, 126, 0.3)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(22, 83, 126, 0.05) 100%)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-black" style={{
              background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              <TrendingUp className="h-6 w-6" style={{ color: '#16537e' }} />
              How Your Donations Help
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2" style={{
                borderColor: 'rgba(22, 83, 126, 0.2)'
              }}>
                <h4 className="font-black text-lg mb-2" style={{ color: '#16537e' }}>Emergency Response</h4>
                <p className="text-sm text-gray-700 font-medium">
                  Funds help us respond immediately to disasters and emergencies
                </p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2" style={{
                borderColor: 'rgba(106, 168, 79, 0.2)'
              }}>
                <h4 className="font-black text-lg mb-2" style={{ color: '#6aa84f' }}>Essential Supplies</h4>
                <p className="text-sm text-gray-700 font-medium">
                  Your donated items provide critical support to affected communities
                </p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2" style={{
                borderColor: 'rgba(244, 136, 54, 0.2)'
              }}>
                <h4 className="font-black text-lg mb-2" style={{ color: '#f48836' }}>Long-term Impact</h4>
                <p className="text-sm text-gray-700 font-medium">
                  Contributions support recovery and rebuilding efforts for months to come
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Donations;


import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/Tabs";
import { useToast } from "../../hooks/use-toast";
import { DollarSign, Package, Heart } from "lucide-react";

// Reusable styled components matching admin portal
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

const Donations = () => {
  const { toast } = useToast();
  const [moneyData, setMoneyData] = useState({ amount: "", method: "" });
  const [supplyData, setSupplyData] = useState({ item: "", quantity: "" });

  const handleMoneyDonation = (e) => {
    e.preventDefault();
    toast({
      title: "Donation Successful",
      description: `Thank you for donating PKR ${moneyData.amount}!`,
    });
    setMoneyData({ amount: "", method: "" });
  };

  const handleSupplyDonation = (e) => {
    e.preventDefault();
    toast({
      title: "Donation Recorded",
      description: `Thank you for donating ${supplyData.quantity} ${supplyData.item}!`,
    });
    setSupplyData({ item: "", quantity: "" });
  };

  return (
    <div 
      className="p-6 space-y-6 max-w-2xl mx-auto relative overflow-hidden min-h-screen"
      style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
      }}
    >
      <div className="animate-fade-in">
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
          Make a Donation
        </h1>
        <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
          Support relief efforts with money or supplies
        </p>
      </div>

      <Card 
        className="border-2 animate-slide-up" 
        style={{ 
          animationDelay: '0.1s',
          borderColor: '#6aa84f',
          background: 'linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.05) 100%)'
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            <div>
              <CardTitle>Your Generosity Saves Lives</CardTitle>
              <CardDescription>
                Every contribution makes a difference
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="money" className="w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger 
            value="money"
            className="font-bold transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg"
            style={{
              color: '#16537e'
            }}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Donate Money
          </TabsTrigger>
          <TabsTrigger 
            value="supplies"
            className="font-bold transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg"
            style={{
              color: '#16537e'
            }}
          >
            <Package className="h-4 w-4 mr-2" />
            Donate Supplies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="money" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Money Donation</CardTitle>
              <CardDescription>
                Make a financial contribution to support relief operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMoneyDonation} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="font-bold" style={{ color: '#16537e' }}>Amount (PKR) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={moneyData.amount}
                    onChange={(e) =>
                      setMoneyData({ ...moneyData, amount: e.target.value })
                    }
                    required
                    className="font-semibold"
                  />
                  <div className="flex gap-2 flex-wrap mt-2">
                    {[500, 1000, 5000, 10000].map((amt) => (
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
                        className="font-bold transition-all duration-300 hover:scale-105"
                        style={{
                          border: '2px solid #16537e',
                          background: 'transparent',
                          color: '#16537e',
                        }}
                      >
                        PKR {amt.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method" className="font-bold" style={{ color: '#16537e' }}>Payment Method *</Label>
                  <Select
                    value={moneyData.method}
                    onValueChange={(value) =>
                      setMoneyData({ ...moneyData, method: value })
                    }
                  >
                    <SelectTrigger className="font-semibold">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jazzcash">JazzCash</SelectItem>
                      <SelectItem value="easypaisa">Easypaisa</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  style={{
                    background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
                  }}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Donate Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplies" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Supply Donation</CardTitle>
              <CardDescription>
                Contribute essential supplies for relief operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSupplyDonation} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="item" className="font-bold" style={{ color: '#16537e' }}>Item Type *</Label>
                  <Select
                    value={supplyData.item}
                    onValueChange={(value) =>
                      setSupplyData({ ...supplyData, item: value })
                    }
                  >
                    <SelectTrigger className="font-semibold">
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food Packages</SelectItem>
                      <SelectItem value="water">Water Bottles</SelectItem>
                      <SelectItem value="medical">Medical Kits</SelectItem>
                      <SelectItem value="blankets">Blankets</SelectItem>
                      <SelectItem value="clothes">Clothes</SelectItem>
                      <SelectItem value="tents">Tents</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="font-bold" style={{ color: '#16537e' }}>Quantity *</Label>
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
                    className="font-semibold"
                  />
                </div>

                <div 
                  className="p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(22, 83, 126, 0.05) 100%)',
                    borderColor: 'rgba(22, 83, 126, 0.3)'
                  }}
                >
                  <p className="text-sm font-black" style={{ color: '#16537e' }}>
                    Delivery Information
                  </p>
                  <p className="text-xs font-semibold mt-1" style={{ color: '#666' }}>
                    Our team will contact you within 24 hours to arrange pickup
                    or delivery of your donated supplies.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  style={{
                    background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
                  }}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Register Donation
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardHeader>
          <CardTitle>Impact of Your Donations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div 
            className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.05) 100%)',
              border: '2px solid rgba(106, 168, 79, 0.2)'
            }}
          >
            <span className="text-sm font-bold" style={{ color: '#16537e' }}>Total Donated This Month</span>
            <span className="font-black text-xl" style={{ color: '#6aa84f' }}>PKR 15,000</span>
          </div>
          <div 
            className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(22, 83, 126, 0.05) 100%)',
              border: '2px solid rgba(22, 83, 126, 0.2)'
            }}
          >
            <span className="text-sm font-bold" style={{ color: '#16537e' }}>Supplies Contributed</span>
            <span className="font-black text-xl" style={{ color: '#16537e' }}>45 Items</span>
          </div>
          <div 
            className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.05) 100%)',
              border: '2px solid rgba(106, 168, 79, 0.2)'
            }}
          >
            <span className="text-sm font-bold" style={{ color: '#16537e' }}>People Helped</span>
            <span className="font-black text-xl" style={{ color: '#6aa84f' }}>120+</span>
          </div>
        </CardContent>
      </Card>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Donations;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Input from "../../components/ui/input";
import Label from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useState } from "react";
import { useToast } from "../../hooks/use-toast";
import { DollarSign, Package, Heart } from "lucide-react";

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
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Make a Donation</h1>
        <p className="text-muted-foreground mt-1">
          Support relief efforts with money or supplies
        </p>
      </div>

      <Card className="border-success">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-success" />
            <div>
              <CardTitle>Your Generosity Saves Lives</CardTitle>
              <CardDescription>
                Every contribution makes a difference
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="money" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="money">
            <DollarSign className="h-4 w-4 mr-2" />
            Donate Money
          </TabsTrigger>
          <TabsTrigger value="supplies">
            <Package className="h-4 w-4 mr-2" />
            Donate Supplies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="money">
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
                  <Label htmlFor="amount">Amount (PKR) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={moneyData.amount}
                    onChange={(e) =>
                      setMoneyData({ ...moneyData, amount: e.target.value })
                    }
                    required
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
                      >
                        PKR {amt.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method">Payment Method *</Label>
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
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Donate Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplies">
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
                  <Label htmlFor="item">Item Type *</Label>
                  <Select
                    value={supplyData.item}
                    onValueChange={(value) =>
                      setSupplyData({ ...supplyData, item: value })
                    }
                  >
                    <SelectTrigger>
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
                  />
                </div>

                <div className="p-4 bg-info/10 border border-info rounded-lg">
                  <p className="text-sm font-semibold text-info">
                    Delivery Information
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Our team will contact you within 24 hours to arrange pickup
                    or delivery of your donated supplies.
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Package className="mr-2 h-4 w-4" />
                  Register Donation
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Impact of Your Donations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">Total Donated This Month</span>
            <span className="font-bold">PKR 15,000</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">Supplies Contributed</span>
            <span className="font-bold">45 Items</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">People Helped</span>
            <span className="font-bold">120+</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Donations;

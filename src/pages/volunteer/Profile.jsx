import DashboardLayout from "../../layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { input } from "../../components/ui/input";
import { label } from "../../components/ui/label";
import { textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";
import { useState } from "react";
import { useToast } from "../../hooks/use-toast";
import { User, Shield, Bell } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "Ali Hassan",
    email: "ali@example.com",
    phone: "+92 300 1234567",
    skills: "Medical Aid",
    experience: "3 years",
    available: true,
    notifications: true,
    bio: "Experienced medical volunteer with passion for helping communities during emergencies.",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <DashboardLayout role="volunteer">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your volunteer profile and preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Personal Information</CardTitle>
            </div>
            <CardDescription>Update your basic profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself..."
                />
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Volunteer Skills & Availability</CardTitle>
            </div>
            <CardDescription>
              Update your skills and availability status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="skills">Primary Skills *</label>
              <Select
                value={formData.skills}
                onValueChange={(value) =>
                  setFormData({ ...formData, skills: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medical Aid">Medical Aid</SelectItem>
                  <SelectItem value="Rescue Operations">
                    Rescue Operations
                  </SelectItem>
                  <SelectItem value="Food Distribution">
                    Food Distribution
                  </SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
                  <SelectItem value="Communication">Communication</SelectItem>
                  <SelectItem value="Technical Support">
                    Technical Support
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="experience">Experience Level</label>
              <Select
                value={formData.experience}
                onValueChange={(value) =>
                  setFormData({ ...formData, experience: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Less than 1 year">
                    Less than 1 year
                  </SelectItem>
                  <SelectItem value="1-2 years">1-2 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="5+ years">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">Available for Assignments</p>
                <p className="text-sm text-muted-foreground">
                  Toggle your availability status
                </p>
              </div>
              <Switch
                checked={formData.available}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, available: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notification Preferences</CardTitle>
            </div>
            <CardDescription>Manage how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts about new assignments
                </p>
              </div>
              <Switch
                checked={formData.notifications}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, notifications: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get email updates about incidents
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">SMS Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Receive urgent alerts via SMS
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

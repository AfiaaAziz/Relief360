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
import Textarea from "../../components/ui/textarea";
import { useState } from "react";
import { useToast } from "../../hooks/use-toast";
import { MessageSquare, Send } from "lucide-react";

const Feedback = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. We'll review it shortly.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Feedback</h1>
          <p className="text-muted-foreground mt-1">
            Help us improve Relief360 with your suggestions
          </p>
        </div>

        <Card className="border-success">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-success" />
              <div>
                <CardTitle>We Value Your Feedback</CardTitle>
                <CardDescription>
                  Your input helps us serve you better
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Share Your Thoughts</CardTitle>
            <CardDescription>
              Tell us about your experience or suggest improvements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Share your feedback, suggestions, or concerns..."
                  rows={8}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Other Ways to Reach Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold">Email Support</p>
                <p className="text-sm text-muted-foreground">
                  support@relief360.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-semibold">Help Center</p>
                <p className="text-sm text-muted-foreground">
                  Visit our FAQ and documentation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;

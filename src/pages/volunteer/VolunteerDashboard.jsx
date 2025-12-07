import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockStats, mockIncidents } from "../../utils/mockData";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";

const VolunteerDashboard = () => {
  const stats = mockStats.volunteer;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Welcome, Ali Hassan</h1>
        <p className="text-muted-foreground mt-1">
          Thank you for your service to the community
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Assignments
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assignedIncidents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedIncidents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hours Volunteered
            </CardTitle>
            <Clock className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hoursVolunteered}h</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Donations Received
            </CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.donationsReceived}</div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Emergency Alerts</CardTitle>
          <CardDescription>
            Latest incidents requiring volunteer support
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-emergency bg-emergency/5 rounded">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">Critical: Flood Relief - Lahore</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Urgent need for rescue volunteers
                </p>
              </div>
              <Button size="sm">Respond</Button>
            </div>
          </div>
          <div className="p-4 border-l-4 border-warning bg-warning/5 rounded">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">
                  High: Medical Supplies - Karachi
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Distribution assistance needed
                </p>
              </div>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1">
        {/* Current Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Current Assignments</CardTitle>
            <CardDescription>Active incidents assigned to you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockIncidents
              .filter((i) => i.status === "In Progress")
              .map((incident) => (
                <div
                  key={incident.id}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{incident.type}</p>
                    <Badge variant="secondary">{incident.severity}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {incident.location}
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} />
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Mark as Completed
                  </Button>
                </div>
              ))}
            <Link to="/volunteer-dashboard/assignments">
              <Button variant="outline" className="w-full">
                View All Assignments
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>This Month's Impact</CardTitle>
            <CardDescription>Your contribution summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm">Incidents Resolved</span>
              </div>
              <span className="font-bold">8</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-info" />
                <span className="text-sm">Hours This Month</span>
              </div>
              <span className="font-bold">24h</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Success Rate</span>
              </div>
              <span className="font-bold">95%</span>
            </div>
            <div className="p-4 bg-success/10 border border-success rounded-lg text-center">
              <p className="text-sm text-success font-semibold">
                Excellent Performance!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Keep up the great work
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerDashboard;

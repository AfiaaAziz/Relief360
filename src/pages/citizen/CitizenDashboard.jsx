import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  AlertCircle,
  Hospital,
  Shield,
  Phone,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockStats, mockIncidents } from "../../utils/mockData";
import { Badge } from "../../components/ui/Badge";

const CitizenDashboard = () => {
  const stats = mockStats.citizen;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-4">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Welcome, Ahmed Khan</h1>
          <p className="text-muted-foreground mt-1">
            Stay safe and informed with Relief360
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Incidents
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalIncidents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingIncidents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.resolvedIncidents}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Alerts
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-emergency" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeAlerts}</div>
            </CardContent>
          </Card>
        </div>

        {/* Latest Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Emergency Alerts</CardTitle>
            <CardDescription>
              Stay informed about ongoing emergencies in your area
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-l-4 border-emergency bg-emergency/5 rounded">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Flood Warning - Lahore</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Heavy rainfall expected. Stay alert and avoid low-lying
                    areas.
                  </p>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>
            </div>
            <div className="p-4 border-l-4 border-warning bg-warning/5 rounded">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Heatwave Alert - Multan</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    High temperatures expected. Stay hydrated and avoid sun
                    exposure.
                  </p>
                </div>
                <Badge className="bg-warning text-warning-foreground">
                  High
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link to="/citizen-dashboard/report">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <AlertCircle className="h-8 w-8 text-emergency mb-2" />
                  <CardTitle className="text-lg">Report Incident</CardTitle>
                  <CardDescription>
                    Submit a new emergency report
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/citizen-dashboard/hospitals">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Hospital className="h-8 w-8 text-info mb-2" />
                  <CardTitle className="text-lg">Find Hospitals</CardTitle>
                  <CardDescription>
                    Locate nearby medical facilities
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/citizen-dashboard/safety">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Shield className="h-8 w-8 text-success mb-2" />
                  <CardTitle className="text-lg">Safety Tips</CardTitle>
                  <CardDescription>Learn emergency procedures</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/citizen-dashboard/contacts">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Phone className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle className="text-lg">Emergency Contacts</CardTitle>
                  <CardDescription>Quick access to hotlines</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle>Your Recent Incidents</CardTitle>
            <CardDescription>
              Track the status of your reported incidents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockIncidents.slice(0, 3).map((incident) => (
                <div
                  key={incident.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{incident.type}</p>
                    <p className="text-sm text-muted-foreground">
                      ID: {incident.id} • {incident.date}
                    </p>
                  </div>
                  <Badge
                    variant={
                      incident.status === "Resolved" ? "default" : "secondary"
                    }
                  >
                    {incident.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Link to="/citizen-dashboard/incidents">
              <Button variant="outline" className="w-full mt-4">
                View All Incidents
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CitizenDashboard;

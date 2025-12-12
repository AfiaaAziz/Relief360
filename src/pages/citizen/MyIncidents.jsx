import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { mockIncidents } from "../../utils/mockData";
import { Eye } from "lucide-react";
import { useState } from "react";

const MyIncidents = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "destructive";
      case "high":
        return "default";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "default";
      case "in progress":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleViewTimeline = (incident) => {
    setSelectedIncident(incident);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Incidents</h1>
          <p className="text-muted-foreground mt-1">
            Track all your reported incidents
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Incident History</CardTitle>
            <CardDescription>
              View details and status of your reported incidents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">{incident.id}</TableCell>
                    <TableCell>{incident.type}</TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{incident.date}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewTimeline(incident)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Timeline
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Incident Timeline - {selectedIncident?.id}
              </DialogTitle>
              <DialogDescription>
                Track the progress of your incident report
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <div className="w-0.5 h-12 bg-success" />
                </div>
                <div className="pb-4">
                  <p className="font-semibold">Incident Reported</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedIncident?.date} 10:30 AM
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <div className="w-0.5 h-12 bg-success" />
                </div>
                <div className="pb-4">
                  <p className="font-semibold">Volunteer Assigned</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedIncident?.date} 11:15 AM
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-info" />
                  <div className="w-0.5 h-12 bg-muted" />
                </div>
                <div className="pb-4">
                  <p className="font-semibold">Response Team Dispatched</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedIncident?.date} 12:00 PM
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground">
                    Awaiting Resolution
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyIncidents;

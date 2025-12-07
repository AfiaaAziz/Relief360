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
  dialog,
  dialogContent,
  dialogDescription,
  dialogHeader,
  dialogTitle,
  dialogTrigger,
} from "../../components/ui/dialog";
import { mockIncidents } from "../../utils/mockData";
import { Eye, CheckCircle, MapPin, Calendar } from "lucide-react";

const Assignments = () => {
  const handleAccept = (id) => {
    alert(`Assignment ${id} has been accepted.`);
  };

  const handleComplete = (id) => {
    alert(`Assignment ${id} has been completed.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Incident Assignments</h1>
        <p className="text-muted-foreground mt-1">
          Manage your assigned emergency incidents
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Assignments</CardTitle>
          <CardDescription>
            View and manage incidents assigned to you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Location</TableHead>
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
                    <Badge
                      variant={
                        incident.severity === "Critical"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {incident.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>{incident.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        incident.status === "Resolved" ? "default" : "secondary"
                      }
                    >
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <dialog>
                        <dialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </dialogTrigger>
                        <dialogContent className="max-w-2xl">
                          <dialogHeader>
                            <dialogTitle>
                              Incident Details - {incident.id}
                            </dialogTitle>
                            <dialogDescription>
                              Complete information about this incident
                            </dialogDescription>
                          </dialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                  Type
                                </p>
                                <p className="text-lg font-semibold">
                                  {incident.type}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                  Severity
                                </p>
                                <Badge
                                  variant={
                                    incident.severity === "Critical"
                                      ? "destructive"
                                      : "default"
                                  }
                                >
                                  {incident.severity}
                                </Badge>
                              </div>
                              <div className="col-span-2">
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                  Location
                                </p>
                                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{incident.location}</span>
                                </div>
                              </div>
                              <div className="col-span-2">
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                  Reported On
                                </p>
                                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{incident.date}</span>
                                </div>
                              </div>
                              <div className="col-span-2">
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                  Description
                                </p>
                                <p className="text-sm p-3 bg-muted rounded-lg">
                                  Emergency situation requiring immediate
                                  attention. Citizen safety is at risk. Please
                                  respond as soon as possible with necessary
                                  equipment and resources.
                                </p>
                              </div>
                            </div>
                          </div>
                        </dialogContent>
                      </dialog>
                      {incident.status === "Pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleAccept(incident.id)}
                        >
                          Accept
                        </Button>
                      )}
                      {incident.status === "In Progress" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleComplete(incident.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assignments;

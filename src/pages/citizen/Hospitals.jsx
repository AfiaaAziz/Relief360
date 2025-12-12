import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Building2 } from "lucide-react";
import { useState, useEffect } from "react";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/hospitals?status=approved"
        );
        if (response.ok) {
          const data = await response.json();
          setHospitals(data);
        } else {
          console.error("Failed to fetch hospitals");
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Partner Hospitals</h1>
          <p className="text-muted-foreground mt-1">
            View available hospitals and their resources
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Hospitals
              </CardTitle>
              <Building2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hospitals.length}</div>
              <p className="text-xs text-muted-foreground">Active hospitals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
              <Building2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hospitals.reduce((sum, h) => sum + (h.total_beds || 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">Available beds</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Emergency Beds
              </CardTitle>
              <Building2 className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hospitals.reduce((sum, h) => sum + (h.emergency_beds || 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Emergency capacity
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hospital Profiles */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Hospital Profiles</h2>
          <p className="text-muted-foreground mb-6">
            See how hospitals in our network share their capacity and coordinate
            during emergencies.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((hospital) => {
              const availability =
                hospital.total_beds > 200 ? "Available" : "Limited";
              const availabilityVariant =
                availability === "Available" ? "default" : "secondary";
              return (
                <Card key={hospital.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {hospital.hospital_name}
                    </CardTitle>
                    <CardDescription>{hospital.address}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {hospital.phone}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant={availabilityVariant}>
                        {availability}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {hospital.total_beds}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Beds
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {hospital.icu_beds}
                        </div>
                        <div className="text-xs text-muted-foreground">ICU</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">
                          {hospital.emergency_beds}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Emergency
                        </div>
                      </div>
                    </div>
                    {hospital.services && hospital.services.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Specialized Services:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {hospital.services.map((service, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;

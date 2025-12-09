import React, { useState, useEffect } from "react";
import { Building2 } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 border-b border-gray-100 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-green-100 text-green-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

const Table = ({ children }) => (
  <div className="w-full overflow-auto">
    <table className="w-full text-sm">{children}</table>
  </div>
);

const TableHeader = ({ children }) => <thead>{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children }) => <tr className="border-b">{children}</tr>;
const TableHead = ({ children }) => (
  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
    {children}
  </th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle ${className}`}>{children}</td>
);

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
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Partner Hospitals</h1>
        <p className="text-gray-500 mt-1">
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
            <p className="text-xs text-gray-500">Active hospitals</p>
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
            <p className="text-xs text-gray-500">Available beds</p>
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
            <p className="text-xs text-gray-500">Emergency capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Hospital Profiles */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Hospital Profiles</h2>
        <p className="text-gray-500 mb-6">
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
              <Card key={hospital.id} className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {hospital.hospital_name}
                    </h3>
                    <p className="text-sm text-gray-500">{hospital.address}</p>
                    <p className="text-sm text-gray-600">{hospital.phone}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant={availabilityVariant}>{availability}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {hospital.total_beds}
                      </div>
                      <div className="text-xs text-gray-500">Beds</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {hospital.icu_beds}
                      </div>
                      <div className="text-xs text-gray-500">ICU</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">
                        {hospital.emergency_beds}
                      </div>
                      <div className="text-xs text-gray-500">Emergency</div>
                    </div>
                  </div>
                  {hospital.services && hospital.services.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
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
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hospitals;

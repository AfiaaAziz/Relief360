import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { mockEmergencyContacts } from "../../utils/mockData";
import { Phone, Ambulance, Shield, Flame, Heart } from "lucide-react";

const iconMap = {
  Police: Shield,
  Rescue: Ambulance,
  Fire: Flame,
  Ambulance: Heart,
  Default: Phone,
};

const EmergencyContacts = () => {
  const getIcon = (name) => {
    for (const key in iconMap) {
      if (name.toLowerCase().includes(key.toLowerCase())) {
        return iconMap[key];
      }
    }
    return iconMap.Default;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Emergency Contacts</h1>
          <p className="text-muted-foreground mt-1">
            Quick access to essential emergency hotlines
          </p>
        </div>

        <Card className="border-emergency">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-emergency" />
              <div>
                <CardTitle className="text-emergency">
                  Emergency Hotlines
                </CardTitle>
                <CardDescription>
                  Call these numbers immediately during emergencies
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {mockEmergencyContacts.map((contact, index) => {
            const Icon = getIcon(contact.name);
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emergency/10 rounded-lg">
                        <Icon className="h-6 w-6 text-emergency" />
                      </div>
                      <div>
                        <CardTitle>{contact.name}</CardTitle>
                        <CardDescription className="text-lg font-bold text-emergency">
                          {contact.number}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      className="rounded-full"
                      onClick={() => window.open(`tel:${contact.number}`)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-warning/10 border-l-4 border-warning rounded">
              <p className="font-semibold text-warning">
                When Calling Emergency Services
              </p>
              <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                <li>Stay calm and speak clearly</li>
                <li>Provide your exact location</li>
                <li>Describe the emergency situation</li>
                <li>Follow the operator's instructions</li>
                <li>Do not hang up until told to do so</li>
              </ul>
            </div>
            <div className="p-4 bg-info/10 border-l-4 border-info rounded">
              <p className="font-semibold text-info">
                Non-Emergency Situations
              </p>
              <p className="mt-2 text-sm">
                For non-urgent matters, consider visiting your local police
                station or hospital directly. Reserve emergency hotlines for
                critical situations only.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyContacts;

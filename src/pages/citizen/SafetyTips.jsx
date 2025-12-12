import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { safetyTips } from "../../utils/mockData";
import {
  Shield,
  Flame,
  Droplets,
  ZapOff,
  AlertTriangle,
  Sun,
} from "lucide-react";

const iconMap = {
  Earthquake: ZapOff,
  Flood: Droplets,
  Fire: Flame,
  "Terror Attack": AlertTriangle,
  Heatwave: Sun,
};

const colorMap = {
  Earthquake: "text-emergency",
  Flood: "text-info",
  Fire: "text-destructive",
  "Terror Attack": "text-warning",
  Heatwave: "text-orange-500",
};

const SafetyTips = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Safety Tips</h1>
          <p className="text-muted-foreground mt-1">
            Essential emergency preparedness guidelines
          </p>
        </div>

        <Card className="border-success">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-success" />
              <div>
                <CardTitle>Emergency Preparedness Guide</CardTitle>
                <CardDescription>
                  Learn how to stay safe during different types of emergencies
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Accordion type="single" collapsible className="space-y-4">
          {Object.entries(safetyTips).map(([category, tips]) => {
            const Icon = iconMap[category] || Shield;
            const colorClass = colorMap[category] || "text-primary";

            return (
              <Card key={category}>
                <AccordionItem value={category} className="border-none">
                  <CardHeader>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-muted`}>
                          <Icon className={`h-6 w-6 ${colorClass}`} />
                        </div>
                        <div className="text-left">
                          <CardTitle>{category}</CardTitle>
                          <CardDescription>
                            Safety guidelines and precautions
                          </CardDescription>
                        </div>
                      </div>
                    </AccordionTrigger>
                  </CardHeader>
                  <AccordionContent>
                    <CardContent className="pt-0">
                      <ul className="space-y-3">
                        {tips.map((tip, index) => (
                          <li
                            key={index}
                            className="flex gap-3 p-3 bg-muted rounded-lg"
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <p className="text-sm">{tip}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </AccordionContent>
                </AccordionItem>
              </Card>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default SafetyTips;

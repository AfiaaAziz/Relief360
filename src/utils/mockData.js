export const mockIncidents = [
  {
    id: "INC001",
    type: "Flood",
    severity: "High",
    date: "2024-12-01",
    status: "In Progress",
    location: "Lahore",
  },
  {
    id: "INC002",
    type: "Fire",
    severity: "Critical",
    date: "2024-11-28",
    status: "Resolved",
    location: "Karachi",
  },
  {
    id: "INC003",
    type: "Earthquake",
    severity: "Medium",
    date: "2024-11-25",
    status: "Pending",
    location: "Islamabad",
  },
  {
    id: "INC004",
    type: "Heatwave",
    severity: "Low",
    date: "2024-11-20",
    status: "In Progress",
    location: "Multan",
  },
];

export const mockCitizens = [
  {
    id: 1,
    name: "Ahmed Khan",
    email: "ahmed@example.com",
    incidents: 3,
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Fatima Ali",
    email: "fatima@example.com",
    incidents: 1,
    joinDate: "2024-03-20",
  },
  {
    id: 3,
    name: "Hassan Raza",
    email: "hassan@example.com",
    incidents: 5,
    joinDate: "2024-02-10",
  },
  {
    id: 4,
    name: "Ayesha Malik",
    email: "ayesha@example.com",
    incidents: 2,
    joinDate: "2024-04-05",
  },
];

export const mockVolunteers = [
  {
    id: 1,
    name: "Ali Hassan",
    email: "ali@example.com",
    skills: "Medical Aid",
    available: true,
    assigned: 3,
  },
  {
    id: 2,
    name: "Sara Ahmed",
    email: "sara@example.com",
    skills: "Rescue Operations",
    available: true,
    assigned: 5,
  },
  {
    id: 3,
    name: "Bilal Khan",
    email: "bilal@example.com",
    skills: "Food Distribution",
    available: false,
    assigned: 2,
  },
  {
    id: 4,
    name: "Nida Malik",
    email: "nida@example.com",
    skills: "Medical Aid",
    available: true,
    assigned: 4,
  },
];

export const mockDonations = [
  {
    id: 1,
    donor: "Ahmed Khan",
    type: "Money",
    amount: "PKR 5,000",
    date: "2024-12-01",
  },
  {
    id: 2,
    donor: "Fatima Ali",
    type: "Supplies",
    amount: "Food Packages (20)",
    date: "2024-11-30",
  },
  {
    id: 3,
    donor: "Hassan Raza",
    type: "Money",
    amount: "PKR 10,000",
    date: "2024-11-28",
  },
  {
    id: 4,
    donor: "Ayesha Malik",
    type: "Supplies",
    amount: "Medical Kits (15)",
    date: "2024-11-25",
  },
];

export const mockFeedback = [
  {
    id: 1,
    name: "Ahmed Khan",
    email: "ahmed@example.com",
    message: "Great response time!",
    date: "2024-12-01",
    resolved: false,
  },
  {
    id: 2,
    name: "Sara Ahmed",
    email: "sara@example.com",
    message: "Need more volunteers in my area.",
    date: "2024-11-30",
    resolved: true,
  },
  {
    id: 3,
    name: "Hassan Raza",
    email: "hassan@example.com",
    message: "Hospital info was very helpful.",
    date: "2024-11-28",
    resolved: false,
  },
];

export const mockEmergencyContacts = [
  { name: "Police", number: "15" },
  { name: "Rescue", number: "1122" },
  { name: "Ambulance", number: "1122" },
  { name: "Edhi Ambulance", number: "115" },
  { name: "Chhipa Ambulance", number: "1020" },
  { name: "Fire Brigade", number: "1122" },
];

export const safetyTips = {
  Earthquake: [
    "Drop, Cover, and Hold On during shaking",
    "Stay away from windows and heavy furniture",
    "If outdoors, move to an open area",
    "After shaking stops, check for injuries and damage",
    "Be prepared for aftershocks",
  ],
  Flood: [
    "Move to higher ground immediately",
    "Do not walk or drive through flood waters",
    "Listen to local authorities for evacuation orders",
    "Keep emergency supplies ready",
    "Avoid contact with electrical equipment if wet",
  ],
  Fire: [
    "Alert others and evacuate immediately",
    "Stay low to avoid smoke inhalation",
    "Feel doors before opening - if hot, use another exit",
    "Never use elevators during a fire",
    "Call fire brigade once you are safe",
  ],
  "Terror Attack": [
    "Run to safety if possible",
    "Hide if escape is not possible",
    "Fight as a last resort",
    "Call emergency services when safe",
    "Follow instructions from authorities",
  ],
  Heatwave: [
    "Stay hydrated - drink plenty of water",
    "Avoid outdoor activities during peak heat",
    "Wear light, loose-fitting clothing",
    "Check on elderly neighbors and relatives",
    "Never leave children or pets in vehicles",
  ],
};

export const mockChartData = {
  incidentTrends: [
    { month: "Jan", incidents: 12 },
    { month: "Feb", incidents: 19 },
    { month: "Mar", incidents: 15 },
    { month: "Apr", incidents: 25 },
    { month: "May", incidents: 22 },
    { month: "Jun", incidents: 30 },
    { month: "Jul", incidents: 28 },
    { month: "Aug", incidents: 35 },
    { month: "Sep", incidents: 32 },
    { month: "Oct", incidents: 40 },
    { month: "Nov", incidents: 38 },
    { month: "Dec", incidents: 42 },
  ],
  severityDistribution: [
    { name: "Low", value: 25 },
    { name: "Medium", value: 35 },
    { name: "High", value: 30 },
    { name: "Critical", value: 10 },
  ],
  volunteerActivity: [
    { month: "Jan", active: 45 },
    { month: "Feb", active: 52 },
    { month: "Mar", active: 48 },
    { month: "Apr", active: 60 },
    { month: "May", active: 55 },
    { month: "Jun", active: 65 },
  ],
};

export const mockStats = {
  citizen: {
    totalIncidents: 3,
    pendingIncidents: 1,
    resolvedIncidents: 2,
    activeAlerts: 2,
  },
  volunteer: {
    assignedIncidents: 5,
    completedIncidents: 12,
    hoursVolunteered: 48,
    donationsReceived: 8,
  },
  admin: {
    totalCitizens: "1,234",
    totalVolunteers: 156,
    totalHospitals: 45,
    activeIncidents: 23,
    totalDonations: "PKR 245,000",
  },
};

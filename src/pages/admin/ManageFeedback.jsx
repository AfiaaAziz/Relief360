import React, { useState } from "react";
import { Eye, CheckCircle, MessageSquare } from "lucide-react";

// Create simple UI components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 border-b border-gray-100 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
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
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3 text-sm",
  };
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
    ghost: "hover:bg-gray-100",
  };
  return <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>{children}</button>;
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
  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">{children}</th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle ${className}`}>{children}</td>
);

// Dialog Component
const Dialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(child => child.type.displayName === "DialogTrigger");
  const content = childrenArray.find(child => child.type.displayName === "DialogContent");
  
  return (
    <>
      {trigger && React.cloneElement(trigger, { onClick: () => setIsOpen(true) })}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          {content && React.cloneElement(content, { onClose: () => setIsOpen(false) })}
        </div>
      )}
    </>
  );
};

const DialogTrigger = ({ children, onClick, ...props }) => (
  <div onClick={onClick} {...props}>
    {children}
  </div>
);
DialogTrigger.displayName = "DialogTrigger";

const DialogContent = ({ children, onClose, className = "" }) => {
  const childrenArray = React.Children.toArray(children);
  const header = childrenArray.find(child => child.type.displayName === "DialogHeader");
  const otherChildren = childrenArray.filter(child => child.type.displayName !== "DialogHeader");
  
  return (
    <div className={`bg-white rounded-lg shadow-lg w-full max-w-md ${className}`} onClick={(e) => e.stopPropagation()}>
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
      {header}
      <div className="p-6">
        {otherChildren}
      </div>
    </div>
  );
};
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ children, className = "" }) => {
  const childrenArray = React.Children.toArray(children);
  const title = childrenArray.find(child => child.type.displayName === "DialogTitle");
  const description = childrenArray.find(child => child.type.displayName === "DialogDescription");
  
  return (
    <div className={`p-6 border-b border-gray-100 ${className}`}>
      {title}
      {description}
    </div>
  );
};
DialogHeader.displayName = "DialogHeader";

const DialogTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
);
DialogDescription.displayName = "DialogDescription";

// Mock data
const mockFeedback = [
  { 
    id: 1, 
    name: "Ali Raza", 
    email: "ali@example.com", 
    message: "Great service! The response time was amazing during the recent flood incident.", 
    date: "2024-01-15",
    resolved: true 
  },
  { 
    id: 2, 
    name: "Sara Khan", 
    email: "sara@example.com", 
    message: "The volunteer registration process could be simplified. Had some issues uploading documents.", 
    date: "2024-01-18",
    resolved: false 
  },
  { 
    id: 3, 
    name: "Ahmed Malik", 
    email: "ahmed@example.com", 
    message: "The hospital information was very helpful during the emergency. Saved us a lot of time.", 
    date: "2024-01-20",
    resolved: true 
  },
  { 
    id: 4, 
    name: "Fatima Noor", 
    email: "fatima@example.com", 
    message: "There should be more frequent updates on incident resolutions. Sometimes we don't know if help has arrived.", 
    date: "2024-01-25",
    resolved: false 
  },
];

// Simple toast function
const useToast = () => {
  const toast = (options) => {
    console.log("Toast:", options.title, options.description);
    alert(`${options.title}: ${options.description}`);
  };
  return { toast };
};

const ManageFeedback = () => {
  const { toast } = useToast();

  const handleResolve = (feedbackId) => {
    toast({
      title: "Feedback Resolved",
      description: "The feedback has been marked as resolved",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Feedback</h1>
        <p className="text-gray-500 mt-1">Review and respond to user feedback</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFeedback.length}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <MessageSquare className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockFeedback.filter(f => !f.resolved).length}
            </div>
            <p className="text-xs text-gray-500">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockFeedback.filter(f => f.resolved).length}
            </div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Feedback</CardTitle>
          <CardDescription>Review feedback from citizens and volunteers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message Preview</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFeedback.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">#{feedback.id}</TableCell>
                  <TableCell>{feedback.name}</TableCell>
                  <TableCell>{feedback.email}</TableCell>
                  <TableCell className="max-w-xs truncate">{feedback.message}</TableCell>
                  <TableCell>{feedback.date}</TableCell>
                  <TableCell>
                    <Badge variant={feedback.resolved ? "default" : "secondary"}>
                      {feedback.resolved ? "Resolved" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Feedback Details</DialogTitle>
                            <DialogDescription>
                              From {feedback.name} • {feedback.date}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p>{feedback.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Message</p>
                              <p className="text-sm mt-2 p-4 bg-gray-100 rounded-lg">
                                {feedback.message}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Status</p>
                              <Badge variant={feedback.resolved ? "default" : "secondary"} className="mt-2">
                                {feedback.resolved ? "Resolved" : "Pending"}
                              </Badge>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {!feedback.resolved && (
                        <Button
                          size="sm"
                          onClick={() => handleResolve(feedback.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
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

export default ManageFeedback;
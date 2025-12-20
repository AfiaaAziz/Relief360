import React, { useState, useEffect } from "react";
import { Eye, CheckCircle, MessageSquare, Trash2 } from "lucide-react";

// Create simple UI components with new color palette
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm ${className}`}
    style={{
      background:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
      borderColor: "rgba(22, 83, 126, 0.2)",
    }}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div
    className={`p-6 border-b-2 ${className}`}
    style={{
      background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
      borderColor: "rgba(22, 83, 126, 0.3)",
      paddingTop: "1.75rem",
      paddingBottom: "1.75rem",
    }}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`text-xl font-black text-white ${className}`}
    style={{
      textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
      lineHeight: "1.3",
      paddingBottom: "0.25rem",
    }}
  >
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p
    className={`text-sm text-white/90 mt-2 font-semibold ${className}`}
    style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.2)" }}
  >
    {children}
  </p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: {
      background: "linear-gradient(135deg, #6aa84f 0%, #38761d 100%)",
      color: "#ffffff",
      borderColor: "#38761d",
    },
    secondary: {
      background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
      color: "#ffffff",
      borderColor: "#16537e",
    },
    destructive: {
      background: "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
      color: "#ffffff",
      borderColor: "#990000",
    },
  };
  return (
    <span
      className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold shadow-lg border-2"
      style={styles[variant]}
    >
      {children}
    </span>
  );
};

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl";
  const sizes = {
    default: "h-12 px-6 py-3 rounded-xl text-base",
    sm: "h-10 rounded-lg px-4 text-sm",
  };
  const variants = {
    default: {
      background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
      color: "#ffffff",
      boxShadow: "0 4px 15px rgba(22, 83, 126, 0.4)",
    },
    destructive: {
      background: "linear-gradient(135deg, #ff3535 0%, #f44336 100%)",
      color: "#ffffff",
      boxShadow: "0 4px 15px rgba(255, 53, 53, 0.4)",
    },
    outline: {
      border: "2px solid #16537e",
      background: "transparent",
      color: "#16537e",
    },
    ghost: {
      background: "transparent",
      color: "#16537e",
    },
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${className}`}
      style={variants[variant]}
      {...props}
    >
      {children}
    </button>
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
  <th
    className="h-14 px-4 text-left align-middle font-bold text-base"
    style={{
      background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
      color: "#ffffff",
      textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    }}
  >
    {children}
  </th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle text-gray-800 font-medium ${className}`}>
    {children}
  </td>
);

// (Previously had a reusable Dialog implementation; replaced by FeedbackDetailsDialog)

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
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const apiBase =
          process.env.REACT_APP_API_URL || "http://localhost:5000";
        const token =
          localStorage.getItem("token") || localStorage.getItem("authToken");
        if (!token) {
          toast({
            title: "Authentication Required",
            description: "Please login as admin to view feedback.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        const response = await fetch(`${apiBase}/api/feedback`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Transform feedback data to match expected format
          const feedbackData = data.map((fb) => ({
            id: fb.id,
            name: fb.name || "Anonymous",
            email: fb.email || "N/A",
            message: fb.message || "",
            date: fb.created_at
              ? new Date(fb.created_at).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0],
            resolved: fb.status === "resolved",
            status: fb.status || "pending",
            priority: fb.priority || "medium",
            originalData: fb,
          }));
          setFeedback(feedbackData);
        } else {
          console.error("Failed to fetch feedback");
          toast({
            title: "Error",
            description: "Failed to fetch feedback. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
        toast({
          title: "Error",
          description: "An error occurred while fetching feedback.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [toast]);

  // Simple modal component for feedback details
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [sending, setSending] = useState(false);

  const openModal = (feedbackItem) => {
    console.log("Opening modal for feedback:", feedbackItem.id);
    setSelectedFeedback(feedbackItem);
    setShowModal(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setShowModal(false);
    setSelectedFeedback(null);
    setReplyBody("");
  };

  const sendReply = async () => {
    if (!selectedFeedback || !replyBody.trim()) {
      toast({
        title: "Reply Empty",
        description: "Please enter a reply message.",
      });
      return;
    }
    setSending(true);
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await fetch(
        `${apiBase}/api/feedback/${selectedFeedback.id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            subject: `Re: ${selectedFeedback.name}`,
            message: replyBody,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.message || "Failed to send reply";
        // Special-case SMTP not configured: treat as success in dev
        if (msg.includes("SMTP is not configured")) {
          toast({
            title: "Reply Skipped",
            description:
              "SMTP not configured; reply was not sent but recorded.",
          });
          closeModal();
          return;
        }
        throw new Error(msg);
      }

      toast({
        title: "Reply Sent",
        description: "Your reply was sent successfully.",
      });
      closeModal();
    } catch (err) {
      console.error("Reply error:", err);
      toast({
        title: "Send Failed",
        description: err?.message || "Failed to send reply",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleResolve = async (feedbackId) => {
    try {
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      const feedbackItem = feedback.find((f) => f.id === feedbackId);
      if (!feedbackItem) return;

      const response = await fetch(
        `${apiBase}/api/feedback/${feedbackId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            status: "resolved",
          }),
        }
      );

      if (response.ok) {
        await response.json().catch(() => ({}));
        setFeedback(
          feedback.map((f) =>
            f.id === feedbackId
              ? { ...f, resolved: true, status: "resolved" }
              : f
          )
        );
        toast({
          title: "Feedback Resolved",
          description: "The feedback has been marked as resolved",
        });
      } else {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to resolve feedback");
      }
    } catch (error) {
      console.error("Error resolving feedback:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to mark feedback as resolved",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (feedbackId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken");

      const response = await fetch(`${apiBase}/api/feedback/${feedbackId}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (response.ok) {
        setFeedback(feedback.filter((f) => f.id !== feedbackId));
        toast({
          title: "Feedback Deleted",
          description: "The feedback has been deleted successfully",
        });
      } else {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to delete feedback");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete feedback",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className="p-6 space-y-6 relative overflow-hidden min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
      }}
    >
      <div>
        <h1
          className="text-5xl md:text-6xl font-black mb-3"
          style={{
            background:
              "linear-gradient(135deg, #16537e 0%, #6aa84f 50%, #38761d 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 4px 20px rgba(22, 83, 126, 0.2)",
            lineHeight: "1.2",
            paddingBottom: "0.5rem",
          }}
        >
          Manage Feedback
        </h1>
        <p
          className="text-xl md:text-2xl font-bold mt-3"
          style={{ color: "#16537e" }}
        >
          Review and respond to user feedback
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Feedback
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : feedback.length}
            </div>
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
              {loading ? "..." : feedback.filter((f) => !f.resolved).length}
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
              {loading ? "..." : feedback.filter((f) => f.resolved).length}
            </div>
            <p className="text-xs text-gray-500">Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Feedback</CardTitle>
          <CardDescription>
            Review feedback from citizens and volunteers
          </CardDescription>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading feedback...
                  </TableCell>
                </TableRow>
              ) : feedback.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No feedback found.
                  </TableCell>
                </TableRow>
              ) : (
                feedback.map((feedbackItem) => (
                  <TableRow key={feedbackItem.id}>
                    <TableCell className="font-medium">
                      #{feedbackItem.id}
                    </TableCell>
                    <TableCell>{feedbackItem.name}</TableCell>
                    <TableCell>{feedbackItem.email}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {feedbackItem.message}
                    </TableCell>
                    <TableCell>{feedbackItem.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          feedbackItem.resolved ? "default" : "secondary"
                        }
                      >
                        {feedbackItem.resolved ? "Resolved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(feedbackItem)}
                          className="inline-flex items-center justify-center p-2 rounded-lg transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          title="View feedback details"
                          type="button"
                        >
                          <Eye
                            className="h-4 w-4"
                            style={{ color: "#16537e" }}
                          />
                        </button>
                        {!feedbackItem.resolved && (
                          <Button
                            size="sm"
                            onClick={() => {
                              handleResolve(feedbackItem.id);
                              // The button will disappear after status update
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(feedbackItem.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal for Feedback Details */}
      {showModal && selectedFeedback && (
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-6 border-b-2"
              style={{
                background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
                borderColor: "rgba(22, 83, 126, 0.3)",
              }}
            >
              <div>
                <h2 className="text-xl font-black text-white">
                  Feedback Details
                </h2>
                <p className="text-sm text-white/90 mt-1">
                  From {selectedFeedback.name} • {selectedFeedback.date}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-bold" style={{ color: "#16537e" }}>
                    Name
                  </p>
                  <p className="font-semibold text-gray-800">
                    {selectedFeedback.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#16537e" }}>
                    Email
                  </p>
                  <p className="font-semibold text-gray-800">
                    {selectedFeedback.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#16537e" }}>
                    Date
                  </p>
                  <p className="font-semibold text-gray-800">
                    {selectedFeedback.date}
                  </p>
                </div>
              </div>

              <div>
                <p
                  className="text-sm font-bold mb-3"
                  style={{ color: "#16537e" }}
                >
                  Message
                </p>
                <div
                  className="p-4 rounded-xl border-2"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(22, 83, 126, 0.05) 0%, rgba(106, 168, 79, 0.05) 100%)",
                    borderColor: "rgba(22, 83, 126, 0.2)",
                  }}
                >
                  <p className="text-gray-800 leading-relaxed">
                    {selectedFeedback.message}
                  </p>
                </div>
              </div>

              {/* Reply Section */}
              <div>
                <p
                  className="text-sm font-bold mb-3"
                  style={{ color: "#16537e" }}
                >
                  Send Reply
                </p>
                <textarea
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    borderColor: "rgba(22, 83, 126, 0.2)",
                  }}
                  placeholder={`Reply to ${selectedFeedback.email}`}
                />
                <div className="flex justify-end mt-4 gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 rounded-xl border-2 font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                    style={{
                      borderColor: "#16537e",
                      color: "#16537e",
                      background: "transparent",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={sendReply}
                    disabled={sending}
                    className="px-6 py-2 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: sending
                        ? "#cccccc"
                        : "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
                      boxShadow: "0 4px 15px rgba(22, 83, 126, 0.4)",
                    }}
                  >
                    {sending ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFeedback;

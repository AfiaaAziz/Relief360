import React, { useEffect, useMemo, useState } from "react";
import { Eye, MessageSquare, Pencil, Search, Send, Trash2, CheckCircle } from "lucide-react";

// Create simple UI components with new color palette (matching Feedback section)
const Card = ({ children, className = "" }) => (
  <div 
    className={`rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
      borderColor: 'rgba(22, 83, 126, 0.2)'
    }}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div 
    className={`p-6 border-b-2 ${className}`}
    style={{
      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
      borderColor: 'rgba(22, 83, 126, 0.3)',
      paddingTop: '1.75rem',
      paddingBottom: '1.75rem'
    }}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-black text-white ${className}`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', lineHeight: '1.3', paddingBottom: '0.25rem' }}>{children}</h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-white/90 mt-2 font-semibold ${className}`} style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)' }}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: {
      background: 'linear-gradient(135deg, #6aa84f 0%, #38761d 100%)',
      color: '#ffffff',
      borderColor: '#38761d'
    },
    secondary: {
      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
      color: '#ffffff',
      borderColor: '#16537e'
    },
    low: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: '#ffffff',
      borderColor: '#1e40af'
    },
    medium: {
      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      color: '#ffffff',
      borderColor: '#d97706'
    },
    high: {
      background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
      color: '#ffffff',
      borderColor: '#ea580c'
    },
    critical: {
      background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
      color: '#ffffff',
      borderColor: '#990000'
    },
    destructive: {
      background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
      color: '#ffffff',
      borderColor: '#990000'
    },
  };
  return (
    <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold shadow-lg border-2" style={styles[variant] || styles.default}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl";
  const sizes = {
    default: "h-12 px-6 py-3 rounded-xl text-base",
    sm: "h-10 rounded-lg px-4 text-sm",
  };
  const variants = {
    default: {
      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
    },
    destructive: {
      background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 15px rgba(255, 53, 53, 0.4)'
    },
    outline: {
      border: '2px solid #16537e',
      background: 'transparent',
      color: '#16537e',
    },
    ghost: {
      background: 'transparent',
      color: '#16537e',
    },
  };
  return <button className={`${base} ${sizes[size]} ${className}`} style={variants[variant]} {...props}>{children}</button>;
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
      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
      color: '#ffffff',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
    }}
  >
    {children}
  </th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle text-gray-800 font-medium ${className}`}>{children}</td>
);

const formatDateTime = (value) => {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString();
};

const getPriorityVariant = (priority) => {
  const p = String(priority || "medium").toLowerCase();
  if (p === "low") return "low";
  if (p === "high") return "high";
  if (p === "critical") return "critical";
  return "medium";
};

const ManageMessages = () => {
  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check if user is admin on component mount
  useEffect(() => {
    const checkAdmin = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.role !== "admin") {
            setError("Admin access required. Please login as admin.");
            setLoading(false);
          }
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
    };
    checkAdmin();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [editingMessage, setEditingMessage] = useState(null);
  const [editForm, setEditForm] = useState({
    department: "",
    subject: "",
    message: "",
    priority: "medium",
  });
  const [savingEdit, setSavingEdit] = useState(false);

  const [replyingMessage, setReplyingMessage] = useState(null);
  const [replySubject, setReplySubject] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const [deletingId, setDeletingId] = useState(null);
  const [approvingId, setApprovingId] = useState(null);

  const getToken = () => {
    // Check both possible token storage keys
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    if (!token) {
      console.warn("No token found in localStorage");
    }
    return token;
  };

  const authHeaders = (includeJson = false) => {
    const token = getToken();
    return {
      ...(includeJson ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const loadMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      if (!token) {
        setError("Please login as admin to view messages.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${apiBase}/api/contact`, {
        headers: authHeaders(false),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        let errorMsg = err?.message || "Failed to fetch messages.";
        
        if (res.status === 401) {
          errorMsg = "Session expired. Please login again as admin.";
          // Clear invalid token
          localStorage.removeItem("token");
          localStorage.removeItem("authToken");
        } else if (res.status === 403) {
          errorMsg = "Admin access required. Please make sure you are logged in as admin. Go to Sign In page and select 'Admin' role.";
          console.error("403 Forbidden - Token:", token ? "Present" : "Missing", "User role check needed");
        }
        
        console.error("API Error:", res.status, errorMsg, err);
        throw new Error(errorMsg);
      }

      const data = await res.json();
      // Filter to show only contact us messages (messages with department/subject)
      // These are from the contact us form
      const contactMessages = Array.isArray(data) 
        ? data.filter((msg) => msg.department || msg.subject)
        : [];
      setMessages(contactMessages);
    } catch (e) {
      setError(e?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openEdit = (m) => {
    setEditingMessage(m);
    setEditForm({
      department: m?.department || "",
      subject: m?.subject || "",
      message: m?.message || "",
      priority: String(m?.priority || "medium").toLowerCase(),
    });
  };

  const saveEdit = async () => {
    if (!editingMessage) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`${apiBase}/api/contact/${editingMessage.id}`, {
        method: "PUT",
        headers: authHeaders(true),
        body: JSON.stringify({
          department: editForm.department,
          subject: editForm.subject,
          message: editForm.message,
          priority: editForm.priority,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to update message");
      }

      const updated = await res.json();
      setMessages((prev) =>
        prev.map((x) => (x.id === updated.id ? updated : x))
      );
      if (selectedMessage?.id === updated.id) setSelectedMessage(updated);
      setEditingMessage(null);
    } catch (e) {
      alert(e?.message || "Failed to update message");
    } finally {
      setSavingEdit(false);
    }
  };

  const openReply = (m) => {
    setReplyingMessage(m);
    setReplySubject(
      m?.subject ? `Re: ${m.subject}` : "Re: Your message to Relief360"
    );
    setReplyBody("");
  };

  const sendReply = async () => {
    if (!replyingMessage) return;
    setSendingReply(true);
    try {
      const res = await fetch(
        `${apiBase}/api/contact/${replyingMessage.id}/reply`,
        {
          method: "POST",
          headers: authHeaders(true),
          body: JSON.stringify({
            subject: replySubject,
            message: replyBody,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const errorMessage = err?.message || "Failed to send reply";
        
        // Check if it's an SMTP configuration error
        if (errorMessage.includes("SMTP") || errorMessage.includes("smtp")) {
          alert(
            `SMTP Configuration Error:\n\n${errorMessage}\n\nPlease configure SMTP settings in server-nestjs/.env file:\n- SMTP_HOST\n- SMTP_PORT\n- SMTP_USER\n- SMTP_PASS\n- SMTP_FROM (optional)\n- SMTP_SECURE (optional)`
          );
        } else {
          throw new Error(errorMessage);
        }
        return;
      }

      // Update message status to resolved after sending reply
      try {
        const updateRes = await fetch(`${apiBase}/api/contact/${replyingMessage.id}`, {
          method: "PUT",
          headers: authHeaders(true),
          body: JSON.stringify({
            status: "resolved",
          }),
        });
        
        if (updateRes.ok) {
          const updated = await updateRes.json().catch(() => null);
          if (updated) {
            setMessages((prev) =>
              prev.map((x) => (x.id === replyingMessage.id ? updated : x))
            );
            if (selectedMessage?.id === replyingMessage.id) {
              setSelectedMessage(updated);
            }
          }
        }
      } catch (updateErr) {
        console.error("Failed to update message status:", updateErr);
        // Still show success for the reply even if status update fails
      }
      
      alert("Reply sent successfully.");
      setReplyingMessage(null);
      setReplySubject("");
      setReplyBody("");
    } catch (e) {
      alert(e?.message || "Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  const approveMessage = async (id) => {
    setApprovingId(id);
    try {
      const res = await fetch(`${apiBase}/api/contact/${id}`, {
        method: "PUT",
        headers: authHeaders(true),
        body: JSON.stringify({
          status: "approved",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to approve message");
      }

      const updated = await res.json();
      setMessages((prev) =>
        prev.map((x) => (x.id === updated.id ? updated : x))
      );
      if (selectedMessage?.id === id) setSelectedMessage(updated);
      alert("Message approved successfully.");
    } catch (e) {
      alert(e?.message || "Failed to approve message");
    } finally {
      setApprovingId(null);
    }
  };

  const deleteMessage = async (id) => {
    const ok = window.confirm(
      "Delete this message? This action cannot be undone."
    );
    if (!ok) return;

    setDeletingId(id);
    try {
      const res = await fetch(`${apiBase}/api/contact/${id}`, {
        method: "DELETE",
        headers: authHeaders(false),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to delete message");
      }

      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
      if (editingMessage?.id === id) setEditingMessage(null);
      if (replyingMessage?.id === id) setReplyingMessage(null);
    } catch (e) {
      alert(e?.message || "Failed to delete message");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMessages = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return messages
      .filter((m) => {
        if (priorityFilter === "all") return true;
        return String(m?.priority || "medium").toLowerCase() === priorityFilter;
      })
      .filter((m) => {
        if (!q) return true;
        const haystack = [
          m?.name,
          m?.email,
          m?.phone,
          m?.department,
          m?.subject,
          m?.message,
          m?.priority,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
  }, [messages, priorityFilter, searchTerm]);

  const stats = useMemo(() => {
    const total = messages.length;
    const critical = messages.filter(
      (m) => String(m?.priority || "").toLowerCase() === "critical"
    ).length;
    const high = messages.filter(
      (m) => String(m?.priority || "").toLowerCase() === "high"
    ).length;
    return { total, critical, high };
  }, [messages]);

  return (
    <div 
      className="p-6 space-y-6 relative overflow-hidden min-h-screen"
      style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
      }}
    >
      <div>
        <h1 
          className="text-5xl md:text-6xl font-black mb-3"
          style={{
            background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 50%, #38761d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 20px rgba(22, 83, 126, 0.2)',
            lineHeight: '1.2',
            paddingBottom: '0.5rem'
          }}
        >
          Manage Messages
        </h1>
        <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
          Contact Us submissions saved in the database
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.high}</div>
            <p className="text-xs text-gray-500">Priority = high</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Priority
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.critical}</div>
            <p className="text-xs text-gray-500">Priority = critical</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
          <CardDescription>
            Search by name, email, department, subject, or message content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#16537e' }} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-10 pr-3 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium"
                style={{
                  borderColor: 'rgba(22, 83, 126, 0.3)',
                  focusRingColor: '#16537e'
                }}
              />
            </div>

            <div className="flex gap-3 items-center">
              <label className="text-sm font-bold" style={{ color: '#16537e' }}>Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border-2 rounded-xl bg-white font-medium"
                style={{
                  borderColor: 'rgba(22, 83, 126, 0.3)',
                  color: '#16537e'
                }}
              >
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-lg font-bold" style={{ color: '#16537e' }}>Loading messages...</div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-lg font-bold text-red-600">{error}</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length === 0 ? (
                  <TableRow>
                    <TableCell className="text-center py-8 text-gray-500 font-medium" colSpan={9}>
                      No messages found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMessages.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">#{m.id}</TableCell>
                      <TableCell>{m.name}</TableCell>
                      <TableCell className="text-gray-700">{m.email}</TableCell>
                      <TableCell>{m.department}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {m.subject}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityVariant(m.priority)}>
                          {String(m.priority || "medium").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={m.status === "approved" ? "default" : m.status === "resolved" ? "low" : "secondary"}>
                          {String(m.status || "pending").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatDateTime(m.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedMessage(m)}
                            title="View message"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openReply(m)}
                            title="Reply via email"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                          {m.status !== "approved" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => approveMessage(m.id)}
                              title="Approve message"
                              disabled={approvingId === m.id}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEdit(m)}
                            title="Edit message"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => deleteMessage(m.id)}
                            title="Delete message"
                            disabled={deletingId === m.id}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border-2"
            style={{
              borderColor: 'rgba(22, 83, 126, 0.3)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="p-6 border-b-2 flex items-start justify-between gap-4 rounded-t-2xl"
              style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                borderColor: 'rgba(22, 83, 126, 0.3)'
              }}
            >
              <div>
                <h2 className="text-2xl font-black text-white" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                  Message #{selectedMessage.id}
                </h2>
                <p className="text-sm text-white/90 mt-1 font-semibold" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)' }}>
                  From {selectedMessage.name} •{" "}
                  {formatDateTime(selectedMessage.created_at)}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedMessage(null)}
                style={{ borderColor: 'rgba(255, 255, 255, 0.5)', color: '#ffffff' }}
              >
                Close
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="break-all">{selectedMessage.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{selectedMessage.phone || "-"}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Department</p>
                  <p>{selectedMessage.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Priority</p>
                  <Badge variant={getPriorityVariant(selectedMessage.priority)}>
                    {String(selectedMessage.priority || "medium").toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Subject</p>
                <p className="mt-1">{selectedMessage.subject}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Message</p>
                <p className="text-sm mt-2 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Message Modal */}
      {editingMessage && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setEditingMessage(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Edit Message #{editingMessage.id}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  From {editingMessage.name} • {editingMessage.email}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingMessage(null)}
                disabled={savingEdit}
              >
                Close
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Department
                  </label>
                  <input
                    value={editForm.department}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, department: e.target.value }))
                    }
                    className="mt-1 w-full px-3 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium"
                    style={{
                      borderColor: 'rgba(22, 83, 126, 0.3)',
                      focusRingColor: '#16537e'
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Priority
                  </label>
                  <select
                    value={editForm.priority}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, priority: e.target.value }))
                    }
                    className="mt-1 w-full px-3 py-2 border-2 rounded-xl bg-white font-medium"
                    style={{
                      borderColor: 'rgba(22, 83, 126, 0.3)',
                      color: '#16537e'
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Subject
                </label>
                  <input
                    value={editForm.subject}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, subject: e.target.value }))
                    }
                    className="mt-1 w-full px-3 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium"
                    style={{
                      borderColor: 'rgba(22, 83, 126, 0.3)',
                      focusRingColor: '#16537e'
                    }}
                  />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Message
                </label>
                  <textarea
                    value={editForm.message}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, message: e.target.value }))
                    }
                    rows={6}
                    className="mt-1 w-full px-3 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium"
                    style={{
                      borderColor: 'rgba(22, 83, 126, 0.3)',
                      focusRingColor: '#16537e'
                    }}
                  />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingMessage(null)}
                  disabled={savingEdit}
                >
                  Cancel
                </Button>
                <Button onClick={saveEdit} disabled={savingEdit}>
                  {savingEdit ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyingMessage && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setReplyingMessage(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border-2"
            style={{
              borderColor: 'rgba(22, 83, 126, 0.3)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="p-6 border-b-2 flex items-start justify-between gap-4 rounded-t-2xl"
              style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                borderColor: 'rgba(22, 83, 126, 0.3)'
              }}
            >
              <div>
                <h2 className="text-2xl font-black text-white" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                  Reply to Message #{replyingMessage.id}
                </h2>
                <p className="text-sm text-white/90 mt-1 font-semibold" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)' }}>
                  To {replyingMessage.email}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReplyingMessage(null)}
                disabled={sendingReply}
                style={{ borderColor: 'rgba(255, 255, 255, 0.5)', color: '#ffffff' }}
              >
                Close
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Subject
                </label>
                <input
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium"
                  style={{
                    borderColor: 'rgba(22, 83, 126, 0.3)',
                    focusRingColor: '#16537e'
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Reply Message
                </label>
                <textarea
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  rows={8}
                  placeholder="Type your reply..."
                  className="mt-1 w-full px-3 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium"
                  style={{
                    borderColor: 'rgba(22, 83, 126, 0.3)',
                    focusRingColor: '#16537e'
                  }}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setReplyingMessage(null)}
                  disabled={sendingReply}
                >
                  Cancel
                </Button>
                <Button
                  onClick={sendReply}
                  disabled={sendingReply || !replyBody.trim()}
                >
                  {sendingReply ? "Sending..." : "Send Reply"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMessages;



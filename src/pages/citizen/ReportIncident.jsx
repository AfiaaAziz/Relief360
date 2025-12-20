import React, { useState, useRef } from "react";
import { Button } from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Textarea from "../../components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
import { useToast } from "../../hooks/use-toast";
import {
  Upload,
  MapPin,
  X,
  Image,
  Video,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Reusable styled components matching admin portal
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

// File preview component
const FilePreview = ({ file, onRemove }) => {
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  return (
    <div className="relative bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {isImage ? (
            <Image className="h-8 w-8 text-green-600" />
          ) : isVideo ? (
            <Video className="h-8 w-8 text-blue-600" />
          ) : (
            <FileText className="h-8 w-8 text-gray-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      </div>

      {isImage && (
        <div className="mt-3">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-full h-32 object-cover rounded border"
          />
        </div>
      )}

      {isVideo && (
        <div className="mt-3">
          <video
            src={URL.createObjectURL(file)}
            controls
            className="w-full h-32 object-cover rounded border"
          />
        </div>
      )}
    </div>
  );
};

const ReportIncident = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    type: "",
    severity: "",
    description: "",
    location: "",
    contact_person: "",
    contact_phone: "",
  });

  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // API base URL
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Validate and handle file uploads
  const validateFile = (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/mov",
      "video/avi",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description:
          "Only JPEG, PNG, GIF images and MP4, MOV, AVI videos are allowed.",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "File size must be less than 10MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFileUpload = (newFiles) => {
    const validFiles = [];

    Array.from(newFiles).forEach((file) => {
      if (validateFile(file)) {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles].slice(0, 5)); // Limit to 5 files
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files);
      e.target.value = ""; // Reset input
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.type ||
      !formData.severity ||
      !formData.description ||
      !formData.location
    ) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare media files data
      const mediaFilesData = files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      }));

      // Prepare incident data
      const incidentData = {
        title: `${formData.type}: ${formData.location}`,
        description: formData.description,
        location: formData.location,
        severity: formData.severity,
        contact_person: formData.contact_person || "",
        contact_phone: formData.contact_phone || "",
        reported_by_user_id: user?.id || null, // Set user ID for better tracking
        reported_by_email: user?.email || "",
        media_files:
          mediaFilesData.length > 0 ? JSON.stringify(mediaFilesData) : null,
      };

      console.log("Submitting incident data:", incidentData);

      // Make API call to create incident
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE}/api/incidents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(incidentData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const createdIncident = await response.json();

      // Show success message
      toast({
        title: "Incident Reported Successfully",
        description: `Your incident has been reported with ID: ${createdIncident.id}. We will respond shortly.`,
      });

      // Reset form
      setFormData({
        type: "",
        severity: "",
        description: "",
        location: "",
        contact_person: "",
        contact_phone: "",
      });
      setFiles([]);

      // Redirect to citizen dashboard or show success page
      window.location.href = "/citizen-dashboard";
    } catch (error) {
      console.error("Error submitting incident:", error);
      toast({
        title: "Submission Failed",
        description:
          error.message ||
          "There was an error submitting your incident. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="p-6 space-y-6 max-w-2xl mx-auto relative overflow-hidden min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
      }}
    >
      <div className="animate-fade-in">
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
          Report Incident
        </h1>
        <p
          className="text-xl md:text-2xl font-bold mt-3"
          style={{ color: "#16537e" }}
        >
          Submit an emergency incident report
        </p>
      </div>

      <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle>Incident Details</CardTitle>
          <CardDescription>
            Please provide as much information as possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="type"
                className="font-bold"
                style={{ color: "#16537e" }}
              >
                Incident Type *
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="font-semibold">
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="terror">Terror Attack</SelectItem>
                  <SelectItem value="heatwave">Heatwave</SelectItem>
                  <SelectItem value="accident">Accident</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="severity"
                className="font-bold"
                style={{ color: "#16537e" }}
              >
                Severity Level *
              </Label>
              <Select
                value={formData.severity}
                onValueChange={(value) =>
                  setFormData({ ...formData, severity: value })
                }
              >
                <SelectTrigger className="font-semibold">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="font-bold"
                style={{ color: "#16537e" }}
              >
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the incident in detail..."
                rows={5}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                className="font-semibold"
                style={{
                  border: "2px solid rgba(22, 83, 126, 0.2)",
                  borderRadius: "0.5rem",
                }}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="location"
                className="font-bold"
                style={{ color: "#16537e" }}
              >
                Current Location *
              </Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                  className="font-semibold"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  style={{
                    border: "2px solid #16537e",
                    background: "transparent",
                    color: "#16537e",
                  }}
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const { latitude, longitude } = position.coords;
                          setFormData((prev) => ({
                            ...prev,
                            location: `${latitude.toFixed(
                              6
                            )}, ${longitude.toFixed(6)}`,
                          }));
                        },
                        (error) => {
                          console.error("Error getting location:", error);
                          toast({
                            title: "Location Error",
                            description:
                              "Unable to get your current location. Please enter manually.",
                            variant: "destructive",
                          });
                        }
                      );
                    }
                  }}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="contact_person"
                  className="font-bold"
                  style={{ color: "#16537e" }}
                >
                  Contact Person
                </Label>
                <Input
                  id="contact_person"
                  placeholder="Your name (optional)"
                  value={formData.contact_person}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_person: e.target.value })
                  }
                  className="font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="contact_phone"
                  className="font-bold"
                  style={{ color: "#16537e" }}
                >
                  Phone Number
                </Label>
                <Input
                  id="contact_phone"
                  placeholder="Your phone (optional)"
                  value={formData.contact_phone}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_phone: e.target.value })
                  }
                  className="font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold" style={{ color: "#16537e" }}>
                Upload Photo/Video (Optional)
              </Label>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                  isDragOver ? "border-blue-500 bg-blue-50" : "hover:shadow-lg"
                }`}
                style={{
                  borderColor: isDragOver
                    ? "#3b82f6"
                    : "rgba(22, 83, 126, 0.3)",
                  background: isDragOver
                    ? "rgba(59, 130, 246, 0.1)"
                    : "linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.9) 100%)",
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload
                  className="h-8 w-8 mx-auto mb-2"
                  style={{ color: "#16537e" }}
                />
                <p className="text-sm font-bold" style={{ color: "#16537e" }}>
                  Click to upload or drag and drop
                </p>
                <p
                  className="text-xs font-semibold mt-1"
                  style={{ color: "#666" }}
                >
                  PNG, JPG, MP4 up to 10MB (max 5 files)
                </p>
                <Input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileSelect}
                />
              </div>

              {/* File Previews */}
              {files.length > 0 && (
                <div className="space-y-3">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#16537e" }}
                  >
                    Uploaded Files ({files.length}/5):
                  </p>
                  {files.map((file, index) => (
                    <FilePreview
                      key={`${file.name}-${index}`}
                      file={file}
                      onRemove={() => removeFile(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold">Important:</p>
                  <p>
                    Your incident will be reviewed by our emergency response
                    team. Please provide accurate and detailed information.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
              style={{
                background: isSubmitting
                  ? "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)"
                  : "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
                color: "#ffffff",
                boxShadow: isSubmitting
                  ? "none"
                  : "0 4px 15px rgba(22, 83, 126, 0.4)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Incident...
                </div>
              ) : (
                "Submit Report"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ReportIncident;

import { useState, useEffect } from "react";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  Users,
  UserCheck,
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, logout, setUser } = useAuth();
  const [searchParams] = useSearchParams();

  // Auto-select role if coming from navbar buttons
  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (
      roleParam === "admin" ||
      roleParam === "citizen" ||
      roleParam === "volunteer"
    ) {
      setUserRole(roleParam);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Special handling for admin login
      if (userRole === "admin") {
        const response = await fetch(
          "http://localhost:5000/api/auth/admin-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.email, // admin uses username instead of email
              password: formData.password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Admin login failed");
        }

        // Store admin token and user data
        localStorage.setItem("authToken", data.token);
        const adminUser = { email: "admin", role: "admin", id: "admin" };
        localStorage.setItem("user", JSON.stringify(adminUser));

        // Update AuthContext manually for admin
        setUser(adminUser);
        setIsSubmitting(false);
        alert("Admin login successful! Redirecting to dashboard...");
        // Check for redirect parameter
        const redirectParam = searchParams.get("redirect");
        navigate(redirectParam || "/admin-dashboard");
        return;
      }

      // Regular user login for citizen, volunteer, hospital
      // Pass the selected role to backend for validation
      const user = await login(
        formData.email,
        formData.password,
        userRole || undefined
      );
      setIsSubmitting(false);
      const roleToUse = user?.role || userRole;

      alert(
        `Login Successful!\nWelcome back! Redirecting to your ${roleToUse} dashboard...`
      );

      // Check for redirect parameter first
      const redirectParam = searchParams.get("redirect");
      if (redirectParam) {
        navigate(redirectParam);
        return;
      }

      // navigate based on role if no redirect parameter
      if (roleToUse === "admin") navigate("/admin-dashboard");
      else if (roleToUse === "volunteer") navigate("/volunteer-dashboard");
      else if (roleToUse === "citizen") navigate("/citizen-dashboard");
      else navigate("/");
    } catch (err) {
      setIsSubmitting(false);

      // Clear any stored auth data on error to prevent partial login
      logout();

      let message = "Login failed. Please check your credentials.";

      // Better error messages based on error type
      if (err.response?.status === 401) {
        message =
          "Invalid email or password. Please enter correct credentials.";
      } else if (err.response?.status === 400) {
        // Role mismatch or validation error
        message =
          err.response?.data?.message ||
          "Invalid information entered. Please check your email and password format.";
      } else if (err.response?.status === 404) {
        message =
          "Account not found. Please check your email or sign up first.";
      } else if (err.message) {
        message = err.message;
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      }

      alert(
        `Login Failed!\n${message}\n\nPlease:\n- Check if email is correct\n- Check if password is correct\n- Make sure you selected the right account type\n- Try signing up if you don't have an account`
      );
    }
  };

  const roles = [
    {
      value: "citizen",
      label: "Citizen",
      icon: AlertTriangle,
      description: "Report incidents and receive alerts",
      color: "#ff3535",
    },
    {
      value: "volunteer",
      label: "Volunteer",
      icon: Users,
      description: "Respond to emergencies and help communities",
      color: "#6aa84f",
    },
    {
      value: "admin",
      label: "Administrator",
      icon: UserCheck,
      description: "Coordinate emergency response operations",
      color: "#16537e",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
      `}</style>

      <main className="py-20">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8 animate-fade-in-up">
            <div
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow"
              style={{
                background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
                boxShadow: "0 8px 25px rgba(22, 83, 126, 0.4)",
              }}
            >
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1
              className="text-4xl md:text-5xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: "1.2",
              }}
            >
              Welcome <span className="block md:inline">Back</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              Sign in to your Relief-360 account to continue
            </p>
          </div>

          <div
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 overflow-hidden animate-fade-in-up delay-100"
            style={{
              borderColor: "rgba(22, 83, 126, 0.3)",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(22, 83, 126, 0.05) 100%)",
            }}
          >
            <div
              className="p-6 border-b-2"
              style={{ borderColor: "rgba(22, 83, 126, 0.2)" }}
            >
              <h2 className="text-2xl md:text-3xl font-black text-center text-gray-900">
                Sign In
              </h2>
              <p className="text-gray-700 text-center mt-2 font-medium">
                Enter your credentials to access your account
              </p>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="role"
                    className="block text-sm font-black text-gray-900"
                  >
                    Account Type *
                  </label>
                  <select
                    id="role"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 font-medium"
                    style={{
                      borderColor: userRole
                        ? roles.find((r) => r.value === userRole)?.color + "40"
                        : "#e5e7eb",
                      focusRingColor: userRole
                        ? roles.find((r) => r.value === userRole)?.color + "20"
                        : "#16537e20",
                    }}
                    required
                  >
                    <option value="">Select your role</option>
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  {userRole &&
                    (() => {
                      const selectedRole = roles.find(
                        (r) => r.value === userRole
                      );
                      if (!selectedRole) return null;
                      const IconComponent = selectedRole.icon;
                      return (
                        <p className="text-xs text-gray-700 font-medium flex items-center gap-2 mt-2">
                          <IconComponent
                            className="h-4 w-4"
                            style={{ color: selectedRole.color }}
                          />
                          {selectedRole.description}
                        </p>
                      );
                    })()}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-black text-gray-900"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 pl-12 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{
                        borderColor: "#e5e7eb",
                        focusRingColor: "#16537e20",
                        focusBorderColor: "#16537e",
                      }}
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-black text-gray-900"
                  >
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pl-12 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{
                        borderColor: "#e5e7eb",
                        focusRingColor: "#16537e20",
                        focusBorderColor: "#16537e",
                      }}
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white font-black py-4 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-70"
                  style={{
                    background:
                      "linear-gradient(135deg, #16537e 0%, #6aa84f 100%)",
                    boxShadow: "0 8px 25px rgba(22, 83, 126, 0.4)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2 inline-block" />
                      Sign In
                    </>
                  )}
                </button>

                {/* Show signup link only for citizen and volunteer, not for admin */}
                {userRole !== "admin" && (
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-700 font-medium">
                      Don't have an account?{" "}
                      <Link
                        to={
                          userRole === "volunteer"
                            ? "/volunteer-register"
                            : "/citizen-signup"
                        }
                        className="font-black hover:underline"
                        style={{ color: "#16537e" }}
                      >
                        {userRole === "volunteer"
                          ? "Register as Volunteer"
                          : "Sign up here"}
                      </Link>
                    </p>
                    {userRole === "citizen" && (
                      <p className="text-xs text-gray-600">
                        New to Relief-360? Create your citizen account to report
                        incidents and stay informed.
                      </p>
                    )}
                    {userRole === "volunteer" && (
                      <p className="text-xs text-gray-600">
                        Join our volunteer network to help communities during
                        emergencies and make a difference.
                      </p>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Emergency Notice */}
          <div
            className="mt-8 p-6 rounded-2xl border-2 text-center animate-fade-in-up delay-200"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 53, 53, 0.1) 0%, rgba(244, 67, 54, 0.1) 100%)",
              borderColor: "rgba(255, 53, 53, 0.3)",
            }}
          >
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle
                className="h-6 w-6 mr-2"
                style={{ color: "#ff3535" }}
              />
              <span className="font-black" style={{ color: "#ff3535" }}>
                Emergency Reporting
              </span>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              For reporting emergency, please sign in first to citizen portal.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

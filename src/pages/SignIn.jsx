import { useState } from "react";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  Users,
  Hospital,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const { login } = useAuth();

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
      const user = await login(formData.email, formData.password);
      setIsSubmitting(false);
      const roleToUse = user?.role || userRole;
      alert(
        `Login Successful!\nWelcome back! Redirecting to your ${roleToUse} dashboard...`
      );
      // navigate based on role
      if (roleToUse === "admin") navigate("/admin-dashboard");
      else if (roleToUse === "volunteer") navigate("/volunteer-dashboard");
      else navigate("/");
    } catch (err) {
      setIsSubmitting(false);
      const message =
        err.response?.data?.message ||
        "Login failed. Please check credentials.";
      alert(message);
    }
  };

  const roles = [
    {
      value: "citizen",
      label: "Citizen",
      icon: AlertTriangle,
      description: "Report incidents and receive alerts",
    },
    {
      value: "volunteer",
      label: "Volunteer",
      icon: Users,
      description: "Respond to emergencies and help communities",
    },
    {
      value: "hospital",
      label: "Hospital Staff",
      icon: Hospital,
      description: "Manage hospital resources and capacity",
    },
    {
      value: "admin",
      label: "Administrator",
      icon: UserCheck,
      description: "Coordinate emergency response operations",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gray-900">Welcome</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Back
              </span>
            </h1>
            <p className="text-gray-600">
              Sign in to your Relief-360 account to continue
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-center text-gray-900">
                Sign In
              </h2>
              <p className="text-gray-600 text-center mt-2">
                Enter your credentials to access your account
              </p>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Account Type *
                  </label>
                  <select
                    id="role"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your role</option>
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  {userRole && (
                    <p className="text-xs text-gray-600">
                      {roles.find((r) => r.value === userRole)?.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
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
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
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
                      className="w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-600 font-medium">Emergency Access</span>
            </div>
            <p className="text-sm text-gray-600">
              In case of immediate emergency, you can report incidents without
              logging in.
              <Link
                to="/report-incident"
                className="text-red-600 hover:underline ml-1"
              >
                Report Emergency Now →
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

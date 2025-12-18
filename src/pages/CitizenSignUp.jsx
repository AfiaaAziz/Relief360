import { useState } from "react";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";

const CitizenSignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    password: "",
    confirmPassword: "",
    terms_accepted: false,
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.terms_accepted) {
      newErrors.terms_accepted = "Please accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const { confirmPassword, terms_accepted, ...dataToSend } = formData;

      const response = await fetch(`${apiBase}/api/citizens/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Registration failed");
      }

      setIsSubmitting(false);
      alert(
        "Registration Successful!\nYour account has been created. Please sign in to continue."
      );
      navigate("/sign-in?role=citizen&redirect=/citizen-dashboard");
    } catch (err) {
      setIsSubmitting(false);
      const errorMessage =
        err.message ||
        "Registration failed. Please check your information and try again.";
      alert(errorMessage);
    }
  };

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
        <div className="container mx-auto px-4 max-w-2xl">
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
              Citizen <span className="block md:inline">Registration</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              Create your account to report incidents and stay informed
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
                Sign Up
              </h2>
              <p className="text-gray-700 text-center mt-2 font-medium">
                Fill in your details to create your account
              </p>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="first_name"
                      className="block text-sm font-black text-gray-900"
                    >
                      First Name *
                    </Label>
                    <div className="relative">
                      <Input
                        id="first_name"
                        type="text"
                        placeholder="Enter your first name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className={`h-12 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-base ${
                          errors.first_name ? "border-red-500" : ""
                        }`}
                        style={{
                          borderColor: errors.first_name ? "#f44336" : "#e5e7eb",
                          focusRingColor: errors.first_name
                            ? "#f4433620"
                            : "#16537e20",
                          focusBorderColor: errors.first_name ? "#f44336" : "#16537e",
                        }}
                        required
                      />
                      <User className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.first_name && (
                      <p className="text-sm text-red-600 font-medium">
                        {errors.first_name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="last_name"
                      className="block text-sm font-black text-gray-900"
                    >
                      Last Name *
                    </Label>
                    <div className="relative">
                      <Input
                        id="last_name"
                        type="text"
                        placeholder="Enter your last name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className={`h-12 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-base ${
                          errors.last_name ? "border-red-500" : ""
                        }`}
                        style={{
                          borderColor: errors.last_name ? "#f44336" : "#e5e7eb",
                          focusRingColor: errors.last_name
                            ? "#f4433620"
                            : "#16537e20",
                          focusBorderColor: errors.last_name ? "#f44336" : "#16537e",
                        }}
                        required
                      />
                      <User className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.last_name && (
                      <p className="text-sm text-red-600 font-medium">
                        {errors.last_name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="block text-sm font-black text-gray-900"
                  >
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`h-12 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-base pl-12 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      style={{
                        borderColor: errors.email ? "#f44336" : "#e5e7eb",
                        focusRingColor: errors.email ? "#f4433620" : "#16537e20",
                        focusBorderColor: errors.email ? "#f44336" : "#16537e",
                      }}
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="block text-sm font-black text-gray-900"
                  >
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`h-12 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-base pl-12 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      style={{
                        borderColor: errors.phone ? "#f44336" : "#e5e7eb",
                        focusRingColor: errors.phone ? "#f4433620" : "#16537e20",
                        focusBorderColor: errors.phone ? "#f44336" : "#16537e",
                      }}
                      required
                    />
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="block text-sm font-black text-gray-900"
                    >
                      City
                    </Label>
                    <div className="relative">
                      <Input
                        id="city"
                        type="text"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="h-12 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-base"
                        style={{
                          borderColor: "#e5e7eb",
                          focusRingColor: "#16537e20",
                          focusBorderColor: "#16537e",
                        }}
                      />
                      <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="postal_code"
                      className="block text-sm font-black text-gray-900"
                    >
                      Postal Code
                    </Label>
                    <Input
                      id="postal_code"
                      type="text"
                      placeholder="Enter postal code"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      className="h-12 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-base"
                      style={{
                        borderColor: "#e5e7eb",
                        focusRingColor: "#16537e20",
                        focusBorderColor: "#16537e",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="block text-sm font-black text-gray-900"
                  >
                    Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter your full address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="h-12 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-base"
                    style={{
                      borderColor: "#e5e7eb",
                      focusRingColor: "#16537e20",
                      focusBorderColor: "#16537e",
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="block text-sm font-black text-gray-900"
                  >
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password (min 6 characters)"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`h-12 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-base pl-12 pr-12 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                      style={{
                        borderColor: errors.password ? "#f44336" : "#e5e7eb",
                        focusRingColor: errors.password
                          ? "#f4433620"
                          : "#16537e20",
                        focusBorderColor: errors.password ? "#f44336" : "#16537e",
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
                  {errors.password && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-black text-gray-900"
                  >
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`h-12 border-2 rounded-xl focus:ring-2 transition-all duration-300 text-base pl-12 pr-12 ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                      style={{
                        borderColor: errors.confirmPassword
                          ? "#f44336"
                          : "#e5e7eb",
                        focusRingColor: errors.confirmPassword
                          ? "#f4433620"
                          : "#16537e20",
                        focusBorderColor: errors.confirmPassword
                          ? "#f44336"
                          : "#16537e",
                      }}
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <input
                      id="terms_accepted"
                      type="checkbox"
                      checked={formData.terms_accepted}
                      onChange={handleInputChange}
                      className="mt-1 w-5 h-5 rounded border-2 cursor-pointer"
                      style={{
                        borderColor: errors.terms_accepted ? "#f44336" : "#16537e",
                        accentColor: "#16537e",
                      }}
                    />
                    <label
                      htmlFor="terms_accepted"
                      className="ml-3 text-sm text-gray-700 font-medium"
                    >
                      I accept the{" "}
                      <Link
                        to="/terms"
                        className="font-black hover:underline"
                        style={{ color: "#16537e" }}
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="font-black hover:underline"
                        style={{ color: "#16537e" }}
                      >
                        Privacy Policy
                      </Link>{" "}
                      *
                    </label>
                  </div>
                  {errors.terms_accepted && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.terms_accepted}
                    </p>
                  )}
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2 inline-block" />
                      Create Account
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-700 font-medium">
                    Already have an account?{" "}
                    <Link
                      to="/sign-in"
                      className="font-black hover:underline"
                      style={{ color: "#16537e" }}
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
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
                Emergency Access
              </span>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              In case of immediate emergency, you can report incidents without
              creating an account.
              <Link
                to="/report-incident"
                className="font-black hover:underline ml-1"
                style={{ color: "#ff3535" }}
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

export default CitizenSignUp;


// src/layouts/DashboardLayout.jsx  ← KEEP THIS ONE (DO NOT CHANGE)
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, AlertCircle, Heart,
  MessageSquare, Users, Building2, DollarSign,
  BarChart3, LogOut, Menu, X,
} from "lucide-react";
const Button = ({ children, variant = "default", className = "", size, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "hover:bg-gray-100 text-gray-700",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
  };
  const sizes = { icon: "h-10 w-10", default: "h-11 px-4" };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size || "default"]} ${className}`} {...props}>
      {children}
    </button>
  );
};
 const navItems = {
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin-dashboard" },
    { icon: AlertCircle, label: "Manage Incidents", path: "/admin-dashboard/incidents" },
    { icon: Users, label: "Manage Citizens", path: "/admin-dashboard/citizens" },
    { icon: Heart, label: "Manage Volunteers", path: "/admin-dashboard/volunteers" },
    { icon: Building2, label: "Manage Hospitals", path: "/admin-dashboard/hospitals" },
    { icon: DollarSign, label: "Donations", path: "/admin-dashboard/donations" },
    { icon: MessageSquare, label: "Feedback", path: "/admin-dashboard/feedback" },
    { icon: BarChart3, label: "Analytics", path: "/admin-dashboard/analytics" },
    
  ],
};


const DashboardLayout = ({ children, role = "citizen" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const items = navItems[role] || navItems.citizen;

  const handleLogout = () => navigate("/");

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ONLY THIS PART CHANGED → Mobile header now has NO "Admin Portal" text */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-50 shadow-sm">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          Relief360
        </h1>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      <div className="flex h-screen">
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col`}>
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Relief360
            </h1>
            <p className="text-sm font-semibold mt-2 text-red-600 capitalize">
              {role} Portal
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start h-11 ${isActive ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-100"}`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50" onClick={handleLogout}>
              <LogOut className="mr-3 h-5 w-5" /> Logout
            </Button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto p-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;
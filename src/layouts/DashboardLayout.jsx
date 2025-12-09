// src/layouts/DashboardLayout.jsx  ← KEEP THIS ONE (DO NOT CHANGE)
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  AlertCircle,
  Heart,
  MessageSquare,
  Users,
  Building2,
  DollarSign,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
const navItems = {
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin-dashboard" },
    {
      icon: AlertCircle,
      label: "Manage Incidents",
      path: "/admin-dashboard/incidents",
    },
    {
      icon: Users,
      label: "Manage Citizens",
      path: "/admin-dashboard/citizens",
    },
    {
      icon: Heart,
      label: "Manage Volunteers",
      path: "/admin-dashboard/volunteers",
    },
    {
      icon: Building2,
      label: "Manage Hospitals",
      path: "/admin-dashboard/hospitals",
    },
    {
      icon: DollarSign,
      label: "Donations",
      path: "/admin-dashboard/donations",
    },
    {
      icon: MessageSquare,
      label: "Feedback",
      path: "/admin-dashboard/feedback",
    },
    { icon: BarChart3, label: "Analytics", path: "/admin-dashboard/analytics" },
  ],
  volunteer: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/volunteer-dashboard" },
    {
      icon: AlertCircle,
      label: "Assignments",
      path: "/volunteer-dashboard/assignments",
    },
    {
      icon: DollarSign,
      label: "Donations",
      path: "/volunteer-dashboard/donations",
    },
    {
      icon: Heart,
      label: "Emergency Plans",
      path: "/volunteer-dashboard/emergency-plans",
    },
    { icon: Users, label: "Profile", path: "/volunteer-dashboard/profile" },
    {
      icon: Building2,
      label: "Hospitals",
      path: "/volunteer-dashboard/hospitals",
    },
  ],
};

const DashboardLayout = ({ children, role = "citizen" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = navItems[role] || navItems.citizen;

  const handleLogout = () => navigate("/");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 w-64 bg-white border-r border-gray-200 flex flex-col h-screen z-50">
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
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-11 ${
                    isActive
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content - Scrollable */}
      <main className="ml-64 flex-1 overflow-y-auto bg-gray-50 h-screen">
        <div className="container mx-auto p-6 max-w-7xl">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;

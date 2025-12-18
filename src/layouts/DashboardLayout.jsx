// src/layouts/DashboardLayout.jsx  ← KEEP THIS ONE (DO NOT CHANGE)
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  AlertCircle,
  Heart,
  MessageSquare,
  Mail,
  Users,
  Building2,
  DollarSign,
  BarChart3,
  LogOut,
} from "lucide-react";
import { Button } from "../components/ui/Button";

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
    {
      icon: Mail,
      label: "Messages",
      path: "/admin-dashboard/messages",
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
  citizen: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/citizen-dashboard" },
    {
      icon: AlertCircle,
      label: "Report Incident",
      path: "/citizen-dashboard/report",
    },
    {
      icon: Building2,
      label: "Hospitals",
      path: "/citizen-dashboard/hospitals",
    },
    {
      icon: Users,
      label: "Emergency Contacts",
      path: "/citizen-dashboard/contacts",
    },
    {
      icon: MessageSquare,
      label: "My Incidents",
      path: "/citizen-dashboard/incidents",
    },
    {
      icon: DollarSign,
      label: "Feedback",
      path: "/citizen-dashboard/feedback",
    },
  ],
};

const DashboardLayout = ({ children, role = "citizen" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = navItems[role] || navItems.citizen;

  const handleLogout = () => navigate("/");

  return (
    <div 
      className="min-h-screen flex"
      style={{
        background: 'radial-gradient(circle at 0% 0%, rgba(22, 83, 126, 0.05) 0%, rgba(56, 118, 29, 0.05) 50%, rgba(106, 168, 79, 0.03) 100%)'
      }}
    >
      {/* Fixed Sidebar */}
      <aside 
        className="fixed left-0 top-0 w-64 bg-white flex flex-col h-screen z-50 shadow-xl"
        style={{
          borderRight: '3px solid #16537e'
        }}
      >
        <div 
          className="p-6"
          style={{
            borderBottom: '2px solid #16537e',
            background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(56, 118, 29, 0.1) 100%)'
          }}
        >
          <h1 
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #16537e 0%, #38761d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Relief360
          </h1>
          <p className="text-sm font-semibold mt-2 capitalize" style={{ color: '#f44336' }}>
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
                  className={`w-full justify-start h-11 transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-lg"
                      : "hover:shadow-md"
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #16537e 0%, #38761d 100%)'
                  } : {
                    color: '#16537e'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(56, 118, 29, 0.1) 100%)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'transparent';
                    }
                  }}
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
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;

import React, { useEffect, useState } from "react";
import { User, FileText, Calendar } from "lucide-react";
import StatCards from "../components/Secretaryoverview/StatCards";
import SecretaryCharts from "../components/Secretaryoverview/SecretaryCharts";
import RecentActivity from "../components/Secretaryoverview/RecentActivity";

const SecretaryDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setSidebarOpen(desktop);
    };

    const handleSidebarToggle = () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        const isOpen = sidebar.classList.contains("w-64");
        setSidebarOpen(isOpen);
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(handleSidebarToggle, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  const metrics = [
    { title: "Total Clients", value: 42, icon: <User size={28} /> },
    { title: "Active Cases", value: 18, icon: <FileText size={28} /> },
    { title: "Pending Documents", value: 7, icon: <FileText size={28} /> },
    { title: "Upcoming Hearings", value: 5, icon: <Calendar size={28} /> },
  ];

  const caseTypeData = [
    { name: "Civil", value: 8 },
    { name: "Criminal", value: 5 },
    { name: "Family", value: 5 },
  ];

  const pendingDocsData = [
    { status: "Not Started", count: 2 },
    { status: "In Progress", count: 3 },
    { status: "Completed", count: 2 },
  ];

  const recentActivities = [
    { id: 1, activity: "New client John Doe added", time: "2 hours ago" },
    { id: 2, activity: "Assigned document to lawyer Sarah Ali", time: "5 hours ago" },
    { id: 3, activity: "Upcoming hearing for case #C123", time: "Tomorrow" },
  ];

  return (
    <div
      className={`min-h-screen text-gray-900 
      px-4 sm:px-6 md:px-8 
      py-6 
      transition-all duration-300 ease-in-out
      ${sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-16"}
      pt-[100px]`}  // 👈 this ensures nothing overlaps topbar
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight">Overview</h1>
        <p className="text-gray-600 mt-2">
          Manage cases, documents, and client information efficiently
        </p>
      </div>

      {/* Dashboard Content */}
      <div className="space-y-10 pb-10">
        <StatCards metrics={metrics} />

        <div className="mt-6">
          <SecretaryCharts
            caseTypeData={caseTypeData}
            pendingDocsData={pendingDocsData}
          />
        </div>

        <div className="mt-8">
          <RecentActivity recentActivities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default SecretaryDashboard;

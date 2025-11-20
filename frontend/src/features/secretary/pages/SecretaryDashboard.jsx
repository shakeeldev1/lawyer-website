import React, { useEffect, useState } from "react";
import { User, FileText, Calendar } from "lucide-react";
import StatCards from "../components/Secretaryoverview/StatCards";
import SecretaryCharts from "../components/Secretaryoverview/SecretaryCharts";
import RecentActivity from "../components/Secretaryoverview/RecentActivity";
import {
  useGetDashboardStatsQuery,
  useGetActivityLogsQuery,
} from "../api/secretaryApi";

const SecretaryDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Fetch dashboard stats and activity logs
  const { data: statsData, isLoading: statsLoading } =
    useGetDashboardStatsQuery();
  const { data: activityData, isLoading: activityLoading } =
    useGetActivityLogsQuery();

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

  // Use API data or fallback to defaults
  const metrics = statsData?.stats
    ? [
        {
          title: "Total Clients",
          value: statsData.stats.totalClients || 0,
          icon: <User size={28} />,
        },
        {
          title: "Active Cases",
          value: statsData.stats.activeCases || 0,
          icon: <FileText size={28} />,
        },
        {
          title: "Pending Documents",
          value: statsData.stats.pendingDocuments || 0,
          icon: <FileText size={28} />,
        },
        {
          title: "Upcoming Hearings",
          value: statsData.stats.upcomingHearings || 0,
          icon: <Calendar size={28} />,
        },
      ]
    : [
        { title: "Total Clients", value: 0, icon: <User size={28} /> },
        { title: "Active Cases", value: 0, icon: <FileText size={28} /> },
        { title: "Pending Documents", value: 0, icon: <FileText size={28} /> },
        { title: "Upcoming Hearings", value: 0, icon: <Calendar size={28} /> },
      ];

  const caseTypeData = statsData?.caseTypeData || [
    { name: "Civil", value: 0 },
    { name: "Criminal", value: 0 },
    { name: "Family", value: 0 },
  ];

  const pendingDocsData = statsData?.pendingDocsData || [
    { status: "Not Started", count: 0 },
    { status: "In Progress", count: 0 },
    { status: "Completed", count: 0 },
  ];

  const recentActivities = activityData?.activities || [];

  return (
    <div
      className={`min-h-screen text-gray-900 
      px-4 sm:px-6 md:px-8 
      py-6 
      transition-all duration-300 ease-in-out
      ${sidebarOpen ? "lg:ml-64 md:ml-64" : "lg:ml-20 md:ml-16"}
      pt-[100px]`} // 👈 this ensures nothing overlaps topbar
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight">
          Overview
        </h1>
        <p className="text-gray-600 mt-2">
          Manage cases, documents, and client information efficiently
        </p>
      </div>

      {/* Loading State */}
      {(statsLoading || activityLoading) && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#fe9a00]"></div>
        </div>
      )}

      {/* Dashboard Content */}
      {!statsLoading && (
        <div className="space-y-10 pb-10">
          <StatCards metrics={metrics} />

          <div className="mt-6">
            <SecretaryCharts
              caseTypeData={caseTypeData}
              pendingDocsData={pendingDocsData}
            />
          </div>

          {!activityLoading && (
            <div className="mt-8">
              <RecentActivity recentActivities={recentActivities} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SecretaryDashboard;

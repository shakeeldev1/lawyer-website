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

  // Fetch dashboard stats and activity logs with auto-refresh every 30 seconds
  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useGetDashboardStatsQuery(undefined, {
    pollingInterval: 30000, // Auto-refresh every 30 seconds
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
  });
  const {
    data: activityData,
    isLoading: activityLoading,
    error: activityError,
  } = useGetActivityLogsQuery(undefined, {
    pollingInterval: 30000, // Auto-refresh every 30 seconds
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
  });

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

  const caseTypeData =
    statsData?.caseTypeData && statsData.caseTypeData.length > 0
      ? statsData.caseTypeData
      : [
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
          <p className="text-gray-600 mt-4">Loading dashboard data...</p>
        </div>
      )}

      {/* Error State */}
      {(statsError || activityError) && !statsLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-red-800 font-semibold mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-red-600">
            {statsError?.data?.message ||
              activityError?.data?.message ||
              "Unable to fetch dashboard data. Please try again."}
          </p>
          <button
            onClick={() => {
              refetchStats();
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Dashboard Content */}
      {!statsLoading && !statsError && (
        <div className="space-y-10 pb-10">
          <StatCards metrics={metrics} />

          <div className="mt-6">
            <SecretaryCharts
              caseTypeData={caseTypeData}
              pendingDocsData={pendingDocsData}
            />
          </div>

          {!activityLoading && !activityError && (
            <div className="mt-8">
              <RecentActivity recentActivities={recentActivities} />
            </div>
          )}

          {activityLoading && (
            <div className="text-center py-6">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#fe9a00]"></div>
              <p className="text-gray-600 mt-2">Loading recent activities...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SecretaryDashboard;

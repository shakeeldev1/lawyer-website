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
        const width = sidebar.offsetWidth;
        setSidebarOpen(width > 100);
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
      transition-all duration-300 ease-in-out
      pt-16 px-2 py-3 sm:px-3 sm:py-4 mt-8
      ${sidebarOpen ? "md:ml-52 ml-0" : "md:ml-14 ml-0"}`}
    >
      {/* Header */}
      <div className="mb-3">
        <h1 className="text-lg sm:text-xl font-bold text-slate-800">
          Overview
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
          Manage cases, documents, and client information
        </p>
      </div>

      {/* Loading State */}
      {(statsLoading || activityLoading) && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-slate-800"></div>
        </div>
      )}

      {/* Error State */}
      {(statsError || activityError) && !statsLoading && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <h3 className="text-red-800 font-semibold text-xs mb-1">
            Error Loading Dashboard
          </h3>
          <p className="text-red-600 text-xs">
            {statsError?.data?.message ||
              activityError?.data?.message ||
              "Unable to fetch dashboard data. Please try again."}
          </p>
          <button
            onClick={() => {
              refetchStats();
            }}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Dashboard Content */}
      {!statsLoading && !statsError && (
        <div className="space-y-4 pb-4">
          <StatCards metrics={metrics} />

          <SecretaryCharts
            caseTypeData={caseTypeData}
            pendingDocsData={pendingDocsData}
          />

          {!activityLoading && !activityError && (
            <RecentActivity recentActivities={recentActivities} />
          )}

          {activityLoading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-slate-800"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SecretaryDashboard;

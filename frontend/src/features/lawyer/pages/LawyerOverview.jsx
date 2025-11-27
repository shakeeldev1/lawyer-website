// src/pages/lawyer/LawyerOverview.jsx
import React, { useEffect, useState } from "react";
import OverviewCharts from "../components/LawyerOverview/OverviewCharts";
import RecentActivitiesTable from "../components/LawyerOverview/RecentActivitiesTable";
import StatCards from "../components/LawyerOverview/StatCards";

const LawyerOverview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    const interval = setInterval(() => {
      const sidebar = document.querySelector("aside");
      if (sidebar) setSidebarOpen(sidebar.classList.contains("w-64"));
    }, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ease-in-out pt-16 px-2 py-3 sm:px-3 sm:py-4 space-y-3 ${
        sidebarOpen ? "md:ml-52 ml-0" : "md:ml-14 ml-0"
      }`}
    >
      {/* Title & Subtitle */}
      <div className="mb-3 mt-8">
        <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
          Overview
        </h1>
        <p className="text-slate-500 mt-0.5 text-[11px] sm:text-xs">
          Track your cases, memorandums, approvals, and upcoming hearings.
        </p>
      </div>

      {/* Components */}
      <StatCards />
      <OverviewCharts />
      <RecentActivitiesTable />
    </div>
  );
};

export default LawyerOverview;

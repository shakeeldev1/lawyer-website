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
         className={`min-h-screen transition-all duration-300 ease-in-out pt-16  py-3 px-3 md:px-7 sm:py-4 space-y-3 ${
            sidebarOpen ? "md:ml-52 ml-0" : "md:ml-14 ml-0"
         }`}
      >
         {/* Title & Subtitle */}
         <div className="mb-3 mt-6 md:mt-18">
            <h1 className="text-3xl md:text-4xl font-bold text-[#A48D66] tracking-tight">
               Overview
            </h1>
            <p className="text-slate-500 mt-1.5 text-xs md:text-[18px]">
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

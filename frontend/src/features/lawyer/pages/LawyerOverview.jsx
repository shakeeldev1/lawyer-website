import React, { useEffect, useState } from "react";
import OverviewCharts from "../components/LawyerOverview/OverviewCharts";
import RecentActivitiesTable from "../components/LawyerOverview/RecentActivitiesTable";
import StatCards from "../components/LawyerOverview/StatCards";

const LawyerOverview = () => {
   const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

   // ✅ Sync with sidebar state
   useEffect(() => {
      const handleResize = () => {
         const desktop = window.innerWidth >= 1024;
         setSidebarOpen(desktop);
      };

      const handleSidebarToggle = () => {
         // Listen for sidebar state changes from the sidebar component
         const sidebar = document.querySelector('aside');
         if (sidebar) {
            const isOpen = sidebar.classList.contains('w-64');
            setSidebarOpen(isOpen);
         }
      };

      window.addEventListener('resize', handleResize);
      const interval = setInterval(handleSidebarToggle, 100);

      return () => {
         window.removeEventListener('resize', handleResize);
         clearInterval(interval);
      };
   }, []);

   return (
      <div
         className={`min-h-screen
                 px-3 sm:px-4  md:px-6 lg:px-2
                 py-10 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
              ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
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

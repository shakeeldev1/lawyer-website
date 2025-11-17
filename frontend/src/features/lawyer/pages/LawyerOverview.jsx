// src/pages/lawyer/LawyerOverview.jsx
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
      
      // Check sidebar state periodically (you can use a better state management approach)
      const interval = setInterval(handleSidebarToggle, 100);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        clearInterval(interval);
      };
    }, []);
  return (
    <div
      className={`min-h-screen
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out
                 ${sidebarOpen ? 'lg:ml-64 md:ml-64' : 'lg:ml-20 md:ml-15'}`}
    >
      {/* Title & Subtitle */}
      <div className="mb-6 mt-20">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight">Overview</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Track your cases, memorandums, approvals, and upcoming hearings.</p>
      </div>

      {/* Components */}
      <StatCards />
      <OverviewCharts />
      <RecentActivitiesTable/>
    </div>
  );
};

export default LawyerOverview;

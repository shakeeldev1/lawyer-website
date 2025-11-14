import React, { useEffect, useState } from "react";
import { User, FileText, Calendar, CheckCircle } from "lucide-react";
import StatCards from "../components/Secretaryoverview/StatCards";
import SecretaryCharts from "../components/Secretaryoverview/SecretaryCharts";
import RecentActivity from "../components/Secretaryoverview/RecentActivity";


const SecretaryDashboard = () => {
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
      className={`min-h-screen 
                 px-3 sm:px-4 md:px-6 lg:px-2
                 py-3 sm:py-4 md:py-5 
                 transition-all duration-300 ease-in-out mt-20
                 ${sidebarOpen ? 'lg:ml-64 md:ml-64 ' : 'lg:ml-20 md:ml-15'}`}
    >
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-600 mt-2">Manage cases, documents, and client information efficiently</p>
      </div>

      {/* Components */}
      <StatCards metrics={metrics} />
      <SecretaryCharts caseTypeData={caseTypeData} pendingDocsData={pendingDocsData} />
      <RecentActivity recentActivities={recentActivities} />
    </div>
  );
};

export default SecretaryDashboard;

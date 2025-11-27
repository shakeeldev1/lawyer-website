import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "../../features/lawyer/components/SideBar";
import TopBar from "../../features/lawyer/components/TopBar";

const LawyerLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // Watch for sidebar width changes
  useEffect(() => {
    const checkSidebarWidth = () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        const width = sidebar.offsetWidth;
        setSidebarExpanded(width > 100); // expanded if width > 100px
      }
    };

    checkSidebarWidth();
    const interval = setInterval(checkSidebarWidth, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LawyerLayout;

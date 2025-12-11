import React, { useState, useEffect } from "react";
import {
  Users,
  FolderOpen,
  Bell,
  FolderArchive,
  BarChart3,
  Globe,
  LogOut,
  Scale,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768 ? true : false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setIsOpen(desktop ? true : false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Secretary-specific menu items
  const links = [
    { name: "Overview", icon: <Home size={16} />, path: "." },
    { name: "Clients", icon: <Users size={16} />, path: "clients" },
    { name: "Cases", icon: <Scale size={16} />, path: "case-management" },
    { name: "Reminders", icon: <Bell size={16} />, path: "reminders" },
    {
      name: "Archive",
      icon: <FolderArchive size={16} />,
      path: "archive-cases",
    },
  ];

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const handleLinkClick = () => {
    if (!isDesktop) setIsOpen(false);
  };
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <>
      {/* Overlay for Mobile */}
       {!isDesktop && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Toggle Button */}
    <button
        onClick={toggleSidebar}
        className={`fixed top-2 p-2 rounded-full shadow-md z-[9999]
          bg-[#A48C65] text-white hover:bg-[#a48c659c] transition-all duration-300
          ${isDesktop ? (isOpen ? "left-46" : "left-9") : isOpen ? "left-[210px]" : "left-4"}
        `}
      >
        {isOpen ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full border-r border-blue-100
        bg-gradient-to-b from-blue-50 to-indigo-50/80 backdrop-blur-xl
        text-slate-700 shadow-lg transition-all duration-300 ease-in-out z-50
          ${
            isDesktop
              ? isOpen
                ? "w-52"
                : "w-14"
              : isOpen
              ? "translate-x-0 w-52"
              : "-translate-x-full w-52"
          }
          flex flex-col
        `}
      >
        {/* Header */}
        <div
          className={`h-12 flex items-center border-b border-slate-200 ${
            isOpen ? "justify-start px-2.5" : "justify-center"
          }`}
        >
          {isOpen && (
            <h2 className="text-sm font-semibold text-slate-800">Secretary</h2>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-5">
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.path}
              onClick={handleLinkClick}
              end={link.path === undefined}
              className={({ isActive }) =>
                `flex items-center rounded-md mx-2 my-0.5 transition-colors duration-200
                 ${
                  isActive
                    ? "bg-gradient-to-r from-[#BCB083] to-[#A48C65] text-white font-medium shadow-sm"
                    : "text-slate-700 hover:bg-white/80 hover:text-[#A48C65] hover:shadow-sm"
                }
                  ${
                    isOpen || !isDesktop
                      ? "justify-start gap-2 px-2.5 py-3"
                      : "justify-center py-2"
                  }
                `
              }
            >
              {React.cloneElement(link.icon, { size: 16 })}
              {(isOpen || !isDesktop) && (
                <span className="text-xs">{link.name}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-2 mt-auto mb-2">
          <button
            onClick={handleLogout}
             className={`flex w-full items-center ${
              isOpen
                ? "justify-start gap-3 px-4 py-3"
                : "justify-center py-3"
             } text-slate-600 hover:text-[#A48C65] rounded-lg transition-all duration-200`}
          >
            <LogOut size={16} />
            {isOpen && <span className="text-xs font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

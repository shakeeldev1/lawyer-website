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
        ></div>
      )}

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-[55] p-1.5 rounded-full shadow-md text-white transition-all duration-300
          bg-[#11408bee] hover:bg-[#0f3674]
          ${
            isDesktop
              ? isOpen
                ? "left-48 top-3"
                : "left-12 top-3"
              : isOpen
              ? "left-[180px] top-2"
              : "left-4 top-4"
          }
        `}
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full border-r border-slate-200
          bg-white
          text-slate-700 shadow-sm transition-all duration-300 ease-in-out z-50
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
        <nav className="flex-1 overflow-y-auto py-2">
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
                      ? "bg-[#11408bee] text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }
                  ${
                    isOpen || !isDesktop
                      ? "justify-start gap-2 px-2.5 py-2"
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
            className={`flex items-center rounded-md transition-colors duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 ${
              isOpen
                ? "justify-start gap-2 px-2.5 py-2 w-full"
                : "justify-center w-full py-2"
            }`}
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

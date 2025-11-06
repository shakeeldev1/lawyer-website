import { useState } from "react";
import {
  LayoutDashboard,
  FileCheck,
  Archive,
  BarChart3,
  Users,
  Bell,
  Scale,
  FolderOpen,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const links = [
    { name: "Overview", icon: <LayoutDashboard size={20} />, path: "overview" },
    { name: "All Cases", icon: <FolderOpen size={20} />, path: "all-cases" },

    { name: "Final Approvals", icon: <FileCheck size={20} />, path: "final-approval" },
    { name: "Archive", icon: <Archive size={20} />, path: "archive" },
    { name: "Reports & Analytics", icon: <BarChart3 size={20} />, path: "reports" },
    { name: "Reminders", icon: <Bell size={20} />, path: "reminders" },
    { name: "Team Management", icon: <Users size={20} />, path: "team" },
  ];

  return (
    <aside className="w-72 h-screen bg-[#1c283c] flex flex-col text-white shadow-2xl border-r border-[#26334d]">
      {/* Header */}
      <div className="px-6 py-6 border-b border-[#26334d] bg-gradient-to-r from-[#1c283c] to-[#26334d] flex items-center gap-3">
        <div className="p-2 bg-[#fe9a00] rounded-xl shadow-md">
          <Scale size={26} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">Justice Law Firm</h2>
          <p className="text-xs text-gray-400">Managing Director</p>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1
        scrollbar-thin
        scrollbar-thumb-[#2c3b55]
        scrollbar-track-[#1c283c]
        hover:scrollbar-thumb-[#394b6a]
        transition-all duration-300"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#2c3b55 #1c283c",
        }}
      >
        {links.map((link, i) => (
          <div key={i}>
            {link.submenu ? (
              <>
                {/* Dropdown Link */}
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === link.name ? null : link.name)
                  }
                  className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-200 ${
                    openMenu === link.name
                      ? "bg-[#fe9a00]/15 text-[#fe9a00]"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                  <span className="ml-auto text-xs">
                    {openMenu === link.name ? "▾" : "▸"}
                  </span>
                </button>

                {openMenu === link.name && (
                  <div className="ml-8 mt-2 flex flex-col gap-2 transition-all duration-300">
                    {link.submenu.map((sub, idx) => (
                      <NavLink
                        key={idx}
                        to={sub.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-sm border-l-2 transition-all duration-200 ${
                            isActive
                              ? "bg-[#fe9a00] text-white border-[#fe9a00]"
                              : "text-gray-400 border-transparent hover:bg-white/10 hover:text-[#fe9a00]"
                          }`
                        }
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[#fe9a00] text-white shadow-md shadow-[#fe9a00]/30"
                      : "text-gray-300 hover:bg-white/10 hover:text-[#fe9a00]"
                  }`
                }
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>

                {/* Notification Badges */}
                {(link.name === "Final Approvals" || link.name === "Reminders") && (
                  <span
                    className={`ml-auto text-xs px-2 py-1 rounded-full font-semibold ${
                      link.name === "Final Approvals"
                        ? "bg-red-500 animate-pulse"
                        : "bg-blue-500"
                    }`}
                  >
                    {link.name === "Final Approvals" ? 3 : 5}
                  </span>
                )}
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#26334d] p-4 bg-[#1c283c]/95">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition">
          <div className="w-10 h-10 bg-gradient-to-br from-[#fe9a00] to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold text-white">John Doe</p>
            <p className="text-xs text-gray-400">Managing Director</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

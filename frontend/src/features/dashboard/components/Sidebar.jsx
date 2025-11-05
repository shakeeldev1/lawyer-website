import { useState } from "react";
import {
    LayoutDashboard,
    FileCheck,
    CalendarDays,
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
        { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/overview" },
        {
            name: "Case Management",
            icon: <FolderOpen size={20} />,
            submenu: [
                { name: "All Cases", path: "/all-cases" },
                { name: "Case Timeline", path: "/case-timeline" },
            ],
        },
        { name: "Final Approvals", icon: <FileCheck size={20} />, path: "/final-approval" },
        // { name: "Hearings", icon: <CalendarDays size={20} />, path: "/admin/hearings" },
        { name: "Archive", icon: <Archive size={20} />, path: "/archive" },
        { name: "Reports & Analytics", icon: <BarChart3 size={20} />, path: "/reports" },
        { name: "Reminders", icon: <Bell size={20} />, path: "/reminders" },
        { name: "Team Management", icon: <Users size={20} />, path: "/team" },

    ];

    return (
        <div className="w-72 h-screen bg-gradient-to-b  from-slate-800 to-slate-900 text-gray-100 flex flex-col shadow-2xl border-r border-slate-600">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500 rounded-lg">
                        <Scale size={28} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Justice Law Firm</h2>
                        <p className="text-sm text-slate-400">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col px-4 py-1 space-y-1">
                {links.map((link, i) => (
                    <div key={i}>
                        {link.submenu ? (
                            <>
                                {/* Main menu item */}
                                <button
                                    onClick={() =>
                                        setOpenMenu(openMenu === link.name ? null : link.name)
                                    }
                                    className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-300 hover:bg-slate-700/50 hover:text-white transition"
                                >
                                    {link.icon}
                                    <span className="font-medium">{link.name}</span>
                                    <span className="ml-auto">
                                        {openMenu === link.name ? "▾" : "▸"}
                                    </span>
                                </button>

                                {/* Submenu */}
                                {openMenu === link.name && (
                                    <div className="ml-8 mt-2 flex flex-col gap-2">
                                        {link.submenu.map((sub, idx) => (
                                            <NavLink
                                                key={idx}
                                                to={sub.path}
                                                className={({ isActive }) =>
                                                    `p-2 rounded-lg text-slate-300 border-l-2 border-l-[#FE9A00] shadow-inner shadow-white/20 hover:bg-slate-700/50 hover:text-white transition ${isActive ? "bg-amber-500 text-white shadow-lg" : ""
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
                                    `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${isActive
                                        ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1"
                                    }`
                                }
                            >
                                {link.icon}
                                <span className="font-medium">{link.name}</span>
                                {(link.name === "Final Approvals" || link.name === "Reminders") && (
                                    <span
                                        className={`ml-auto text-xs px-2 py-1 rounded-full text-white ${link.name === "Final Approvals" ? "bg-red-500 animate-pulse" : "bg-blue-500"
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
            <div className="p-4 border-t border-slate-700">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">JD</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">John Doe</p>
                        <p className="text-xs text-slate-400 truncate">Senior Partner</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

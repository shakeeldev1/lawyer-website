import { LayoutDashboard, FileCheck, CalendarDays, Archive, BarChart3, Users, Bell, Scale } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const links = [
        { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/admin/overview" },
        { name: "Pending Approvals", icon: <FileCheck size={20} />, path: "/admin/approvals" },
        { name: "Hearings", icon: <CalendarDays size={20} />, path: "/admin/hearings" },
        { name: "Archive", icon: <Archive size={20} />, path: "/admin/archive" },
        { name: "Reports & Analytics", icon: <BarChart3 size={20} />, path: "/admin/reports" },
        { name: "Reminders", icon: <Bell size={20} />, path: "/admin/reminders" },
        { name: "Users", icon: <Users size={20} />, path: "/admin/users" },
    ];

    return (
        <div className="w-72 h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-gray-100 flex flex-col shadow-2xl border-r border-slate-600">
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
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
            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${isActive
                                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                                : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1"
                            }`
                        }
                    >
                        <div className={`transition-transform duration-200 group-hover:scale-110 ${({ isActive }) => isActive ? "scale-110" : ""
                            }`}>
                            {link.icon}
                        </div>
                        <span className="font-medium">{link.name}</span>
                        {link.name === "Pending Approvals" && (
                            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                3
                            </span>
                        )}
                        {link.name === "Reminders" && (
                            <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                5
                            </span>
                        )}
                    </NavLink>
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
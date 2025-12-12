import { useState, useEffect } from "react";
import {
  Bell,
  Home,
  LogOut,
  FileText,
  Archive,
  ChevronLeft,
  ChevronRight,
  Scale,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearProfile } from "../../auth/authSlice";
import { useLogoutMutation } from "../../auth/api/authApi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768 ? true : false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setIsOpen(desktop ? true : false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { name: "Overview", icon: <Home size={16} />, path: "." },
    { name: "My Cases", icon: <FileText size={16} />, path: "my-cases" },
    { name: "Archive", icon: <Archive size={16} />, path: "archieve" },
    { name: "Notifications", icon: <Bell size={16} />, path: "notifications" },
  ];

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleLinkClick = () => {
    if (!isDesktop) setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearProfile());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Clear profile and navigate even if API fails
      dispatch(clearProfile());
      navigate("/login");
    }
  };

  return (
    <>
      {/* ✅ Mobile Overlay */}
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
        ${isDesktop ? (isOpen ? "w-52" : "w-14") : isOpen ? "translate-x-0 w-52" : "-translate-x-full w-52"}
        flex flex-col`}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-2 px-3 py-4 border-b border-blue-100 ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <div className="p-1.5 bg-[#A48C65] rounded-lg shadow-sm">
            <Scale size={20} className="text-white" />
          </div>

          {isOpen && (
            <div>
              <h2 className="text-sm font-semibold text-[#494C52]">
                Justice Law
              </h2>
              <p className="text-[10px] text-slate-500">Lawyer Portal</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center rounded-md mx-2 my-0.5 transition-colors duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#BCB083] to-[#A48C65] text-white font-medium shadow-sm"
                    : "text-slate-700 hover:bg-white/80 hover:text-[#A48C65]"
                }
                ${isOpen ? "gap-2 px-3 py-2" : "justify-center py-2"}`
              }
            >
              {link.icon}
              {isOpen && <span className="text-xs">{link.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-2 mt-auto mb-2">
          <button
            onClick={handleLogout}
            className={`flex w-full items-center text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200
              ${isOpen ? "justify-start gap-2 px-3 py-2" : "justify-center py-2"}`}
          >
            <LogOut size={16} />
            {isOpen && (
              <span className="text-xs font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

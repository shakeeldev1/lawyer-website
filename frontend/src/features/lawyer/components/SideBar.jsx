import { useState, useEffect } from "react";
import {
 
  Bell,
  Scale,
  Home,
  Menu,
  X,
  LogOut,
  FileText,
  Calendar,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768 ? false : false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setIsOpen(desktop ? false : false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 const links = [
    { name: "Overview", icon: <Home size={20} /> },
    { name: "My Cases", icon: <FileText size={20} />, path: "my-cases" },
    { name: "Upcoming Hearings", icon: <Calendar size={20} />, path: "hearings" },
    { name: "Notifications", icon: <Bell size={20} />, path: "notifications" },
    { name: "Profile", icon: <User size={20} />, path: "profile" },
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
      {/* Mobile Overlay */}
      {!isDesktop && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        ></div>
      )}

      {/* Hamburger / Close Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 z-50 p-2 rounded-lg shadow-md
          bg-[#11408bee] text-white hover:bg-[#0f3674] transition-all duration-300
          ${isDesktop ? (isOpen ? "left-64" : "left-20") : isOpen ? "left-[200px] top-2" : "left-4 top-4"}
        `}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full border-r border-blue-100
          bg-gradient-to-b from-blue-50 to-indigo-50/80 backdrop-blur-xl
          text-slate-700 shadow-lg transition-all duration-300 ease-in-out z-50
          ${isDesktop ? (isOpen ? "w-64" : "w-20") : isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
          flex flex-col
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-3 px-5 py-6 border-b border-blue-100 ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <div className="p-2 bg-[#11408bee] rounded-xl shadow-md">
            <Scale size={24} className="text-white" />
          </div>

          {isOpen && (
            <div className="transition-all">
              <h2 className="text-base font-semibold text-slate-800">
                Justice Law Firm
              </h2>
              <p className="text-xs text-slate-500">Managing Director</p>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-lg mx-2 my-1 transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 font-medium border border-blue-200 shadow-sm"
                      : "text-slate-700 hover:bg-white/80 hover:text-blue-600 hover:shadow-sm"
                  }
                  ${isOpen || !isDesktop ? "justify-start" : "justify-center"}
                `
              }
            >
              {link.icon}
              {(isOpen || !isDesktop) && <span className="text-sm">{link.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button at Bottom */}
      <div className="px-5 mt-auto mb-4">
  <button
    onClick={handleLogout}
    className={`flex items-center ${
      isOpen ? "justify-start gap-3 px-4 py-3" : "justify-center w-full py-3"
    } text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200`}
  >
    <LogOut size={22} />
    {isOpen && <span className="text-sm font-medium">Logout</span>}
  </button>
</div>

      </aside>
    </>
  );
};

export default Sidebar;

import { ChevronDown, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../auth/authSlice";
import { useGetQuickStatsQuery } from "../api/secretaryApi";
import { useLogoutMutation } from "../../auth/api/authApi";

const Topbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();

  // Get user profile from Redux
  const userProfile = useSelector(selectUserProfile);

  // Fetch quick stats with auto-refresh
  const { data: quickStats } = useGetQuickStatsQuery(undefined, {
    pollingInterval: 30000, // Refresh every 30 seconds
    skipPollingIfUnfocused: true,
  });

  // Logout mutation
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) setDropdownOpen(false);
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Watch for sidebar changes
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setSidebarOpen(desktop);
    };

    const handleSidebarToggle = () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        const isOpen = sidebar.classList.contains("w-64");
        setSidebarOpen(isOpen);
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(handleSidebarToggle, 100);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const userName = userProfile?.name || "User";
  const userEmail = userProfile?.email || "user@example.com";
  const userRole = userProfile?.role || "Secretary";

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 sm:h-20
      bg-linear-to-r from-blue-50 to-indigo-50/90
      shadow-md border-b border-blue-100
      flex items-center justify-between
      px-4 sm:px-6 md:px-10 md:z-40
      transition-all duration-300 ease-in-out
      lg:left-${sidebarOpen ? "64" : "20"} lg:right-0
      `}
    >
      {/* Left Quick Stats */}
      <div
        className={`flex items-center gap-6 sm:gap-8  ${
          sidebarOpen ? "ml-20 md:ml-[300px]" : "ml-14 md:ml-[130px]"
        }`}
      >
        <div className="text-right">
          <p className="text-xs text-slate-500">Active Cases</p>
          <p className="text-lg font-semibold text-slate-800">
            {quickStats?.data?.activeCases || 0}
          </p>
        </div>
        <div className="text-right whitespace-nowrap">
          <p className="text-xs text-slate-500">Today's Hearings</p>
          <p className="text-lg font-semibold text-slate-800">
            {quickStats?.data?.todayHearings || 0}
          </p>
        </div>
      </div>

      {/* Profile Dropdown */}
      <div className="relative dropdown-container">
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 p-1.5 rounded-2xl 
               bg-white/80 hover:bg-white 
               border border-blue-100
               shadow-sm hover:shadow-md
               transition-all duration-200"
        >
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName
            )}&background=3b82f6&color=fff&bold=true&size=128`}
            alt={`${userName} Avatar`}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-blue-300 shadow-sm object-cover"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-800">{userName}</p>
            <p className="text-xs text-slate-500 capitalize">{userRole}</p>
          </div>
          <ChevronDown
            size={14}
            className={`text-slate-500 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-3 w-52 bg-white/95 border border-blue-100 
                 rounded-2xl shadow-xl py-3 z-50 backdrop-blur-xl"
          >
            <div className="px-4 py-2 border-b border-blue-100">
              <p className="text-xs text-slate-500">Signed in as</p>
              <p className="text-sm font-semibold text-slate-800 truncate">
                {userEmail}
              </p>
            </div>

            <div className="py-2">
              <Link
                to="/my-profile"
                className="flex items-center gap-3 w-full px-4 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 text-sm font-medium"
                onClick={() => setDropdownOpen(false)}
              >
                <User size={16} /> My Profile
              </Link>
            </div>

            <div className="border-t border-blue-100 pt-2">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-3 w-full px-4 py-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut size={16} />
                {isLoggingOut ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;

import { ChevronDown, LogOut, User, Briefcase, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearProfile, selectUserProfile } from "../../auth/authSlice";
import { useLogoutMutation } from "../../auth/api/authApi";
import { useGetDashboardStatsQuery } from "../api/lawyerApi";

const TopBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  const user = useSelector(selectUserProfile); // can be null initially
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  // Fetch quick stats for topbar
  const { data: statsData, isLoading: statsLoading } =
    useGetDashboardStatsQuery();

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
      setSidebarOpen(window.innerWidth >= 1024);
    };

    const handleSidebarToggle = () => {
      const sidebar = document.querySelector("aside");
      if (sidebar) {
        setSidebarOpen(sidebar.classList.contains("w-64"));
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(handleSidebarToggle, 100);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout().unwrap(); // if using RTK Query logout API
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(clearProfile());
      navigate("/login");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 sm:h-20
      bg-linear-to-r from-blue-50 to-indigo-50/90
      shadow-md border-b border-blue-100
      flex items-center justify-between
      px-4 sm:px-6 md:px-10 md:z-40
      transition-all duration-300 ease-in-out
      lg:left-${sidebarOpen ? "64" : "20"} lg:right-0`}
    >
      {/* Left Quick Stats */}
      <div
        className={`flex items-center gap-4 sm:gap-6 ${
          sidebarOpen ? "ml-20 md:ml-[300px]" : "ml-14 md:ml-[130px]"
        }`}
      >
        {/* Active Cases */}
        <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200">
          <Briefcase size={18} className="text-blue-600" />
          <div className="text-left">
            <p className="text-xs text-slate-500">Active Cases</p>
            {statsLoading ? (
              <div className="h-5 w-8 bg-slate-200 animate-pulse rounded"></div>
            ) : (
              <p className="text-lg font-semibold text-slate-800">
                {statsData?.data?.totalAssigned || 0}
              </p>
            )}
          </div>
        </div>

        {/* Today's Hearings */}
        <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200">
          <Calendar size={18} className="text-amber-600" />
          <div className="text-left whitespace-nowrap">
            <p className="text-xs text-slate-500">Upcoming</p>
            {statsLoading ? (
              <div className="h-5 w-8 bg-slate-200 animate-pulse rounded"></div>
            ) : (
              <p className="text-lg font-semibold text-slate-800">
                {statsData?.data?.upcomingHearings?.length || 0}
              </p>
            )}
          </div>
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
            src={`https://ui-avatars.com/api/?name=${
              user?.name || "User"
            }&background=3b82f6&color=fff&bold=true&size=128`}
            alt="User Avatar"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-blue-300 shadow-sm object-cover"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name || ""}
            </p>
            <p className="text-xs text-slate-500">
              {user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : ""}
            </p>
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
                {user?.email || ""}
              </p>
            </div>

            <div className="py-2">
              <Link
                to="/my-profile"
                className="flex items-center gap-3 w-full px-4 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                <User size={16} /> My Profile
              </Link>
            </div>

            <div className="border-t border-blue-100 pt-2">
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="flex items-center gap-3 w-full px-4 py-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 text-sm font-medium"
              >
                <LogOut size={16} />
                {isLoading ? "Logging out..." : "Sign Out"}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;

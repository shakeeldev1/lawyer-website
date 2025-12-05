import { ChevronDown, LogOut, User, Briefcase, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearProfile, selectUserProfile } from "../../auth/authSlice";
import { useLogoutMutation } from "../../auth/api/authApi";
import { useGetDashboardStatsQuery } from "../api/lawyerApi";

const TopBar = () => {
   const [isDropdownOpen, setDropdownOpen] = useState(false);
   const [sidebarExpanded, setSidebarExpanded] = useState(false);

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
         className={`fixed top-0 right-0 h-18 bg-[#A48D66] backdrop-blur-sm
      border-b border-[#dabc89] flex items-center justify-between px-2 md:px-4 z-40 transition-all duration-300
      left-0 pl-16 md:left-14`}
      >
         {/* Left Quick Stats */}
         <div className="flex items-center gap-1 md:gap-3 ">
            {/* Active Cases */}
            <div className="flex items-center gap-1 bg-gray-100 border-2 border-gray-300 rounded-full py-1 px-3 md:px-4">
               <span className="text-[16px] text-slate-500">Active:</span>
               {statsLoading ? (
                  <div className="h-3 w-6 bg-slate-200 animate-pulse rounded"></div>
               ) : (
                  <span className="text-md font-semibold text-slate-800">
                     {statsData?.data?.totalAssigned || 0}
                  </span>
               )}
            </div>

            <div className="h-3 w-px bg-slate-300"></div>

            {/* Upcoming Hearings */}
            <div className="flex items-center gap-1 bg-gray-100 border-2 border-gray-300 rounded-full py-1 px-3 md:px-4">
               <span className="text-[16px] text-slate-500">Upcoming:</span>
               {statsLoading ? (
                  <div className="h-3 w-6 bg-slate-200 animate-pulse rounded"></div>
               ) : (
                  <span className="text-md font-semibold text-slate-800">
                     {statsData?.data?.upcomingHearings?.length || 0}
                  </span>
               )}
            </div>
         </div>

         {/* Profile Dropdown */}
         <div className="relative dropdown-container ">
            <button
               onClick={() => setDropdownOpen(!isDropdownOpen)}
               className="flex items-center gap-1.5 px-2 py-2 rounded-2xl 
               bg-slate-50 hover:bg-slate-100 
               border border-slate-200
               shadow-sm
               transition-all duration-200"
            >
               <img
                  src={`https://ui-avatars.com/api/?name=${
                     user?.name || "User"
                  }&background=475569&color=fff&bold=true&size=128`}
                  alt="User Avatar"
                  className="w-6 h-6 rounded-full border border-slate-300 object-cover"
               />
               <div className="hidden sm:block text-left">
                  <p className="text-[14px] font-semibold text-[#A48D66] leading-tight">
                     {user?.name || ""}
                  </p>
                  <p className="text-[12px] text-[#A48D66] leading-tight">
                     {user?.role
                        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                        : ""}
                  </p>
               </div>
               <ChevronDown
                  size={18}
                  className={`text-slate-500 transition-transform duration-200 ${
                     isDropdownOpen ? "rotate-180" : ""
                  }`}
               />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
               <div
                  className="absolute right-0 mt-1 w-50 bg-white border border-slate-200 
                 rounded shadow-lg py-2 z-50"
               >
                  <div className="px-3 py-1.5 border-b border-slate-200">
                     <p className="text-[12px] text-slate-500">Signed in as</p>
                     <p className="text-[14px] font-semibold text-slate-800 truncate">
                        {user?.email || ""}
                     </p>
                  </div>

                  <div className="py-1">
                     <Link
                        to="/my-profile"
                        className="flex items-center gap-1.5 w-full px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors duration-200 text-[14px] font-medium"
                     >
                        My Profile
                     </Link>
                  </div>

                  <div className="border-t border-slate-200 pt-1">
                     <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="flex items-center gap-1.5 w-full px-3 py-2.5 text-[#A48D66] hover:bg-red-50 hover:text-red-700 transition-colors duration-200 text-[14px] font-medium"
                     >
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

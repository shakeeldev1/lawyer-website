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
   Archive,
   ChevronLeft,
   ChevronRight, // ← added for Archive/Archieve page
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

   useEffect(() => {
      const handleResize = () => {
         const desktop = window.innerWidth >= 768;
         setIsDesktop(desktop);
         if (!desktop) setIsOpen(false);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const links = [
      { name: "Overview", icon: <Home size={16} />, path: ".", end: true },
      {
         name: "My Cases",
         icon: <FileText size={18} />,
         path: "my-cases",
      },
      { name: "Archive", icon: <Archive size={16} />, path: "archieve" },
      {
         name: "Notifications",
         icon: <Bell size={16} />,
         path: "notifications",
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
         {/* Mobile Overlay */}
         {!isDesktop && isOpen && (
            <div
               onClick={() => setIsOpen(false)}
               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            ></div>
         )}

         {/* Toggle Button */}
         <button
            onClick={toggleSidebar}
            className={`fixed top-4 p-3 rounded md:shadow-md z-55
           text-[#A48D66] md:bg-[#A48D66] md:text-white group  hover:bg-[#8f7851] transition-all duration-300
          ${
             isDesktop
                ? isOpen
                   ? "left-38"
                   : "left-2"
                : isOpen
                ? "left-38 top-3 "
                : "left-1.5 top-3"
          }
        `}
            aria-label="Toggle Sidebar"
         >
            {isOpen ? (
               <ChevronLeft
                  size={20}
                  className={`${
                     isDesktop ? "" : "text-[#A48D66] group-hover:text-white"
                  }`}
               />
            ) : (
               <ChevronRight size={20} />
            )}
         </button>

         {/* Sidebar */}
         <aside
            className={`fixed top-0 left-0 h-full border-r border-slate-200
          bg-white
          text-slate-700 shadow-lg transition-all duration-300 ease-in-out z-50
          ${
             isDesktop
                ? isOpen
                   ? "w-52"
                   : "w-15"
                : isOpen
                ? "translate-x-0 w-52"
                : "-translate-x-full w-52"
          }
          flex flex-col
        `}
         >
            {/* Header */}
            <div
               className={`flex items-center h-18 px-2.5 border-b border-slate-200 bg-white ${
                  isOpen ? "justify-start" : "justify-center"
               }`}
            >
               {isOpen && (
                  <div className="transition-all overflow-hidden w-full">
                     <h2 className="text-[14px] font-bold text-slate-800 truncate">
                        Justice Law
                     </h2>
                     <p className="text-[12px] text-slate-500">Lawyer Portal</p>
                  </div>
               )}
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-2 px-2">
               {links.map((link, i) => (
                  <NavLink
                     key={i}
                     to={link.path}
                     end={link.end !== undefined ? link.end : true}
                     onClick={handleLinkClick}
                     className={({ isActive }) =>
                        `flex items-center gap-2 rounded mb-0.5 transition-colors duration-200
                  ${
                     isActive
                        ? "bg-[#A48D66] text-white font-semibold shadow-md"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }
                  ${
                     isOpen
                        ? "justify-start px-2.5 py-3"
                        : "justify-center px-0 py-3 w-full"
                  }
                `
                     }
                  >
                     <div className="shrink-0">{link.icon}</div>
                     {isOpen && (
                        <span className="text-[14px] tracking-wider font-medium truncate">
                           {link.name}
                        </span>
                     )}
                  </NavLink>
               ))}
            </nav>

            {/* Logout Button at Bottom */}
            <div className="px-2 mt-auto mb-2 border-t border-slate-200 pt-2">
               <button
                  onClick={handleLogout}
                  className={`flex items-center w-full ${
                     isOpen ? "justify-start gap-2 px-2.5" : "justify-center"
                  } py-2 text-[#A48D66] hover:bg-[#A48D66] hover:text-white rounded transition-all duration-200`}
               >
                  <div className="shrink-0">
                     <LogOut size={18} />
                  </div>
                  {isOpen && (
                     <span className="text-[16px] font-medium">Logout</span>
                  )}
               </button>
            </div>
         </aside>
      </>
   );
};

export default Sidebar;

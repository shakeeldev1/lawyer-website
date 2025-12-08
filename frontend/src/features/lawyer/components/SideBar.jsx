import { useState, useEffect } from "react";
import {
   Bell,
   Home,
   LogOut,
   FileText,
   Archive,
   ChevronLeft,
   ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
   const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

   useEffect(() => {
      const handleResize = () => {
         const desktop = window.innerWidth >= 768;
         setIsDesktop(desktop);

         if (desktop) {
            setIsOpen(true);
         }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const links = [
      { name: "Overview", icon: <Home size={16} />, path: ".", end: true },
      { name: "My Cases", icon: <FileText size={18} />, path: "my-cases" },
      { name: "Archive", icon: <Archive size={16} />, path: "archieve" },
      { name: "Notifications", icon: <Bell size={16} />, path: "notifications" },
   ];

   const toggleSidebar = () => setIsOpen((prev) => !prev);

   const handleLinkClick = () => {
      if (!isDesktop) setIsOpen(false);
   };

   return (
      <>
         {/* Mobile Overlay */}
         {!isDesktop && isOpen && (
            <div
               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
               onClick={() => setIsOpen(false)}
            ></div>
         )}

         {/* Toggle Button */}
         <button
            onClick={toggleSidebar}
            className={`fixed top-4 p-3 rounded z-[60] text-[#A48D66] 
         bg-white shadow-md hover:bg-[#A48D66] hover:text-white transition-all duration-300
         ${
            isOpen
               ? "left-[160px]"
               : "left-3"
         }`}
         >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
         </button>

         {/* Sidebar */}
         <aside
            className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg 
         transition-all duration-300 z-50 flex flex-col 
         ${isOpen ? "w-52 translate-x-0" : "w-16 -translate-x-0"}
         ${!isDesktop && !isOpen ? "-translate-x-full" : ""}`}
         >
            {/* Header */}
            <div
               className={`h-16 flex items-center px-4 border-b font-bold text-[#A48D66]
            ${isOpen ? "justify-start" : "justify-center"}`}
            >
               {isOpen && (
                  <div>
                     <p className="text-[15px] font-semibold text-slate-800">
                        Justice Law
                     </p>
                     <p className="text-[12px] text-gray-500">Lawyer Portal</p>
                  </div>
               )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-3">
               {links.map((item, index) => (
                  <NavLink
                     key={index}
                     to={item.path}
                     end={item.end}
                     onClick={handleLinkClick}
                     className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 mb-1 transition 
               ${
                  isActive
                     ? "bg-[#A48D66] text-white shadow-md"
                     : "text-gray-600 hover:bg-gray-100"
               }
               ${isOpen ? "justify-start" : "justify-center"}`
                     }
                  >
                     {item.icon}
                     {isOpen && <span className="text-[14px]">{item.name}</span>}
                  </NavLink>
               ))}
            </nav>

            {/* Logout */}
            <button
               onClick={() => console.log("Logging out...")}
               className={`mt-auto mb-3 mx-2 flex items-center py-2 rounded
         text-[#A48D66] hover:bg-[#A48D66] hover:text-white transition
         ${isOpen ? "gap-3 px-4 justify-start" : "justify-center"}`}
            >
               <LogOut size={18} />
               {isOpen && <span className="text-[15px]">Logout</span>}
            </button>
         </aside>
      </>
   );
};

export default Sidebar;

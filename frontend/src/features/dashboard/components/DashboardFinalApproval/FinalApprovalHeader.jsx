import React from "react";
import { Search } from "lucide-react";

const FinalApprovalHeader = ({ onSearch }) => {
  return (
    <div className="mt-20 mb-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-4 border-b border-[#fe9a00]/20">
        
        {/* Left Section - Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C283C] tracking-tight text-center md:text-left">
          Final Approvals — Managing Director
        </h2>

        {/* Right Section - Search Bar */}
        <div className="relative w-full sm:w-[260px] md:w-[300px] max-w-sm mx-auto md:mx-0">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fe9a00] opacity-80"
            size={18}
          />
          <input
            type="text"
            placeholder="Search cases..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[#E1E1E2] text-gray-800 placeholder-gray-500 border border-[#fe9a00]/40 rounded-lg py-2 pl-10 pr-4 
                       focus:outline-none focus:ring-2 focus:ring-[#fe9a00] transition-all duration-300 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Subtitle */}
      <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed text-center md:text-left max-w-3xl">
        Review and approve final cases for court
      </p>
    </div>
  );
};

export default FinalApprovalHeader;

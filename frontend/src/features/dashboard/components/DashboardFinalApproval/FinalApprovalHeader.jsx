import React from "react";
import { Search } from "lucide-react";

const FinalApprovalHeader = ({ onSearch }) => {
  return (
    <div className="mb-10 mt-18">
      {/* ====== Title + Subtitle Section ====== */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-4 border-b border-gray-200">
        {/* ====== Left Section ====== */}
        <div>
          <h2 className="text-3xl font-bold text-[#1c283c] tracking-tight">
            Final Approvals — Managing Director
          </h2>
        

          <p className="mt-3 text-gray-500 text-base leading-relaxed max-w-2xl">
            Review and digitally sign final case memorandums submitted by lawyers 
            before they are officially sent to court.
          </p>
        </div>

        {/* ====== Search Bar ====== */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search cases, clients, or lawyers..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 
                       bg-gradient-to-r from-white to-gray-50 text-gray-700 
                       shadow-sm focus:shadow-md transition-all duration-200 
                       outline-none focus:ring-2 focus:ring-[#fe9a00]/50 
                       focus:border-[#fe9a00]"
          />
        </div>
      </div>
    </div>
  );
};

export default FinalApprovalHeader;

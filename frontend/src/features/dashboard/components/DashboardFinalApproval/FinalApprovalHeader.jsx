import React from "react";
import { Search } from "lucide-react";

const FinalApprovalHeader = ({ onSearch }) => {
  return (
    <div className="flex flex-col gap-6 mb-10 mt-20">
      {/* ====== Header Section ====== */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* ====== Title & Subtitle ====== */}
        <div>
          <h2 className="text-3xl font-bold text-[#1c283c] tracking-tight">
            Final Approvals — Managing Director
          </h2>

          <p className="mt-2 text-gray-500 text-base leading-relaxed max-w-2xl">
            Review and sign final case memorandums submitted by lawyers before submission to court.
          </p>
        </div>

        {/* ====== Search Bar ====== */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Case #, Client, Lawyer, or Stage..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl 
                       bg-white text-gray-700 shadow-sm focus:shadow-md 
                       transition-all duration-200 outline-none 
                       focus:ring-2 focus:ring-[#fe9a00]/50 focus:border-[#fe9a00]"
          />
        </div>
      </div>
    </div>
  );
};

export default FinalApprovalHeader;

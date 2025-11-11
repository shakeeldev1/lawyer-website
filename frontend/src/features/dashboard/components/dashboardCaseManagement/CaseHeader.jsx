// src/components/dashboardCaseManagement/CasesHeader.jsx
import React from "react";
import { Search } from "lucide-react";

const CasesHeader = ({
  searchTerm,
  setSearchTerm,
  filterStage,
  setFilterStage,
  onAddClick,
}) => {
  return (
    <div
      className="mt-20 mb-6 sm:mb-8 
                 flex flex-col md:flex-row 
                 md:items-center md:justify-between 
                 gap-5 sm:gap-6 
                 pb-4 border-b border-[#fe9a00]/20 
                 px-2 sm:px-0"
    >
      {/* ===== Left Section ===== */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight">
          All Cases
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          View, search, and manage all client cases.
        </p>
      </div>

      {/* ===== Right Section (Search + Filter + Add Button) ===== */}
      <div
        className="flex flex-col sm:flex-row flex-wrap 
                   items-stretch sm:items-center 
                   justify-center md:justify-end 
                   gap-3 sm:gap-4 w-full md:w-auto"
      >
        {/* Search Bar */}
        <div className="relative w-full sm:w-[220px] md:w-[260px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fe9a00] opacity-80"
            size={18}
          />
          <input
            type="text"
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-black placeholder-gray-500 
                       border border-[#fe9a00]/40 rounded-lg 
                       py-2 pl-10 pr-4 
                       focus:outline-none focus:ring-2 focus:ring-[#fe9a00] 
                       transition-all duration-300"
          />
        </div>

        {/* Filter Dropdown */}
        <select
          className="bg-[#E1E1E2] text-gray-800 
                     border border-[#fe9a00]/40 rounded-lg 
                     px-3 py-2 w-full sm:w-auto
                     focus:outline-none focus:ring-2 focus:ring-[#fe9a00] 
                     transition-all duration-300"
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
        >
          <option value="All">All Stages</option>
          <option value="Main Case">Main Case</option>
          <option value="Appeal">Appeal</option>
          <option value="Cassation">Cassation</option>
        </select>

        {/* Add Button */}
        <button
          onClick={onAddClick}
          className="bg-slate-700 text-white 
                     px-5 py-2 rounded-lg font-semibold 
                     hover:bg-slate-800 shadow-sm 
                     transition-all duration-200 
                     w-full sm:w-auto"
        >
          + Add Case
        </button>
      </div>
    </div>
  );
};

export default CasesHeader;

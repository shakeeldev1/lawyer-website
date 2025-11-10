// src/components/DashboardReminders/RemindersHeader.jsx
import React from "react";
import { Search } from "lucide-react";

const RemindersHeader = ({ search, setSearch, onAddClick }) => {
  return (
    <div className="mt-16 md:mt-20 mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-4 border-b border-[#fe9a00]/20">
      {/* ===== Left Section ===== */}
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1C283C] tracking-tight">
          Reminders
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Manage, review, and track all case-related reminders efficiently.
        </p>
      </div>

      {/* ===== Right Section ===== */}
      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
        {/* Search Bar */}
        <div className="relative w-full sm:w-[260px] lg:w-[280px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fe9a00] opacity-80"
            size={18}
          />
          <input
            type="text"
            placeholder="Search reminders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#E1E1E2] text-black placeholder-gray-500 border border-[#fe9a00]/40 rounded-lg 
                       py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#fe9a00] transition-all duration-300
                       text-sm sm:text-base"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={onAddClick}
          className="bg-[#FE9A00] text-[#1C283C] px-5 py-2 rounded-lg font-semibold hover:bg-[#ffb733] 
                     shadow-sm transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
        >
          + Add Reminder
        </button>
      </div>
    </div>
  );
};

export default RemindersHeader;

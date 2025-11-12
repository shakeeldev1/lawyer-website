// src/components/ArchiveComponents/ArchiveSearch.jsx
import React from "react";
import { Search, Filter } from "lucide-react";

const ArchiveSearch = ({ search, onSearchChange }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4 max-w-4xl">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search cases by number, client name, or archive reference..."
            className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-100 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 text-gray-700 placeholder-gray-500"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3.5 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm text-gray-700 font-medium">
          <Filter size={18} />
          Filters
        </button>
      </div>
    </div>
  );
};

export default ArchiveSearch;
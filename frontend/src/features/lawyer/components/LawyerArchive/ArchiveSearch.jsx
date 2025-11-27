// src/components/ArchiveComponents/ArchiveSearch.jsx
import React from "react";
import { Search, Filter } from "lucide-react";

const ArchiveSearch = ({ search, onSearchChange }) => {
  return (
    <div className="mb-3">
      <div className="relative w-full xs:w-56">
        <Search size={12} className="absolute left-2 top-2 text-slate-400" />
        <input
          type="text"
          placeholder="Search archives..."
          className="w-full pl-7 pr-2 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-slate-400 focus:outline-none text-xs"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ArchiveSearch;

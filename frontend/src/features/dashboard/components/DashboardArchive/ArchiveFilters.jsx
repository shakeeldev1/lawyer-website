import { Search, Filter } from "lucide-react";

const ArchiveFilters = ({ filters, onFilterChange, onClearFilters, showFilters }) => {
  return (
    <div className={`rounded-2xl shadow-lg p-4 mb-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        
        {/* Search Client */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-amber-500" size={18} />
          <input
            type="text"
            placeholder="Search Client"
            value={filters.searchClient}
            onChange={(e) => onFilterChange("searchClient", e.target.value)}
            className="w-full p-2 pl-10 bg-gray-200  text-gray-500 rounded-lg border border-amber-500
            focus:outline-none  focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Search Case ID */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-amber-500" size={18} />
          <input
            type="text"
            placeholder="Search Case ID"
            value={filters.searchCaseId}
            onChange={(e) => onFilterChange("searchCaseId", e.target.value)}
            className="w-full p-2 pl-10 bg-gray-200  text-gray-500 rounded-lg border border-amber-500
            focus:outline-none  focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Stage Select */}
        <select
          value={filters.stage}
          onChange={(e) => onFilterChange("stage", e.target.value)}
          className=" p-2 bg-gray-200  text-gray-500 rounded-lg border border-amber-500
            focus:outline-none  focus:ring-1 focus:ring-amber-500"
        >
          <option value="">All Stages</option>
          <option value="Main">Main</option>
          <option value="Appeal">Appeal</option>
          <option value="Cassation">Cassation</option>
        </select>

        {/* Status Select */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="p-2 bg-gray-200  text-gray-500 rounded-lg border border-amber-500
            focus:outline-none  focus:ring-1 focus:ring-amber-500"
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Date */}
        <input
          type="date"
          value={filters.date}
          onChange={(e) => onFilterChange("date", e.target.value)}
          className="p-2 bg-gray-200  text-gray-500 rounded-lg border border-amber-500 focus:outline-none  focus:ring-1 focus:ring-amber-500"
        />

        {/* Clear Button */}
        <button
          onClick={onClearFilters}
          className="flex items-center gap-2 px-4 py-2 bg-[#1C2B4A] text-white font-medium rounded-lg border border-transparent hover:border-amber-500 transition-all duration-300"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ArchiveFilters;

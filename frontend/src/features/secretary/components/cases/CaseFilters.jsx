import React, { useState, useEffect } from "react";
import dummyCases from "../../../../data/dummyCases";

const CaseFilters = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    status: "",
    lawyer: "",
    search: "",
  });

  // Unique lawyers from dummyCases
  const lawyerOptions = [...new Set(dummyCases.map((c) => c.case.assignedLawyer))];

  // Call onFilterChange whenever filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]); // Add filters and onFilterChange as dependencies

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // onFilterChange will be automatically called by the useEffect
  };

  const handleClear = () => {
    const cleared = { status: "", lawyer: "", search: "" };
    setFilters(cleared);
    onClearFilters?.();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-wrap gap-4 items-end">
      {/* Search */}
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="text-gray-600 mb-1 text-sm font-medium">Search</label>
        <input
          type="text"
          placeholder="Client name or Case ID"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col min-w-[150px]">
        <label className="text-gray-600 mb-1 text-sm font-medium">Status</label>
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Closed">Closed</option>
          <option value="Main Stage Ongoing">Main Stage Ongoing</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* Lawyer */}
      <div className="flex flex-col min-w-[150px]">
        <label className="text-gray-600 mb-1 text-sm font-medium">Lawyer</label>
        <select
          value={filters.lawyer}
          onChange={(e) => handleChange("lawyer", e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Lawyers</option>
          {lawyerOptions.map((lawyer) => (
            <option key={lawyer} value={lawyer}>
              {lawyer}
            </option>
          ))}
        </select>
      </div>

      {/* Clear button */}
      <button
        onClick={handleClear}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all h-10 font-medium"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default CaseFilters;

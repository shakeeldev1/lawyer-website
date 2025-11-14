// import React, { useState, useEffect } from "react";

// const CaseFilters = ({ onFilterChange, onClearFilters }) => {
//   const [filters, setFilters] = useState({
//     status: "",
//     lawyer: "",
//     dateFrom: "",
//     dateTo: "",
//     search: "",
//   });

//   // Send filter changes to parent
//   useEffect(() => {
//     onFilterChange(filters);
//   }, [filters, onFilterChange]);

//   const handleChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleClear = () => {
//     const cleared = { status: "", lawyer: "", dateFrom: "", dateTo: "", search: "" };
//     setFilters(cleared);
//     onClearFilters?.();
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-wrap gap-4 items-end">
//       {/* Search */}
//       <div className="flex flex-col flex-1">
//         <label className="text-gray-600 mb-1">Search</label>
//         <input
//           type="text"
//           placeholder="Client or Case ID"
//           value={filters.search}
//           onChange={(e) => handleChange("search", e.target.value)}
//           className="border px-3 py-1 rounded-lg w-full"
//         />
//       </div>
      
//       {/* Status */}
//       <div className="flex flex-col">
//         <label className="text-gray-600 mb-1">Status</label>
//         <select
//           value={filters.status}
//           onChange={(e) => handleChange("status", e.target.value)}
//           className="border px-3 py-1 rounded-lg"
//         >
//           <option value="">All</option>
//           <option value="Approved">Approved</option>
//           <option value="Pending">Pending</option>
//           <option value="Rejected">Rejected</option>
//         </select>
//       </div>

//       {/* Lawyer */}
//       <div className="flex flex-col">
//         <label className="text-gray-600 mb-1">Lawyer</label>
//         <select
//           value={filters.lawyer}
//           onChange={(e) => handleChange("lawyer", e.target.value)}
//           className="border px-3 py-1 rounded-lg"
//         >
//           <option value="">All</option>
//           <option value="Sara Ahmed">Sara Ahmed</option>
//           <option value="John Doe">John Doe</option>
//         </select>
//       </div>

      
      


//       {/* Clear */}
//       <button
//         onClick={handleClear}
//         className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all h-10"
//       >
//         Clear Filters
//       </button>
//     </div>
//   );
// };

// export default CaseFilters;


// 

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

  useEffect(() => {
    onFilterChange(filters);
  }, []);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    const cleared = { status: "", lawyer: "", search: "" };
    setFilters(cleared);
    onClearFilters?.();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-wrap gap-4 items-end">
      {/* Search */}
      <div className="flex flex-col flex-1">
        <label className="text-gray-600 mb-1">Search</label>
        <input
          type="text"
          placeholder="Client or Case ID"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="border px-3 py-1 rounded-lg w-full"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col">
        <label className="text-gray-600 mb-1">Status</label>
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="border px-3 py-1 rounded-lg"
        >
          <option value="">All</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Submitted">Submitted</option>
        </select>
      </div>

      {/* Lawyer */}
      <div className="flex flex-col">
        <label className="text-gray-600 mb-1">Lawyer</label>
        <select
          value={filters.lawyer}
          onChange={(e) => handleChange("lawyer", e.target.value)}
          className="border px-3 py-1 rounded-lg"
        >
          <option value="">All</option>
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
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all h-10"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default CaseFilters;

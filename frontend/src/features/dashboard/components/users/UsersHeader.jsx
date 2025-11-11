import React from "react";
import { FaUserPlus, FaSearch } from "react-icons/fa";

const UsersHeader = ({ search, setSearch, onAdd }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      
      {/* Search Box */}
      <div className="relative w-full md:w-64 ">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search by name or email"
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-md shadow-slate-800
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200 placeholder-gray-400 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add User Button */}
      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-lg
                   hover:bg-slate-800 transition-colors duration-200 shadow-sm"
      >
        <FaUserPlus /> Add User
      </button>
    </div>
  );
};

export default UsersHeader;

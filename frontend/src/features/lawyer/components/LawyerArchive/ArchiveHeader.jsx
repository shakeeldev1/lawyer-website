// src/components/ArchiveComponents/ArchiveHeader.jsx
import React from "react";
import { Archive } from "lucide-react";

const ArchiveHeader = ({ caseCount }) => {
  return (
    <div className="mb-8 mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
         
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Case Archives
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Secure repository for completed and archived legal proceedings
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-4 py-3 rounded-xl shadow-sm">
          <div className="text-sm font-semibold text-blue-900">
            {caseCount} archived case{caseCount !== 1 ? 's' : ''}
          </div>
          <div className="text-xs text-blue-700 mt-1">
            Ready for review & download
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveHeader;
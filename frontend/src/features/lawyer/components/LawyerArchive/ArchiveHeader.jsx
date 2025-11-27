// src/components/ArchiveComponents/ArchiveHeader.jsx
import React from "react";
import { Archive } from "lucide-react";

const ArchiveHeader = ({ caseCount }) => {
  return (
    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-3 gap-2">
      <div>
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          Case Archives
        </h2>
        <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5">
          {caseCount} archived case{caseCount !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default ArchiveHeader;

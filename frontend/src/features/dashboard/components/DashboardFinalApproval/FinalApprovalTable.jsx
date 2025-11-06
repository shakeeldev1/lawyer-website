import React from "react";
import { Eye } from "lucide-react";

const FinalApprovalTable = ({ cases, onView }) => {
  return (
    <div className="overflow-x-auto mt-10 bg-[#1c283c] text-white shadow-2xl rounded-2xl border border-[#fe9a00]/20">
      <table className="min-w-full text-sm">
        {/* Table Header */}
        <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
          <tr>
            <th className="px-6 py-4 text-left">Case #</th>
            <th className="px-6 py-4 text-left">Client</th>
            <th className="px-6 py-4 text-left">Lawyer</th>
            <th className="px-6 py-4 text-left">Stage</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {cases.map((c) => (
            <tr
              key={c.id}
              className="border-t border-[#fe9a00]/10 hover:bg-[#2a3b58] transition-all duration-200"
            >
              <td className="px-6 py-4">{c.caseNumber}</td>
              <td className="px-6 py-4">{c.clientName}</td>
              <td className="px-6 py-4">{c.lawyer}</td>
              <td className="px-6 py-4">{c.stage}</td>

              {/* Status Badge */}
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${c.status === "Pending Review"
                      ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                      : c.status === "Approved & Signed"
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                >
                  {c.status}
                </span>
              </td>

              {/* View Button */}
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onView(c)}
                  className="flex items-center justify-center gap-2 text-[#fe9a00] hover:text-white 
                  hover:bg-[#fe9a00]/20 px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Subtle Gradient Footer Bar */}
         <div className="h-[3px] w-full bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00] rounded-b-2xl" />
    </div>
  );
};

export default FinalApprovalTable;

// src/components/FinalApprovalTable.jsx
import React from "react";
import { Eye, Trash2 } from "lucide-react";

const FinalApprovalTable = ({ cases, onView, onDelete }) => {
  return (
    <div className="bg-white text-[#24344f] shadow-2xl rounded-2xl border border-[#fe9a00]/20 overflow-hidden">
      {/* ===== Desktop View ===== */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm min-w-[700px] border-collapse">
            <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Case #</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Lawyer</th>
                <th className="px-4 py-3 text-left">Stage</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Last Updated</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {cases.map((c) => (
                <tr
                  key={c.id}
                  className="border-t whitespace-normal border-[#fe9a00]/10 hover:bg-[#f9f9f9] transition-all duration-200"
                >
                  <td className="px-4 py-3 break-words">{c.caseNumber}</td>
                  <td className="px-4 py-3 break-words">{c.clientName}</td>
                  <td className="px-4 py-3 break-words">{c.lawyer}</td>
                  <td className="px-4 py-3 break-words">{c.stage}</td>
                  <td className="px-4 py-3 break-words">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        c.status === "Pending Review"
                          ? "bg-yellow-500/20 text-yellow-800 border border-yellow-500/30"
                          : c.status === "Approved & Signed"
                          ? "bg-green-500/20 text-green-800 border border-green-500/30"
                          : "bg-red-500/20 text-red-800 border border-red-500/30"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 break-words">{c.lastUpdated}</td>
                  <td className="px-4 py-3 text-center flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => onView(c)}
                      className="flex items-center justify-center gap-1 text-[#fe9a00] hover:text-white hover:bg-[#fe9a00]/90 px-3 py-1.5 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>

                    <button
                      onClick={() => onDelete(c)}
                      className="flex items-center justify-center gap-1 text-red-600 hover:text-white hover:bg-red-600/90 px-3 py-1.5 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Mobile View (Card Layout) ===== */}
      <div className="lg:hidden flex flex-col gap-4 p-4">
        {cases.map((c) => (
          <div
            key={c.id}
            className="bg-[#f9f9f9] border border-[#fe9a00]/30 rounded-2xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl hover:border-[#fe9a00]/60"
          >
            {/* Header: Case Number + Status */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-slate-800 tracking-wide">
                {c.caseNumber}
              </h2>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  c.status === "Pending Review"
                    ? "bg-yellow-500/20 text-yellow-600 border border-yellow-500/30"
                    : c.status === "Approved & Signed"
                    ? "bg-green-500/20 text-green-600 border border-green-500/30"
                    : "bg-red-500/20 text-red-600 border border-red-500/30"
                }`}
              >
                {c.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-800 break-words">
              <p>
                <span className="font-semibold text-gray-800">Client:</span>{" "}
                {c.clientName}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Lawyer:</span>{" "}
                {c.lawyer}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Stage:</span>{" "}
                {c.stage}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Updated:</span>{" "}
                {c.lastUpdated}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-center mt-4 gap-3 flex-wrap">
              <button
                onClick={() => onView(c)}
                className="flex items-center gap-1 bg-[#fe9a00]/10 text-[#fe9a00] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#fe9a00]/20 hover:text-amber-950 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Eye className="w-4 h-4" /> View
              </button>

              <button
                onClick={() => onDelete(c)}
                className="flex items-center gap-1 bg-red-600/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600/20 hover:text-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Accent Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00]" />
    </div>
  );
};

export default FinalApprovalTable;

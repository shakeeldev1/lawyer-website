import React from "react";
import { Eye, Edit, Trash } from "lucide-react";

const ArchiveTable = ({ archives, onView, onEdit, onDelete, sidebarOpen }) => {
  if (archives.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 text-center text-slate-500">
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl mb-2">📁</div>
            <p className="text-lg font-medium">No archived cases found</p>
            <p className="text-sm">Try adjusting your filters or search terms</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white text-[#24344f] shadow-2xl rounded-2xl border border-[#fe9a00]/20 overflow-hidden transition-all duration-300
        ${sidebarOpen ? "max-w-4xl " : "max-w-6xl"}`}
    >
      {/* ===== Desktop View ===== */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="min-w-full text-sm">
            <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide  text-xs font-semibold">
              <tr className="widespace-nowrap">
                <th className="px-6 py-4 text-left">Archive ID</th>
                <th className="px-6 py-4 text-left">Case ID</th>
                <th className="px-6 py-4 text-left">Client</th>
                <th className="px-6 py-4 text-left">Case Type</th>
                <th className="px-6 py-4 text-left">Stage</th>
                <th className="px-6 py-4 text-left">Lawyer</th>
                <th className="px-6 py-4 text-left">Approved By</th>
                <th className="px-6 py-4 text-left">Date Archived</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {archives.map((a) => (
                <tr
                  key={a.id}
                  className="border-t border-[#fe9a00]/10 hover:bg-[#E1E1E2] transition-all duration-200"
                >
                  <td className="px-6 py-4 font-medium">{a.archiveId}</td>
                  <td className="px-6 py-4 font-medium">{a.id}</td>
                  <td className="px-6 py-4">{a.client}</td>
                  <td className="px-6 py-4">{a.caseType}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${a.stage === "Main"
                          ? "bg-blue-500/20 text-blue-800 border border-blue-500/30"
                          : a.stage === "Appeal"
                          ? "bg-purple-500/20 text-purple-800 border border-purple-500/30"
                          : "bg-orange-500/20 text-orange-800 border border-orange-500/30"
                        }`}
                    >
                      {a.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4">{a.lawyer}</td>
                  <td className="px-6 py-4">{a.approvedBy || "Ragab"}</td>
                  <td className="px-6 py-4">{a.archivedOn}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border
                        ${a.status === "Approved"
                          ? "bg-green-500/20 text-green-800 border-green-500/30"
                          : a.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-800 border-yellow-500/30"
                          : "bg-red-500/20 text-red-800 border-red-500/30"
                        }`}
                    >
                      {a.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <button
                      onClick={() => onView(a)}
                      className="flex items-center justify-center gap-2 text-[#fe9a00] hover:text-white hover:bg-[#fe9a00]/80 px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>

                    <button
                      onClick={() => onEdit(a)}
                      className="flex items-center justify-center gap-2 text-[#24344f] hover:text-white hover:bg-[#24344f]/80 px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>

                    <button
                      onClick={() => onDelete(a)}
                      className="flex items-center justify-center gap-2 text-red-600 hover:text-white hover:bg-red-600/80 px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                    >
                      <Trash className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Mobile View (Card Layout) ===== */}
      <div className="lg:hidden flex flex-col gap-4 ">
        {archives.map((a) => (
          <div
            key={a.id}
            className="bg-[#E1E1E2] w-[300px] ml-7 mt-5 border border-[#fe9a00]/30 rounded-2xl shadow-lg p-3 transition-all duration-300 hover:shadow-xl hover:border-[#fe9a00]/60"
          >
            {/* Header: Archive ID + Status */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-slate-800 tracking-wide">
                #{a.archiveId}
              </h2>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium
                  ${a.status === "Approved"
                    ? "bg-green-500/20 text-green-600 border border-green-500/30"
                    : a.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-600 border border-yellow-500/30"
                    : "bg-red-500/20 text-red-600 border border-red-500/30"
                  }`}
              >
                {a.status}
              </span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-800">
              <p><span className="font-semibold">Client:</span> {a.client}</p>
              <p><span className="font-semibold">Case Type:</span> {a.caseType}</p>
              <p><span className="font-semibold">Stage:</span> {a.stage}</p>
              <p><span className="font-semibold">Lawyer:</span> {a.lawyer}</p>
              <p><span className="font-semibold">Approved By:</span> {a.approvedBy || "Ragab"}</p>
              <p><span className="font-semibold">Archived On:</span> {a.archivedOn}</p>
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => onView(a)}
                className="flex items-center gap-2 bg-[#fe9a00]/10 text-[#fe9a00] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#fe9a00]/20 hover:text-white transition-all duration-200"
              >
                <Eye className="w-4 h-4" /> View
              </button>

              <button
                onClick={() => onEdit(a)}
                className="flex items-center gap-2 bg-[#24344f]/10 text-[#24344f] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#24344f]/20 hover:text-white transition-all duration-200"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>

              <button
                onClick={() => onDelete(a)}
                className="flex items-center gap-2 bg-red-600/10 text-red-400 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-red-600/20 hover:text-gray-800 transition-all duration-200"
              >
                <Trash className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Accent Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00]" />
    </div>
  );
};

export default ArchiveTable;

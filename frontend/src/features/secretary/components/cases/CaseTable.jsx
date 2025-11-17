


import React from "react";
import { Archive, Eye, Trash2, Edit } from "lucide-react";

const CaseTable = ({ cases, onArchive, sidebarOpen, onEditCase, onViewCase, onDeleteCase }) => {

  // Badge helpers
  const getStageBadge = (stage) => {
    switch (stage) {
      case "Main":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Appeal":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "Cassation":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Approved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border border-red-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      case "Main Stage Ongoing":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Archived":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  if (!cases.length) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-slate-500">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl mb-2">📁</div>
          <p className="text-lg font-medium">No cases found</p>
          <p className="text-sm">Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl text-[#24344f] w-[360px] shadow-2xl border border-[#fe9a00]/20 sm:w- transition-all duration-300
        ${sidebarOpen ? "lg:w-[960px] md:w-[500px]" : "lg:w-[1130px] md:w-[690px]"
        }`}>
      {/* Desktop/Tablet Table */}
      <div className="overflow-x-auto rounded-2xl custom-scrollbar">
        <table className="text-sm">
          <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white uppercase tracking-wide text-xs font-semibold whitespace-nowrap">
            <tr>
              <th className="px-6 py-4 text-left">Case ID</th>
              <th className="px-6 py-4 text-left">Client</th>
              <th className="px-6 py-4 text-left">Contact</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Case Type</th>
              <th className="px-6 py-4 text-left">Stage</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Lawyer</th>
              <th className="px-6 py-4 text-left">Hearing Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => {
              const lastStage =
                c.case.stages && c.case.stages.length > 0
                  ? c.case.stages[c.case.stages.length - 1].stage
                  : c.case.stage || "N/A";
              
              // Fix: Only disable archive for already archived cases
              const isArchived = c.case.status === "Archived";
              const canArchive = !isArchived;

              return (
                <tr key={c.id} className="border-t border-[#fe9a00]/10 hover:bg-[#E1E1E2] transition-all duration-200 whitespace-nowrap">
                  <td className="px-6 py-4 font-medium">{c.id}</td>
                  <td className="px-6 py-4">{c.client.name}</td>
                  <td className="px-6 py-4">{c.client.contact}</td>
                  <td className="px-6 py-4">{c.client.email}</td>
                  <td className="px-6 py-4">{c.case.caseType}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStageBadge(
                        lastStage
                      )}`}
                    >
                      {lastStage}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(c.case.status)}`}>
                      {c.case.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{c.case.assignedLawyer}</td>
                  <td className="px-6 py-4">{c.case.hearingDate}</td>
                  <td className="px-4 py-4 flex justify-center gap-2 flex-nowrap">
                    <button
                      onClick={() => onViewCase?.(c.id)}
                      className="flex items-center gap-1 bg-[#24344f] text-white px-2 py-1.5 rounded hover:bg-indigo-700"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEditCase?.(c.id)}
                      className="flex items-center gap-1 bg-green-600 text-white px-2 py-1.5 rounded hover:bg-green-700"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => onArchive?.(c.id)} 
                      className={`flex items-center gap-1 px-2 py-1.5 rounded transition-all ${
                        canArchive 
                          ? "bg-gray-500 text-white hover:bg-gray-700" 
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!canArchive}
                      title={isArchived ? "Case already archived" : "Archive case"}
                    >
                      <Archive size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteCase?.(c.id)}
                      className="flex items-center gap-1 bg-red-500 text-white px-2 py-1.5 rounded hover:bg-red-700" 
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseTable;
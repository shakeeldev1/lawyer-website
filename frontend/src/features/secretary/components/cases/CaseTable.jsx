import React from "react";
import { FileText, File, PlusCircle, Archive } from "lucide-react";

const CaseTable = ({ cases, onAddStage, onArchive, onUploadDocs, sidebarOpen }) => {

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
      case "Submitted":
        return "bg-gray-100 text-gray-800 border border-gray-200";
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
      className={`bg-white text-[#24344f] shadow-2xl rounded-2xl border border-[#fe9a00]/20 transition-all duration-300
       ${
        sidebarOpen ? "lg:w-[920px] md:w-[400px]" : "lg:w-full md:w-[480px]"
      }`}>
      {/* Desktop/Tablet Table */}
      <div className="overflow-x-auto">
        <table className="text-sm ">
          <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 text-left">Case ID</th>
              <th className="px-6 py-4 text-left">Client</th>
              <th className="px-6 py-4 text-left">Stage</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Lawyer</th>
              <th className="px-6 py-4 text-left">Lawyer</th>
              <th className="px-6 py-4 text-left">Hearing Date</th>
            
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="border-t border-[#fe9a00]/10 hover:bg-[#E1E1E2] transition-all duration-200">
                <td className="px-6 py-4 font-medium">{c.id}</td>
                <td className="px-6 py-4">{c.client}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStageBadge(c.stage)}`}>{c.stage}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(c.status)}`}>{c.status}</span>
                </td>
                <td className="px-6 py-4">{c.lawyer}</td>
                <td className="px-6 py-4">{c.lawyer}</td>
                <td className="px-6 py-4">{c.hearingDate}</td> 
                <td className="px-6 py-4 flex justify-center gap-2 flex-nowrap">
                  <button onClick={() => onUploadDocs(c.id)} className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700">
                    <FileText size={16} /> Upload
                  </button>
                  <button onClick={() => onAddStage(c.id)} className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700" disabled={c.status !== "Submitted"}>
                    <PlusCircle size={16} /> Stage
                  </button>
                  <button onClick={() => onArchive(c.id)} className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700" disabled={c.status !== "Submitted"}>
                    <Archive size={16} /> Archive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseTable;

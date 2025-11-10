import React from "react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  "Sent to Ragab": "bg-blue-100 text-blue-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const CasesTable = ({ cases, onSelectCase }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E1E1E2] p-8">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">My Assigned Cases</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-slate-100 text-slate-700 uppercase tracking-wide">
            <tr>
              {["Case Number", "Client Name", "Stage", "Status", "Action"].map((header, idx) => (
                <th key={idx} className="py-3 px-4 text-left font-semibold border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cases?.length > 0 ? (
              cases.map((c, idx) => (
                <tr
                  key={c.id}
                  className={`transition hover:bg-slate-50 ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                  onClick={() => onSelectCase(c)}
                >
                  <td className="py-3 px-4 border-b text-gray-800 font-medium">{c.caseNumber}</td>
                  <td className="py-3 px-4 border-b text-gray-700">{c.clientName}</td>
                  <td className="py-3 px-4 border-b text-gray-700">{c.stage}</td>
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[c.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No cases assigned.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CasesTable;

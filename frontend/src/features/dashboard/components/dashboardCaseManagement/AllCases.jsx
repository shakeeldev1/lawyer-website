import React, { useState } from "react";
import { Search, Filter, ChevronDown, Eye } from "lucide-react";

const AllCases = () => {
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);

  const cases = [
    {
      id: 1,
      caseNumber: "C-2025-001",
      clientName: "Ahmed Ali",
      lawyer: "Ragab",
      status: "Approved",
      lastUpdate: "2025-11-02",
    },
    {
      id: 2,
      caseNumber: "C-2025-002",
      clientName: "Mariam Hassan",
      lawyer: "Sara",
      status: "Pending",
      lastUpdate: "2025-11-03",
    },
  ];

  const filtered = cases.filter(
    (c) =>
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 mt-24 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Cases</h1>
        <p className="text-gray-600">Managing Director — View and track all cases</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-5 rounded-2xl shadow border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by client or case number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Case No.</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Client</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Lawyer</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Last Update</th>
              <th className="p-4 text-center text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 border-b">
                <td className="p-4 font-medium">{c.caseNumber}</td>
                <td className="p-4">{c.clientName}</td>
                <td className="p-4">{c.lawyer}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      c.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-4">{c.lastUpdate}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => setSelectedCase(c)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mx-auto"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-500">No cases found</div>
        )}
      </div>

      {/* View Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative">
            <h3 className="text-xl font-bold mb-4">Case Details</h3>
            <p><strong>Case No:</strong> {selectedCase.caseNumber}</p>
            <p><strong>Client:</strong> {selectedCase.clientName}</p>
            <p><strong>Lawyer:</strong> {selectedCase.lawyer}</p>
            <p><strong>Status:</strong> {selectedCase.status}</p>
            <p><strong>Last Update:</strong> {selectedCase.lastUpdate}</p>
            <button
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-800 font-bold"
              onClick={() => setSelectedCase(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCases;

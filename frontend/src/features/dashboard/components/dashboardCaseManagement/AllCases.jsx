import React, { useState } from "react";
import { Search, Eye, X } from "lucide-react";
import CaseTimeline from "./CaseTimeline"; // ✅ Make sure you have this component

const AllCases = ({ casesData = [] }) => {
  // Dummy fallback data
  const dummyCases = [
    {
      id: 1,
      caseNumber: "C-2025-001",
      clientName: "Ahmed Ali",
      stage: "Main Case",
      lawyer: "Lawyer A",
      status: "Submitted",
      lastUpdated: "2025-11-05",
      stages: [
        {
          title: "Main Case",
          lawyer: "Lawyer A",
          status: "Submitted",
          approvedByRagab: true,
          directorSigned: false,
          hearingDate: "2025-11-10",
          documentsCount: 4,
          lastUpdated: "2025-11-05",
        },
      ],
    },
    {
      id: 2,
      caseNumber: "C-2025-002",
      clientName: "Sara Khan",
      stage: "Appeal",
      lawyer: "Lawyer B",
      status: "Awaiting Approval",
      lastUpdated: "2025-11-06",
      stages: [
        {
          title: "Appeal",
          lawyer: "Lawyer B",
          status: "Awaiting Approval",
          approvedByRagab: false,
          directorSigned: false,
          hearingDate: "2025-11-20",
          documentsCount: 2,
          lastUpdated: "2025-11-06",
        },
      ],
    },
  ];

  const allCases = casesData.length > 0 ? casesData : dummyCases;
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("All");
  const [selectedCase, setSelectedCase] = useState(null);

  const filteredCases = allCases.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === "All" || c.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="p-8 bg-[#f8f9fb] min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1C283C]">All Cases</h1>
        <p className="text-gray-600 mt-1">
          View, search, and manage all client cases. Admins can also add and assign new cases.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <div className="flex gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by client or case number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-[#FE9A00]"
            />
          </div>

          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FE9A00]"
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
          >
            <option value="All">All Stages</option>
            <option value="Main Case">Main Case</option>
            <option value="Appeal">Appeal</option>
            <option value="Cassation">Cassation</option>
          </select>
        </div>

        {/* Add Case Button (for Admin authority) */}
        <button className="bg-[#FE9A00] text-white px-5 py-2 rounded-md font-medium hover:bg-[#e68a00] transition-all">
          + Add New Case
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto mt-4 bg-[#1C283C] text-white shadow-2xl rounded-2xl border border-[#fe9a00]/20">
        <table className="min-w-full text-sm">
          <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 text-left">Case #</th>
              <th className="px-6 py-4 text-left">Client</th>
              <th className="px-6 py-4 text-left">Lawyer</th>
              <th className="px-6 py-4 text-left">Stage</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Last Updated</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCases.map((c) => (
              <tr
                key={c.id}
                className="border-t border-[#fe9a00]/10 hover:bg-[#2a3b58] transition-all duration-200"
              >
                <td className="px-6 py-4">{c.caseNumber}</td>
                <td className="px-6 py-4">{c.clientName}</td>
                <td className="px-6 py-4">{c.lawyer}</td>
                <td className="px-6 py-4">{c.stage}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      c.status === "Submitted"
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : c.status === "Awaiting Approval"
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4">{c.lastUpdated}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setSelectedCase(c)}
                    className="flex items-center justify-center gap-2 text-[#fe9a00] hover:text-white hover:bg-[#fe9a00]/20 px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="h-[3px] w-full bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00] rounded-b-2xl" />
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-6 text-gray-500">No cases found.</div>
      )}

      {/* Timeline Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-3xl relative">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#1C283C] mb-1">
                Case Timeline
              </h2>
              <p className="text-gray-600 mb-4">
                Detailed progress and approvals for case {selectedCase.caseNumber}
              </p>
              <CaseTimeline
                caseData={selectedCase}
                onBack={() => setSelectedCase(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCases;

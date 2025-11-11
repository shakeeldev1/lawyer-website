import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";

const RecentCasesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const recentCases = [
    {
      id: "C-2024-001",
      caseName: "Johnson vs State Corporation",
      client: "Robert Johnson",
      type: "Civil Litigation",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "C-2024-002",
      caseName: "Smith Property Dispute",
      client: "Michael Smith",
      type: "Real Estate",
      status: "Pending Approval",
      priority: "Medium",
    },
    {
      id: "C-2024-003",
      caseName: "Davis Contract Breach",
      client: "Jennifer Davis",
      type: "Corporate Law",
      status: "Document Review",
      priority: "High",
    },
    {
      id: "C-2024-004",
      caseName: "Miller Estate Planning",
      client: "James Miller",
      type: "Family Law",
      status: "Completed",
      priority: "Low",
    },
    {
      id: "C-2024-005",
      caseName: "Wilson Employment Case",
      client: "Patricia Wilson",
      type: "Labor Law",
      status: "In Progress",
      priority: "Medium",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-[#fe9a00]/10 text-[#fe9a00]";
      case "Pending Approval":
        return "bg-[#1c283c]/10 text-[#1c283c]";
      case "Document Review":
        return "bg-gray-100 text-gray-800";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCases = recentCases.filter(
    (caseItem) =>
      caseItem.caseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:mt-20 mt-10 transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1c283c]">
          Recent Cases
        </h2>

        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fe9a00] opacity-80"
            size={18}
          />
          <input
            type="text"
            placeholder="Search cases..."
            className="w-full bg-[#E1E1E2] text-black placeholder-gray-500 border border-[#fe9a00]/40 rounded-lg py-2 pl-10 pr-4 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-[#fe9a00] transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden border border-gray-100 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-[#1c283c] text-white">
            <tr>
              <th className="text-left py-3 px-5 font-semibold">Case ID</th>
              <th className="text-left py-3 px-5 font-semibold">Case Name</th>
              <th className="text-left py-3 px-5 font-semibold">Type</th>
              <th className="text-left py-3 px-5 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredCases.map((caseItem, index) => (
              <tr
                key={index}
                className="hover:bg-[#fe9a00]/5 transition-all duration-200"
              >
                <td className="py-4 px-5 text-[#1c283c]/80 font-medium font-mono">
                  {caseItem.id}
                </td>
                <td className="py-4 px-5">
                  <div>
                    <p className="font-semibold text-[#1c283c]">
                      {caseItem.caseName}
                    </p>
                    <p className="text-xs text-gray-500">{caseItem.client}</p>
                  </div>
                </td>
                <td className="py-4 px-5 text-[#1c283c]/70">
                  {caseItem.type}
                </td>
                <td className="py-4 px-5">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      caseItem.status
                    )}`}
                  >
                    {caseItem.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredCases.map((caseItem, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm font-semibold text-[#1c283c]/80">
                {caseItem.id}
              </span>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                  caseItem.status
                )}`}
              >
                {caseItem.status}
              </span>
            </div>
            <p className="font-semibold text-[#1c283c]">
              {caseItem.caseName}
            </p>
            <p className="text-xs text-gray-500 mb-2">{caseItem.client}</p>
            <div className="flex items-center justify-between mt-2 text-sm">
              <span className="text-[#1c283c]/70">{caseItem.type}</span>
              <button className="text-[#fe9a00] hover:text-[#1c283c] text-xs font-medium flex items-center gap-1">
                View <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-5 border-t border-gray-100 gap-2">
        <p className="text-sm text-gray-500">
          Showing <b>{filteredCases.length}</b> of{" "}
          <b>{recentCases.length}</b> cases
        </p>
        <button className="flex items-center gap-2 text-sm font-medium text-[#fe9a00] hover:text-[#1c283c] transition-all">
          View All Cases
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default RecentCasesTable;

import { useState } from "react";
import { Search, MoreVertical, Eye, Edit, ArrowUp } from "lucide-react";

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
      assignedTo: "Sarah Wilson",
      lastUpdated: "2024-01-15",
      nextHearing: "2024-02-10"
    },
    {
      id: "C-2024-002",
      caseName: "Smith Property Dispute",
      client: "Michael Smith",
      type: "Real Estate",
      status: "Pending Approval",
      priority: "Medium",
      assignedTo: "David Brown",
      lastUpdated: "2024-01-14",
      nextHearing: "2024-02-05"
    },
    {
      id: "C-2024-003",
      caseName: "Davis Contract Breach",
      client: "Jennifer Davis",
      type: "Corporate Law",
      status: "Document Review",
      priority: "High",
      assignedTo: "Sarah Wilson",
      lastUpdated: "2024-01-13",
      nextHearing: "2024-01-25"
    },
    {
      id: "C-2024-004",
      caseName: "Miller Estate Planning",
      client: "James Miller",
      type: "Family Law",
      status: "Completed",
      priority: "Low",
      assignedTo: "Emily Chen",
      lastUpdated: "2024-01-12",
      nextHearing: "N/A"
    },
    {
      id: "C-2024-005",
      caseName: "Wilson Employment Case",
      client: "Patricia Wilson",
      type: "Labor Law",
      status: "In Progress",
      priority: "Medium",
      assignedTo: "David Brown",
      lastUpdated: "2024-01-11",
      nextHearing: "2024-01-30"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending Approval": return "bg-amber-100 text-amber-800";
      case "Document Review": return "bg-purple-100 text-purple-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-amber-100 text-amber-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCases = recentCases.filter(caseItem =>
    caseItem.caseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-800">Recent Cases</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search cases..."
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Case ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Case Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Priority</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCases.map((caseItem, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-4">
                  <span className="font-mono text-sm text-slate-600">{caseItem.id}</span>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-slate-800">{caseItem.caseName}</p>
                    <p className="text-sm text-slate-500">{caseItem.client}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-slate-600">{caseItem.type}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                    {caseItem.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(caseItem.priority)}`}>
                    {caseItem.priority}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600">
          Showing {filteredCases.length} of {recentCases.length} cases
        </p>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
          View All Cases
          <ArrowUp size={16} className="rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default RecentCasesTable;
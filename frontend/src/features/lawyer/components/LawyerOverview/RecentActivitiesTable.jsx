// src/components/lawyer/RecentActivitiesTable.jsx
import React from "react";
import { FileText, Clock, CheckCircle } from "lucide-react";
import { Link } from 'react-router-dom';

const recentActivitiesData = [
  { 
    caseId: "C-001", 
    activity: "Memorandum Submitted", 
    stage: "Main Case", 
    date: "2025-11-01",
    status: "completed",
    icon: <CheckCircle className="w-4 h-4" />
  },
  { 
    caseId: "C-002", 
    activity: "Revision Requested by Ragab", 
    stage: "Appeal", 
    date: "2025-11-03",
    status: "pending",
    icon: <Clock className="w-4 h-4" />
  },
  { 
    caseId: "C-003", 
    activity: "New Case Assigned", 
    stage: "Main Case", 
    date: "2025-11-05",
    status: "new",
    icon: <FileText className="w-4 h-4" />
  },
];

const getStatusColors = (status) => {
  switch (status) {
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-blue-50 text-blue-700 border-blue-200";
  }
};

const RecentActivitiesTable = () => {
  return (
    <div className="bg-[#E1E1E2] p-6 rounded-2xl shadow-md border border-slate-200 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-800">Recent Activities</h2>
        <span className="text-sm text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-300 shadow-sm">
          {recentActivitiesData.length} total
        </span>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl overflow-hidden">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Case
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Activity
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Stage
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                Date
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentActivitiesData.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50 transition-all duration-200"
              >
                <td className="px-5 py-4 flex items-center gap-3 font-semibold text-slate-800">
                  <div className={`p-2 rounded-lg shadow-sm ${
                    item.status === "completed"
                      ? "bg-emerald-500 text-white"
                      : item.status === "pending"
                      ? "bg-amber-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}>
                    {item.icon}
                  </div>
                  {item.caseId}
                </td>
                <td className="px-5 py-4 text-slate-700 font-medium">
                  {item.activity}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColors(
                      item.status
                    )}`}
                  >
                    {item.stage}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600">{item.date}</td>
                <td className="px-5 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColors(
                      item.status
                    )}`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {recentActivitiesData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  item.status === "completed"
                    ? "bg-emerald-500 text-white"
                    : item.status === "pending"
                    ? "bg-amber-500 text-white"
                    : "bg-blue-500 text-white"
                }`}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{item.caseId}</p>
                  <p className="text-sm text-slate-600">{item.stage}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">{item.date}</span>
            </div>
            <p className="text-slate-700 font-medium">{item.activity}</p>
            <div className="mt-3 flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColors(
                  item.status
                )}`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
              <span className="text-xs text-slate-400">
                {item.status === "pending" ? "Action required" : "Completed"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <Link to ="my-cases" className="w-full py-2 flex justify-end  text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors duration-200 ">
          View All Activities →
        </Link>
      </div>
    </div>
  );
};

export default RecentActivitiesTable;

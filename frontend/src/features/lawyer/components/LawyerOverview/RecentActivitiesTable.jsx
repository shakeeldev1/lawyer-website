// src/components/lawyer/RecentActivitiesTable.jsx
import React from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetDashboardStatsQuery } from "../../api/lawyerApi";

const getActivityIcon = (action) => {
  switch (action) {
    case "MEMORANDUM_SUBMITTED":
    case "MEMORANDUM_APPROVED":
      return <CheckCircle className="w-4 h-4" />;
    case "MEMORANDUM_REJECTED":
      return <XCircle className="w-4 h-4" />;
    case "CASE_ACCEPTED":
      return <FileText className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getActivityStatus = (action) => {
  switch (action) {
    case "MEMORANDUM_APPROVED":
      return "completed";
    case "MEMORANDUM_REJECTED":
      return "rejected";
    case "MEMORANDUM_SUBMITTED":
      return "pending";
    default:
      return "new";
  }
};

const getStatusColors = (status) => {
  switch (status) {
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "rejected":
      return "bg-red-50 text-red-700 border-red-200";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-blue-50 text-blue-700 border-blue-200";
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const RecentActivitiesTable = () => {
  const { data, isLoading, isError } = useGetDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="bg-[#E1E1E2] p-6 rounded-2xl shadow-md border border-slate-200 h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-800"></div>
          <p className="text-slate-600 font-medium">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#E1E1E2] p-6 rounded-2xl shadow-md border border-slate-200">
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <div>
              <p className="font-medium">Failed to load activities</p>
              <p className="text-sm text-red-500">
                Please try refreshing the page
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const recentActivitiesData =
    data?.data?.recentActivity?.map((activity) => ({
      caseId: activity.caseId?.caseNumber || "N/A",
      activity: activity.description || activity.action,
      stage: activity.action,
      date: formatDate(activity.timestamp || activity.createdAt),
      status: getActivityStatus(activity.action),
      icon: getActivityIcon(activity.action),
    })) || [];

  if (recentActivitiesData.length === 0) {
    return (
      <div className="bg-[#E1E1E2] p-6 rounded-2xl shadow-md border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Recent Activities
        </h2>
        <div className="bg-white p-8 rounded-xl text-center">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">No recent activities</p>
          <p className="text-slate-500 text-sm mt-1">
            Your recent case activities will appear here
          </p>
        </div>
      </div>
    );
  }

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
                  <div
                    className={`p-2 rounded-lg shadow-sm ${
                      item.status === "completed"
                        ? "bg-emerald-500 text-white"
                        : item.status === "rejected"
                        ? "bg-red-500 text-white"
                        : item.status === "pending"
                        ? "bg-amber-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {item.caseId}
                </td>
                <td className="px-5 py-4 text-slate-700 font-medium">
                  {item.activity}
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
                <div
                  className={`p-2 rounded-lg ${
                    item.status === "completed"
                      ? "bg-emerald-500 text-white"
                      : item.status === "rejected"
                      ? "bg-red-500 text-white"
                      : item.status === "pending"
                      ? "bg-amber-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{item.caseId}</p>
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
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <Link
          to="my-cases"
          className="w-full py-2 flex justify-end  text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors duration-200 "
        >
          View All Activities →
        </Link>
      </div>
    </div>
  );
};

export default RecentActivitiesTable;

// src/components/dashboard/RecentActivity.jsx
import React from "react";

export default function RecentActivity({ recentActivities }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          Last 24 hours
        </span>
      </div>

      {recentActivities && recentActivities.length > 0 ? (
        <ul className="space-y-4">
          {recentActivities.map((a) => (
            <li
              key={a._id || a.id}
              className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
            >
              <div className="w-2 h-2 bg-[#FE9A00] rounded-full mt-2 shrink-0"></div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{a.activity}</p>
                <p className="text-gray-500 text-sm mt-1">{a.time}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">No recent activity</p>
          <p className="text-gray-400 text-sm mt-1">
            Activity logs will appear here as you work with cases and clients
          </p>
        </div>
      )}
    </div>
  );
}

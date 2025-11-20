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
      <ul className="space-y-4">
        {recentActivities.map((a) => (
          <li
            key={a._id || a.id}
            className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
          >
            <div className="w-2 h-2 bg-[#FE9A00] rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">{a.activity}</p>
              <p className="text-gray-500 text-sm mt-1">{a.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

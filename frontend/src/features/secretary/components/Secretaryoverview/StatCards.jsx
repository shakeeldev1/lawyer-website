// src/components/dashboard/StatCards.jsx
import React from "react";

export default function StatCards({ metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="bg-white text-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:translate-y-1 transition-transform duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{m.title}</p>
              <p className="text-2xl font-bold mt-2 text-gray-900">{m.value}</p>
            </div>
            <div className="text-[#FE9A00] bg-orange-50 p-3 rounded-lg flex items-center justify-center">
              {m.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

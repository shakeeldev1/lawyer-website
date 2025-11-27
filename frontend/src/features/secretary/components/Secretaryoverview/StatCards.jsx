// src/components/dashboard/StatCards.jsx
import React from "react";

export default function StatCards({ metrics }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="bg-white text-gray-800 rounded-lg p-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium text-slate-600">
                {m.title}
              </p>
              <p className="text-lg font-bold mt-1 text-slate-900">{m.value}</p>
            </div>
            <div className="text-slate-600 bg-slate-100 p-1.5 rounded-md flex items-center justify-center">
              {React.cloneElement(m.icon, { size: 16 })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

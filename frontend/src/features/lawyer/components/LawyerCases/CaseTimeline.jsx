import React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const CaseTimeline = ({ stages }) => {
  if (!stages || stages.length === 0) return null;

  const icon = {
    Approved: <CheckCircle className="text-green-600 w-6 h-6" />,
    Rejected: <XCircle className="text-red-600 w-6 h-6" />,
    Pending: <Clock className="text-yellow-500 w-6 h-6" />,
  };

  return (
    <div className="bg-white border border-[#E1E1E2] rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Case Timeline</h3>
      <div className="flex items-center justify-between flex-wrap gap-6">
        {stages.map((stage, idx) => (
          <div key={idx} className="relative flex-1 min-w-[140px] text-center">
            {idx !== 0 && (
              <div className="absolute top-3 left-[-50%] w-full h-[2px] bg-gray-300 z-0" />
            )}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 shadow-inner mb-2">
                {icon[stage.status] || icon.Pending}
              </div>
              <span className="font-medium text-slate-800">{stage.stage}</span>
              {stage.hearingDate && (
                <span className="text-xs text-gray-500">{stage.hearingDate}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseTimeline;

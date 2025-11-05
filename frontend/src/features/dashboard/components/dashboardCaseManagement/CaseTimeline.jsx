import React from "react";
import { ArrowLeft, Clock } from "lucide-react";

const CaseTimeline = ({ caseData, onBack }) => {
  const stages = [
    {
      title: "Main Case",
      status: "Submitted",
      date: "2025-11-02",
      description: "Initial case submission to court.",
    },
    {
      title: "Appeal",
      status: "In Progress",
      date: "2025-11-10",
      description: "Appeal documents under review.",
    },
    {
      title: "Cassation",
      status: "Pending",
      date: "2025-11-18",
      description: "Awaiting cassation hearing date.",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Cases
      </button>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {caseData.caseNumber} — {caseData.clientName}
        </h2>
        <p className="text-gray-600 mb-6">
          Lawyer: <span className="font-medium">{caseData.lawyer}</span> | Stage:{" "}
          <span className="font-medium">{caseData.stage}</span>
        </p>

        <div className="relative border-l-4 border-blue-500 pl-6 space-y-6">
          {stages.map((stage, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-3 top-2 w-5 h-5 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-blue-900">{stage.title}</h3>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      stage.status === "Submitted"
                        ? "bg-green-100 text-green-800"
                        : stage.status === "In Progress"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" /> {stage.date}
                </div>
                <p className="text-gray-700 mt-2">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseTimeline;

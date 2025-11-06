import React from "react";
import { ArrowLeft, CheckCircle, Clock, Scale } from "lucide-react";

const CaseTimeline = ({ caseData, onBack }) => {
  // Dummy fallback data for testing
  const dummyData = {
    caseNumber: "C-2025-001",
    stages: [
      {
        title: "Main Case",
        lawyer: "Lawyer A",
        status: "Submitted",
        approvedByRagab: true,
        directorSigned: true,
        documentsCount: 5,
        hearingDate: "2025-11-10",
        lastUpdated: "2025-11-05",
      },
      {
        title: "Appeal",
        lawyer: "Lawyer B",
        status: "Awaiting Approval",
        approvedByRagab: false,
        directorSigned: false,
        documentsCount: 3,
        hearingDate: "",
        lastUpdated: "2025-11-06",
      },
      {
        title: "Cassation",
        lawyer: "Lawyer C",
        status: "In Progress",
        approvedByRagab: false,
        directorSigned: false,
        documentsCount: 2,
        hearingDate: "",
        lastUpdated: "2025-11-07",
      },
    ],
  };

  // Use provided caseData or fallback to dummyData
  const caseInfo = caseData || dummyData;
  const stages = caseInfo.stages || [];

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={18} /> Back to All Cases
      </button>

      <h2 className="text-xl font-bold mb-4">
        Case Timeline – {caseInfo.caseNumber}
      </h2>

      <div className="space-y-6">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className="relative bg-white border rounded-lg shadow p-5"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Scale size={18} /> {stage.title}
              </h3>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  stage.status === "Submitted"
                    ? "bg-green-100 text-green-700"
                    : stage.status === "Awaiting Approval"
                    ? "bg-yellow-100 text-yellow-700"
                    : stage.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {stage.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>Lawyer:</strong> {stage.lawyer}
                </p>
                <p>
                  <strong>Ragab Approval:</strong>{" "}
                  {stage.approvedByRagab ? (
                    <CheckCircle className="inline text-green-600" size={14} />
                  ) : (
                    <Clock className="inline text-gray-400" size={14} />
                  )}
                </p>
                <p>
                  <strong>Director Signature:</strong>{" "}
                  {stage.directorSigned ? (
                    <CheckCircle className="inline text-green-600" size={14} />
                  ) : (
                    <Clock className="inline text-gray-400" size={14} />
                  )}
                </p>
              </div>

              <div>
                <p>
                  <strong>Hearing Date:</strong> {stage.hearingDate || "—"}
                </p>
                <p>
                  <strong>Documents:</strong> {stage.documentsCount} files
                </p>
                <p>
                  <strong>Last Updated:</strong> {stage.lastUpdated}
                </p>
              </div>
            </div>

            {idx < stages.length - 1 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gray-300 bottom-[-1.5rem]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseTimeline;

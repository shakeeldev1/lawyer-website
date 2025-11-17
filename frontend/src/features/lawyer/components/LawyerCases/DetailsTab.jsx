import React from "react";
import StatusPill from "./StatusPill";

export default function DetailsTab({ selectedCase }) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      
      {/* Left Panel: Case Info */}
      <div className="flex-1 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 text-white px-5 py-3 font-semibold text-lg">
          Case Details
        </div>
        <div className="p-5 space-y-4 text-slate-800">
          <div className="flex justify-between">
            <span className="font-medium">Case Number:</span>
            <span className="text-slate-600">{selectedCase.caseNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Client:</span>
            <span className="text-slate-600">{selectedCase.clientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Case Type:</span>
            <span className="text-slate-600">{selectedCase.caseType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Assigned Stage:</span>
            <StatusPill status={selectedCase.assignedStage} />
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Assigned Date:</span>
            <span className="text-slate-600">{selectedCase.assignedDate || "—"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Status:</span>
            <StatusPill status={selectedCase.status} />
          </div>
        </div>
      </div>

      {/* Right Panel: Stage Summary */}
      <div className="flex-1 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 text-white px-5 py-3 font-semibold text-lg">
          Stage Timeline
        </div>
        <div className="p-5 flex flex-col gap-3 max-h-[500px] overflow-y-auto">
          {selectedCase.stages.map((stage, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              <div>
                <div className="text-slate-800 font-medium">{stage.type}</div>
                <div className="text-slate-500 text-sm">{stage.date || "—"}</div>
              </div>
              <div>
                {stage.completed ? (
                  <StatusPill status="Approved" />
                ) : (
                  <StatusPill status="Pending Lawyer Review" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

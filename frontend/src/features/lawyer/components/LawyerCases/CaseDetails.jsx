import React, { useState } from "react";
import {
  X, Upload, Download, Calendar, FileText, MessageSquare,
  CheckCircle, AlertCircle, UploadCloud, Lock
} from "lucide-react";

const statusColors = {
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Submitted: "bg-blue-100 text-blue-800 border-blue-200",
  Approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Locked: "bg-slate-100 text-slate-800 border-slate-200",
};

const statusIcons = {
  Pending: <AlertCircle size={16} className="text-amber-600" />,
  Submitted: <UploadCloud size={16} className="text-blue-600" />,
  Approved: <CheckCircle size={16} className="text-emerald-600" />,
  Locked: <Lock size={16} className="text-slate-600" />,
};

export default function CaseDetails({ selectedCase, onClose, updateCases, cases }) {
  const [memoFile, setMemoFile] = useState(null);

  const handleUploadMemo = (caseId, stageIndex) => {
    if (!memoFile) return alert("Select a file first");
    const updatedCases = cases.map((c) => {
      if (c.id === caseId) {
        const updatedStages = c.stages.map((s, i) => {
          if (i === stageIndex && s.memorandum.status === "Pending") {
            return {
              ...s,
              memorandum: { 
                ...s.memorandum, 
                file: memoFile.name, 
                status: "Submitted", 
                ragabFeedback: "Pending" 
              },
            };
          }
          return s;
        });
        return { ...c, stages: updatedStages };
      }
      return c;
    });
    updateCases(updatedCases);
    setMemoFile(null);
  };

  // Show Main stage always; others only if previous stage approved/submitted/applied
  const visibleStages = selectedCase.stages.filter((s, i, arr) => {
    if (i === 0) return true;
    const prevStage = arr[i - 1];
    return prevStage.memorandum.status === "Submitted" ||
           prevStage.memorandum.status === "Approved" ||
           s.applied;
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl z-10 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-slate-800 truncate">Case: {selectedCase.caseNumber}</h3>
            <p className="text-slate-600 mt-1 truncate">{selectedCase.clientName}</p>
          </div>
          <button onClick={onClose} className="flex-shrink-0 ml-4 p-2 hover:bg-slate-100 rounded-full">
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {visibleStages.map((stage, index) => (
            <div key={index} className="relative border border-slate-200 rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200">
              {/* Stage indicator */}
              <div className="absolute -left-3 top-6 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white">
                {index + 1}
              </div>

              {/* Stage header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-800">{stage.stage} Stage</p>
                    <div className="flex items-center gap-2 mt-1 text-slate-600">
                      <Calendar size={16} />
                      <span className="text-sm">Hearing: {stage.hearingDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border flex items-center gap-2 ${statusColors[stage.memorandum.status]}`}>
                    {statusIcons[stage.memorandum.status]}
                    <span>{stage.memorandum.status}</span>
                  </span>
                </div>
              </div>

              {/* Documents */}
              <div className="mb-4">
                <h4 className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <FileText size={16} />
                  Secretary Documents
                </h4>
                {stage.secretaryDocuments.length ? (
                  <div className="flex flex-wrap gap-2">
                    {stage.secretaryDocuments.map((doc, docIndex) => (
                      <button key={docIndex} className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm">
                        <Download size={14} />
                        {doc}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm italic">No documents available</p>
                )}
              </div>

              {/* Status details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <MessageSquare size={18} className="text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">Ragab Feedback</p>
                    <p className="font-medium text-slate-800">{stage.memorandum.ragabFeedback || "Waiting for feedback"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <CheckCircle size={18} className="text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">MD Signed</p>
                    <p className={`font-medium ${stage.memorandum.mdSigned ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {stage.memorandum.mdSigned ? "Approved and Signed" : "Pending Signature"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload Memo */}
              {stage.memorandum.status === "Pending" && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-3 flex items-center gap-2">
                    <Upload size={18} />
                    Upload Memorandum
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="file"
                      onChange={(e) => setMemoFile(e.target.files[0])}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                    <button
                      onClick={() => handleUploadMemo(selectedCase.id, index)}
                      disabled={!memoFile}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow disabled:cursor-not-allowed"
                    >
                      <Upload size={18} />
                      Upload File
                    </button>
                  </div>
                  {memoFile && <p className="text-sm text-slate-600 mt-2">Selected: <span className="font-medium">{memoFile.name}</span></p>}
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow"
          >
            Close Case Details
          </button>
        </div>
      </div>
    </div>
  );
}

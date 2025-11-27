import React from "react";
import {
  X,
  FileText,
  Clock,
  CheckCircle,
  Shield,
  Download,
} from "lucide-react";

const ViewCaseModal = ({ caseData, onClose }) => {
  console.log("ViewCaseModal rendered with caseData:", caseData);

  if (!caseData) {
    console.log("No caseData - returning null");
    return null;
  }

  const { client, case: caseInfo } = caseData;

  return (
    <div className="fixed inset-0 !z-[10000] flex items-center justify-center px-4 sm:px-6 py-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-lg shadow-lg z-10 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 text-white rounded-t-lg px-4 py-3 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <div>
              <h2 className="text-sm font-semibold">{client.name}</h2>
              <p className="text-slate-300 text-[10px]">
                {client.contact} | {client.email} | {caseInfo.caseType}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Case Info */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 text-[10px] text-slate-600 flex flex-wrap gap-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {caseInfo.filingDate}
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            {caseInfo.status}
          </span>
          <span className="flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {caseInfo.assignedLawyer}
          </span>
        </div>

        {/* Body Content */}
        <div className="p-3 space-y-3">
          {/* Stages */}
          {caseInfo.stages?.map((stage, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm"
            >
              {/* Stage Header */}
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2 mb-2">
                <div className="flex-1">
                  <h3 className="text-xs font-semibold text-slate-800 mb-1">
                    Stage {idx + 1}: {stage.stage}
                  </h3>
                  <div className="space-y-0.5 text-[10px] text-slate-600">
                    <p className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {stage.submittedOn}
                    </p>
                    <p className="line-clamp-1">{stage.description}</p>
                    <p className="line-clamp-1">{stage.outcome}</p>
                    {stage.approvedBy && <p>Approved: {stage.approvedBy}</p>}
                  </div>
                </div>

                {/* Stage Badges */}
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200">
                    <Clock size={10} /> Pending
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200">
                    <Shield size={10} /> Signed
                  </span>
                </div>
              </div>

              {/* Memorandum */}
              {stage.memorandum && (
                <div className="mb-2">
                  <h4 className="font-semibold text-slate-700 text-[10px] mb-1 flex items-center gap-1">
                    <FileText size={10} /> Memorandum
                  </h4>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
                    <span className="text-[10px] text-slate-700 truncate max-w-[70%]">
                      {stage.memorandum.name}
                    </span>
                    <a
                      href={stage.memorandum.url}
                      className="p-1 text-slate-600 hover:text-blue-600 rounded transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Download"
                    >
                      <Download size={12} />
                    </a>
                  </div>
                </div>
              )}

              {/* Evidence */}
              {stage.evidence?.length > 0 && (
                <div className="mb-2">
                  <h4 className="font-semibold text-slate-700 text-[10px] mb-1 flex items-center gap-1">
                    <Shield size={10} /> Evidence ({stage.evidence.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {stage.evidence.map((e, i) => (
                      <div
                        key={i}
                        className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between items-center"
                      >
                        <span className="text-[10px] text-slate-700 truncate max-w-[70%]">
                          {e.name}
                        </span>
                        <a
                          href={e.url}
                          className="p-1 text-slate-600 hover:text-blue-600 rounded transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Download"
                        >
                          <Download size={12} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Case Documents */}
          {caseInfo.documents?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <h4 className="font-semibold text-slate-800 text-xs mb-2 flex items-center gap-1">
                <FileText size={12} /> Case Documents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {caseInfo.documents.map((doc, i) => (
                  <div
                    key={i}
                    className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between items-center"
                  >
                    <span className="text-[10px] text-slate-700 truncate max-w-[70%]">
                      {doc.name}
                    </span>
                    <a
                      href={doc.url}
                      className="p-1 text-slate-600 hover:text-blue-600 rounded transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Download"
                    >
                      <Download size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Case Description */}
          {caseInfo.description && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <h4 className="font-semibold text-slate-800 text-xs mb-1 flex items-center gap-1">
                <FileText size={12} /> Description
              </h4>
              <p className="text-slate-700 text-[10px] leading-relaxed">
                {caseInfo.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 rounded-b-lg px-4 py-2 flex justify-between items-center gap-2">
          <span className="text-[10px] text-slate-600">
            {(caseInfo.stages || []).length} stage
            {(caseInfo.stages || []).length !== 1 ? "s" : ""} •{" "}
            {caseInfo.documents?.length || 0} docs
          </span>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 border border-slate-300 text-slate-700 rounded text-xs hover:bg-white transition"
            >
              Close
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-slate-700 text-white rounded text-xs hover:bg-slate-800 transition">
              <Download size={12} /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCaseModal;

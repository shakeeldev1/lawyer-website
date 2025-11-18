import React from "react";
import { X, FileText, Clock, CheckCircle, Shield, Download } from "lucide-react";

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
        className="absolute inset-0 bg-black/70 backdrop-blur transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-3xl max-h-[60vh] lg:max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl z-10 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-t-2xl px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-800 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-semibold">
                {client.name}
              </h2>
              <p className="text-yellow-200 text-xs sm:text-sm">
                Contact: {client.contact} | Email: {client.email}
              </p>
              <p className="text-yellow-200 text-xs sm:text-sm">
                Case Type: {caseInfo.caseType}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Case Info */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" /> 
            Filing Date: {caseInfo.filingDate}
          </span>
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-500" /> 
            Status: {caseInfo.status}
          </span>
          <span className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" /> 
            Lawyer: {caseInfo.assignedLawyer}
          </span>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Stages */}
          {caseInfo.stages?.map((stage, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Stage Header */}
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">
                    Stage {idx + 1}: {stage.stage}
                  </h3>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Submitted On: {stage.submittedOn}</span>
                    </p>
                    <p><strong>Description:</strong> {stage.description}</p>
                    <p><strong>Outcome:</strong> {stage.outcome}</p>
                    {stage.approvedBy && (
                      <p><strong>Approved By:</strong> {stage.approvedBy}</p>
                    )}
                  </div>
                </div>

                {/* Stage Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 bg-yellow-100 text-yellow-800">
                    <Clock size={14} /> Pending
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 bg-blue-100 text-blue-800">
                    <Shield size={14} /> Director Signed
                  </span>
                </div>
              </div>

              {/* Memorandum */}
              {stage.memorandum && (
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-2">
                    <FileText size={16} className="text-yellow-500" /> 
                    Memorandum
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-800 truncate max-w-[70%]">
                        {stage.memorandum.name}
                      </span>
                      <a
                        href={stage.memorandum.url}
                        className="p-2 text-slate-600 hover:text-yellow-500 hover:bg-slate-100 rounded-lg transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Download"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Evidence */}
              {stage.evidence?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-2">
                    <Shield size={16} className="text-yellow-500" /> 
                    Evidence ({stage.evidence.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {stage.evidence.map((e, i) => (
                      <div
                        key={i}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex justify-between items-center"
                      >
                        <span className="text-sm sm:text-base text-slate-800 truncate max-w-[70%]">
                          {e.name}
                        </span>
                        <a
                          href={e.url}
                          className="p-2 text-slate-600 hover:text-yellow-500 hover:bg-slate-100 rounded-lg transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Download"
                        >
                          <Download size={16} />
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
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
              <h4 className="font-semibold text-slate-800 text-lg mb-4 flex items-center gap-2">
                <FileText size={18} className="text-yellow-500" /> 
                Case Documents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseInfo.documents.map((doc, i) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <span className="text-sm sm:text-base text-slate-800 truncate max-w-[70%]">
                      {doc.name}
                    </span>
                    <a
                      href={doc.url}
                      className="p-2 text-slate-600 hover:text-yellow-500 hover:bg-slate-100 rounded-lg transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Download"
                    >
                      <Download size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Case Description */}
          {caseInfo.description && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
              <h4 className="font-semibold text-slate-800 text-lg mb-3 flex items-center gap-2">
                <FileText size={18} className="text-yellow-500" /> 
                Case Description
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {caseInfo.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 rounded-b-2xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-xs sm:text-sm text-slate-800">
            Total: {(caseInfo.stages || []).length} stage
            {(caseInfo.stages || []).length !== 1 ? "s" : ""} • 
            {caseInfo.documents?.length || 0} documents
          </span>

          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
            >
              Close
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-yellow-700 text-white rounded-lg font-medium hover:bg-yellow-800 transition shadow-sm">
              <Download size={16} /> Download All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCaseModal;
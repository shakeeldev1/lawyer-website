import React from "react";
import {
  X,
  FileText,
  Clock,
  CheckCircle,
  Shield,
  Download,
} from "lucide-react";

const ViewCaseModal = ({ viewModal, setViewModal }) => {
  if (!viewModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 sm:px-6 py-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur transition-opacity"
        onClick={() => setViewModal(null)}
      ></div>

      <div className="relative bg-white w-full max-w-3xl max-h-[60vh] lg:max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl z-10 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-t-2xl px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-800 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-semibold">
                {viewModal.clientId?.name || "Unknown Client"}
              </h2>
              <p className="text-yellow-200 text-xs sm:text-sm">
                Client Number: {viewModal.clientId?.contactNumber || "N/A"} |{" "}
                {viewModal.caseType || "N/A"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setViewModal(null)}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* 🔵 NEW — FULL CASE DETAILS BLOCK */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            Case Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
            <p>
              <strong>Archive ID:</strong> {viewModal._id?.slice(-6) || "N/A"}
            </p>
            <p>
              <strong>Case Number:</strong> {viewModal.caseNumber || "N/A"}
            </p>

            <p>
              <strong>Client Name:</strong> {viewModal.clientId?.name || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {viewModal.clientId?.contactNumber || "N/A"}
            </p>

            <p>
              <strong>Email:</strong> {viewModal.clientId?.email || "N/A"}
            </p>
            <p>
              <strong>National ID:</strong>{" "}
              {viewModal.clientId?.nationalId || "N/A"}
            </p>

            <p>
              <strong>Address:</strong> {viewModal.clientId?.address || "N/A"}
            </p>
            <p>
              <strong>Additional Info:</strong>{" "}
              {viewModal.clientId?.additionalInfo || "N/A"}
            </p>

            <p>
              <strong>Case Type:</strong> {viewModal.caseType || "N/A"}
            </p>
            <p>
              <strong>Lawyer:</strong>{" "}
              {viewModal.assignedLawyer?.name || "Unassigned"}
            </p>

            <p>
              <strong>Archived Date:</strong>{" "}
              {viewModal.archivedAt
                ? new Date(viewModal.archivedAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Body Content – Stages */}
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {(viewModal.stages || []).map((stage, sIdx) => (
            <div
              key={sIdx}
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                    Stage {sIdx + 1}: {stage.stage || "Unnamed Stage"}
                  </h3>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">
                      Locked / Completed Date: {stage.hearingDate || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 ${
                      stage.memorandums?.every((m) => m.approved)
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {stage.memorandums?.every((m) => m.approved) ? (
                      <CheckCircle size={14} />
                    ) : (
                      <Clock size={14} />
                    )}
                    {stage.memorandums?.every((m) => m.approved)
                      ? "Approved"
                      : "Pending"}
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 bg-blue-100 text-blue-800">
                    <Shield size={14} /> Director Signed
                  </span>
                </div>
              </div>

              {/* Memorandums */}
              {stage.memorandums?.length > 0 && (
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stage.memorandums.map((m, i) => (
                    <div
                      key={i}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex justify-between items-center"
                    >
                      <span className="text-sm sm:text-base text-slate-800 truncate max-w-[70%]">
                        {m.name || "Unnamed Memo"}
                      </span>
                      <a
                        href={m.downloadLink || "#"}
                        className="p-2 text-slate-600 hover:text-yellow-500 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* Documents */}
              {stage.documents?.length > 0 && (
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stage.documents.map((doc, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex justify-between items-center"
                    >
                      <span className="text-sm sm:text-base text-slate-800 truncate max-w-[70%]">
                        {doc.name || "Unnamed Document"}
                      </span>
                      <a
                        href={doc.downloadLink || "#"}
                        className="p-2 text-slate-600 hover:text-yellow-500 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Notifications */}
          {(viewModal.notifications || []).length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
                <FileText size={16} className="text-yellow-500" /> Notifications
                & Logs
              </h4>
              <div className="space-y-2">
                {viewModal.notifications.map((n, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-lg border border-slate-200 text-slate-800 shadow-sm text-xs sm:text-sm"
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 rounded-b-2xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-xs sm:text-sm text-slate-800">
            Total: {(viewModal.stages || []).length} stage
            {(viewModal.stages || []).length !== 1 ? "s" : ""} archived
          </span>

          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => setViewModal(null)}
              className="px-5 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
            >
              Close
            </button>
            <a
              href={`/download/archive/${viewModal._id}`}
              className="flex items-center gap-2 px-5 py-2 bg-yellow-700 text-white rounded-lg font-medium hover:bg-yellow-800 transition shadow-sm"
            >
              <Download size={16} /> Download All
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCaseModal;

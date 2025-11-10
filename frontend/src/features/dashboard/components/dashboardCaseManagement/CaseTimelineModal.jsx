import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, User, FileText, Calendar, CheckCircle, X } from "lucide-react";

const CaseTimelineModal = ({ isOpen, onClose, caseData }) => {
  const [stages, setStages] = useState(caseData?.stages || []);

  useEffect(() => {
    if (caseData) setStages(caseData.stages || []);
  }, [caseData]);

  if (!isOpen || !caseData) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
         className="relative md:top-0 lg:left-24 lg:top-5 top-10 bg-white/60 text-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 border border-[#fe9a00]/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="md:text-xl text-lg font-semibold flex items-center gap-2 text-gray-800">
            <Clock className="w-5 h-5 text-[#fe9a00]" />
            Case Timeline —{" "}
            <span className="text-slate-800 font-medium">{caseData.caseNumber}</span>
          </h3>
        <button
  onClick={onClose}
  className="w-9 h-9 flex items-center justify-center rounded-full 
  bg-gray-200 text-gray-800 hover:bg-[#fe9a00] hover:text-white 
  transition-all duration-200 shadow-md"
>
  <X className="w-5 h-5" />
</button>

        </div>

        {/* Case Summary */}
        <div className="mb-6 bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-800 shadow-sm">
          <p>
            <strong className="text-slate-800">Client:</strong> {caseData.clientName}
          </p>
          <p>
            <strong className="text-slate-800">Lawyer:</strong> {caseData.lawyer}
          </p>
          <p>
            <strong className="text-slate-800">Current Stage:</strong> {caseData.stage}
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {stages.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {stage.title || `Stage ${i + 1}`}
                </h4>
                <span className="text-xs text-gray-500">
                  Status:{" "}
                  <span className="text-gray-800 font-medium">
                    {stage.status || "N/A"}
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4 text-[#fe9a00]" />
                  Lawyer:{" "}
                  <span className="text-gray-800 font-medium">
                    {stage.lawyer || "Unassigned"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-[#fe9a00]" />
                  Hearing:{" "}
                  <span className="text-gray-800 font-medium">
                    {stage.hearingDate || "Not Set"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FileText className="w-4 h-4 text-[#fe9a00]" />
                  Documents:{" "}
                  <span className="text-gray-800 font-medium">
                    {stage.documentsCount || 0}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle
                    className={`w-4 h-4 ${
                      stage.approvedByRagab ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                  <span>
                    {stage.approvedByRagab
                      ? "Approved by Ragab"
                      : "Awaiting Ragab’s Approval"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-800">
                  <CheckCircle
                    className={`w-4 h-4 ${
                      stage.directorSigned ? "text-green-600" : "text-gray-500"
                    }`}
                  />
                  <span>
                    {stage.directorSigned
                      ? "Director Signed"
                      : "Pending Director Signature"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-500 transition-all duration-200"
          >
            Close
          </button>
        </div>

      
      </motion.div>
    </div>
  );
};

export default CaseTimelineModal;

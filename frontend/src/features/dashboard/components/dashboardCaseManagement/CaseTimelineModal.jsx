import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  User,
  FileText,
  Calendar,
  CheckCircle,
  X,
} from "lucide-react";

const CaseTimelineModal = ({ isOpen, onClose, caseData }) => {
  const [stages, setStages] = useState(caseData?.stages || []);

  useEffect(() => {
    if (caseData) setStages(caseData.stages || []);
  }, [caseData]);

  if (!isOpen || !caseData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative bg-[#1c283c] text-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 border border-[#fe9a00]/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#fe9a00]" />
            Case Timeline —{" "}
            <span className="text-[#fe9a00]">{caseData.caseNumber}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#fe9a00] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Case Summary */}
        <div className="mb-6 bg-[#162030] border border-[#fe9a00]/20 rounded-xl p-4 text-sm text-gray-300">
          <p>
            <strong className="text-[#fe9a00]">Client:</strong>{" "}
            {caseData.clientName}
          </p>
          <p>
            <strong className="text-[#fe9a00]">Lawyer:</strong> {caseData.lawyer}
          </p>
          <p>
            <strong className="text-[#fe9a00]">Current Stage:</strong>{" "}
            {caseData.stage}
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#2c3b55] scrollbar-track-[#1c283c]">
          {stages.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-[#162030] border border-[#fe9a00]/20 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-[#fe9a00] flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {stage.title || `Stage ${i + 1}`}
                </h4>
                <span className="text-xs text-gray-400">
                  Status:{" "}
                  <span className="text-white">{stage.status || "N/A"}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="w-4 h-4 text-[#fe9a00]" />
                  Lawyer:{" "}
                  <span className="text-white font-medium">
                    {stage.lawyer || "Unassigned"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4 text-[#fe9a00]" />
                  Hearing:{" "}
                  <span className="text-white font-medium">
                    {stage.hearingDate || "Not Set"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <FileText className="w-4 h-4 text-[#fe9a00]" />
                  Documents:{" "}
                  <span className="text-white font-medium">
                    {stage.documentsCount || 0}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-4 h-4 ${
                      stage.approvedByRagab
                        ? "text-green-400"
                        : "text-gray-500"
                    }`}
                  />
                  <span>
                    {stage.approvedByRagab
                      ? "Approved by Ragab"
                      : "Awaiting Ragab’s Approval"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-4 h-4 ${
                      stage.directorSigned
                        ? "text-green-400"
                        : "text-gray-500"
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
            className="px-5 py-2.5 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition-all duration-200"
          >
            Close
          </button>
        </div>

        {/* Accent Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00] rounded-b-2xl" />
      </motion.div>
    </div>
  );
};

export default CaseTimelineModal;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, FilePlus } from "lucide-react";

const AddCaseModal = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    caseNumber: "",
    clientName: "",
    lawyer: "",
    stage: "Main Case",
    status: "Submitted",
    hearingDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.caseNumber.trim() ||
      !formData.clientName.trim() ||
      !formData.lawyer.trim()
    )
      return;

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative bg-[#1c283c] text-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 border border-[#fe9a00]/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-[#fe9a00]" />
            Add New Case
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-[#fe9a00] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Case Number
            </label>
            <input
              type="text"
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange}
              placeholder="e.g., C-2025-004"
              className="w-full bg-[#162030] text-gray-200 border border-[#fe9a00]/30 rounded-xl p-3 text-sm 
              focus:ring-2 focus:ring-[#fe9a00] focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Client Name
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Enter client name"
              className="w-full bg-[#162030] text-gray-200 border border-[#fe9a00]/30 rounded-xl p-3 text-sm 
              focus:ring-2 focus:ring-[#fe9a00] focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Lawyer</label>
            <input
              type="text"
              name="lawyer"
              value={formData.lawyer}
              onChange={handleChange}
              placeholder="Assigned lawyer"
              className="w-full bg-[#162030] text-gray-200 border border-[#fe9a00]/30 rounded-xl p-3 text-sm 
              focus:ring-2 focus:ring-[#fe9a00] focus:outline-none placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="w-full bg-[#162030] text-gray-200 border border-[#fe9a00]/30 rounded-xl p-3 text-sm 
              focus:ring-2 focus:ring-[#fe9a00] focus:outline-none"
            >
              <option>Main Case</option>
              <option>Appeal</option>
              <option>Cassation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-[#162030] text-gray-200 border border-[#fe9a00]/30 rounded-xl p-3 text-sm 
              focus:ring-2 focus:ring-[#fe9a00] focus:outline-none"
            >
              <option>Submitted</option>
              <option>Awaiting Approval</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Hearing Date
            </label>
            <input
              type="date"
              name="hearingDate"
              value={formData.hearingDate}
              onChange={handleChange}
              className="w-full bg-[#162030] text-gray-200 border border-[#fe9a00]/30 rounded-xl p-3 text-sm 
              focus:ring-2 focus:ring-[#fe9a00] focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              !formData.caseNumber.trim() ||
              !formData.clientName.trim() ||
              !formData.lawyer.trim()
            }
            className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-md
              ${
                formData.caseNumber.trim() &&
                formData.clientName.trim() &&
                formData.lawyer.trim()
                  ? "bg-[#fe9a00] text-[#1c283c] hover:bg-[#ffad33]"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
          >
            Add Case
          </button>
        </div>

        {/* Accent Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00] rounded-b-2xl" />
      </motion.div>
    </div>
  );
};

export default AddCaseModal;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

const FeedbackModal = ({ onCancel, onSubmit }) => {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative bg-[#1c283c] text-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-[#fe9a00]/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#fe9a00]" />
            Return Case for Changes
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-[#fe9a00] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter feedback or reason for returning..."
          className="w-full bg-[#162030] text-gray-200 border border-[#fe9a00]/30 rounded-xl p-3 text-sm h-28 
          focus:ring-2 focus:ring-[#fe9a00] focus:outline-none resize-none placeholder-gray-400"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(feedback)}
            disabled={!feedback.trim()}
            className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-md
              ${feedback.trim()
                ? "bg-[#fe9a00] text-[#1c283c] hover:bg-[#ffad33]"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"}`}
          >
            Submit
          </button>
        </div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00] rounded-b-2xl" />
      </motion.div>
    </div>
  );
};

export default FeedbackModal;

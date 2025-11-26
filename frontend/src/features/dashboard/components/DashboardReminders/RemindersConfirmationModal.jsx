// src/components/Reminders/ConfirmationModal.jsx
import { motion } from "framer-motion";
import { CheckCircle, Info, XCircle } from "lucide-react";

const RemindersConfirmationModal = ({ message, onClose, type = "success" }) => {
  const iconStyles = {
    success: { icon: <CheckCircle className="w-10 h-10 text-[#fe9a00]" />, title: "Action Successful" },
    info: { icon: <Info className="w-10 h-10 text-[#fe9a00]" />, title: "Reminder Details" },
    error: { icon: <XCircle className="w-10 h-10 text-red-500" />, title: "Error" },
  };

  const { icon, title } = iconStyles[type] || iconStyles.info;

  return (
    <div className="px-4 fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="bg-[#E1E1E2] text-[#162030] rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-[#fe9a00]/20"
      >
        <div className="flex flex-col items-center text-center mb-4">
          {icon}
          <h3 className="text-lg font-semibold mt-2">{title}</h3>
        </div>

        <p className="text-sm text-gray-800 mb-6 leading-relaxed whitespace-pre-line">{message}</p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#fe9a00] text-[#1c283c] font-semibold hover:bg-[#ffad33] transition-all duration-200 shadow-md"
          >
            OK
          </button>
        </div>

      
      </motion.div>
    </div>
  );
};

export default RemindersConfirmationModal;

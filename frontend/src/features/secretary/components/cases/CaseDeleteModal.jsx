import { motion } from "framer-motion";
import { X, Trash2, AlertTriangle, Briefcase } from "lucide-react";

const CaseDeleteModal = ({ isOpen, caseItem, onClose, onConfirm }) => {
    if (!isOpen || !caseItem) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center !z-[10000] p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center bg-[#24344f] justify-between border-b border-gray-200 p-5 rounded-t-2xl">
                    <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                        <Briefcase className="w-5 h-5 text-[#fe9a00]" />
                        Delete Case
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-[#fe9a00] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto space-y-6 p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-full">
                            <AlertTriangle className="text-red-500" size={24} />
                        </div>
                        <div>
                            <p className="font-medium text-gray-800 text-lg">
                                Delete this case?
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                Case ID: <strong className="text-[#fe9a00]">{caseItem.id}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="space-y-2">
                            <p className="font-medium text-gray-800">{caseItem.case?.description || 'Case'}</p>
                            {caseItem.client && (
                                <p className="text-sm text-gray-600">
                                    Client: <strong className="text-[#fe9a00]">{caseItem.client?.name}</strong>
                                </p>
                            )}
                            {caseItem.case?.status && (
                                <p className="text-sm text-gray-600">
                                    Status: <span className="capitalize">{caseItem.case.status}</span>
                                </p>
                            )}
                            {caseItem.case?.hearingDate && (
                                <p className="text-sm text-gray-600">
                                    Hearing Date: {caseItem.case.hearingDate}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold text-red-600">Warning:</span> This action is{" "}
                            <span className="font-semibold">irreversible</span>. All case details, 
                            documents, notes, and associated data for{" "}
                            <strong className="text-[#fe9a00]">{caseItem.client?.name}'s case</strong> will be permanently removed 
                            from the system.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-8 py-4 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 mr-3"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-200"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete Case
                    </button>
                </div>
                
                {/* Gradient Border Bottom */}
                <div className="h-2 bg-gradient-to-r from-[#fe9a00] to-[#24344f] rounded-b-2xl"></div>
            </motion.div>
        </div>
    );
};

export default CaseDeleteModal;
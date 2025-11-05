import { X } from "lucide-react";

const FinalApprovalsViewModal = ({ isOpen, caseItem, onClose }) => {
    if (!isOpen || !caseItem) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800 border border-yellow-200";
            case "Approved":
                return "bg-green-100 text-green-800 border border-green-200";
            case "Rejected":
                return "bg-red-100 text-red-800 border border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border border-gray-200";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800">Case Details</h3>
                        <button
                            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-600">Case ID</label>
                                <p className="text-lg font-semibold text-blue-600">{caseItem.id}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-600">Client Name</label>
                                <p className="text-lg font-semibold text-slate-800">{caseItem.client}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-600">Stage</label>
                                <p className="text-lg font-semibold text-slate-800">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {caseItem.stage}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-600">Lawyer</label>
                                <p className="text-lg font-semibold text-slate-800">{caseItem.lawyer}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-600">Submitted On</label>
                                <p className="text-lg font-semibold text-slate-800">{caseItem.submittedOn}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-600">Status</label>
                                <p className="text-lg font-semibold">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(caseItem.status)}`}>
                                        {caseItem.status}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <label className="text-sm font-medium text-slate-600 mb-2 block">Description</label>
                        <p className="text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-lg">
                            {caseItem.description}
                        </p>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 rounded-b-2xl">
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalApprovalsViewModal;
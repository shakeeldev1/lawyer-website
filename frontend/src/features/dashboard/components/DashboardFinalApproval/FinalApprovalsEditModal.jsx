import { X, Save } from "lucide-react";

const FinalApprovalsEditModal = ({ isOpen, caseItem, formData, onClose, onSave, onFormChange }) => {
    if (!isOpen || !caseItem || !formData) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800">Edit Case Approval</h3>
                        <button
                            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                                        Case ID
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.id || ''}
                                        readOnly
                                        className="w-full border border-slate-300 p-3 rounded-lg bg-slate-50 text-slate-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                                        Client Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.client || ''}
                                        readOnly
                                        className="w-full border border-slate-300 p-3 rounded-lg bg-slate-50 text-slate-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                                        Stage
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.stage || ''}
                                        readOnly
                                        className="w-full border border-slate-300 p-3 rounded-lg bg-slate-50 text-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                                        Lawyer
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lawyer || ''}
                                        readOnly
                                        className="w-full border border-slate-300 p-3 rounded-lg bg-slate-50 text-slate-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                                        Submitted On
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.submittedOn || ''}
                                        readOnly
                                        className="w-full border border-slate-300 p-3 rounded-lg bg-slate-50 text-slate-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status || ''}
                                        onChange={(e) => onFormChange('status', e.target.value)}
                                        className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="text-sm font-medium text-slate-600 mb-2 block">
                                Description
                            </label>
                            <textarea
                                value={formData.description || ''}
                                onChange={(e) => onFormChange('description', e.target.value)}
                                rows="4"
                                className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 rounded-b-2xl">
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FinalApprovalsEditModal;
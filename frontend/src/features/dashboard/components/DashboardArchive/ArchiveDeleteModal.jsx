import { X, Trash, AlertCircle } from "lucide-react";

const ArchiveDeleteModal = ({ isOpen, archive, onClose, onConfirm }) => {
    if (!isOpen || !archive) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 rounded-full">
                            <AlertCircle className="text-red-600" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Delete Archive</h3>
                    </div>

                    <p className="text-slate-600 mb-6">
                        Are you sure you want to delete the archive for case <strong>"{archive.id}"</strong>?
                        This action cannot be undone and all associated data will be permanently removed.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="text-red-500 mt-0.5" size={16} />
                            <div>
                                <p className="text-sm font-medium text-red-800">Warning: This action is irreversible</p>
                                <p className="text-sm text-red-600 mt-1">
                                    Case: <strong>{archive.client}</strong> ({archive.id})
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <Trash size={16} />
                            Delete Permanently
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchiveDeleteModal;
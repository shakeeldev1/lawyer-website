import { X, Save } from "lucide-react";
import { useState } from "react";

const ArchiveEditModal = ({ isOpen, archive, onClose, onSave }) => {
    const [editingArchive, setEditingArchive] = useState(archive);

    // Update local state when archive prop changes
    useState(() => {
        if (archive) {
            setEditingArchive({ ...archive });
        }
    }, [archive]);

    if (!isOpen || !editingArchive) return null;

    const handleInputChange = (field, value) => {
        setEditingArchive(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editingArchive);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800">Edit Archived Case</h3>
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
                                        Archive ID
                                    </label>
                                    <input
                                        type="text"
                                        value={editingArchive.archiveId}
                                        onChange={(e) => handleInputChange('archiveId', e.target.value)}
                                        className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                                        Case ID
                                    </label>
                                    <input
                                        type="text"
                                        value={editingArchive.id}
                                        onChange={(e) => handleInputChange('id', e.target.value)}
                                        className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                                        Client Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editingArchive.client}
                                        onChange={(e) => handleInputChange('client', e.target.value)}
                                        className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                                        Stage
                                    </label>
                                    <select
                                        value={editingArchive.stage}
                                        onChange={(e) => handleInputChange('stage', e.target.value)}
                                        className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="Main">Main</option>
                                        <option value="Appeal">Appeal</option>
                                        <option value="Cassation">Cassation</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                                        Lawyer
                                    </label>
                                    <input
                                        type="text"
                                        value={editingArchive.lawyer}
                                        onChange={(e) => handleInputChange('lawyer', e.target.value)}
                                        className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                                        Status
                                    </label>
                                    <select
                                        value={editingArchive.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="Approved">Approved</option>
                                        <option value="Pending">Pending</option>
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
                                value={editingArchive.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                rows="4"
                                className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="text-sm font-medium text-slate-600 mb-2 block">
                                Submitted On
                            </label>
                            <input
                                type="date"
                                value={editingArchive.submittedOn}
                                onChange={(e) => handleInputChange('submittedOn', e.target.value)}
                                className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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

export default ArchiveEditModal;
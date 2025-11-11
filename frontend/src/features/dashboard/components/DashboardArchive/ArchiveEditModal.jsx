import { X, Save, FileText, User, Scale, Calendar, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const ArchiveEditModal = ({ isOpen, archive, onClose, onSave }) => {
    const [editingArchive, setEditingArchive] = useState(archive);

    useEffect(() => {
        if (archive) setEditingArchive({ ...archive });
    }, [archive]);

    if (!isOpen || !editingArchive) return null;

    const handleInputChange = (field, value) => {
        setEditingArchive(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editingArchive);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col ">
                {/* Header */}
                <div className="flex items-center bg-[#24344f] justify-between border-b border-gray-200 p-5 rounded-t-2xl">
                    <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                        <FileText className="w-5 h-5 text-[#fe9a00]" />
                        Edit Archived Case
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-[#fe9a00] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-400/40 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Two-column grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <InputField
                                    label="Archive ID"
                                    icon={<FileText className="w-4 h-4" />}
                                    value={editingArchive.archiveId}
                                    onChange={(e) => handleInputChange("archiveId", e.target.value)}
                                />
                                <InputField
                                    label="Case ID"
                                    icon={<FileText className="w-4 h-4" />}
                                    value={editingArchive.id}
                                    onChange={(e) => handleInputChange("id", e.target.value)}
                                />
                                <InputField
                                    label="Client Name"
                                    icon={<User className="w-4 h-4" />}
                                    value={editingArchive.client}
                                    onChange={(e) => handleInputChange("client", e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                <SelectField
                                    label="Stage"
                                    icon={<CheckCircle className="w-4 h-4" />}
                                    value={editingArchive.stage}
                                    onChange={(e) => handleInputChange("stage", e.target.value)}
                                    options={["Main", "Appeal", "Cassation"]}
                                />
                                <InputField
                                    label="Lawyer"
                                    icon={<User className="w-4 h-4" />}
                                    value={editingArchive.lawyer}
                                    onChange={(e) => handleInputChange("lawyer", e.target.value)}
                                />
                                <SelectField
                                    label="Status"
                                    icon={<Scale className="w-4 h-4" />}
                                    value={editingArchive.status}
                                    onChange={(e) => handleInputChange("status", e.target.value)}
                                    options={["Approved", "Pending", "Rejected"]}
                                />
                            </div>
                        </div>

                        <TextAreaField
                            label="Description"
                            icon={<FileText className="w-4 h-4" />}
                            value={editingArchive.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                        />

                        <InputField
                            label="Submitted On"
                            type="date"
                            icon={<Calendar className="w-4 h-4" />}
                            value={editingArchive.submittedOn}
                            onChange={(e) => handleInputChange("submittedOn", e.target.value)}
                        />
                    </form>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-8 py-4 border-t border-gray-200 bg-gray-50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-white bg-red-500 hover:bg-red-700 rounded-lg  transition-all duration-200 mr-3"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[length:200%_200%] bg-[linear-gradient(135deg,#24344f_85%,#fe9a00_15%)] bg-[position:100%_100%] text-white rounded-lg font-medium transition-all duration-500 hover:bg-[position:0%_0%] active:bg-[position:0%_0%]"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>

                {/* Gradient Border Bottom */}
                <div className="h-2 bg-gradient-to-r from-[#fe9a00] to-[#24344f] rounded-b-2xl"></div>
            </div>
        </div>
    );
};

/* ✅ Reusable Input Components */
const InputField = ({ label, value, onChange, type = "text", icon }) => (
    <div>
        <label className="text-sm font-medium text-[#24344f] mb-2 flex items-center gap-2">
            {icon}
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fe9a00]/60 focus:border-transparent transition-all"
            required
        />
    </div>
);

const TextAreaField = ({ label, value, onChange, icon }) => (
    <div>
        <label className="text-sm font-medium text-[#24344f] mb-2 flex items-center gap-2">
            {icon}
            {label}
        </label>
        <textarea
            value={value}
            onChange={onChange}
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fe9a00]/60 focus:border-transparent resize-none transition-all"
            required
        />
    </div>
);

const SelectField = ({ label, value, onChange, options, icon }) => (
    <div>
        <label className="text-sm font-medium text-[#24344f] mb-2 flex items-center gap-2">
            {icon}
            {label}
        </label>
        <select
            value={value}
            onChange={onChange}
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fe9a00]/60 focus:border-transparent transition-all"
            required
        >
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    </div>
);

export default ArchiveEditModal;
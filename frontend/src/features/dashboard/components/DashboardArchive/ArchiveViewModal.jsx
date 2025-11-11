import { motion } from "framer-motion";
import { X, User, FileText, Calendar, CheckCircle, Scale } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const ArchiveViewModal = ({ isOpen, archive, onClose }) => {
    if (!isOpen || !archive) return null;

    const handleDownloadAll = async () => {
        try {
            const zip = new JSZip();
            const folder = zip.folder(`${archive.archiveId || "Archive"}`);

            // Add Memorandum (PDF)
            if (archive.memorandum?.url) {
                const response = await fetch(archive.memorandum.url);
                const blob = await response.blob();
                folder.file(archive.memorandum.name || "Memorandum.pdf", blob);
            }

            // Add Evidence Files
            if (archive.evidence?.length > 0) {
                for (const file of archive.evidence) {
                    const response = await fetch(file.url);
                    const blob = await response.blob();
                    folder.file(file.name, blob);
                }
            }

            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, `${archive.archiveId || "Archive"}_Files.zip`);
        } catch (error) {
            console.error("Error downloading files:", error);
            alert("Something went wrong while creating ZIP. Please try again.");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved":
                return "text-green-500 bg-green-100 border-green-300";
            case "Pending":
                return "text-yellow-600 bg-yellow-100 border-yellow-300";
            case "Rejected":
                return "text-red-500 bg-red-100 border-red-300";
            default:
                return "text-gray-500 bg-gray-100 border-gray-300";
        }
    };

    return (
        <div className=" fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className=" relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col "
            >
                {/* Scrollable Content */}
                <div className="overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-400/40">
                    {/* Header */}
                    <div className="flex items-center bg-[#24344f] justify-between border-b border-gray-200 p-5 rounded-t-2xl">
                        <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                            <FileText className="w-5 h-5 text-[#fe9a00]" />
                            Archived Case Details
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-[#fe9a00] transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Case Summary */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#fe9a00]" />
                                <span className="font-medium">Archive ID:</span>
                                <span>{archive.archiveId}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#fe9a00]" />
                                <span className="font-medium">Case ID:</span>
                                <span className="text-[#fe9a00] font-semibold">{archive.id}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#fe9a00]" />
                                <span className="font-medium">Client:</span>
                                <span>{archive.client}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#fe9a00]" />
                                <span className="font-medium">Lawyer:</span>
                                <span>{archive.lawyer}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Scale className="w-4 h-4 text-[#fe9a00]" />
                                <span className="font-medium">Case Type:</span>
                                <span>{archive.caseType || "—"}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#fe9a00]" />
                                <span className="font-medium">Submitted On:</span>
                                <span>{archive.submittedOn}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#fe9a00]" />
                                <span className="font-medium">Archived On:</span>
                                <span>{archive.archivedOn || "—"}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-[#fe9a00]" />
                                <span className="font-medium">Stage:</span>
                                <span>{archive.stage}</span>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="mt-5 flex items-center gap-2">
                            <span className="font-medium text-[#fe9a00]">Status:</span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(
                                    archive.status
                                )}`}
                            >
                                {archive.status}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 text-gray-700">
                        <h4 className="font-semibold text-[#24344f] mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#fe9a00] " /> Description
                        </h4>
                        <p className="leading-relaxed">
                            {archive.description || "No description provided."}
                        </p>
                    </div>

                    {/* Outcome */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 text-gray-700">
                        <h4 className="text-[#24344f] font-semibold mb-2 flex items-center gap-2">
                            <Scale className="w-4 h-4 text-[#fe9a00]" /> Outcome Summary
                        </h4>
                        <p className="leading-relaxed">
                            {archive.outcome || "Outcome not recorded."}
                        </p>
                    </div>

                    {/* Memorandum */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                        <h4 className="text-[#24344f] font-semibold mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#fe9a00]" /> Memorandum
                        </h4>

                        {archive.memorandum ? (
                            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-[#fe9a00]/40 transition">
                                <span>{archive.memorandum.name}</span>
                                <a
                                    href={archive.memorandum.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#fe9a00] hover:underline text-sm"
                                >
                                    View PDF
                                </a>
                            </div>
                        ) : (
                            <p className="text-gray-400 italic">No memorandum attached.</p>
                        )}
                    </div>

                    {/* Evidence */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                        <h4 className="text-[#24344f] font-semibold mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#fe9a00]" /> Evidence Files
                        </h4>

                        {archive.evidence?.length > 0 ? (
                            <ul className="space-y-2">
                                {archive.evidence.map((file, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-[#fe9a00]/40 transition"
                                    >
                                        <span className="truncate">{file.name}</span>
                                        <a
                                            href={file.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#fe9a00] hover:underline text-sm"
                                        >
                                            View
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400 italic">No evidence attached.</p>
                        )}

                        {/* Download All Button */}
                        <button
                            onClick={handleDownloadAll}
                            className="mt-4 px-4 py-2.5 bg-[length:200%_200%] bg-[linear-gradient(135deg,#24344f_85%,#fe9a00_15%)] bg-[position:100%_100%] text-white rounded-lg font-medium transition-all duration-500 hover:bg-[position:0%_0%] active:bg-[position:0%_0%]"
                        >
                            Download All Files (ZIP)
                        </button>
                    </div>
                </div>
                {/* Footer */}
                <div className="flex justify-end px-8 py-4 border-t border-gray-200 bg-gray-50 ">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-[#24344f] text-white rounded-full hover:bg-[#fe9a00] transition-all duration-200"
                    >
                        Close
                    </button>
                </div>
                {/* Gradient Border Bottom */}
                <div className="h-3 bg-gradient-to-r from-[#fe9a00] to-[#24344f] rounded-b-4xl "></div>
            </motion.div>
        </div>
    );
};

export default ArchiveViewModal;

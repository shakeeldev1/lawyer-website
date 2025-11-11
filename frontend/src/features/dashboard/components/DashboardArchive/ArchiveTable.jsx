import { Eye, Edit, Trash } from "lucide-react";

const ArchiveTable = ({ archives, onView, onEdit, onDelete }) => {



    if (archives.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-4xl mb-2">📁</div>
                        <p className="text-lg font-medium">No archived cases found</p>
                        <p className="text-sm">Try adjusting your filters or search terms</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=" bg-gray-100 text-[#24344f] shadow-2xl rounded-2xl border border-[#fe9a00]/20 overflow-hidden">
            <div className="max-w-4xl overflow-x-auto ">

                <table className="min-w-[1200px] w-full text-left text-sm whitespace-nowrap">

                    <thead className="p-4  bg-[#24344f] text-white/80 uppercase tracking-wide text-xs font-semibold ">
                        <tr>
                            <th className="p-4 font-semibold">Archive ID</th>
                            <th className="p-4 font-semibold">Case ID</th>
                            <th className="p-4 font-semibold">Client</th>
                            <th className="p-4 font-semibold">Case Type</th>
                            <th className="p-4 font-semibold">Stage</th>
                            <th className="p-4 font-semibold">Lawyer</th>
                            <th className="p-4 font-semibold">Approved By</th>
                            <th className="p-4 font-semibold">Date Archived</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {archives.map((archive) => (
                            <tr
                                key={archive.id}
                                className="border-t border-[#fe9a00]/10 hover:bg-white/60 transition-all duration-200"
                            >
                                <td className="p-4 font-medium">{archive.archiveId}</td>
                                <td className="p-4 font-medium">{archive.id}</td>
                                <td className="p-4">{archive.client}</td>
                                <td className="p-4">{archive.caseType}</td>
                                <td className="p-4">
                                    <span
                                        className={` px-2 py-1 rounded-full text-xs font-medium
            ${archive.stage === "Main"
                                                ? "bg-blue-500/20 text-blue-500 border border-blue-500/30"
                                                : archive.stage === "Appeal"
                                                    ? "bg-purple-500/20 text-purple-500 border border-purple-500/30"
                                                    : "bg-orange-500/20 text-orange-500 border border-orange-500/30"
                                            }`}
                                    >
                                        {archive.stage}
                                    </span>
                                </td>
                                <td className="p-4">{archive.lawyer}</td>
                                <td className="p-4">{archive.approvedBy || "Ragab"}</td>
                                <td className="p-4">{archive.archivedOn}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold border
            ${archive.status === "Approved"
                                                ? "bg-green-500/20 text-green-500 border-green-500/40"
                                                : archive.status === "Pending"
                                                    ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/40"
                                                    : "bg-red-500/20 text-red-500 border-red-500/40"
                                            }`}
                                    >
                                        {archive.status}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onView(archive)}
                                            className="flex items-center gap-2 text-white/80 bg-[#24344f] hover:text-white hover:bg-[#24344f]/50 px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                            <span className="hidden sm:inline ">View</span>
                                        </button>
                                        <button
                                            onClick={() => onEdit(archive)}
                                            className="flex items-center gap-2 bg-[#fe9a00] text-white/80 hover:text-white hover:bg-[#fe9a00]/50 px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                                            title="Edit Archive"
                                        >
                                            <Edit size={16} />
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>

                                        <button
                                            onClick={() => onDelete(archive)}
                                            className="flex items-center gap-2 bg-red-500 hover:bg-red-700  text-white/80 hover:text-white  px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                                            title="Delete Archive"
                                        >
                                            <Trash size={16} />
                                            <span className="hidden sm:inline">Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div >
    );
};

export default ArchiveTable;
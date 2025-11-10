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
        <div className="bg-[#1c283c] text-white  shadow-2xl rounded-2xl border border-[#fe9a00]/20 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                    <thead className=" p-4  bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold ">
                        <tr>
                            <th className="p-4 font-semibold ">Archive ID</th>
                            <th className="p-4 font-semibold ">Case ID</th>
                            <th className="p-4 font-semibold ">Client</th>
                            <th className="p-4 font-semibold ">Stage</th>
                            {/* <th className="p-4 font-semibold ">Lawyer</th> */}
                            <th className="p-4 font-semibold ">Submitted On</th>
                            <th className="p-4 font-semibold ">Status</th>
                            <th className="p-4 font-semibold ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {archives.map((archive, index) => (
                            <tr
                                key={archive.id}
                                className="border-t border-[#fe9a00]/10 hover:bg-[#2a3b58] transition-all duration-200"
                            >
                                <td className="p-4 font-medium ">{archive.archiveId}</td>
                                <td className="p-4 font-medium ">{archive.id}</td>
                                <td className="p-4">{archive.client}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium 
    ${archive.stage === "Main"
                                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                                : archive.stage === "Appeal"
                                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                                    : archive.stage === "Cassation"
                                                        ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                                        : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                                            }`}
                                    >
                                        {archive.stage}
                                    </span>

                                </td>
                                {/* <td className="p-4">{archive.lawyer}</td> */}
                                <td className="p-4 ">{archive.submittedOn}</td>
                                <td className="p-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold ">
                                        {archive.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className=" flex items-center justify-center gap-2 "
                                    >
                                        <button
                                            onClick={() => onView(archive)}
                                            className="flex items-center gap-2 text-[#fe9a00] hover:text-white hover:bg-[#fe9a00]/20 px-3 py-1.5 rounded-full font-medium transition-all duration-200  "
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                            <span className="hidden sm:inline">View</span>
                                        </button>
                                        
                                        <button
                                            onClick={() => onDelete(archive)}
                                            className="flex items-center gap-2 text-[#fe9a00] hover:text-white hover:bg-[#fe9a00]/20 px-3 py-1.5 rounded-full font-medium transition-all duration-200 "
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
            {/* Subtle Gradient Footer Bar */}
            <div className="h-[3px] w-full bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00] rounded-b-2xl" />
        </div>
    );
};

export default ArchiveTable;
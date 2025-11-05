import { Eye, Edit, Check, X } from "lucide-react";

const FinalApprovalsTable = ({ cases, onView, onEdit, onApprove, onReject }) => {
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

    if (cases.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-4xl mb-2">📋</div>
                    <p className="text-lg font-medium text-slate-800">No cases pending approval</p>
                    <p className="text-sm text-slate-600">All cases have been processed</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-4 font-semibold text-slate-700">Case ID</th>
                            <th className="p-4 font-semibold text-slate-700">Client Name</th>
                            <th className="p-4 font-semibold text-slate-700">Stage</th>
                            <th className="p-4 font-semibold text-slate-700">Lawyer</th>
                            <th className="p-4 font-semibold text-slate-700">Submitted On</th>
                            <th className="p-4 font-semibold text-slate-700">Status</th>
                            <th className="p-4 font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map((caseItem, index) => (
                            <tr
                                key={caseItem.id}
                                className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                                    }`}
                            >
                                <td className="p-4 font-medium text-blue-600">{caseItem.id}</td>
                                <td className="p-4 font-medium text-slate-900">{caseItem.client}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                        {caseItem.stage}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-700">{caseItem.lawyer}</td>
                                <td className="p-4 text-slate-600">{caseItem.submittedOn}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(caseItem.status)}`}>
                                        {caseItem.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onView(caseItem)}
                                            className="flex items-center gap-1 px-3 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                            <span className="hidden sm:inline">View</span>
                                        </button>

                                        <button
                                            onClick={() => onEdit(caseItem)}
                                            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            title="Edit Case"
                                        >
                                            <Edit size={16} />
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>

                                        
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FinalApprovalsTable;
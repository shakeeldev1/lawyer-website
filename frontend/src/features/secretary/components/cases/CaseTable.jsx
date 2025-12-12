import React from "react";
import {
  Archive,
  Eye,
  Trash2,
  Edit,
  Bell,
  Calendar,
  UserPlus,
  FileText,
} from "lucide-react";

const CaseTable = ({
  cases,
  onArchive,
  onEditCase,
  onViewCase,
  onDeleteCase,
  onAddReminder,
  onScheduleHearing,
  onAssignLawyer,
  onUpdateCourtCaseId,
}) => {
  // Badge helpers
  const getStageBadge = (stage) => {
    switch (stage) {
      case "Main":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Appeal":
        return "bg-orange-50 text-orange-700 border border-orange-200";
      case "Cassation":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border border-red-200";
      case "Closed":
        return "bg-slate-100 text-slate-700 border border-slate-200";
      case "Main Stage Ongoing":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Archived":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case "ReadyForSubmission":
        return "bg-cyan-50 text-cyan-700 border border-cyan-200";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  if (!cases.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center text-slate-500">
        <p className="text-sm font-medium text-slate-600">No cases found</p>
        <p className="text-xs text-slate-500 mt-1">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden w-full">
      {/* Mobile Card View */}
      <div className="block md:hidden">
        {cases.map((c) => {
          const isArchived = c.case.status === "Archived";
          const canArchive = c.case.status === "Closed" && !isArchived;
          const hearingDate =
            c.stages &&
            c.stages.length > 0 &&
            c.stages[c.stages.length - 1].hearingDate
              ? c.stages[c.stages.length - 1].hearingDate
              : c.case.hearingDate || "Not Set";

          return (
            <div
              key={c._id || c.id}
              className="border-b border-slate-200 p-3 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {c.case.courtCaseId ? (
                    <span className="inline-flex items-center gap-1.5 bg-[#BCB083] text-[#6B5838] px-2.5 py-1 rounded text-xs font-bold border-2 border-[#A48C65]">
                      <FileText size={12} />
                      {c.case.courtCaseId}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 px-2 py-1 rounded text-[10px] font-medium border border-slate-300">
                      <FileText size={10} />
                      Not Assigned
                    </span>
                  )}
                  <p className="text-xs font-semibold text-slate-900 mt-1.5">
                    {c.client.name}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusBadge(
                    c.case.status
                  )}`}
                >
                  {c.case.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-slate-500">Contact:</span>
                  <p className="text-slate-700 truncate">{c.client.contact}</p>
                </div>
                <div>
                  <span className="text-slate-500">Type:</span>
                  <p className="text-slate-700">{c.case.caseType}</p>
                </div>
                <div>
                  <span className="text-slate-500">Lawyer:</span>
                  <p className="text-slate-700 truncate">
                    {c.case.assignedLawyer}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Hearing:</span>
                  <p className="text-slate-700">
                    {hearingDate === "Not Set" ? (
                      <span className="text-slate-400 italic">Not Set</span>
                    ) : (
                      new Date(hearingDate).toLocaleDateString()
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-2">
                <button
                  onClick={() => onViewCase?.(c.id)}
                  className="p-1.5 bg-slate-100 text-[#A48C65] rounded transition-colors"
                  title="View case"
                >
                  <Eye size={14} />
                </button>
                <button
                  onClick={() => onEditCase?.(c.id)}
                  className="p-1.5 bg-emerald-50 text-[#A48C65] rounded  transition-colors"
                  title="Edit case"
                >
                  <Edit size={14} />
                </button>
                {c.case.status === "ReadyForSubmission" && (
                  <button
                    onClick={() => onScheduleHearing?.(c)}
                    className="p-1.5 bg-cyan-50 text-[#A48C65] rounded transition-colors"
                    title="Schedule hearing date"
                  >
                    <Calendar size={14} />
                  </button>
                )}
                <button
                  onClick={() => onUpdateCourtCaseId?.(c)}
                  className="p-1.5 bg-indigo-50 text-[#A48C65] rounded  transition-colors"
                  title={
                    c.case.courtCaseId
                      ? `Update Court Case ID (${c.case.courtCaseId})`
                      : "Add Court Case ID"
                  }
                >
                  <FileText size={14} />
                </button>
                <button
                  onClick={() => onAssignLawyer?.(c)}
                  className="p-1.5 bg-indigo-50 text-[#A48C65] rounded  transition-colors"
                  title="Assign/reassign lawyer"
                >
                  <UserPlus size={14} />
                </button>
                <button
                  onClick={() => onAddReminder?.(c)}
                  className="p-1.5 bg-amber-50 text-[#A48C65] rounded  transition-colors"
                  title="Add reminder"
                >
                  <Bell size={14} />
                </button>
                <button
                  onClick={() => onArchive?.(c.id)}
                  className={`p-1.5 rounded transition-colors ${
                    canArchive
                      ? "bg-purple-50 text-[#A48C65] hover:bg-purple-100"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                  disabled={!canArchive}
                  title={isArchived ? "Case already archived" : "Archive case"}
                >
                  <Archive size={14} />
                </button>
                <button
                  onClick={() => onDeleteCase?.(c.id)}
                  className="p-1.5 bg-red-50 text-[#A48C65] rounded hover:bg-red-100 transition-colors"
                  title="Delete case"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop/Tablet Table */}
      <div className="hidden md:block overflow-x-auto max-w-full">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-[#A48C65] text-white border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-white whitespace-nowrap">
                Court Case ID
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-white whitespace-nowrap">
                Client
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-white whitespace-nowrap hidden lg:table-cell">
                Contact
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-white whitespace-nowrap hidden xl:table-cell">
                Email
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-white whitespace-nowrap">
                Type
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-white whitespace-nowrap hidden lg:table-cell">
                Stage
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-white whitespace-nowrap">
                Status
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-white whitespace-nowrap hidden lg:table-cell">
                Lawyer
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-white whitespace-nowrap hidden xl:table-cell">
                Hearing
              </th>
              <th className="px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-wide text-white whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => {
              const lastStage =
                c.case.stages && c.case.stages.length > 0
                  ? c.case.stages[c.case.stages.length - 1].stage
                  : c.case.stage || "N/A";

              // Get hearing date from the last stage if available
              const hearingDate =
                c.stages && c.stages.length > 0
                  ? c.stages[c.stages.length - 1].hearingDate ||
                    c.case.hearingDate ||
                    "Not Set"
                  : c.case.hearingDate || "Not Set";

              // Fix: Only disable archive for already archived cases
              const isArchived = c.case.status === "Archived";
              const canArchive = !isArchived;

              return (
                <tr
                  key={c._id || c.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {c.case.courtCaseId ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#BCB083] text-[#6B5838] px-3 py-1.5 rounded text-sm font-bold border-2 border-[#A48C65]">
                        <FileText size={14} />
                        {c.case.courtCaseId}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 px-2.5 py-1 rounded text-xs font-medium border border-slate-300">
                        <FileText size={12} />
                        Not Assigned
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-slate-700 whitespace-nowrap">
                    {c.client.name}
                  </td>
                  <td className="px-3 py-2 text-slate-600 whitespace-nowrap hidden lg:table-cell">
                    {c.client.contact}
                  </td>
                  <td className="px-3 py-2 text-slate-600 whitespace-nowrap hidden xl:table-cell">
                    {c.client.email}
                  </td>
                  <td className="px-3 py-2 text-slate-700 whitespace-nowrap">
                    {c.case.caseType}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap hidden lg:table-cell">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStageBadge(
                        lastStage
                      )}`}
                    >
                      {lastStage}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusBadge(
                        c.case.status
                      )}`}
                    >
                      {c.case.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-700 whitespace-nowrap hidden lg:table-cell">
                    {c.case.assignedLawyer}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap hidden xl:table-cell">
                    {hearingDate === "Not Set" ? (
                      <span className="text-slate-400 text-[10px] italic">
                        Not Set
                      </span>
                    ) : (
                      <span className="text-slate-700 text-xs">
                        {new Date(hearingDate).toLocaleDateString()}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex justify-center gap-1 flex-nowrap">
                      <button
                        onClick={() => onViewCase?.(c.id)}
                        className="p-1.5 bg-slate-100 text-[#A48C65] rounded hover:bg-slate-200 transition-colors"
                        title="View case"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => onEditCase?.(c.id)}
                        className="p-1.5 bg-emerald-50 text-[#A48C65] rounded hover:bg-emerald-100 transition-colors"
                        title="Edit case"
                      >
                        <Edit size={14} />
                      </button>
                      {c.case.status === "ReadyForSubmission" && (
                        <button
                          onClick={() => onScheduleHearing?.(c)}
                          className="p-1.5 bg-cyan-50 text-[#A48C65] rounded hover:bg-cyan-100 transition-colors"
                          title="Schedule hearing date"
                        >
                          <Calendar size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => onUpdateCourtCaseId?.(c)}
                        className="p-1.5 bg-indigo-50 text-[#A48C65] rounded hover:bg-indigo-100 transition-colors"
                        title={
                          c.case.courtCaseId
                            ? `Update Court Case ID (${c.case.courtCaseId})`
                            : "Add Court Case ID"
                        }
                      >
                        <FileText size={14} />
                      </button>
                      {c.case.status === "ReadyForSubmission" &&
                        !c.case.assignedLawyer && (
                          <button
                            onClick={() => onAssignLawyer?.(c)}
                            className="p-1.5 bg-blue-50 text-[#A48C65] rounded hover:bg-blue-100 transition-colors"
                            title="Assign lawyer"
                          >
                            <UserPlus size={14} />
                          </button>
                        )}
                      <button
                        onClick={() => onAddReminder?.(c)}
                        className="p-1.5 bg-amber-50 text-[#A48C65] rounded hover:bg-amber-100 transition-colors"
                        title="Add reminder"
                      >
                        <Bell size={14} />
                      </button>
                      <button
                        onClick={() => onArchive?.(c.id)}
                        className={`p-1.5 rounded transition-colors ${
                          canArchive
                            ? "bg-purple-50 text-[#A48C65] hover:bg-purple-100"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                        disabled={!canArchive}
                        title={
                          isArchived ? "Case already archived" : "Archive case"
                        }
                      >
                        <Archive size={14} />
                      </button>
                      <button
                        onClick={() => onDeleteCase?.(c.id)}
                        className="p-1.5 bg-red-50 text-[#A48C65] rounded hover:bg-red-100 transition-colors"
                        title="Delete case"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseTable;

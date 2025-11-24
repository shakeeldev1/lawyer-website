import React from "react";
import { Eye } from "lucide-react";

const RemindersTable = ({ reminders, onAction, page, totalPages, onPageChange }) => {
  if (!reminders || reminders.length === 0)
    return <p className="text-center mt-6">No reminders found.</p>;

  const renderStatus = (reminder) =>
    reminder.isCompleted ? "Completed" : "Pending";

  const renderStatusClass = (reminder) =>
    reminder.isCompleted
      ? "bg-green-500/20 text-green-800 border border-green-500/30"
      : "bg-yellow-500/20 text-yellow-800 border border-yellow-500/30";

  return (
    <div className="mt-6">
      {/* Desktop / Tablet */}
      <div className="overflow-x-auto bg-white text-[#24344f] shadow-2xl rounded-2xl border border-[#fe9a00]/20">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
            <tr>
              {["Case Name", "Stage", "Type", "Lawyer", "Date", "Status", "Actions"].map((h, i) => (
                <th key={i} className={`py-2 px-4 text-left whitespace-nowrap`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reminders.map((r, idx) => (
              <tr key={r._id} className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"} hover:bg-[#E1E1E2] transition-all border-t border-[#fe9a00]/10`}>
                <td className="px-4 py-2">{r.caseName}</td>
                <td className="px-4 py-2">{r.stage}</td>
                <td className="px-4 py-2">{r.type}</td>
                <td className="px-4 py-2">{r.lawyer || "-"}</td>
                <td className="px-4 py-2">{new Date(r.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${renderStatusClass(r)}`}>
                    {renderStatus(r)}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-left gap-2 flex-wrap">
                    <button
                      onClick={() => onAction("View", r)}
                      className="flex items-center gap-1 text-[#fe9a00] hover:text-white hover:bg-[#fe9a00]/80 px-3 py-1 rounded-full text-xs font-medium transition-all"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                    <button
                      onClick={() => onAction("Resend", r)}
                      className="text-green-600 hover:text-white hover:bg-green-500/80 px-3 py-1 rounded-full text-xs font-medium transition-all"
                    >
                      Resend
                    </button>
                    {!r.isCompleted && (
                      <button
                        onClick={() => onAction("Mark Complete", r)}
                        className="text-gray-600 hover:text-[#fe9a00] hover:bg-[#fe9a00]/20 px-3 py-1 rounded-full text-xs font-medium transition-all"
                      >
                        Done
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end gap-2 mt-3 px-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`px-3 py-1 rounded-lg border ${
                  page === p ? "bg-[#fe9a00] text-white" : "bg-white text-[#24344f]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RemindersTable;

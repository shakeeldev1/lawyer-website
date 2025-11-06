// src/components/Reminders/RemindersTable.jsx
import { Eye } from "lucide-react";

const RemindersTable = ({ reminders, onAction }) => {
  return (
    <div className="overflow-x-auto mt-8 bg-[#1c283c] text-white shadow-xl rounded-2xl border border-[#fe9a00]/20">
      <table className="min-w-full text-sm border-collapse">
        {/* Table Head */}
        <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
          <tr>
            {["Case Name", "Stage", "Reminder Type", "Lawyer", "Date", "Status", "Actions"].map(
              (header, i) => (
                <th key={i} className="px-4 py-3 text-left whitespace-nowrap">
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {reminders.map((r, idx) => (
            <tr
              key={r.id}
              className={`${
                idx % 2 === 0 ? "bg-[#202f49]" : "bg-[#1c283c]"
              } hover:bg-[#2a3b58]/80 transition-colors duration-200 border-t border-[#fe9a00]/10`}
            >
              <td className="px-4 py-2.5 font-medium whitespace-nowrap">{r.caseName}</td>
              <td className="px-4 py-2.5 whitespace-nowrap">{r.stage}</td>
              <td className="px-4 py-2.5 whitespace-nowrap">{r.type}</td>
              <td className="px-4 py-2.5 whitespace-nowrap">{r.lawyer}</td>
              <td className="px-4 py-2.5 whitespace-nowrap text-gray-300">{r.date}</td>
              <td className="px-4 py-2.5 whitespace-nowrap">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    r.status === "Pending"
                      ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/30"
                      : "bg-green-500/10 text-green-300 border-green-500/30"
                  }`}
                >
                  {r.status}
                </span>
              </td>
              <td className="px-4 py-2.5 text-center whitespace-nowrap">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onAction("View", r)}
                    className="flex items-center gap-1 text-[#fe9a00] hover:text-white hover:bg-[#fe9a00]/20 px-2 py-1 rounded-full text-xs transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button
                    onClick={() => onAction("Resend", r)}
                    className="text-green-400 hover:text-white hover:bg-green-600/20 px-2 py-1 rounded-full text-xs transition-all"
                  >
                    Resend
                  </button>
                  <button
                    onClick={() => onAction("Mark Done", r)}
                    className="text-gray-300 hover:text-[#fe9a00] hover:bg-[#fe9a00]/20 px-2 py-1 rounded-full text-xs transition-all"
                  >
                    Done
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="h-[2px] w-full bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00] rounded-b-2xl" />
    </div>
  );
};

export default RemindersTable;

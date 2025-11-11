import React from "react";
import { Eye } from "lucide-react";

const RemindersTable = ({ reminders, onAction }) => {
  return (
    <div className="mt-8">
      {/* ===== Desktop View (lg and above) ===== */}
      <div className="hidden lg:block overflow-x-auto bg-white text-[#24344f] shadow-2xl rounded-2xl border border-[#fe9a00]/20">
        <table className="min-w-full text-sm border-collapse">
          {/* Table Head */}
          <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
            <tr>
              {[
                "Case Name",
                "Stage",
                "Reminder Type",
                "Lawyer",
                "Date",
                "Status",
                "Actions",
              ].map((header, i) => (
                <th
                  key={i}
                  className={`py-3 text-left whitespace-nowrap ${
                    header === "Actions" ? "px-9" : "px-4"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {reminders.map((r, idx) => (
              <tr
                key={r.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
                } hover:bg-[#E1E1E2] transition-all duration-200 border-t border-[#fe9a00]/10`}
              >
                <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                  {r.caseName}
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">{r.stage}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">{r.type}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">{r.lawyer}</td>
                <td className="px-4 py-2.5 whitespace-nowrap text-gray-600">
                  {r.date}
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      r.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-800 border border-yellow-500/30"
                        : "bg-green-500/20 text-green-800 border border-green-500/30"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-center whitespace-nowrap">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onAction("View", r)}
                      className="flex items-center gap-1 text-[#fe9a00] hover:text-white hover:bg-[#fe9a00]/80 px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button
                      onClick={() => onAction("Resend", r)}
                      className="text-green-600 hover:text-white hover:bg-green-500/80 px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                    >
                      Resend
                    </button>
                    <button
                      onClick={() => onAction("Mark Done", r)}
                      className="text-gray-600 hover:text-[#fe9a00] hover:bg-[#fe9a00]/20 px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                    >
                      Done
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-[3px] w-full bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00]" />
      </div>

      {/* ===== Medium Tablet View (md to lg) ===== */}
      <div className="hidden md:block lg:hidden overflow-x-auto bg-white text-[#24344f] shadow-2xl rounded-2xl border border-[#fe9a00]/20">
        <table className="min-w-full text-sm border-collapse">
          {/* Table Head */}
          <thead className="bg-[#24344f] text-[#fe9a00] uppercase tracking-wide text-xs font-semibold">
            <tr>
              {[
                "Case Name",
                "Stage",
                "Type",
                "Lawyer",
                "Date",
                "Status",
                "Actions",
              ].map((header, i) => (
                <th
                  key={i}
                  className={`py-2.5 text-left whitespace-nowrap ${
                    header === "Actions" ? "px-6" : "px-3"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {reminders.map((r, idx) => (
              <tr
                key={r.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
                } hover:bg-[#E1E1E2] transition-all duration-200 border-t border-[#fe9a00]/10`}
              >
                <td className="px-3 py-2 font-medium whitespace-nowrap text-xs">
                  {r.caseName}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs">{r.stage}</td>
                <td className="px-3 py-2 whitespace-nowrap text-xs">{r.type}</td>
                <td className="px-3 py-2 whitespace-nowrap text-xs">{r.lawyer}</td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-600 text-xs">
                  {r.date}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      r.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-800 border border-yellow-500/30"
                        : "bg-green-500/20 text-green-800 border border-green-500/30"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-center whitespace-nowrap">
                  <div className="flex justify-center gap-1">
                    <button
                      onClick={() => onAction("View", r)}
                      className="flex items-center gap-1 text-[#fe9a00] hover:text-white hover:bg-[#fe9a00]/80 px-2 py-1 rounded-full text-xs font-medium transition-all"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                    <button
                      onClick={() => onAction("Resend", r)}
                      className="text-green-600 hover:text-white hover:bg-green-500/80 px-2 py-1 rounded-full text-xs font-medium transition-all"
                    >
                      Resend
                    </button>
                    <button
                      onClick={() => onAction("Mark Done", r)}
                      className="text-gray-600 hover:text-[#fe9a00] hover:bg-[#fe9a00]/20 px-2 py-1 rounded-full text-xs font-medium transition-all"
                    >
                      Done
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-[3px] w-full bg-gradient-to-r from-[#fe9a00] via-[#ffb733] to-[#fe9a00]" />
      </div>

      {/* ===== Mobile View (Card Layout) ===== */}
      <div className="md:hidden flex flex-col gap-4 mt-6">
        {reminders.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-[#fe9a00]/20 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all duration-200"
          >
            {/* Header Row */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[#fe9a00] font-semibold text-sm">
                {r.caseName}
              </h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  r.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-800 border border-yellow-500/30"
                    : "bg-green-500/20 text-green-800 border border-green-500/30"
                }`}
              >
                {r.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-1 text-xs text-gray-700 mb-3">
              <p>
                <span className="font-semibold text-gray-900">Stage:</span>{" "}
                {r.stage}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Type:</span>{" "}
                {r.type}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Lawyer:</span>{" "}
                {r.lawyer}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Date:</span>{" "}
                {r.date}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end flex-wrap gap-2 mt-2">
              <button
                onClick={() => onAction("View", r)}
                className="flex items-center gap-1 text-[#fe9a00] hover:text-white hover:bg-[#fe9a00]/80 px-3 py-1 rounded-full text-xs font-medium transition-all"
              >
                <Eye className="w-3.5 h-3.5" /> View
              </button>
              <button
                onClick={() => onAction("Resend", r)}
                className="text-green-600 hover:text-white hover:bg-green-500/80 px-3 py-1 rounded-full text-xs font-medium transition-all"
              >
                Resend
              </button>
              <button
                onClick={() => onAction("Mark Done", r)}
                className="text-gray-600 hover:text-[#fe9a00] hover:bg-[#fe9a00]/20 px-3 py-1 rounded-full text-xs font-medium transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemindersTable;
